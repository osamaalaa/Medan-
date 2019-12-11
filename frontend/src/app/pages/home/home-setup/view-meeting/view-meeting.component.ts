import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { ViewMeetingService, ROLES } from './view-meeting.service';

@Component({
  selector: 'app-view-meeting',
  templateUrl: './view-meeting.component.html',
  styleUrls: ['./view-meeting.component.scss'],
  providers:[ViewMeetingService]
})
export class ViewMeetingComponent implements OnInit {

  /**Storing MEETING_ID */
  meetingId: number;

  isManager:boolean;
  isMember:boolean;
  isBoardViewMember:boolean;

  /**Storing Meeting Description */
  resDescription: any;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private viewMeetingService:ViewMeetingService
  ) {
    this.getMeetingId();
    this.initializeViewMeeting();
  }

  
  initializeViewMeeting(){
      //fetch the view meeting api
      this.homeService.getDetailsById(this.meetingId).subscribe(data => {
        let viewMeetingData = data.rows[0];
        this.viewMeetingService.setData(viewMeetingData);
        this.resDescription = this.viewMeetingService.getData().MEETING_DESCRIPTION;
      })


       this.viewMeetingService.getRole().subscribe(role=>{
        this.isManager = role == ROLES.MANAGER;
        this.isMember = role == ROLES.MEMBER;
        this.isBoardViewMember = role == ROLES.BOARD_MEMBER;
      });
  }

  ngOnInit() {
  }
  
  /**Getting the meetingId */
  public getMeetingId() {
    this.meetingId = this.route.snapshot.params['MEETING_ID'];
  }

  refreshResolution(){
    this.viewMeetingService.refreshResolution$.next({alert: 'waking-up'});
  }

  navigateToScreenSharing() {
    this.viewMeetingService.navigate.next({alert: 'waking-up'});
  }

}
