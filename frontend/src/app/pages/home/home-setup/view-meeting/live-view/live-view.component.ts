import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ViewMeetingService } from '../view-meeting.service';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.scss']
})
export class LiveViewComponent implements OnInit, OnDestroy {

  /**Storing MEETING_ID */
  MEETING_ID: number;

  /**create room button hide/show */
  shareButtonHide: boolean;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private router: Router,
    private viewMeetingService: ViewMeetingService
  ) {
    this.getMeetingId();
    this.getActiveShare();
  }
  
  ngOnInit() {
    this.navigationListener();
  }

  /**Event driven subscription (listening) */
  navigate: Subscription;
  navigationListener() {
    this.navigate = this.viewMeetingService.getNavigate().subscribe(data => {
      this.router.navigate(['screensharing'], { relativeTo: this.route })
    })
  }

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  

  /**Getting status of sharing */
  public getActiveShare() {
    this.homeService.getActiveSharing().subscribe(data => {
      this.shareButtonHide = false;
      if (data.rows.length != 0) {
        let activeStatus = data.rows;
        // console.log('===>', activeStatus.length)
        for (var i=0; i>activeStatus.length; i++) {
          if (this.MEETING_ID == activeStatus[i].MEETING_ID) {
            this.shareButtonHide = false;
          } else {
            console.log('not matching meetingid')
          }
        }
      } else {
        this.shareButtonHide = true;
        console.log('no sharings')
      }
      
    })
  }

  ngOnDestroy() {
    if (this.navigate) {
      this.navigate.unsubscribe()
    }
  }

}
