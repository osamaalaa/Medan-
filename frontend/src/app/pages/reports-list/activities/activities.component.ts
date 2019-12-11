import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivitiesModelService } from './activities.model.service'
import { forkJoin } from 'rxjs'
import { ACTIVITIES_VALIDATION_MESSAGES } from './activities.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx'
import { HelperUtil } from 'src/app/common/Helper.Util'

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  providers: [ActivitiesModelService, ReportListService],
})
export class ActivitiesComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  activitiesReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Chart Data x-axis */
  finalActivities: any[] = []

  /**Search Variable */
  searchText: string = ''

  /**Validation messages */
  validation_messages: any = ACTIVITIES_VALIDATION_MESSAGES

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

  /**storing employee  label in english*/
  empEnName: any;

  /**storing employee  label in arabic*/
  empArName: any;

  /**storing location  label in english*/
  locationEnName: any;

  /**storing location   label in arabic*/
  locationArName: any;

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public activitiesModelService: ActivitiesModelService,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
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
    this.activitiesReportForm = this._fb.group({
      p_emp_code: [null],
      p_location_id: [null]
    })
  }

  /**Getting Location By Id For Label Name*/
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
  employeeList: any[] = []
  allLocations: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin(this.reportsListService.getAllEmployees(),
      this.reportsListService.getAllProjectsAndLocations()
    ).subscribe(results => {
      this.isfetchingLookup = false
      this.employeeList = results[0].rows
      this.allLocations = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null)
    })
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  /**fetch data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.activitiesReportForm.value
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
    this.reportsListService.activitiesData(payload).subscribe(
      data => {
        this.activitiesModelService.displayData = data.rows
        this.activitiesModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting activities data : ' + error.error.message,
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
    this.activitiesReportForm.reset()
  }
  /**RESET the table */
  clearTable() {
    this.activitiesModelService.displayData = []
  }
  /** Search  text*/
  searchItems(): void {
    this.activitiesModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.activitiesModelService.sortData(sort)
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
    this.dataAfterSlice = this.finalDomTableData.splice(3);
    size = 3;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 3;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.activitiesReportForm.value
    console.log("json....." + JSON.stringify(body));
    this.empEnName = body.p_emp_code ? body.p_emp_code.enName : ''
    this.empArName = body.p_emp_code ? body.p_emp_code.arName : ''
    if (this.lang == "en") {
      this.parameters.push('EMPLOYEE-NAME:', this.empEnName, '      ', 'LOCATION:', this.locationEnName)
    } else {
      this.parameters.push('اسم الموظف:', this.empArName, '              ', 'موقعك:', this.locationArName)
    }

    let removeComma = [this.parameters.join(' ')]
    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.titleAr = "Employee Work Orders Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "اوامر العمل للموظفين"
      this.date = "التاريخ والوقت :"
    }

    this.activitiesModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr,
      this.date);
  }

  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}
