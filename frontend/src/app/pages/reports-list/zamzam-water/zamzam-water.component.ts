import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { forkJoin } from 'rxjs';
import { ZAM_ZAM_VALIDATION_MESSAGES } from './zamzam.validations.messages';
import { ZamZamWaterModelService } from './zamzam-water.model.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-zamzam-water',
  templateUrl: './zamzam-water.component.html',
  styleUrls: ['./zamzam-water.component.scss'],
  providers: [ZamZamWaterModelService, ReportListService],
})
export class ZamzamWaterComponent implements OnInit {

  /**getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string

  /**Loading spinner */
  isDataLoading: boolean = false

  // Stored Reactive form Data
  zamZamWaterForm: FormGroup

  /**Validation messages */
  validation_messages: any = ZAM_ZAM_VALIDATION_MESSAGES

  /**Storing Count x-axis */
  finalCount: any[] = []

  /**Search Variable */
  searchText: string = ''

  /**storing Raw Table Data from html Table **/
  domTableData: any[] = []

  /**storing filtered Table Data */
  finalDomTableData: any[] = []

  /**storing filtered Table Data */
  finalDomTableHeaders: any[] = []

  /**storing table headings */
  mainHeaders: any[] = []

  /**storing main Data (td) */
  mainData = []

  /**storing Data After slice */
  dataAfterSlice = []

  /**storing form parameters */
  parameters: any = []

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  /**storing serviceType name in english */
  serviceTypeEnName: any;

  /**storing serviceType name in arabic */
  serviceTypeArName: any;

  /**storing location name in english */
  locationEnName: any;

  /**storing location name in arabic */
  locationArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public zamZamWaterModelService: ZamZamWaterModelService,
    public translate: TranslateService,
    private reportListService: ReportListService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  /**Reactive Form */
  createForm(): void {
    this.zamZamWaterForm = this._fb.group({
      P_TEMPLATE_ID: [null],
      p_location_id: [null],
    })
  }

  /**Validation Messages */
  get P_TEMPLATE_ID() {
    return this.zamZamWaterForm.controls.P_TEMPLATE_ID
  }
  get p_location_id() {
    return this.zamZamWaterForm.controls.p_location_id
  }
 
  /**getting location label by id */
  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    if (locId.PIN_ID != null) {
      this.reportsListService.getLocationNameById(locId).subscribe(data => {
        this.locationEnName = data.rows[0] ? data.rows[0].LABEL_EN : ''
        this.locationArName = data.rows[0] ? data.rows[0].LABEL_AR : ''
      })
    } else {
      console.log("Location Id Empty");
    }
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = []
  locationList: any[] = []
  serviceTypeName: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true

    let templateBody = {
      p_shift_name_en: '',
      p_shift_name_ar: '',
    }
    forkJoin([
      this.reportsListService.getAllProjectsAndLocations(),
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getLookUps(181),
    ]).subscribe(results => {
      this.isfetchingLookup = false
      this.locationList = HelperUtil.treeify(results[0].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
      this.templateList = results[1].rows
      this.serviceTypeName = results[2].rows
    })
  }

  /**ngModelChange event Method for language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  /**Getting current language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
    console.log(this.lang)
  }

  /**Submiting Form */
  submitForm() {
    this.clearTable()
    this.fetchData()
  }

  /**fetch data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.zamZamWaterForm.value
    let payload = {};

    for (var key in body) {
      if (key == "p_location_id" && body[key]) {
        payload[key] = body[key]
      } else {
        if (body[key]) {
          payload[key] = body[key].id
        }

      }
    }
    this.getLocationNameById(body.p_location_id)
    //  console.log("daat..."+JSON.stringify(payload))
    this.reportsListService.postZamZamWater(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Zamzam Data : ' + error.error.message,
        )
      },
    )
  }

  /**Set table data */
  setTableData(data) {
    this.zamZamWaterModelService.displayData = data
    this.zamZamWaterModelService.savedData = data
  }

  /**RESET form & table */
  reset() {
    this.resetForm()
    this.clearTable()
  }

  /**RESET form only */
  resetForm() {
    this.zamZamWaterForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.zamZamWaterModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.zamZamWaterModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.zamZamWaterModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate()
    this.mainData = []
    this.parameters = []
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)

    this.domTableData = Object.values(ws)

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData

    this.dataAfterSlice = this.finalDomTableData.splice(3)

    size = 3
    while (this.dataAfterSlice.length > 0) this.mainData.push(this.dataAfterSlice.splice(0, size))

    var headersArray = [],
      size = 3
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size))
    this.mainHeaders = headersArray[0]

    let body = this.zamZamWaterForm.value
    this.templateEnName = body.P_TEMPLATE_ID ? body.P_TEMPLATE_ID.enName : ''
    this.templateArName = body.P_TEMPLATE_ID ? body.P_TEMPLATE_ID.arName : ''
    if (this.lang == "en") {
      this.parameters.push('SHIFT:', this.templateEnName, '    ', 'LOCATION:', this.locationEnName)
    } else {
      this.parameters.push('تحول:', this.templateArName, '    ', 'موقعك:', this.locationArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString()

    if (this.lang == "en") {
      this.titleAr = "Zamzam Water Withdraw Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان صرفيه بئر زمزم"
      this.date = "التاريخ والوقت :"
    }
    this.zamZamWaterModelService.generateExcel(
      this.mainData,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }

  /**Formatting date */
  printDate() {
    var date = new Date()
    var str = date.toString()
    var res = str.split('G')
    return res[0]
  }

}
