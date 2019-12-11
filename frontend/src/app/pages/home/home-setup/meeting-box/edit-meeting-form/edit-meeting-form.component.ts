import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { NzInputModule } from 'ng-zorro-antd/input';
import { forkJoin, Observable, Observer } from 'rxjs';
import { EDIT_MEETING_REPORT_VALIDATION_MESSAGES } from "./edit-meeting-report-form-validations.messages"
import { HelperUtil } from 'src/app/common/Helper.Util';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
enum Upload_Value {
  minutesofMeetingId = 2,
  presentationUploadId = 1
}


@Component({
  selector: 'app-edit-meeting-form',
  templateUrl: './edit-meeting-form.component.html',
  styleUrls: ['./edit-meeting-form.component.scss']
})
export class EditMeetingFormComponent implements OnInit {
  meetingReporteditForm: FormGroup;
  
  COMMITTEE_ID: any;

  validation_messages: any = EDIT_MEETING_REPORT_VALIDATION_MESSAGES;

  meetingFormData: any;

  START_TIME_STR: any;

  END_TIME_STR: any;

  MEETING_AGENDA_ID: any;

  EMPLOYEE_ID: any;

  displayList = [{ name: 'attachment' }];

  MOM_ID: any;

  uploadeAge: boolean = true;

  uploadeMom: boolean = false;

  MEETING_ID: any;

  previousMomId: any;

  activeMomAttachFile: boolean = false;

  constructor(
    private homeService: HomeService,
    private _fb: FormBuilder,
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private handler: HttpBackend
  ) {

    this.getUserDetails();
    this.getHomeDetailsData();
    this.fetchMeetingData();
    this.getMomIdBasedOnMeetingId();
  }

  ngOnInit() {
    this.createForm();
  }
  /**Getting Mom Id */
  getMomIdBasedOnMeetingId() {
    this.homeService.getMomIdBasedOnMeetingId(this.MEETING_ID).subscribe(data => {
      if (data.rows.length == 0) {
        this.activeMomAttachFile = false;
      } else {
        this.previousMomId = data.rows[0].MOM_ID;
        this.activeMomAttachFile = true;
      }
    })
  }

  fetchMeetingData(): void {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.homeService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID;
  }
  /**Get Active Detailed Data  */
  private getHomeDetailsData(): void {
    this.meetingFormData = this.route.snapshot.data['homeIdDetails'].rows[0];
    var start = this.meetingFormData.START_TIME_STR.split(":");
    this.START_TIME_STR = new Date();
    this.START_TIME_STR.setHours(start[0]);
    this.START_TIME_STR.setMinutes(start[1])
    var end = this.meetingFormData.END_TIME_STR.split(":");
    this.END_TIME_STR = new Date();
    this.END_TIME_STR.setHours(end[0]);
    this.END_TIME_STR.setMinutes(end[1]);

  }
  /** Create Form */
  createForm(): void {
    this.meetingReporteditForm = this._fb.group({
      COMMITTEE_ID: [this.COMMITTEE_ID],
      MEETING_DATE: [{ value: this.meetingFormData.MEETING_DATE, disabled: "true" }],
      MEETING_DESCRIPTION: [{ value: this.meetingFormData.MEETING_DESCRIPTION, disabled: "true" }],
      LOCATION: [{ value: this.meetingFormData.LOCATION, disabled: "true" }],
      START_TIME_STR: [{ value: this.START_TIME_STR, disabled: "true" }],
      END_TIME_STR: [{ value: this.END_TIME_STR, disabled: "true" }],
    })
  }

  public updateForm() {
    this.homeService.deleteUploadFile(this.meetingFormData.MEETING_ID, '').subscribe(data => {
      if (data.message == "successed") {
        let meetingBody = { MEETING_ID: this.meetingFormData.MEETING_ID, DESCRIPTION: this.meetingFormData.MEETING_DESCRIPTION }
        this.homeService.getMeetingAgendaId(meetingBody).subscribe(agendaId => {
          this.MEETING_AGENDA_ID = agendaId.rows.R_MEETING_AGENDA_ID;
        })
      }
    })

  }

  /** Update in Presentations Meeting */
  fileList = [];
  uploading: boolean = false;
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  fileName: any;
  presentationsUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      this.fileName = file.name;

    });
    this.uploading = true;
    var url = `${environment.INVENTORY_API_URL}/webResources/uploadFile/${Upload_Value.presentationUploadId}/${this.MEETING_AGENDA_ID}/${this.EMPLOYEE_ID}?file`
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers
    });
    http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          this.msg.success('Meeting Updated Successfully.');
          this.navigateToList();
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }

  /** Minutes of Meeting in  */
  uploadingMom: boolean = false;
  public getMeetingMomId() {
    let meetingBody = { MEETING_ID: this.meetingFormData.MEETING_ID, DESCRIPTION: this.meetingFormData.MEETING_DESCRIPTION }
    this.homeService.getMeetingMomId(meetingBody).subscribe(agendaId => {
      this.MOM_ID = agendaId.rows.R_mom_ID;
    })
  }

  /** Minutes of Meeting in uploade file */
  fileListMom = [];
  beforeUploadMom = (file: UploadFile): boolean => {
    this.fileListMom = this.fileListMom.concat(file);
    return false;
  };
  fileNameMom: any;
  minutesUpload(): void {
    const formData = new FormData();
    this.fileListMom.forEach((file: any) => {
      formData.append('file', file);
      this.fileNameMom = file.name;

    });
    this.uploadingMom = true;
    var url = `${environment.INVENTORY_API_URL}/webResources/uploadFile/${Upload_Value.minutesofMeetingId}/${this.MOM_ID}/${this.EMPLOYEE_ID}?file`
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers
    });
    http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        async () => {
          this.uploadingMom = false;
          this.fileListMom = [];
          let body = '';
          if (this.previousMomId != undefined) {
            await this.homeService.deleteMom(this.previousMomId, body).subscribe(data => {
              this.msg.success('Meeting Updated Successfully.');
              this.navigateToList();
            })
          } else {
            this.navigateToList();
          }

        },
        () => {
          this.uploadingMom = false;
          this.msg.error('upload failed.');
        }
      );
  }

  public uploadInAgenda() {
    this.uploadeAge = true;
    this.uploadeMom = false;
  }

  public uploadInMintus() {
    this.uploadeAge = false;
    this.uploadeMom = true;
  }


  /** When cancel button click */
  cancel(): void {
    
    this.router.navigate(['/medan/home'], { relativeTo: this.route })
  }
  /**Navigate to list on cancel */

  navigateToList() {

    this.router.navigate(['/medan/home'], { relativeTo: this.route })
  }

}
