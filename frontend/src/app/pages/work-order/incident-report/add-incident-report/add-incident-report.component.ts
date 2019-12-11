import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WorkOrderService } from 'src/app/services/workorder.service';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-incident-report',
  templateUrl: './add-incident-report.component.html',
  styleUrls: ['./add-incident-report.component.scss']
})
export class AddIncidentReportComponent implements OnInit {

  constructor(
    private workOrderService: WorkOrderService,
    private _fb: FormBuilder,
    private ui: UIService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
  }
   /** On Add New Incident Data */
  addNewIncident(formData: any): void {
   this.workOrderService.addNewIncident(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'Added Incident Data');
        this.navigateToList();
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
