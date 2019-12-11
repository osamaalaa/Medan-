import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { WorkorderReportComponent } from './workorder-report/workorder-report.component';
import { IncidentReportComponent } from './incident-report/incident-report.component';
import { IncidentReportFormComponent } from './incident-report/incident-report-form/incident-report-form.component';
import { ViewIncidentReportComponent } from './incident-report/incident-report-data/view-incident-report/view-incident-report.component';
import { IncidentReportReslover } from './work-order.resolves';
import { AddIncidentReportComponent } from './incident-report/add-incident-report/add-incident-report.component';

const routes: Routes = [

  // {

  //   path: 'report',
  //   component: WorkorderReportComponent,
  //   data: { title: 'work' },
  //   canActivate: [AuthGuard],
  // },
  {

    path: 'incident',
    component: IncidentReportComponent,
    data: { title: 'work' },
    canActivate: [AuthGuard],
  },
  {

    path: 'incident/add',
    component: AddIncidentReportComponent,
    data: { title: 'work' },
    canActivate: [AuthGuard],
  },
  {
    path: 'incident/:INC_REP_REQUEST_ID',
    component: ViewIncidentReportComponent,
    data: { title: 'work' },
    canActivate: [AuthGuard],
    resolve: {
      incidentReportData: IncidentReportReslover
    }
  }
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class WorkOrderRouterModule { }