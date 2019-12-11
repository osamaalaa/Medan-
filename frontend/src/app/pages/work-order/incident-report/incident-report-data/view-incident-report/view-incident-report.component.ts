
import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from 'src/app/services/workorder.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UIService } from 'src/app/services/ui.service';

@Component({

  selector: 'app-view-incident-report',
  templateUrl: './view-incident-report.component.html',
  styleUrls: ['./view-incident-report.component.scss'],

})
export class ViewIncidentReportComponent implements OnInit {

  INC_REQUEST_ID: any;

  isDataLoading: boolean = false;

  incidentReport: any = [];

  PROJECT_ID: any;

  constructor(
    private route: ActivatedRoute,
    private workOrderService: WorkOrderService,
    private ui: UIService,
    private router: Router
  ) {
    this.getIncidentReportById();
  }

  ngOnInit() { }

  /**Getting   Incident Report  By Id*/
  getIncidentReportById(): void {
    this.incidentReport = this.route.snapshot.data['incidentReportData'].rows[0];
    this.PROJECT_ID = this.incidentReport.PROJECT_ID;
    this.INC_REQUEST_ID = this.incidentReport.INC_REP_REQUEST_ID;
    
  }
  
    /** On Add New Incident Data */
  addNewIncident(formData: any): void {
    this.workOrderService.addNewIncident(formData).subscribe(
       data => {
        let incidentBody = { INC_REP_REQUEST_ID: this.INC_REQUEST_ID}
        this.workOrderService.insertIncidentStatus(incidentBody).subscribe(
          data => {
            this.navigateToList();
          }
        )
         this.ui.createMessage('success', 'Added Incident Data');
        
       },
       error => {
 
         this.ui.createMessage('er ror', 'Error While adding Incident Data')
 
       }
     )
   }
    /**Navigate to list on cancel */
    navigateToList(): void {
     this.router.navigate(['..'], { relativeTo: this.route })
   }
  
}
