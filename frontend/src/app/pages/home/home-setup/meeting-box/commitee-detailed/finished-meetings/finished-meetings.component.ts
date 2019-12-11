import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { FinishedMeetingsModelService } from './finished-meetings.model.services';

@Component({
  selector: 'app-finished-meetings',
  templateUrl: './finished-meetings.component.html',
  styleUrls: ['./finished-meetings.component.scss'],
  providers: [FinishedMeetingsModelService]
})
export class FinishedMeetingsComponent implements OnInit {
  isDataLoading: boolean = false;

  COMMITTEE_ID: any;
  
  searchText: string = "";

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    private route: ActivatedRoute,
    public router: Router,
    public finishedMeetingsModelService: FinishedMeetingsModelService
  ) {
    this.fetchCommitteId();

  }

  ngOnInit() {
    this.getFinishedMeetings();
  }

  /**Get Committee Id  */
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID'];
  }

  /**Get Finished Meetings  Details   */
  getFinishedMeetings(): void {
    this.isDataLoading = true
    this.homeService.getAllFinishedMeetings(this.COMMITTEE_ID).subscribe(
      data => {
        this.finishedMeetingsModelService.savedData = data.rows
        this.finishedMeetingsModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting finished : ' + error.error.message)
      },
    )
  }
   /** Search Items against search text*/
 searchItems(): void {
     
  this.finishedMeetingsModelService.searchItems(this.searchText)
}
 
}
