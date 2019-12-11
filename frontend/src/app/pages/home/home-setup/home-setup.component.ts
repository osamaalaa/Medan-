import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CONSTANTS } from 'src/app/services/constants.service';


@Component({
  selector: 'app-home-setup',
  templateUrl: './home-setup.component.html',
  styleUrls: ['./home-setup.component.scss'],
  
})

export class HomeSetupComponent implements OnInit {
  isDataLoading: boolean = false
  EMPLOYEE_ID: string | number;

  homeCount: [] = [];

  constructor(
    private homeService: HomeService,
  
    private ui: UIService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.homepagecount();

  }


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
