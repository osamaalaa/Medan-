import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { flatMap } from 'rxjs/operators';

enum APPROVAL_VALUE {
  APPROVE = "1",
  DISSAPPROVE = "2"
}

enum ARRPOVAL_STATUS {
  MOM = 1,
  PRESENTATION = 2
}
@Component({
  selector: 'app-minutes-of-meeting',
  templateUrl: './minutes-of-meeting.component.html',
  styleUrls: ['./minutes-of-meeting.component.scss']
})
export class MinutesOfMeetingComponent implements OnInit {

  /**Storing Format of MOM */
  momAttachFormat: any;

  /**Storing MOM File */
  momAttachment: any;

  /**Storing MEETING_ID */
  MEETING_ID: number;

  /**Storing MOM COMMENTS */
  momComments: any = [];

  /**MOM comment textarea [(ngModel)] */
  inputValueMom = '';

  /**Storing EMPLOYEE_ID */
  EMPLOYEE_ID: number;

  /**Storing MOM_ID of current meeting based on meeting_id */
  globalMomId: any;

  /**Storing Approve button status */
  showApproveButton: boolean = false;

  /**Storing Send button status */
  showSendButton: boolean = false;

  momCommentsLength:any;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
  ) {
    this.getUserDetails();
    this.getMeetingId();
  }

  ngOnInit() {
    this.newMomId();
    this.getMomAttachFile();
    this.getMomComment();
    this.getApproveStatus();
  }

  /**Getting Employee Id*/
  public getUserDetails() {
    let USER = this.homeService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID;
  }

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  /**Get Mom Id based on meetingid */
  newMomId() {
    this.homeService.getMomIdBasedOnMeetingId(this.MEETING_ID).subscribe(data => {
      if (data.rows.length != 0) {
        this.globalMomId = data.rows[0].MOM_ID;
      } else {
        console.log('No MomId in DB')
      }
    })
  }

  /**Getting MOM ATTACHMENT FILE */
  getMomAttachFile() {
    this.homeService.getMomAttachmentFile(this.MEETING_ID).subscribe(data => {
      if (data.rows.length != 0) {
        this.momAttachment = data.rows[0].FILE_NAME;
        let format = this.momAttachment.split(".");
        this.momAttachFormat = format[4];
      } else {
        console.log('no image on this meeting')
      }
    })
  }

  /**Approve Button */
  public approve() {
    let body = { EMPLOYEE_ID: this.EMPLOYEE_ID, AGENDA_ID: '', MINUTES_ID: this.globalMomId }
    this.homeService.insertApproval(body)
      .pipe(flatMap(data => {
        if (data.rows.R_APPROVED == APPROVAL_VALUE.APPROVE) {
          this.showApproveButton = true;
          this.showSendButton = true;
        }
        return this.homeService.reqCloseMeeting(this.MEETING_ID, this.globalMomId)
      }))
      .subscribe(_ => {
        //only do this on final approval
      })
  }

  /**Getting MOM Comments */
  public getMomComment() {
    this.homeService.getAllComments(this.MEETING_ID).subscribe(results => {
      if (results.rows.length != 0) {
        this.momComments = results.rows;
      } else {
        console.log('no minutes-of-meeting comments are available');
      }
    }
    )
  }

  /**MOM insert comment */
  public momSendComment() {
    let body2 = { employee_id: this.EMPLOYEE_ID, minutes_id: this.globalMomId, agenda_id: '', user_comments: this.inputValueMom };
    this.inputValueMom = '';
    this.homeService.addcommentsdata(body2).subscribe(comment => {
      let body1 = { USER_COMMENTS: comment.rows.R_user_comments, FIRST_NAME_EN: comment.Employee_Name.FIRST_NAME2, SECOND_NAME_EN: comment.Employee_Name.S_SECOND_NAME, CREATION_DATE: comment.Creation_Date.CREATION_DATE }
      this.momComments = [...this.momComments, body1];
    });
  }

  /**Getting Approve status */
  public getApproveStatus() {
    this.homeService.getApproveStatus(ARRPOVAL_STATUS.MOM, this.EMPLOYEE_ID, this.MEETING_ID).subscribe(data => {
      let approvalStatus = data.message;
      if (approvalStatus == ARRPOVAL_STATUS.MOM) {
        this.showApproveButton = true;
        this.showSendButton = true;
      } else {
        this.showApproveButton = false;
        this.showSendButton = false;
      }
    })
  }

  /**PDF FOR MOM */
  totalPagesMom: 0;
  pageMom: 1;

  afterLoadCompleteMom(pdfData: any) {
    this.totalPagesMom = pdfData.numPages;
  }

}
