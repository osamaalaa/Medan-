import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { forkJoin } from 'rxjs'
import { ReportsService } from '../reports.service'
import { SEARCH_VALIDATION_MESSAGES } from './search.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { format } from 'date-fns'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

  /**Storing Current Language */
  lang: string

  /*Stored Reactive form Data*/
  searchReportForm: FormGroup

  /**Validation messages */
  validation_messages: any = SEARCH_VALIDATION_MESSAGES

  /**Converted From Date */
  finalFromDate

  /**Converted To Date */
  finalToDate

  /**PAYLOAD */
  payload: any = {};

  constructor(
    private _fb: FormBuilder,
    private homeService: HomeService,
    public reportsService: ReportsService,
    private ui: UIService,
    public translate: TranslateService,
  ) {
    this.getAllLookups()
    this.createForm()
  }

  ngOnInit() {
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  /**Reactive Form */
  createForm(): void {
    this.searchReportForm = this._fb.group({
      p_from_date: [null, [Validators.required]],
      p_to_date: [null, [Validators.required]],
      p_project_id: [null],
      p_asset_id: [null],
      p_service_type: [null],
      p_template_id: [null],
      p_location_id: [null],
      p_service_id: [null]
    })
  }

  /**ngOnModelChange event Method for Language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
      console.log(this.lang)
    })
  }

  /**Getting Current Language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Converting Date Format In ts file */
  convertDate(selectedDate) {
    const d = selectedDate.getDate()
    var month = new Array()
    month[0] = 'January'
    month[1] = 'February'
    month[2] = 'March'
    month[3] = 'April'
    month[4] = 'May'
    month[5] = 'June'
    month[6] = 'July'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'October'
    month[10] = 'November'
    month[11] = 'December'
    const m = month[selectedDate.getMonth()]
    const y = selectedDate.getFullYear()

    return d + '-' + m + '-' + y
  }

  /**From Date */
  convertFromDate() {
    const selectedDate = new Date(this.searchReportForm.get('p_from_date').value)
    this.finalFromDate = this.convertDate(selectedDate)
  }

  /**To Date */
  convertToDate() {
    const selectedDate = this.searchReportForm.get('p_to_date').value
    this.finalToDate = this.convertDate(selectedDate)
  }

  /**Validation Messages */
  get p_from_date() {
    return this.searchReportForm.controls.p_from_date
  }
  get p_to_date() {
    return this.searchReportForm.controls.p_to_date
  }
  // get p_project_id() {
  //   return this.searchReportForm.controls.p_project_id
  // }


  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  projectsList: any[] = []
  allAssets: any[] = []
  servicesList: any[] = []
  allTemplates: any[] = []
  allLocations: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    let templateBody = {
      p_shift_name_en: '',
      p_shift_name_ar: '',
    }

    let locationBody = {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }

    let assetBody = {
      "p_template_id": "",
      "p_location_id": ""
    }

    forkJoin(
      this.homeService.getAllProjects(),
      this.homeService.getAllAssets(assetBody),
      this.homeService.getAllServices(),
      this.homeService.getAllTemplates(templateBody),
      this.homeService.getAllLocations(locationBody)
    ).subscribe(results => {
      this.isfetchingLookup = false
      this.projectsList = results[0].rows
      this.allAssets = results[1].rows
      this.servicesList = results[2].rows
      this.allTemplates = results[3].rows
      this.allLocations = results[4].rows
    })
  }

  /**GETTING LOCATION LABEL BASED ON LOCATION ID */
  getLoactionLabelById() {
    let locationBody = {
      PIN_ID: this.searchReportForm.get('p_location_id').value
    }
    if (locationBody.PIN_ID != null) {
      this.homeService.getLocationById(locationBody).subscribe(data => {
        let loactionLabelEn = data.rows[0] ? data.rows[0].LABEL_EN : ''
        let loactionLabelAr = data.rows[0] ? data.rows[0].LABEL_AR : ''
        this.reportsService.searchResponseLocationName$.next({ locNameEn: loactionLabelEn, locNameAr: loactionLabelAr })
      })
    } else {
      console.log('LOCATION ID EMPTY');
    }

  }

  hitOnSubmitButton = 0

  /**Submiting Form */
  submitForm() {
    if (this.searchReportForm.valid) {
      let body = this.searchReportForm.value
      this.payload = {};

      for (var key in body) {
        if (key == "p_location_id" && body[key]) {
          this.payload[key] = body[key]
        } else {
          if (body[key]) {
            this.payload[key] = body[key].id
          }

        }
      }


      if (this.compareDate(body.p_to_date, body.p_from_date) === -1) {
        this.ui.createMessage('error', 'To date cannot be before from date')

      } else if (this.checkOneMonth(body.p_to_date, body.p_from_date) > 31) {
        this.ui.createMessage('error', 'You must select a duration up to one month')
      } else {

        this.getLaborData()
        this.getEquibData()
        this.getIssuesData()
        this.getIncidentsData()
        this.getJobOrderData()
        this.convertFromDate()
        this.convertToDate()
        this.getLoactionLabelById()
        this.getVarianceReportData()
          ; (body.p_from_date = this.finalFromDate), (body.p_to_date = this.finalToDate)

        this.reportsService.searchResponseBody$.next({ searchResponse: body })
        this.reportsService.searchBoolean$.next(true)
        this.hitOnSubmitButton++
        if (this.hitOnSubmitButton % 2 === 1) {
          this.reportsService.searchBoolean$.next(false)
        }
      }
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /**comparing the From & To Date for validation */
  compareDate(date1: Date, date2: Date) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)

    const same = d1.getTime() === d2.getTime()
    if (same) {
      return 0
    }
    if (d1 > d2) {
      return 1
    }
    if (d1 < d2) {
      return -1
    }
  }

  /**CHECKING THE FROM & TO DATE SHOULD BETWEEN RANGE OF 31-DAYS */
  checkOneMonth(date1: Date, date2: Date) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const differenceInTime = d1.getTime() - d2.getTime()
    const differenceInDays = differenceInTime / (1000 * 3600 * 24)
    const result = Math.round(differenceInDays)
    // console.log("Difference in days " + result)
    return result
  }

  /**Getting Table data */
  getJobOrderData() {
    let body = { ...this.searchReportForm.value }
    this.homeService.getJobOrderData(this.payload).subscribe(data => {
      this.reportsService.searchResponseTable$.next({ searchResponse: data })
    })
  }

  /**DATE FORMAT CONVERTION USING NPM PACKAGE */
  formattingDate(date: any): any {
    date = String(date).slice(0, -14)
    const formattedFromDate = format(date, 'DD-MM-YYYY')
    date = formattedFromDate
    return date
  }

  /**Getting Equib Data */
  getEquibData() {
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.searchReportForm.value }
    this.payload['p_from_date'] = this.finalFromDate
    this.payload['p_to_date'] = this.finalToDate
    this.homeService.getEquibData(this.payload).subscribe(data => {
      this.reportsService.searchResponseEquib$.next({ searchResponse: data })
    })
  }

  /**Getting Labor Data */
  getLaborData() {
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.searchReportForm.value }
    this.payload['p_from_date'] = this.finalFromDate
    this.payload['p_to_date'] = this.finalToDate
    this.homeService.getLaborData(this.payload).subscribe(data => {
      this.reportsService.searchResponseLabor$.next({ searchResponse: data })
    })
  }

  /**Getting Issues Data */
  getIssuesData() {
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.searchReportForm.value };
    this.payload['p_from_date'] = this.finalFromDate
    this.payload['p_to_date'] = this.finalToDate
    this.homeService.getIssuesData(this.payload).subscribe(data => {
      this.reportsService.searchResponseIssues$.next({ searchResponse: data })
    })
  }

  /**Getting Incidents Data */
  getIncidentsData() {
    this.resetChart()
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.searchReportForm.value }
    this.payload['p_from_date'] = this.finalFromDate
    this.payload['p_to_date'] = this.finalToDate
    //  console.log('IncidentBody===> ', JSON.stringify(this.payload));
    this.homeService.getIncidentsData(this.payload).subscribe(data => {
      this.reportsService.searchResponseIncidents$.next({ searchResponse: data })
    })
  }

  /**Getting Variance Report Data */
  getVarianceReportData() {
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.searchReportForm.value }
    this.payload['p_from_date'] = this.finalFromDate
    this.payload['p_to_date'] = this.finalToDate
    // console.log('VarianceBody===> ', JSON.stringify(this.payload));
    this.homeService.postVarianceReport(this.payload).subscribe(data => {
      this.reportsService.searchResponseVarianceReport$.next({ searchResponse: data })
    })
  }

  /**RESET THE FORM INPUTS */
  resetForm() {
    this.searchReportForm.reset()
  }

  /**RESET THE CHARTS RESPONSE */
  resetChart() {
    this.reportsService.reset$.next('reset')
  }

  /**RESET BOTH FORM & CHARTS */
  resetAll() {
    this.searchReportForm.reset()
    this.reportsService.reset$.next('reset')
  }

}
