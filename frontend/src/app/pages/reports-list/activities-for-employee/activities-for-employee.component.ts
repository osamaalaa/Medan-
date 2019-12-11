import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivitiesForEmployeeModelService } from './activities-for-employee.model.service'
import { forkJoin } from 'rxjs'
import { ACTIVITIES_FOR_EMPLOYEE_VALIDATION_MESSAGES } from './activities-for-employee.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { ReportListService } from '../reports-list.service'
import * as XLSX from 'xlsx'
import { HelperUtil } from 'src/app/common/Helper.Util'

@Component({
  selector: 'app-activities-for-employee',
  templateUrl: './activities-for-employee.component.html',
  styleUrls: ['./activities-for-employee.component.scss'],
  providers: [ActivitiesForEmployeeModelService, ReportListService],
})
export class ActivitiesForEmployeeComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  activitiesForEmployeeReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Chart Data */
  finalActivitiesEmp: any[] = []

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

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  /**Validation messages */
  validation_messages: any = ACTIVITIES_FOR_EMPLOYEE_VALIDATION_MESSAGES

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public activitiesForEmployeeModelService: ActivitiesForEmployeeModelService,
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
    // this.fetchData();
  }

  /**ngModelChange event Model for language */
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
    this.activitiesForEmployeeReportForm = this._fb.group({
      p_location_id: [null],
      p_template_id: [null],
    })
  }
  /**Validation Messages */
  get p_location_id() {
    return this.activitiesForEmployeeReportForm.controls.p_location_id
  }
  get p_template_id() {
    return this.activitiesForEmployeeReportForm.controls.p_template_id
  }

  /**Getting location label by id */
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
  allLocations: any[] = []
  allTemplate: any[] = []

  getAllLookups() {
    this.isfetchingLookup = true

    let templateBody: {
      p_shift_name_en: ''
      p_shift_name_ar: ''
    }

    forkJoin(
      this.reportsListService.getAllProjectsAndLocations(),
      this.reportsListService.getAllTemplates(templateBody),
    ).subscribe(results => {
      this.isfetchingLookup = false
        ; (this.allLocations = HelperUtil.treeify(results[0].rows, 'PIN_ID', 'PARENT_PIN_ID', null)), (this.allTemplate = results[1].rows)
    })
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  /**Fetching Data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.activitiesForEmployeeReportForm.value
    // console.log('ac body===> ', body);
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
    //  console.log("daat.."+JSON.stringify(payload));
    this.reportsListService.activitiesForEmployeeData(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting activities for employee : ' + error.error.message,
        )
      },
    )
    // console.log('body===> ', JSON.stringify(body.p_template_id))
  }

  /**Setting table data */
  setTableData(data) {
    this.activitiesForEmployeeModelService.displayData = data
    this.activitiesForEmployeeModelService.savedData = data
  }

  /**RESET form & table */
  reset() {
    this.resetForm()
    this.clearTable()
  }

  /**RESET form only */
  resetForm() {
    this.activitiesForEmployeeReportForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.activitiesForEmployeeModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.activitiesForEmployeeModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.activitiesForEmployeeModelService.sortData(sort)
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

    this.dataAfterSlice = this.finalDomTableData.splice(4)

    size = 4
    while (this.dataAfterSlice.length > 0) this.mainData.push(this.dataAfterSlice.splice(0, size))

    var headersArray = [],
      size = 4
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size))
    this.mainHeaders = headersArray[0]

    let body = this.activitiesForEmployeeReportForm.value
    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''
    // console.log('b===> ', body.p_template_id);
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName, '     ', 'SHIFT:', this.templateEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName, '     ', 'تحول:', this.templateArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString()

    if (this.lang == "en") {
      this.titleAr = "Work Order Status in Location Or Shift Report"
      this.date = "Date & Time :"
    }
    else {
      this.titleAr = "حالة أوامر العمل للموقع والوردية"
      this.date = "التاريخ والوقت :"
    }
    this.activitiesForEmployeeModelService.generateExcel(
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
