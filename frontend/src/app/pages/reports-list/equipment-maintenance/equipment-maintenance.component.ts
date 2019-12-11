import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EquipmentMaintenanceModelService } from './equipment-maintenance.model.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { EQUIPMENT_MAINTENANCE_VALIDATION_MESSAGES } from './equipment-maintenance.validations.messages'
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';

@Component({
  selector: 'app-equipment-maintenance',
  templateUrl: './equipment-maintenance.component.html',
  styleUrls: ['./equipment-maintenance.component.scss'],
  providers: [EquipmentMaintenanceModelService, ReportListService]
})
export class EquipmentMaintenanceComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string;

  /**Loading spinner */
  isDataLoading: boolean;

  // Stored Reactive form Data
  equipmentMaintenanceForm: FormGroup;

  /**Converted Date */
  finalDate;

  /**Validation messages */
  validation_messages: any = EQUIPMENT_MAINTENANCE_VALIDATION_MESSAGES

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

  /**storing EquibSerial label in english*/
  equibSerialEnName: any;

  /**storing EquibSerial label in arabic*/
  equibSerialArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public equipmentMaintenanceModelService: EquipmentMaintenanceModelService,
    public translate: TranslateService,
    private reportListService: ReportListService
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
    this.equipmentMaintenanceForm = this._fb.group({
      p_date: [null, [Validators.required]],
      p_equib_serial: [null],
    })
  }


  /**Validation Messages */
  get p_date() {
    return this.equipmentMaintenanceForm.controls.p_date
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

  /** Date */
  convertPickedDate() {
    if (!this.equipmentMaintenanceForm.get('p_date').value) {
      return;
    }
    const selectedDate = new Date(this.equipmentMaintenanceForm.get('p_date').value);
    this.finalDate = this.convertDate(selectedDate);
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false;
  equipSerial: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let assetSerialBody: {
      p_equib_serial: "",
    }

    forkJoin([
      this.reportsListService.getAssetSerial(assetSerialBody),
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.equipSerial = results[0].rows;

      }
    )
  }

  /**Submiting Form */
  async submitForm() {
    await this.convertPickedDate();
    if (this.equipmentMaintenanceForm.valid) {
      this.fetchData();
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /**fetch data */
  fetchData() {
    this.isDataLoading = true;

    let body = this.equipmentMaintenanceForm.value

    let payload = {}

    if (body.p_equib_serial) {
      payload['p_equib_serial'] = body.p_equib_serial.id
    }

    payload['p_date'] = this.finalDate

    // console.log("daat..." + JSON.stringify(payload));
    this.reportsListService.postEquipmentMaintenance(payload).subscribe(
      data => {
        this.equipmentMaintenanceModelService.displayData = data.rows;
        this.equipmentMaintenanceModelService.savedData = data.rows;
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting clean equipment  maintenance : ' + error.error.message,
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
    this.equipmentMaintenanceForm.reset()
  }
  /**RESET the table */
  clearTable() {
    this.equipmentMaintenanceModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.equipmentMaintenanceModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.equipmentMaintenanceModelService.sortData(sort)
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

    let body = this.equipmentMaintenanceForm.value
    this.fetchData();
    body.p_date = this.finalDate
    this.equibSerialEnName = body.p_equib_serial ? body.p_equib_serial.enName : ''
    this.equibSerialArName = body.p_equib_serial ? body.p_equib_serial.arName : ''
    if (this.lang == "en") {
      this.parameters.push('DATE:', body.p_date, '    ', 'EQUIPMENT-SERIAL:', this.equibSerialEnName)
    } else {
      this.parameters.push('تاريخ:', body.p_date, '           ', 'المعدات المسلسل:', this.equibSerialArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.titleAr = "Equipment Maintenance Status Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان حالة الصيانة للمعدة"
      this.date = "التاريخ والوقت :"
    }
    this.equipmentMaintenanceModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);
  }
  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }
}
