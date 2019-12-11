import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ADD_COMMITEE_MEMBER_VALIDATION_MESSAGES } from './add-commitee-member-form.validations.messages';
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-add-commitee-member-form',
  templateUrl: './add-commitee-member-form.component.html',
  styleUrls: ['./add-commitee-member-form.component.scss']
})
export class AddCommiteeMemberFormComponent implements OnInit {
  COMMITTEE_ID: any;

  EMPLOYEE_ID: any;

  allMembers: any = [];

  isDataLoading: boolean = false;

  
  addCommiteeReportForm: FormGroup;

  MODIFIED_BY: any = "";

  EMPLOYEE: any;

  validation_messages: any = ADD_COMMITEE_MEMBER_VALIDATION_MESSAGES;

  nzFilterOption = () => true;

  constructor(
    private homeService: HomeService,
    private _fb: FormBuilder,
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute) {
    this.getAllLookups();
    this.getUserDetails();
    this.fetchCommitteId();
  }
  @Input() formData = null;
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  ngOnInit() {
    this.createForm();
  }
  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.homeService.getEmployeeId();
    this.EMPLOYEE = JSON.parse(USER).EMPLOYEE_ID;
  }
  // --------- lookups -------------- //
  isfetchingLookup: boolean = false
  projectsList: any[] = [];
  usersList: any[] = [];
  allEmployee: any = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    forkJoin([
      this.homeService.getLookUps(CONSTANTS.LOOKUPS.MEMBER_ROLE),
      this.homeService.getEmployeeall()
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.usersList = results[0].rows;
        this.allMembers = results[1].rows;
        this.allEmployee = results[1].rows;
        console.table(this.allMembers)
       //console.table(this.allEmployee)
      //console.table(this.usersList)


      }
    )
  }

  /**Getting COMMITTEE ID Id*/
  fetchCommitteId(): void {
    this.COMMITTEE_ID = parseInt(this.route.snapshot.params['COMMITTEE_ID'])

  }

  /** Create Form */
  createForm(): void {
    this.addCommiteeReportForm = this._fb.group({
      COMMITTEE_ID: [this.COMMITTEE_ID],
      MEMBER_ROLE: [null, [Validators.required]],
      STATUS: [CONSTANTS.STATUS],
      CREATED_BY: [this.EMPLOYEE],
      MODIFIED_BY: [this.MODIFIED_BY],
      MODIFICATION_DATE: [null],
      EMPLOYEE_ID: [null, [Validators.required]],
      SUBSIDIARY_ID:[CONSTANTS.SUBSIDIARY_ID]
    })
  }

  /**
  * *Check if edit mode and patch the form
  */
  get MEMBER_ROLE() {
    return this.addCommiteeReportForm.controls.MEMBER_ROLE;
  }

  /**search commitee members */
  committeeMember(value: string): void {
    this.allMembers =  this.allEmployee.filter(item=>{
      return item.FIRST_NAME2.toLowerCase().indexOf(value) > -1
    })
    
  }


  /** On Form Submit */
  submitForm(): void {
    if (this.addCommiteeReportForm.valid) {
      let body = this.addCommiteeReportForm.value;
      let toDay = new Date();
      body.MODIFICATION_DATE = HelperUtil.formatDate(toDay)
      this.homeService.addCommitteeMember(body).subscribe(
        data => {
          this.ui.createMessage('success', 'Added Committe Member Data');
          this.navigateToList();
        },
        error => {

          this.ui.createMessage('error', 'Error While Committe Member Data')

        }
      )
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }




  /** When cancel button click */
  cancel(): void {

    this.router.navigate(['..'], { relativeTo: this.route })
  }
  /**Navigate to list on cancel */

  navigateToList() {

    this.router.navigate(['..'], { relativeTo: this.route })
  }

  
}

