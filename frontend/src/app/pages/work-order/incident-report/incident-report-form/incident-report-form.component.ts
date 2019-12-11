
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkOrderService } from 'src/app/services/workorder.service';
import { UIService } from 'src/app/services/ui.service';
import { INCIDENT_REPORT_VALIDATION_MESSAGES } from './incident-report-form.validations.messages';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-incident-report-form',
  templateUrl: './incident-report-form.component.html',
  styleUrls: ['./incident-report-form.component.scss']
})
export class IncidentReportFormComponent implements OnInit {

  lang: string;

  EMPLOYEE_ID: any;

  allProjects: any = [];

  isDataLoading: boolean = false;

  incidentReportForm: FormGroup;

  validation_messages: any = INCIDENT_REPORT_VALIDATION_MESSAGES;

  constructor(
    private workOrderService: WorkOrderService,
    private _fb: FormBuilder,
    private ui: UIService,
    private route: ActivatedRoute,
    private router: Router,
    public translate: TranslateService) {
    this.getUserDetails();
    this.getAllProjects();
  }

  /** Formdata to patch . Used for edit mode */
  @Input() PROJECT_ID = null;

  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.workOrderService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID;
  }
  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }

  /** Create Form */
  createForm(): void {
    this.incidentReportForm = this._fb.group({
      EMPLOYEE_ID: [this.EMPLOYEE_ID],
      PROJECT_ID: [this.PROJECT_ID],
      INCIDENT_TITLE: [null, [Validators.required]],
      TICKET_NUMBER: [null, [Validators.required]],
      INCIDENT_START_DATE: [null],
      INCIDENT_END_DATE: [null],
      INCIDENT_TOTAL_DURATION: [null, [Validators.required]],
      INCIDENT_DESCRIPTION: [null, [Validators.required]],
      CORRECTIVE_ACTIONS: [null, [Validators.required]],
      PREVENTIVE_ACTIONS: [null, [Validators.required]],
      INCIDENT_BRIEF: [null, [Validators.required]],
    })
  }

  get INCIDENT_TITLE() {
    return this.incidentReportForm.controls.INCIDENT_TITLE;
  }
  get TICKET_NUMBER() {
    return this.incidentReportForm.controls.TICKET_NUMBER;
  }
  get INCIDENT_START_DATE() {
    return this.incidentReportForm.controls.INCIDENT_START_DATE;
  }
  get INCIDENT_END_DATE() {
    return this.incidentReportForm.controls.INCIDENT_END_DATE;
  }
  get INCIDENT_TOTAL_DURATION() {
    return this.incidentReportForm.controls.INCIDENT_TOTAL_DURATION;
  }
  get INCIDENT_DESCRIPTION() {
    return this.incidentReportForm.controls.INCIDENT_DESCRIPTION;
  }

  get CORRECTIVE_ACTIONS() {
    return this.incidentReportForm.controls.CORRECTIVE_ACTIONS;
  }
  get PREVENTIVE_ACTIONS() {
    return this.incidentReportForm.controls.PREVENTIVE_ACTIONS;
  }
  get INCIDENT_BRIEF() {
    return this.incidentReportForm.controls.INCIDENT_BRIEF;
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

  /**Getting All  Projects  Data*/
  getAllProjects(): void {
    this.isDataLoading = true;
    this.workOrderService.getAllProjects().subscribe(
      data => {
        this.allProjects = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Incident All : ' + error.error.message)
      },
    )
  }

  /** On Form Submit */
  // submitForm(): void {
  //   let body = this.incidentReportForm.value;
  //   this.workOrderService.addNewIncident(body).subscribe(
  //     data => {
  //       this.ui.createMessage('success', 'Added Incident Data');
  //       this.navigateToList();
  //     },
  //     error => {

  //       this.ui.createMessage('er ror', 'Error While adding Incident Data')

  //     }
  //   )

  // }

  // /** When cancel button click */
  // cancel(): void {
  //   this.router.navigate(['..'], { relativeTo: this.route })
  // }
  // /**Navigate to list on cancel */
  // navigateToList(): void {
  //   this.router.navigate(['..'], { relativeTo: this.route })
  // }

  ////////////////
  /** On Form Submit */
  submitForm(): void {
    if (this.incidentReportForm.valid) {
      this.onSubmit.emit(this.incidentReportForm.value)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /** When cancel button click */
  cancel(): void {
    this.onCancel.emit()
  }

}
