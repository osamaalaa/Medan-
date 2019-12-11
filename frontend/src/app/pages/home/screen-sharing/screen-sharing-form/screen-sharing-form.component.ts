import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SkylinkTS } from '../skylinkTS';
import { HomeService } from '../../../../services/home.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-screen-sharing-form',
  templateUrl: './screen-sharing-form.component.html',
  styleUrls: ['./screen-sharing-form.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ScreenSharingFormComponent implements OnInit {
  private skyLinkTS: SkylinkTS;
  MEETING_ID: any;
  fromJoinComponent: boolean = true;
  shareButton: boolean;
  stopButton: boolean;

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
  ) {
    this.getMeetingId();

    this.skyLinkTS = new SkylinkTS({
      'appKey': environment.TEMASYS.appKey,
      'appKeySecret': environment.TEMASYS.secret,
      'defaultRoom': this.MEETING_ID,
      'audio': false,
      'video': false,
      'enableDataChannel': true,
      'enableIceTrickle': true,
      'audioFallback': false,
      'forceSSL': false,
      'localVideoContainerElId': 'localVideoContainer',
      'remoteContainerElId': 'remoteContainer',
      'downloadLinkContainerElId': 'downloadLinkContainer',
      'chatUserListElId': 'chatUserListContainer',
      'chatMessagesContainerId': 'chatMessagesContainer',
      'messageInputElId': 'messageInput',
      'sendChatMessageBtnElId': 'sendChatMessageBtn'
    });

    this.getActiveShare();
  }

  showLoader;
  ngOnInit() {
    this.fromJoinComponent = this.route.snapshot.queryParams.join == 'true';
    this.showLoader = this.fromJoinComponent;
    this.joinRoom();
    setTimeout(() => {
      this.showLoader = false;
    }, 5000)
  }

  getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  public joinRoom() {
    this.skyLinkTS.joinRoom();
  }

  public shareScreen() {
    this.skyLinkTS.shareScreen();
    let body = '';
    let active = 'active';
    this.homeService.insertActiveScreenShare(this.MEETING_ID, active, body).subscribe(data => {
      this.shareButton = false;
      this.stopButton = true;
    });
  }

  public stopScreen() {
    this.skyLinkTS.stopScreen();
    let body = '';
    let notActive = 'not active'
    this.homeService.insertActiveScreenShare(this.MEETING_ID, notActive, body).subscribe(data => {
      this.stopButton = false;
      this.shareButton = true;
    });
  }

  public leaveRoom() {
    this.skyLinkTS.leaveRoom();
  }

  /**Getting status of sharing */
  public getActiveShare() {
    this.homeService.getDetailsById(this.MEETING_ID).subscribe(data => {
      if (data.rows[0].ACTIVE_SHARING == 0) {
        this.shareButton = true;
        this.stopButton = false;
      } else {
        this.shareButton = false;
        this.stopButton = true;
      }
    })
  }

  createRoom() {
    let body = '';
    let active = 'active';
    this.homeService.insertActiveScreenShare(this.MEETING_ID, active, body).subscribe();
  }

}
