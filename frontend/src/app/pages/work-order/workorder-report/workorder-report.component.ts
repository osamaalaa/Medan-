
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { WORK_ORDER_VALIDATION_MESSAGES } from './workorder-report.validations.messages';

@Component({
  selector: 'app-workorder-report',
  templateUrl: './workorder-report.component.html',
  styleUrls: ['./workorder-report.component.scss']
})
export class WorkorderReportComponent implements OnInit {
  
  
 // getWorkOrdersList: any[] = [];
 createWorkorderForm: FormGroup;

   validation_messages: any = WORK_ORDER_VALIDATION_MESSAGES;
  constructor(private _fb: FormBuilder
   ) { }

  ngOnInit() {
    this.createForm()
  }
 /** Create Form */
 createForm(): void {
  this.createWorkorderForm = this._fb.group({
     START_DATE: [null],
     END_DATE:[null],
     Project_Name: [null, [Validators.required]],
     BOQ_Description:[null,[Validators.required]],
     Milestone_Name:[null,[Validators.required]],
     Member_Name:[null,[Validators.required]],
  
  });
}
 get Project_Name() {
  return this.createWorkorderForm.controls.Project_Name;
 }
 get BOQ_Description() {
  return this.createWorkorderForm.controls.BOQ_Description;
}
 get Milestone_Name() {
  return this.createWorkorderForm.controls.Milestone_Name;
}
get Member_Name() {
  return this.createWorkorderForm.controls.Member_Name;
}

submitForm(){
  
}

}
