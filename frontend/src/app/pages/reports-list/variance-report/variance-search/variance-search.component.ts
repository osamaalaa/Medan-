import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { forkJoin } from 'rxjs'
import { VarianceReportsService } from '../variance-reports.service'
import { VARIANCE_SEARCH_VALIDATION_MESSAGES } from './variance-search.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { format } from 'date-fns'
import { JsonPipe } from '@angular/common'

@Component({
  selector: 'app-variance-search',
  templateUrl: './variance-search.component.html',
  styleUrls: ['./variance-search.component.scss'],
})
export class VarianceSearchComponent implements OnInit {

  lang: string

  /*Stored Reactive form Data*/
  varianceSearchReportForm: FormGroup

  /**Validation messages */
  validation_messages: any = VARIANCE_SEARCH_VALIDATION_MESSAGES

  /**Converted From Date */
  finalFromDate

  /**Converted To Date */
  finalToDate

  /**Project LABEL */
  projectLabel: any;

  constructor(
    private _fb: FormBuilder,
    private homeService: HomeService,
    public varianceReportsService: VarianceReportsService,
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
    this.varianceSearchReportForm = this._fb.group({
      p_from_date: [null, [Validators.required]],
      p_to_date: [null, [Validators.required]],
      p_project_id: [null, [Validators.required]],
      p_asset_id: [null],
      p_service_type: [null],
      p_template_id: [null]
    })
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
      console.log(this.lang)
    })
  }

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
    const selectedDate = new Date(this.varianceSearchReportForm.get('p_from_date').value)
    this.finalFromDate = this.convertDate(selectedDate)
  }

  /**To Date */
  convertToDate() {
    const selectedDate = this.varianceSearchReportForm.get('p_to_date').value
    this.finalToDate = this.convertDate(selectedDate)
  }

  /**Validation Messages */
  get p_from_date() {
    return this.varianceSearchReportForm.controls.p_from_date
  }
  get p_to_date() {
    return this.varianceSearchReportForm.controls.p_to_date
  }
  get p_project_id() {
    return this.varianceSearchReportForm.controls.p_project_id
  }
  // get p_asset_id() {
  //   return this.searchReportForm.controls.p_asset_id;
  // }
  // get p_service_id() {
  //   return this.searchReportForm.controls.p_service_id
  // }
  // get p_template_id() {
  //   return this.searchReportForm.controls.p_template_id;
  // }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  projectsList: any[] = []
  allAssets: any[] = []
  servicesList: any[] = []
  allTemplates: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    let templateBody = {
      p_shift_name_en: '',
      p_shift_name_ar: '',
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
    ).subscribe(results => {
      this.isfetchingLookup = false
      this.projectsList = results[0].rows
      this.allAssets = results[1].rows
      this.servicesList = results[2].rows
      this.allTemplates = results[3].rows
    })
  }

  getProjectLabelById() {
    const selectedDate = this.varianceSearchReportForm.get('p_project_id').value;
    // this.finalToDate = this.convertDate(selectedDate);
    this.homeService.getProjectById(selectedDate).subscribe(data => {
      this.projectLabel = data.rows[0].SECONDARY_NAME
      console.log('label===>', this.projectLabel)
      this.varianceReportsService.searchResponseProjectLabel$.next({ searchResponse: this.projectLabel });
    })
  }

  /**Submiting Form */
  submitForm() {

    if (this.varianceSearchReportForm.valid) {
      let body = this.varianceSearchReportForm.value;

      this.getLaborData();
      this.getEquibData();
      this.getIssuesData();
      this.getIncidentsData();
      this.getJobOrderData();

      this.convertFromDate();
      this.convertToDate();
      this.getProjectLabelById();
      body.p_from_date = this.finalFromDate,
        body.p_to_date = this.finalToDate

      this.varianceReportsService.searchResponseBody$.next({ searchResponse: body });

    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
    this.resetChart();
  }

  /**Getting Table data */
  getJobOrderData() {
    let body = { ...this.varianceSearchReportForm.value }
    let bodyForTable = {
      PROJECT_ID: body.p_project_id,
      ASSET_ID: body.p_asset_id
    }

    console.log('tableboddy===>', bodyForTable)
    this.homeService.getJobOrderData(bodyForTable).subscribe(data => {
      console.log('==table==>', data.rows)
      this.varianceReportsService.searchResponseTable$.next({ searchResponse: data });
    })
  }

  formattingDate(date: any): any {
    date = String(date).slice(0, -14)
    const formattedFromDate = format(date, 'DD-MM-YYYY')
    date = formattedFromDate
    return date
  }

  /**Getting Equib Data */
  getEquibData() {
    let body = { ...this.varianceSearchReportForm.value }
    body.p_from_date = this.formattingDate(body.p_from_date)
    body.p_to_date = this.formattingDate(body.p_to_date)
    // body.p_project_id = '50'
    body.p_service_id = ''
    body.p_asset_id = ''
    body.p_template_id = ''
    console.log('body' + JSON.stringify(body))
    this.homeService.getEquibData(body).subscribe(data => {
      this.varianceReportsService.searchResponseEquib$.next({ searchResponse: data })
    })
  }

  /**Getting Labor Data */
  getLaborData() {
    let body = { ...this.varianceSearchReportForm.value }
      ; (body.p_from_date = ''),
        (body.p_to_date = ''),
        (body.p_project_id = ''),
        (body.p_asset_id = ''),
        (body.p_template_id = ''),
        // console.log('boddyLaborr==>', body)
        this.homeService.getLaborData(body).subscribe(data => {
          // console.log('ress====>', data.rows)
          this.varianceReportsService.searchResponseLabor$.next({ searchResponse: data })
        })
  }

  /**Getting Issues Data */
  getIssuesData() {
    this.convertFromDate()
    this.convertToDate()
    let body = { ...this.varianceSearchReportForm.value }
      ; (body.p_asset_id = ''),
        (body.p_template_id = ''),
        (body.p_service_type = ''),
        (body.p_from_date = this.finalFromDate),
        (body.p_to_date = this.finalToDate)
    // console.log('boddyisssue==>', body)
    this.homeService.getIssuesData(body).subscribe(data => {
      // console.log('ressissue====>', data.rows)
      this.varianceReportsService.searchResponseIssues$.next({ searchResponse: data })
    })
  }

  /**Getting Incidents Data */
  getIncidentsData() {
    let body = { ...this.varianceSearchReportForm.value }
    body.p_from_date = this.formattingDate(body.p_from_date)
    body.p_to_date = this.formattingDate(body.p_to_date)
    // body.p_project_id = '50'
    body.p_service_id = ''
    body.p_asset_id = ''
    body.p_template_id = ''
    this.homeService.getIncidentsData(body).subscribe(data => {
      this.varianceReportsService.searchResponseIncidents$.next({ searchResponse: data })
    })
  }

  resetForm() {
    this.varianceSearchReportForm.reset();
  }

  resetChart() {
    this.varianceReportsService.reset$.next('reset');
  }

  resetAll() {
    this.varianceSearchReportForm.reset();
    this.varianceReportsService.reset$.next('reset');
  }

}
