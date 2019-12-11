import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ActiveMeetingsModelService } from './active-meetings.model.service';
import { MeetingBoxService, ROLES } from '../../meeting-box.service';

@Component({
  selector: 'app-active-meetings',
  templateUrl: './active-meetings.component.html',
  styleUrls: ['./active-meetings.component.scss'],
  providers: [ActiveMeetingsModelService,MeetingBoxService]
})
export class ActiveMeetingsComponent implements OnInit {
  isDataLoading: boolean = false;

  COMMITTEE_ID: any;

  isManager: boolean;

  isMember: boolean;

  isBoardViewMember: boolean;

   searchText: string = "";

   CommiteeName:any [];

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    private route: ActivatedRoute,
    public router: Router,
    public activeMeetingsModelService: ActiveMeetingsModelService,
    private meetingBoxService: MeetingBoxService
  ) {
    this.initializeRole();
    this.fetchCommitteId();
  }

  ngOnInit() {
    this.getActiveMeetings();
  }
 
 /**Getting Employee Roles*/
  initializeRole() {
    this.meetingBoxService.getRole().subscribe(role => {
      this.isManager = role == ROLES.MANAGER;
      this.isMember = role == ROLES.MEMBER;
      this.isBoardViewMember = role == ROLES.BOARD_MEMBER;
    })
  }

  /**Get Committee Id  */
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID'];
  }

  /**Get activeMeetings  Details By Id  */
  getActiveMeetings(): void {
    this.isDataLoading = true
    this.homeService.getAllActiveMeetings(this.COMMITTEE_ID).subscribe(
      data => {
        this.activeMeetingsModelService.savedData = data.rows
        this.activeMeetingsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting activeMeetings : ' + error.error.message)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {

    this.activeMeetingsModelService.searchItems(this.searchText)
  }

}
