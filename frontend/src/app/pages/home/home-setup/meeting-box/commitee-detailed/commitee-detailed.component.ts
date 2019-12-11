import { Component, OnInit, Input } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commitee-detailed',
  templateUrl: './commitee-detailed.component.html',
  styleUrls: ['./commitee-detailed.component.scss']
})

export class CommiteeDetailedComponent implements OnInit {

  isDataLoading: boolean = false;

  COMMITTEE_ID: any;
   
  CommiteeName: any = [];

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    private route: ActivatedRoute,
    public router: Router

  ) {
    this.fetchCommitteId();
  }

  ngOnInit() {
    this.getCommitteeName();
  }

  /**Get Committee Id  */
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID'];
  }

   /**Get All Commite Members Data  */
  getCommitteeName(): void {
    this.isDataLoading = true
    this.homeService.getCommitteeMembers(this.COMMITTEE_ID).subscribe(
      data => {
       this.CommiteeName =data.rows[0]
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting committee  : ' + error.error.message)
      },
    )
  }

  navigateToList() {
    this.router.navigate(['/medan/home'], { relativeTo: this.route })
  }

}
