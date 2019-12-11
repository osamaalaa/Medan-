import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EquipmentDataModelService } from './equipment-data.model.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-equipment-data',
  templateUrl: './equipment-data.component.html',
  styleUrls: ['./equipment-data.component.scss'],
  providers: [EquipmentDataModelService, ReportListService]
})
export class EquipmentDataComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  equipmentDataReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**storing Raw Table Data from html Table **/
  domTableData: any[] = [];

  /**storing filtered Table Data */
  finalDomTableData: any[] = [];

  /**storing filtered Table Data */
  finalDomTableHeaders: any[] = [];

  /**storing table headings */
  mainHeaders: any[] = [];

  /**storing main Data (td) */
  mainData = [];

  /**storing Data After slice */
  dataAfterSlice = [];

  /**storing form parameters */
  parameters: any = [];

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  /**Stroring location name in english */
  locationEnName: any;

  /**Stroring location name in arabic */
  locationArName: any;

  constructor(
    public equipmentDataModelService: EquipmentDataModelService,
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
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
  }

  /**Reactive Form */
  createForm(): void {
    this.equipmentDataReportForm = this._fb.group({
      p_location_id: [null],
      p_template_id: [null],
    })
  }

  /**Getting location Label by id */
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

  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = [];
  locationList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;

    let templateBody = {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }
    forkJoin([
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllProjectsAndLocations()
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.templateList = results[0].rows;
        this.locationList = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
      }
    )
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  /**Fetching Data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.equipmentDataReportForm.value
    this.getLocationNameById(body.p_location_id)

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
    this.reportsListService.postEquipmentData(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting equipment data : ' + error.error.message,
        )
      },
    )
  }

  /**Setting Table Data */
  setTableData(data) {
    this.equipmentDataModelService.displayData = data
    this.equipmentDataModelService.savedData = data
  }

  /**RESET form & table */
  reset() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET form only */
  resetForm() {
    this.equipmentDataReportForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.equipmentDataModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.equipmentDataModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.equipmentDataModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);

    this.domTableData = Object.values(ws);

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData;

    this.dataAfterSlice = this.finalDomTableData.splice(3);

    size = 3;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 3;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.equipmentDataReportForm.value
    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName, '    ', 'SHIFT:', this.templateEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName, '           ', 'تحول:', this.templateArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();
    if (this.lang == "en") {
      this.titleAr = "Equipment-Data Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان المعدات"
      this.date = "التاريخ والوقت :"
    }

    this.equipmentDataModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);

  }

  /**Formatting Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}

