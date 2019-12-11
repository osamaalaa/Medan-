import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { forkJoin } from 'rxjs';
import { MY_ISSUES_VALIDATION_MESSAGES } from './my-issues-form.validations.messages';
import { UIService } from 'src/app/services/ui.service';

@Component({
  selector: 'app-my-issues-form',
  templateUrl: './my-issues-form.component.html',
  styleUrls: ['./my-issues-form.component.scss']
})
export class MyIssuesFormComponent implements OnInit {

  displayField: boolean = true;
  date = null;
  priority = null;
  projectId = null;
  getWorkOrdersList: any[] = [];
  createIssueForm: FormGroup;

  validation_messages: any = MY_ISSUES_VALIDATION_MESSAGES;

  @Input() EMPLOYEE_ID;

  /** Formdata to patch . Used for edit mode */
  @Output() onSubmit = new EventEmitter()

  constructor(private _fb: FormBuilder,
    private homeService: HomeService,
    private ui: UIService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
  }

  /**ngOnChange for converting date format */
  onChange(result: Date): void {
    this.date = HelperUtil.formatDate(result);
  }

  /**ngOnChange for converting issuePriority to integer */
  issuePriority(data: string): void {
    this.priority = parseInt(data);
  }

  /**ngOnChange for getting projectId from All Projects */
  onChangeProjectId(projectId: number): void {
    this.projectId = projectId;
    if (this.projectId !== null) {
      this.displayField = false;
    }
    this.homeService.getWorkOrderById(this.projectId).subscribe(
      result => {
        this.getWorkOrdersList = result.rows;
      }
    )
  }

  /**ngOnChange for picking file */
  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];
  }

  /** Create Form */
  createForm(): void {
    this.createIssueForm = this._fb.group({
      ISSUE_TITLE: [null, [Validators.required]],
      ISSUE_SUMMARY: [null, [Validators.required]],
      ISSUE_TYPE: ['2'],
      ISSUE_PRIORITY: ['2'],
      TARGET_RESOLUTION_DATE: [null],
      CLASSIFICATION: [null],
      PROJECT_ID: [null, [Validators.required]],
      ASSIGN_TO: [null, [Validators.required]],
      EMPLOYEE_ID: [this.EMPLOYEE_ID],
      REQUEST_ID: [5]
    });
  }

  get ISSUE_TITLE() {
    return this.createIssueForm.controls.ISSUE_TITLE;
  }
  get ISSUE_SUMMARY() {
    return this.createIssueForm.controls.ISSUE_SUMMARY;
  }
  get PROJECT_ID() {
    return this.createIssueForm.controls.PROJECT_ID;
  }

  // *--------- lookups --------------* //
  isfetchingLookup: boolean = false
  projectsList: any[] = [];
  usersList: any[] = [];
  inverntoryPeriodsList:any[] = []
  getAllLookups() {
    this.isfetchingLookup = true;
    forkJoin([
      this.homeService.getAllProjects(),
      this.homeService.getAllUsers()
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.projectsList = results[0].rows;
        this.usersList = results[1].rows;
      }
    )
  }

  /** On Form Submit */
  submitForm(): void {
    console.log('---->', this.createIssueForm.value);
    
    if (this.createIssueForm.valid) {
      this.createIssueForm.value.TARGET_RESOLUTION_DATE = this.date;
      this.createIssueForm.value.ISSUE_PRIORITY = this.priority;
      let body = { ...this.createIssueForm.value };
      this.onSubmit.emit(body)
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }

  }

}
