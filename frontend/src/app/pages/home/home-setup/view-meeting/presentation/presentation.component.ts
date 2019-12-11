import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import { ViewMeetingService } from '../view-meeting.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss']
})
export class PresentationComponent implements OnInit {

  /**Storing Format of file */
  presentaionAttachFormat;

  /**Storing Attachment */
  presentationFile;

  /**Storing MEETING_ID */
  MEETING_ID: number;

  /**Storing EMPLOYEE_ID */
  EMPLOYEE_ID: number;

  /**Storing Presentation Comments */
  preComments: any = [];

  /**Storing the Presentation Comments Length */
  preCommentsLength: any;

  /**Presentation comment textarea [(ngModel)] */
  inputValuePresentaion = '';

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private viewMeetingService: ViewMeetingService
  ) {
    this.getUserDetails();
    this.getMeetingId();
  }

  ngOnInit() {
    this.getPresentationAttachment();
    this.getPresentationComment();
  }

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  /**Getting Employee Id*/
  public getUserDetails() {
    let USER = this.homeService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID;
  }

  /**Getting Agenda Attachment */
  public getPresentationAttachment() {
    this.homeService.getPresentatioinAttachment(this.MEETING_ID).subscribe(data => {
      if (data.rows.length != 0) {
        this.presentationFile = data.rows[0].FILE_NAME;
        let format = this.presentationFile.split(".");
        this.presentaionAttachFormat = format[4];
      } else {
        console.log('no image on this meeting')
      }
    })
  }

  totalPagesPresentation: 0;
  pagePresentation: 1;

  afterLoadCompletePresentation(pdfData: any) {
    this.totalPagesPresentation = pdfData.numPages;
  }

  agenda_id;
  /**Getting Presentation Comments */
  public getPresentationComment() {

    this.homeService.getPresentationByMeeting(this.MEETING_ID).pipe(
      flatMap(data => {
        this.agenda_id = data.rows[0].MEETING_AGENDA_ID
        return this.homeService.getPresentationComments(this.agenda_id)
      })
    ).subscribe(
      results => {
        if (results.rows.length != 0) {
          this.preComments = results.rows
        } else {
          console.log('no presentation comments available')
        }
      }
    )
  }

  /**Presentation insert comment */
  public preSendComment() {
    let body2 =
    {
      employee_id: this.EMPLOYEE_ID,
      minutes_id: '',
      agenda_id: this.agenda_id,
      user_comments: this.inputValuePresentaion
    };
    this.inputValuePresentaion = '';
    this.homeService.addcommentsdata(body2).subscribe(comment => {
      let body = { USER_COMMENTS: comment.rows.R_user_comments, FIRST_NAME_EN: comment.Employee_Name.FIRST_NAME2, SECOND_NAME_EN: comment.Employee_Name.S_SECOND_NAME, CREATION_DATE: comment.Creation_Date.CREATION_DATE }
      this.preComments = [...this.preComments, body];
    });
  }

}
