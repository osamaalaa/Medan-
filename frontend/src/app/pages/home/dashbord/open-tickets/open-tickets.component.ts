import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DashBordSetupModelService } from '../dashbord.model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CONSTANTS } from 'src/app/services/constants.service';

@Component({
  selector: 'app-open-tickets',
  templateUrl: './open-tickets.component.html',
  styleUrls: ['./open-tickets.component.scss']
})
export class OpenTicketsComponent implements OnInit {
  isDataLoading: boolean = false
  EMPLOYEE_ID: string | number;
  PROJECT_ID: string | number;
  work_order_id: string | number;
  WORK_ORDER_OWNER: string | number;
  CREATED_BY: string | number;
  USER: any;

  constructor(
    private homeService: HomeService,
    public dashBordSetupModelService: DashBordSetupModelService,
    private ui: UIService,
    private route: ActivatedRoute
  ) {
    this.getUserDetails();
  }

  ngOnInit() {
    this.OpenTickets();
  }
  /**Getting Employee Id*/
  getUserDetails() {
    this.USER = this.homeService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(this.USER).EMPLOYEE_ID;
  }

  OpenTickets(): void {
    this.isDataLoading = true
    this.homeService.getOpenTickets(this.EMPLOYEE_ID).subscribe(
      data => {
        this.dashBordSetupModelService.displayData = data.rows
        this.dashBordSetupModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting open tickets : ' + error.error.message)
      },
    )
  }
}

