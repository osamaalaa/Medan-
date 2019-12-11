import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from 'src/app/services/workorder.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { OpenIncidentModelService } from './open-incident.model.service';

@Component({
  selector: 'app-open-incident',
  templateUrl: './open-incident.component.html',
  styleUrls: ['./open-incident.component.scss'],
  providers: [OpenIncidentModelService]
})
export class OpenIncidentComponent implements OnInit {

  EMPLOYEE_ID: any;

  isDataLoading: boolean = false;

  searchText: string = "";

  constructor(
    private workOrderService: WorkOrderService,
    private ui: UIService,
    private route: ActivatedRoute,
    public openIncidentModelService: OpenIncidentModelService
  ) {
  }

  ngOnInit() {
    this.getIncidentData();
  }

  /**Getting   Incident Report Data*/
  getIncidentData(): void {
    this.isDataLoading = true;
    this.workOrderService.getIncidentData().subscribe(
      data => {
        this.openIncidentModelService.displayData = data.rows
        this.openIncidentModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Incident All : ' + error.error.message)
      },
    )
  }
  /** Search  text*/
  searchItems(): void {
    this.openIncidentModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.openIncidentModelService.sortData(sort)
  }
}
