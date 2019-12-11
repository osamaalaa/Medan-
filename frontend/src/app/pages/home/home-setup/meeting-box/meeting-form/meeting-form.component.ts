import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { forkJoin, Observable, Observer } from 'rxjs'
import { MEETING_REPORT_VALIDATION_MESSAGES } from './meeting-report-form.validations.messages'
import { HelperUtil } from 'src/app/common/Helper.Util'
import { ActivatedRoute, Router } from '@angular/router'
import { NzMessageService, NzModalService } from 'ng-zorro-antd'
import { NzUploadModule } from 'ng-zorro-antd/upload'
import { UploadXHRArgs, UploadFile } from 'ng-zorro-antd'
import {
  HttpRequest,
  HttpResponse,
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpParams,
  HttpHeaders,
  HttpBackend,
} from '@angular/common/http'
import { filter } from 'rxjs/operators'
import { CONSTANTS } from 'src/app/services/constants.service'
import { environment } from 'src/environments/environment'
import { MemberFormComponent } from './member-form/member-form.component'
import { TranslateService } from '@ngx-translate/core'

enum Upload_Value {
  AgendaUploadId = 1,
  PresentationUploadId = 1,
}
@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.scss'],
})
export class MeetingFormComponent implements OnInit {
  lang: any

  EMPLOYEE_ID: any

  COMMITTEE_ID: any

  isDataLoading: boolean = false

  allCommitteMembersDiv: boolean = false

  addCommitteMembersDiv: boolean = false

  committeeMembers = []

  PROJECT: any

  commitee: any

  meetingReportForm: FormGroup

  addCommiteeMemberReportForm: FormGroup

  validation_messages: any = MEETING_REPORT_VALIDATION_MESSAGES

  MEETING_AGENDA_ID: any

  MEETING_ID: number

  meetingMembersDisplay: boolean = true

  MEETING_PRESENTATION_ID: any

  singleCommiteeMember: any[]

  singleCommittee: boolean

  allCommittee: boolean

  constructor(
    private homeService: HomeService,
    private _fb: FormBuilder,
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private modalService: NzModalService,
    private handler: HttpBackend,
    private translate: TranslateService,
  ) {
    this.fetchCommitteId()
    this.getUserDetails()
    this.getAllLookups()
  }

  @Input() formData = null
  @Output() onSubmit = new EventEmitter()
  @Output() onCancel = new EventEmitter()
  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.homeService.getEmployeeId()
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID
  }

  /**Getting Committe Id*/
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID']
  }

  // *--------- lookups --------------* //
  isfetchingLookup: boolean = false
  projectsList: any = []
  usersList: any = []
  usersRole: any = []
  getAllLookups() {
    this.isfetchingLookup = true
    forkJoin([
      this.homeService.getcommiteeById(this.COMMITTEE_ID),
      this.homeService.getAllUsers(),
      this.homeService.getLookUps(CONSTANTS.LOOKUPS.MEMBER_ROLE),
    ]).subscribe(results => {
      this.isfetchingLookup = false
      this.projectsList = results[0].rows
      this.usersList = results[1].rows
      let project_id = this.projectsList[0].PROJECT_ID
      this.PROJECT = project_id
      this.usersRole = results[2].rows
    })
  }

  /** Create Form */
  createForm(): void {
    this.meetingReportForm = this._fb.group({
      COMMITTEE_ID: [this.COMMITTEE_ID],
      MEETING_DATE: [null, [Validators.required]],
      MEETING_DESCRIPTION: [null, [Validators.required]],
      LOCATION: [null, [Validators.required]],
      PROJECT_ID: [null],
      START_TIME_STR: [null, [Validators.required]],
      END_TIME_STR: [null, [Validators.required]],
      MEMBER_ROLE: [null],
      INVITED_FLAG: [null],
      EMPLOYEE_ID: [this.EMPLOYEE_ID],
    })
  }
  get MEETING_DESCRIPTION() {
    return this.meetingReportForm.controls.MEETING_DESCRIPTION
  }
  get LOCATION() {
    return this.meetingReportForm.controls.LOCATION
  }
  get MEETING_DATE() {
    return this.meetingReportForm.controls.MEETING_DATE
  }
  get START_TIME_STR() {
    return this.meetingReportForm.controls.START_TIME_STR
  }
  get END_TIME_STR() {
    return this.meetingReportForm.controls.END_TIME_STR
  }

  /** On Form Submit */
  submitForm(): void {
    if (this.meetingReportForm.valid) {
      let body = this.meetingReportForm.value
      body.PROJECT_ID = this.PROJECT
      body.DESCRIPTION = ''
      body.INVITED_FLAG = CONSTANTS.Meeting.INVITED_Form
      body.START_TIME_STR = HelperUtil.formatDatetime(body.START_TIME_STR)
      body.END_TIME_STR = HelperUtil.formatDatetime(body.END_TIME_STR)
      body.MEMBER_ROLE = CONSTANTS.Login.UserRole
      //console.log("body..." + body);
      this.homeService.addmeetingcommittee(body).subscribe(
        async data => {
          if (data.message == 'succeeded') {
            let meetingBody = { MEETING_ID: data.MeetingID, DESCRIPTION: data.MeetingDescription }
            this.MEETING_ID = data.MeetingID
            await this.homeService.getMeetingAgendaId(meetingBody).subscribe(agendaId => {
              this.MEETING_AGENDA_ID = agendaId.rows.R_MEETING_AGENDA_ID
            })
            await this.homeService
              .getMeetingPresentationId(meetingBody)
              .subscribe(presentationId => {
                this.MEETING_PRESENTATION_ID = presentationId.rows.R_MEETING_AGENDA_ID
              })
          }
        },
        error => {
          this.ui.createMessage('error', 'Error While Committe meeting Data')
        },
      )
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }
  /**Get All Commite Members Details By Id  */
  AllCommitteeMembers(): void {
    this.isDataLoading = true
    this.homeService.getCommitteeMembers(this.COMMITTEE_ID).subscribe(
      data => {
        this.committeeMembers = data.rows
        this.isDataLoading = false
        this.allCommitteMembersDiv = true
        this.meetingMembersDisplay = false
        this.singleCommittee = true
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting  : ' + error.error.message)
      },
    )
  }
  /** Deletes Commite Members */
  deleteCommiteMembers(COMMITTEE_MEMBERS_ID: number | string): void {
    this.homeService.deleteCommiteMembers(COMMITTEE_MEMBERS_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Committe Member successfully Removed')
        this.AllCommitteeMembers()
      },
      error => {
        this.ui.createMessage('error', 'Error while deleting Committe Member ')
      },
    )
  }
  /*......uploade in Agenda tab.....*/
  fileList = []
  uploading: boolean = false
  itemPicture: any
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file)
    return false
  }
  fileName: any
  agendaUpload(): void {
    const formData = new FormData()
    this.fileList.forEach((file: any) => {
      formData.append('file', file)
      this.fileName = file.name
    })
    this.uploading = true
    var url = `${environment.INVENTORY_API_URL}/webResources/uploadFile/${
      Upload_Value.AgendaUploadId
    }/${this.MEETING_AGENDA_ID}/${this.EMPLOYEE_ID}?file`
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'multipart/form-data')
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers,
    })
    http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false
          this.fileList = []
          console.log('age')
          this.msg.success('Meeting Saved Successfully.')
        },
        () => {
          this.uploading = false
          this.msg.error('upload failed.')
        },
      )
  }
  /*......uploade in Presentation tab.....*/
  fileListPre = []
  uploadingPre: boolean = false
  itemPicturePre: any
  beforeUploadPre = (file: UploadFile): boolean => {
    this.fileListPre = this.fileListPre.concat(file)
    return false
  }
  fileNamePre: any
  presentationUpload(): void {
    const formData = new FormData()
    this.fileListPre.forEach((file: any) => {
      formData.append('file', file)
      this.fileNamePre = file.name
    })
    this.uploadingPre = true
    var url = `${environment.INVENTORY_API_URL}/webResources/uploadFile/${
      Upload_Value.PresentationUploadId
    }/${this.MEETING_PRESENTATION_ID}/${this.EMPLOYEE_ID}?file`
    let headers = new HttpHeaders()
    headers.append('Content-Type', 'multipart/form-data')
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers,
    })
    http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploadingPre = false
          this.fileListPre = []
          console.log('pre')
          this.msg.success('Meeting Saved Successfully.')
          this.navigateToList()
        },
        () => {
          this.uploadingPre = false
          this.msg.error('upload failed.')
        },
      )
  }
  /** Adding Members in Meeting  */
  public addMeetingMembers() {
    for (var i = 0; this.committeeMembers.length > i; i++) {
      let commiteeMembers = this.committeeMembers
      if (this.EMPLOYEE_ID != commiteeMembers[i].EMPLOYEE_ID) {
        let body = {
          MEETING_ID: this.MEETING_ID,
          MEMBER_ROLE: commiteeMembers[i].MEMBER_ROLE,
          STATUS: CONSTANTS.AddMemberMeeting.STATUS,
          MAIL_SENT_FLAG: CONSTANTS.AddMemberMeeting.MAIL_SENT_FLAG,
          MEMBER_TYPE: CONSTANTS.AddMemberMeeting.MEMBER_TYPE,
          ATTENDANCE_FLAG: CONSTANTS.AddMemberMeeting.ATTENDANCE_FLAG,
          INVITATION_MAIL_FLAG: CONSTANTS.AddMemberMeeting.INVITATION_MAIL_FLAG,
          EMPLOYEE_ID: commiteeMembers[i].EMPLOYEE_ID,
          SUBSIDIARY_ID: CONSTANTS.AddMemberMeeting.SUBSIDIARY,
          INVITED_FLAG: CONSTANTS.AddMemberMeeting.INVITED_FLAG,
        }
        this.homeService.addCommitteeMemberMeeting(body).subscribe(
          data => {
            this.ui.createMessage('success', 'Added Committe Member in Meeting')
          },
          error => {
            this.ui.createMessage('error', 'Error While Committe Member in Meeting')
          },
        )
      }
    }
  }
  /** When cancel button click */
  cancel(): void {
    this.router.navigate(['/medan/home'], { relativeTo: this.route })
  }
  /**Navigate to list on cancel */
  navigateToList() {
    this.router.navigate(['/medan/home'], { relativeTo: this.route })
  }
  /**add single member model */
  openMemberFormModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Add Member in Meeting',
      nzContent: MemberFormComponent,
      nzComponentParams: {
        COMMITTEE_ID: this.COMMITTEE_ID,
      },
      nzFooter: [
        {
          label: 'Submit',
          onClick: componentInstance => {
            console.log(
              '---->',
              componentInstance.addCommiteeMemberReportForm.value.COMMITTEE_MEMBERS_ID,
            )
            let COMMITTEE_MEMBERS_ID =
              componentInstance.addCommiteeMemberReportForm.value.COMMITTEE_MEMBERS_ID
            this.homeService.getCommiteeMemberById(COMMITTEE_MEMBERS_ID).subscribe(data => {
              this.singleCommiteeMember = data.rows
              this.committeeMembers = [...this.committeeMembers, ...this.singleCommiteeMember]
              this.addCommitteMembersDiv = true
              this.allCommittee = true
              this.meetingMembersDisplay = false
              this.isDataLoading = false
              setTimeout(() => {
                modal.destroy()
              }, 500)
            })
          },
        },
      ],
    })
    // Return a result when closed
    modal.afterClose.subscribe(result => {
      // console.log(result)
    })
  }
  /**call all methods **/
  saveMeeting() {
    this.agendaUpload()
    this.presentationUpload()
    this.addMeetingMembers()
  }
}
