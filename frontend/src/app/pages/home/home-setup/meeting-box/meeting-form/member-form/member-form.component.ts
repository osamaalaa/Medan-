import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MEMBER_VALIDATION_MESSAGES } from "./member-form.validations"
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss'],
})
export class MemberFormComponent implements OnInit {

  lang:string;

  addCommiteeMemberReportForm: FormGroup;

  isDataLoading: boolean = false;

  allMembers: any = [];

  allMembersSaved: any = [];

  validation_messages: any = MEMBER_VALIDATION_MESSAGES;

  @Input('EMPLOYEE_ID') EMPLOYEE_ID_VALUE;
  @Input() usersRole = []
  @Input() COMMITTEE_ID

  constructor(
    private _fb: FormBuilder,
    private homeService: HomeService,
    private route: ActivatedRoute,
    public translate: TranslateService

  ) {  }

  ngOnInit() {
    this.createForm();
    this.getSingleCommitteeData();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }

  /** Create Form add Members*/
  createForm(): void {
    this.addCommiteeMemberReportForm = this._fb.group({
      COMMITTEE_MEMBERS_ID: [null]
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

  get COMMITTEE_MEMBERS_ID() {
    return this.addCommiteeMemberReportForm.controls.COMMITTEE_MEMBERS_ID
  }
  /**Committee Members Data */
  getSingleCommitteeData() {
    this.isDataLoading = true;
    this.homeService.getCommitteeMembers(this.COMMITTEE_ID).subscribe(data => {
      this.allMembers = data.rows
      console.table(data.rows)
      this.allMembersSaved = data.rows
      this.isDataLoading = false;
    })
  }
  /**search commitee members */
  searchCommiteeMember(value: string): void {
    this.allMembers = this.allMembersSaved.filter(item => {
      return item.FIRST_NAME2.toLowerCase().indexOf(value) > -1
    })

  }

}
