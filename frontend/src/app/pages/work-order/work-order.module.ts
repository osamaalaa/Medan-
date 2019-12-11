import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module'
import { WorkOrderRouterModule } from './work-order-routing.module'
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { ChartistModule } from 'ng-chartist'
import { NvD3Module } from 'ng2-nvd3'
import { WorkorderReportComponent } from './workorder-report/workorder-report.component';
import { IncidentReportReslover } from './work-order.resolves';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { IncidentReportFormComponent } from './incident-report/incident-report-form/incident-report-form.component';
import { OpenIncidentComponent } from './incident-report/open-incident/open-incident.component';
import { IncidentReportDataComponent } from './incident-report/incident-report-data/incident-report-data.component';
import { ViewIncidentReportComponent } from './incident-report/incident-report-data/view-incident-report/view-incident-report.component';
import { AddIncidentReportComponent } from './incident-report/add-incident-report/add-incident-report.component';

const COMPONENTS = [
  IncidentReportComponent,
  IncidentReportFormComponent,
  OpenIncidentComponent,
  IncidentReportDataComponent,
  ViewIncidentReportComponent,
  WorkorderReportComponent,
]
const PROVIDERS = [
  IncidentReportReslover
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    WorkOrderRouterModule,
    CleanUIModule,
    FormsModule,
    ReactiveFormsModule,
    ChartistModule,
    NvD3Module,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [...COMPONENTS, AddIncidentReportComponent],
  providers: [...PROVIDERS],
})
export class WorkOrderModule { }