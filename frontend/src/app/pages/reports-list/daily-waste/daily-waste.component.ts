import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { forkJoin } from 'rxjs';
import { DailyWasteModelService } from './daily-waste.model.service';
import { TranslateService } from '@ngx-translate/core';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-daily-waste',
  templateUrl: './daily-waste.component.html',
  styleUrls: ['./daily-waste.component.scss'],
  providers: [DailyWasteModelService, ReportListService]
})
export class DailyWasteComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string

  /**Loading spinner */
  isDataLoading: boolean = false

  // Stored Reactive form Data
  dailyWasteReportForm: FormGroup

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

  /**Storing service name in english */
  serviceEnName: any;

  /**Storing service name in arabic */
  serviceArName: any;

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public dailyWasteModelService: DailyWasteModelService,
    public translate: TranslateService,
    private reportListService: ReportListService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
    //  this.fetchData()
  }

  /**Reactive Form */
  createForm(): void {
    this.dailyWasteReportForm = this._fb.group({
      p_template_id: [null],
      p_location_id: [null],
      p_ser_type_id: [null],
    })
  }

  /**Validation Messages */
  // get P_TEMPLATE_ID() {
  //   return this.dailyWasteReportForm.controls.P_TEMPLATE_ID
  // }
  // get p_location_id() {
  //   return this.dailyWasteReportForm.controls.p_location_id
  // }
  // get p_service_type_name() {
  //   return this.dailyWasteReportForm.controls.p_service_type_name
  // }

  /**Getting location name by id */
  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    if (locId.PIN_ID != null) {
      this.reportsListService.getLocationNameById(locId).subscribe(data => {
        // console.log('loc,,,excel===> ', data);
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
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllProjectsAndLocations(),
      this.reportsListService.getLookUps(181),
    ]).subscribe(results => {
      this.isfetchingLookup = false
      this.templateList = results[0].rows
      this.locationList = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
      this.serviceTypeName = results[2].rows
    })
  }

  /**ngModelChange event Method for language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
      console.log(this.lang)
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

  /**fetching data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.dailyWasteReportForm.value;
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
    // console.log(payload)
    this.getLocationNameById(body.p_location_id)
    // console.log("dyy..." + JSON.stringify(payload))
    this.reportsListService.postDailyWaste(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Daily-Waste Data : ' + error.error.message,
        )
      },
    )
  }

  /**Setting table data */
  setTableData(data) {
    this.dailyWasteModelService.displayData = data
    this.dailyWasteModelService.savedData = data
  }

  reset() {
    this.resetForm()
    this.clearTable()
  }

  /**RESET form only */
  resetForm() {
    this.dailyWasteReportForm.reset()
  }

  /**RESET TABLE ONLY */
  clearTable() {
    this.dailyWasteModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.dailyWasteModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.dailyWasteModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate()
    this.mainData = []
    this.parameters = []
    this.templateEnName = ''
    this.templateArName = ''
    this.serviceEnName = ''
    this.serviceArName = ''

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

    let body = this.dailyWasteReportForm.value
    // console.log("json..." + JSON.stringify(body))
    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''

    this.serviceEnName = body.p_ser_type_id ? body.p_ser_type_id.enName : ''
    this.serviceArName = body.p_ser_type_id ? body.p_ser_type_id.arName : ''


    if (this.lang == "en") {
      this.parameters.push('SHIFT:', this.templateEnName, '   ', 'LOCATION:', this.locationEnName, '   ', 'SERVICE TYPE NAME:', this.serviceEnName)
    } else {
      this.parameters.push('تحول:', this.templateArName, '        ', 'موقعك:', this.locationArName, '        ', 'اسم نوع الخدمة:', this.serviceArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString()
    if (this.lang == "en") {
      this.titleAr = "Volume of Waste Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان حجم النفايات"
      this.date = "التاريخ والوقت :"
    }

    this.dailyWasteModelService.generateExcel(
      this.mainData,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }

  /**FORMATTING date */
  printDate() {
    var date = new Date()
    var str = date.toString()
    var res = str.split('G')
    return res[0]
  }


}
