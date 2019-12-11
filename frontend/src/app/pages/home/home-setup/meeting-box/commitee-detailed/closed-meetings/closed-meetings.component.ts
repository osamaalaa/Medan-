import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ClosedMeetingsModelService } from './closed-meetings.model.service';

@Component({
  selector: 'app-closed-meetings',
  templateUrl: './closed-meetings.component.html',
  styleUrls: ['./closed-meetings.component.scss'],
  providers: [ClosedMeetingsModelService]
})
export class ClosedMeetingsComponent implements OnInit {
  isDataLoading: boolean = false;

  COMMITTEE_ID: any;

  searchText: string = "";

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    private route: ActivatedRoute,
    public router: Router,
    public closedMeetingsModelService: ClosedMeetingsModelService
  ) {
    this.fetchCommitteId();

  }

  ngOnInit() {
    this.getClosedMeetings();
  }

  /**Get Committee Id  */
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID'];
  }

  /**Get Closed Meetings  data  */
  getClosedMeetings(): void {
    this.isDataLoading = true;
    this.homeService.getAllClosedMeetings(this.COMMITTEE_ID).subscribe(
      data => {
        this.closedMeetingsModelService.savedData = data.rows
        this.closedMeetingsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Closed Meetings : ' + error.error.message)
      },
    )
  }
  /** Search Items against search text*/
  searchItems(): void {
    this.closedMeetingsModelService.searchItems(this.searchText)
  }
}
