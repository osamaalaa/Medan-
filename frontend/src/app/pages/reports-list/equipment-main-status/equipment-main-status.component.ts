import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EquipmentMainStatusModelService } from './equipment-main-status.model.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EQUIPMENT_MAIN_STATUS_VALIDATION_MESSAGES } from './equipment-main-status.validations.messages';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-equipment-main-status',
  templateUrl: './equipment-main-status.component.html',
  styleUrls: ['./equipment-main-status.component.scss'],
  providers: [EquipmentMainStatusModelService, ReportListService]
})
export class EquipmentMainStatusComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string;

  /**Loading spinner */
  isDataLoading: boolean = false

  //  Reactive form Data
  equipmentMainStatusForm: FormGroup;

  /**Converted Date */
  finalDate;

  searchText = '';

  /**Validation messages */
  validation_messages: any = EQUIPMENT_MAIN_STATUS_VALIDATION_MESSAGES

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

  /**storing EquibSerial label in english*/
  equibSerialEnName: any;

  /**storing EquibSerial label in arabic*/
  equibSerialArName: any;

  /**storing Location label in english*/
  locationEnName: any;

  /**storing Loaction label in arabic*/
  locationArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public equipmentMainStatusModelService: EquipmentMainStatusModelService,
    public translate: TranslateService,
    public reportListService: ReportListService
  ) {
    this.getAllLookups();
    this.createForm();
  }

  ngOnInit() {
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  /**Reactive Form */
  createForm(): void {
    this.equipmentMainStatusForm = this._fb.group({
      p_date: [null, [Validators.required]],
      p_equib_serial: [null],
      p_location_id: [null]
    })
  }

  /**Validation Messages */
  get p_date() {
    return this.equipmentMainStatusForm.controls.p_date
  }

  /**ngModelChange event Method for Language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang

    })
  }

  /**Getting current language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Converting Date Format In ts file */
  convertDate(selectedDate) {
    const d = selectedDate.getDate();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const m = month[selectedDate.getMonth()];
    const y = selectedDate.getFullYear();

    return d + '-' + m + '-' + y
  }

  /**First Month From Date */
  convertPickedDate() {
    const selectedDate = new Date(this.equipmentMainStatusForm.get('p_date').value);
    this.finalDate = this.convertDate(selectedDate);
  }

  /**Getting Location By Id For Label Names*/
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
  equipSerial: any[] = [];
  locationList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let assetSerialBody: {
      ASSET_SERIAL: "",
    }
    forkJoin([
      this.reportsListService.getAssetSerial(assetSerialBody),
      this.reportsListService.getAllProjectsAndLocations()
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.equipSerial = results[0].rows;
        this.locationList = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
      }
    )
  }
  /**Submiting Form */
  async submitForm() {
    await this.convertPickedDate();
    if (this.equipmentMainStatusForm.valid) {
      this.fetchData();
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /**fetch Data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.equipmentMainStatusForm.value;

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
    
    payload['p_date'] = this.finalDate
    // console.log("data.kkk.." + JSON.stringify(payload));
    this.reportsListService.postEquipmentMainStatus(payload).subscribe(
      data => {
        this.equipmentMainStatusModelService.displayData = data.rows;
        this.equipmentMainStatusModelService.savedData = data.rows;
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting  equipment main status  : ' + error.error.message,
        )
      },
    )
  }
  /** Reset Table And Form*/
  reset() {
    this.resetForm();
    this.clearTable();
  }
  /**RESET the form inputs */
  resetForm() {
    this.equipmentMainStatusForm.reset();
  }
  /**RESET the table */
  clearTable() {
    this.equipmentMainStatusModelService.displayData = []
  }
  /** Search  text*/
  searchItems(): void {
    this.equipmentMainStatusModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.equipmentMainStatusModelService.sortData(sort)
  }
  /**export to excel */
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
    this.dataAfterSlice = this.finalDomTableData.splice(2);

    size = 2;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 2;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.equipmentMainStatusForm.value
    this.equibSerialEnName = body.p_equib_serial ? body.p_equib_serial.enName : ''
    this.equibSerialArName = body.p_equib_serial ? body.p_equib_serial.arName : ''
    this.convertPickedDate();
    body.p_date = this.finalDate
    console.log("name..excel .." + this.equibSerialEnName);
    if (this.lang == "en") {
      this.parameters.push('DATE:', body.p_date, '    ', 'EQUIPMENT SERIAL:', this.equibSerialEnName, '   ', 'LOCATION:', this.locationEnName)
    } else {
      this.parameters.push('تاريخ:', body.p_date, '    ', 'المعدات المسلسل:', this.equibSerialArName, '   ', 'موقعك:', this.locationArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();


    if (this.lang == "en") {
      this.titleAr = "Equipment Operation Status Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "حالة التشغيل للمعدة"
      this.date = "التاريخ والوقت :"
    }
    this.equipmentMainStatusModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);
  }
  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }
}
