import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DashBordSetupModelService } from './dashbord.model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CONSTANTS } from 'src/app/services/constants.service';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  providers: [DashBordSetupModelService]
})
export class DashbordComponent implements OnInit {

  isDataLoading: boolean = false
  EMPLOYEE_ID: string | number;
  homeCount:any;

  constructor(
    private homeService: HomeService,
    public dashBordSetupModelService: DashBordSetupModelService,
    private ui: UIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.homepagecount();
  }

/****Home Page Count***** */
  homepagecount(): void {
    this.isDataLoading = true
    this.EMPLOYEE_ID = CONSTANTS.LOOKUPS.Count_Id;
    this.homeService.getHomeallcount(this.EMPLOYEE_ID, CONSTANTS.LOOKUPS.PROJECT_MANAGER_ID, CONSTANTS.LOOKUPS.CREATED_BY, CONSTANTS.LOOKUPS.PROJECT_ID, CONSTANTS.LOOKUPS.to_mailbox, CONSTANTS.LOOKUPS.ASSIGN_TO, CONSTANTS.LOOKUPS.WORK_ORDER_OWNER).subscribe(
      data => {
        this.homeCount = data.rows[0];
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting home page : ' + error.error.message)
      },
    )
  }
}
