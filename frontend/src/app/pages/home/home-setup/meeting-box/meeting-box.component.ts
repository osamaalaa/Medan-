import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CONSTANTS } from 'src/app/services/constants.service';
import { MeetingBoxService, ROLES } from './meeting-box.service';

@Component({
  selector: 'app-meeting-box',
  templateUrl: './meeting-box.component.html',
  styleUrls: ['./meeting-box.component.scss'],
  providers: [MeetingBoxService]
})
export class MeetingBoxComponent implements OnInit {

  isManager: boolean;

  isMember: boolean;

  isBoardViewMember: boolean;
  
  constructor(
    private meetingBoxService: MeetingBoxService
  ) {

    this.initializeRole();

  }

  ngOnInit() {
  }


  /**Getting Employee Roles*/
  initializeRole() {
    this.meetingBoxService.getRole().subscribe(role => {

      this.isManager = role == ROLES.MANAGER;

      this.isMember = role == ROLES.MEMBER;

      this.isBoardViewMember = role == ROLES.BOARD_MEMBER;
    })
  }

}