import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ViewMeetingService } from '../view-meeting.service';
import { Subscription } from 'rxjs';
enum ARRPOVAL_STATUS {
  MOM = 1,
  PRESENTATION = 2
}

@Component({
  selector: 'app-resolutions',
  templateUrl: './resolutions.component.html',
  styleUrls: ['./resolutions.component.scss']
})
export class ResolutionsComponent implements OnInit, OnDestroy {

  /**Storing the Meeting Data */
  meetingData: any;

  /**Storing MEETING_ID */
  MEETING_ID: number;

  /**Storing Format of Resolutions */
  resolutionsAttachFormat: any;

  /**Storing Resolutions Attachment */
  resolutionsAttach: any;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private viewMeetingService: ViewMeetingService
  ) {
    this.getMeetingId();
    this.getMeetingStatus();
  }

  ngOnInit() {
    this.getApproveStatus();
    this.minutesOfMeetingApprovalListener();
  }

  /**Event driven subscription (listening) */
  refreshResolution: Subscription;
  minutesOfMeetingApprovalListener() {
    this.refreshResolution = this.viewMeetingService.getRefreshResolution().subscribe(data => {
      this.getMeetingStatus();
      this.getApproveStatus();
    })
  }

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  /**Getting MEETING_DATA from meeting Table */
  public getMeetingStatus() {
    this.homeService.getDetailsById(this.MEETING_ID).subscribe(data => {
      if (data.rows.length != 0) {
        this.meetingData = data.rows[0];
        console.log(this.meetingData.STATUS)
      } else {
        console.log('no meeting status');
      }
    })
  }

  USER: any;
  msg: any;
  /**Getting Approve status */
  public getApproveStatus() {
    this.USER = this.homeService.getEmployeeId();
    let EMPLOYEE_ID = JSON.parse(this.USER).EMPLOYEE_ID
    this.homeService.getApproveStatus(ARRPOVAL_STATUS.MOM, EMPLOYEE_ID, this.MEETING_ID).subscribe(data => {
      this.msg = data.message;
      if (this.msg == 1) {
        this.homeService.getMomAttachmentFile(this.MEETING_ID).subscribe(data => {
          this.resolutionsAttach = data.rows[0].FILE_NAME;
          let format = this.resolutionsAttach.split(".");
          this.resolutionsAttachFormat = format[4];
        })
      } else {
      }
    })
  }

  totalPagesResolution: 0;
  pageResolution: 1;

  afterLoadCompleteResolution(pdfData: any) {
    this.totalPagesResolution = pdfData.numPages;
  }

  ngOnDestroy() {
    if (this.refreshResolution) {
      this.refreshResolution.unsubscribe()
    }
  }

}
