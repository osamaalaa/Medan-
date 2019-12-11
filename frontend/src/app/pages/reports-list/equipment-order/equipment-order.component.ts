import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EquipmentOrderModelService } from './equipment-order.model.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { EQUIPMENT_ORDER_VALIDATION_MESSAGES } from './equipment-order.validations.messages'
import { format } from 'date-fns';

@Component({
  selector: 'app-equipment-order',
  templateUrl: './equipment-order.component.html',
  styleUrls: ['./equipment-order.component.scss'],
  providers: [EquipmentOrderModelService, ReportListService]
})
export class EquipmentOrderComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  equipmentOrderReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**Converted Start Date */
  finalStartDate;

  /**Converted End Date */
  finalEndDate;

  /**Validation messages */
  validation_messages: any = EQUIPMENT_ORDER_VALIDATION_MESSAGES

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

  /**storing AsseSerial  label in english*/
  assetSerialEnName: any;

  /**storing AsseSerial  label in arabic*/
  assetSerialArName: any;

  /**storing Location  label in english*/
  locationEnName: any;

  /**storing loaction   label in arabic*/
  locationArName: any;

  /**MAPPING EXCEL SERIAL TO DATE FORMAT */
  finalExcelOrderDate: any[] = []

  constructor(
    public equipmentOrderModelService: EquipmentOrderModelService,
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

  /**Reactive Form */
  createForm(): void {
    this.equipmentOrderReportForm = this._fb.group({
      p_start_date: [null, [Validators.required]],
      p_end_date: [null, [Validators.required]],
      p_asset_serial: [null],
      p_location_id: [null]
    })
  }

  /**Validation Messages */
  get p_start_date() {
    return this.equipmentOrderReportForm.controls.p_start_date;
  }

  get p_end_date() {
    return this.equipmentOrderReportForm.controls.p_end_date;
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

  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allAssetSerial: any[] = [];
  locationList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let assetSerialBody: {
      ASSET_SERIAL: ""
    }
    forkJoin(
      this.reportsListService.getAssetSerial(assetSerialBody),
      this.reportsListService.getAllProjectsAndLocations()
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.allAssetSerial = results[0].rows
        this.locationList = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
      }
    )
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

  /** From Date */
  convertStartDate() {
    const selectedDate = new Date(this.equipmentOrderReportForm.get('p_start_date').value);
    this.finalStartDate = this.convertDate(selectedDate);
  }

  /** End Date */
  convertEndDate() {
    const selectedDate = this.equipmentOrderReportForm.get('p_end_date').value;
    this.finalEndDate = this.convertDate(selectedDate);
  }

  /**Submiting Form */
  async submitForm() {
    this.isDataLoading = true;
    if (this.equipmentOrderReportForm.valid) {
      await this.convertStartDate();
      await this.convertEndDate();
      let body = this.equipmentOrderReportForm.value

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
      payload['p_start_date'] = this.finalStartDate
      payload['p_end_date'] = this.finalEndDate

      this.reportsListService.postEquipmentOrder(payload).subscribe(
        data => {
          console.log(data.rows)
          this.equipmentOrderModelService.displayData = data.rows
          this.equipmentOrderModelService.savedData = data.rows
          this.isDataLoading = false
        },
        error => {
          this.isDataLoading = false
          this.ui.createMessage('error', 'Error while getting equipmentOrder No data : ' + error.error.message)
        },
      )
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
  /** Reset Table And Form*/
  reset() {
    this.resetForm();
    this.clearTable();
  }
  /**RESET the table */
  clearTable() {
    this.equipmentOrderModelService.displayData = []
  }
  /**RESET the form inputs */
  resetForm() {
    this.equipmentOrderReportForm.reset()
  }
  /** Search  text*/
  searchItems(): void {
    this.equipmentOrderModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.equipmentOrderModelService.sortData(sort)
  }
  /**export to excel */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    this.finalExcelOrderDate = [];
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    this.domTableData = Object.values(ws);

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })
    this.finalDomTableHeaders = this.finalDomTableData;
    this.dataAfterSlice = this.finalDomTableData.splice(5);

    size = 5;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 5;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];
    this.convertStartDate();
    this.convertEndDate();
    let body = this.equipmentOrderReportForm.value
    body.p_start_date = this.finalStartDate,
      body.p_end_date = this.finalEndDate
    this.assetSerialEnName = body.p_asset_serial ? body.p_asset_serial.enName : ''
    this.assetSerialArName = body.p_asset_serial ? body.p_asset_serial.arName : ''
    if (this.lang == "en") {
      this.parameters.push('STARTDATE:', body.p_start_date, '   ', 'ENDDATE:', body.p_end_date, '   ', 'LOCATION:', this.locationEnName, '   ', 'ASSET SERIAL:', this.assetSerialEnName)
    } else {
      this.parameters.push('تاريخ البدء:', body.p_start_date, '     ', 'تاريخ الانتهاء:', body.p_end_date, '       ', 'موقعك:', this.locationArName, '       ', 'الأصول المسلسل:', this.assetSerialArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.titleAr = "Equipment Work Orders Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "اوامر الصيانة للمعدات"
      this.date = "التاريخ والوقت :"
    }
    for (var i = 0; i < this.mainData.length; i++) {
      let excelData = this.mainData[i];
      let excelFromDate = excelData[4];

      const finalDate = this.serialToDate(excelFromDate);
      const formatted = this.formattingDate(finalDate);

      excelData.splice(4, 1, formatted)
      this.finalExcelOrderDate.push(excelData);

    }
    this.finalExcelOrderDate.pop();
    this.equipmentOrderModelService.generateExcel(
      this.finalExcelOrderDate,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }
  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

  /**CONVERT EXCEL SERIAL-NUMBER TO DATE FORMAT */
  serialToDate(serial: any) {
    // console.log('serial===> ', serial);
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  /**FORMAT DATE AS DD-MM-YYYY */
  formattingDate(date: any): any {
    date = String(date).slice(0, -14)
    const formattedDate = format(date, 'DD-MM-YYYY')
    date = formattedDate
    return date;
  }
}