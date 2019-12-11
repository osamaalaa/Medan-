import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { WorkPermissionsModelService } from './work-permissions.model.services'
import { forkJoin } from 'rxjs'
import { WORK_PERMISSIONS_VALIDATION_MESSAGES } from './work-permissions.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { ReportListService } from '../reports-list.service'
import * as XLSX from 'xlsx'
import { format } from 'date-fns';

@Component({
  selector: 'app-work-permissions',
  templateUrl: './work-permissions.component.html',
  styleUrls: ['./work-permissions.component.scss'],
  providers: [WorkPermissionsModelService, ReportListService],
})
export class WorkPermissionsComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  workPermissionsReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Chart Data x-axis */
  finalWorkPermissions: any[] = []

  /**Search Variable */
  searchText: string = ''

  // displayTable: boolean

  /**Validation messages */
  validation_messages: any = WORK_PERMISSIONS_VALIDATION_MESSAGES //

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

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  /**Storing status name in english */
  statusEnName: any;

  /**Storing status name in arabic */
  statusArName: any;

  /**MAPPING EXCEL SERIAL TO DATE FORMAT */
  finalExcelFromDate: any[] = []

  /**MAPPING EXCEL SERIAL TO DATE FORMAT */
  finalExcelToDate: any[] = []

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public workPermissionsModelService: WorkPermissionsModelService,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
    //  this.fetchData();
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
    this.workPermissionsReportForm = this._fb.group({
      p_location_id: [null],
      p_status_id: [null],
    })
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  permissionsList: any[] = []
  allLocations: any[] = []
  allStatus: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    let locationBody: {
      p_loc_name_en: ''
      p_loc_name_ar: ''
    }
    let permissionBody: {
      PERMISSION_ID: ''
    }

    forkJoin(
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getPermissions(permissionBody),
      this.reportsListService.getPermissionStatus(),
    ).subscribe(results => {
      this.isfetchingLookup = false
        ; (this.allLocations = results[0].rows),
          (this.permissionsList = results[1].rows),
          (this.allStatus = results[2].rows)
      // console.table( this.permissionsList)
    })
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  /**Fetching data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.workPermissionsReportForm.value
    let payload = {};
    for (var key in body) {
      if (body[key]) {
        payload[key] = body[key].id
      }

    }
    // console.log("daata..." + JSON.stringify(payload));
    this.reportsListService.postWorkPermissionsData(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting work permissions All : ' + error.error.message,
        )
      },
    )
  }

  /**Setting table data */
  setTableData(data) {
    this.workPermissionsModelService.displayData = data
    this.workPermissionsModelService.savedData = data
  }

  /**RESET form & table */
  reset() {
    this.resetForm()
    this.clearTable()
  }

  /**RESET form only */
  resetForm() {
    this.workPermissionsReportForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.workPermissionsModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.workPermissionsModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.workPermissionsModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {


    let dateValue = this.printDate()
    this.mainData = []
    this.parameters = []
    this.finalExcelFromDate = []
    this.finalExcelToDate = []
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)

    this.domTableData = Object.values(ws)

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData

    this.dataAfterSlice = this.finalDomTableData.splice(7)

    size = 7
    while (this.dataAfterSlice.length > 0) this.mainData.push(this.dataAfterSlice.splice(0, size))

    var headersArray = [],
      size = 7
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size))
    this.mainHeaders = headersArray[0]


    let body = this.workPermissionsReportForm.value
    this.locationEnName = body.p_location_id ? body.p_location_id.enName : ''
    this.locationArName = body.p_location_id ? body.p_location_id.arName : ''
    this.statusEnName = body.p_status_id ? body.p_status_id.enName : ''
    this.statusArName = body.p_status_id ? body.p_status_id.arName : ''
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName, '     ', 'STATUS:', this.statusEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName, '     ', 'الحالة:', this.statusArName)
    }


    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString()

    if (this.lang == "en") {
      this.titleAr = "Work-Permissions Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "تقرير ماء زمزم"
      this.date = "التاريخ والوقت :"
    }

    for (var i = 0; i < this.mainData.length; i++) {
      let excelData = this.mainData[i];
      let excelFromDate = excelData[3];

      const finalDate = this.serialToDate(excelFromDate);
      const formatted = this.formattingDate(finalDate);

      excelData.splice(3, 1, formatted)
      this.finalExcelFromDate.push(excelData);

    }
    for (var i = 0; i < this.finalExcelFromDate.length; i++) {
      let excelData = this.finalExcelFromDate[i];
      let excelFromDate = excelData[4];

      const finalDate = this.serialToDate(excelFromDate);
      const formatted = this.formattingDate(finalDate);

      excelData.splice(4, 1, formatted)
      this.finalExcelToDate.push(excelData);

    }
    this.finalExcelToDate.pop();
    // console.log('xlArray ===> ', this.finalExcelFromDate);
    this.workPermissionsModelService.generateExcel(
      this.finalExcelToDate,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }

  /**Formating date */
  printDate() {
    var date = new Date()
    var str = date.toString()
    var res = str.split('G')
    return res[0]
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
