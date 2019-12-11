import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { NoOfCupsComponent } from 'src/app/pages/reports-list/no-of-cups/no-of-cups.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesForEmployeeComponent } from './activities-for-employee/activities-for-employee.component';
import { ZamzamWaterComponent } from './zamzam-water/zamzam-water.component'
import { CleanEquipmentCountComponent } from './clean-equipment-count/clean-equipment-count.component'
import { ContractorEvaluationComponent } from './contractor-evaluation/contractor-evaluation.component'
import { ContractorInformationComponent } from './contractor-information/contractor-information.component'
import { ItemsUnitComponent } from './items-unit/items-unit.component'
import { WorkPermissionsComponent } from './work-permissions/work-permissions.component';
import { FinesComponent } from './fines/fines.component'
import { WorkPermissionDescComponent } from './work-permission-desc/work-permission-desc.component';
import { MonthIncrementPercentComponent } from './month-increment-percent/month-increment-percent.component'
import { EquipmentMaintenanceComponent } from './equipment-maintenance/equipment-maintenance.component'
import { IncidentsComponent } from './incidents/incidents.component';
import { EmployeesIssuesComponent } from './employees-issues/employees-issues.component';
import { ItemsComponent } from './items/items.component';
import { CleanBasesComponent } from './clean-bases/clean-bases.component';
import { EquipmentOrderComponent } from './equipment-order/equipment-order.component'
import { EquipmentCountComponent } from './equipment-count/equipment-count.component'
import { EquipmentDataComponent } from './equipment-data/equipment-data.component'
import { MaterialsComponent } from './materials/materials.component';
import { ActivitesForOperationsComponent } from './activites-for-operations/activites-for-operations.component';
import { EquipmentMainStatusComponent } from './equipment-main-status/equipment-main-status.component';
import { EquipmentStatusComponent } from './equipment-status/equipment-status.component';
import { ActivitiesAndServicesComponent } from './activities-and-services/activities-and-services.component';
import { WorkOrderComponent } from './work-order/work-order.component'
import { CleanEquipmentFilterComponent } from './clean-equipment-filter/clean-equipment-filter.component'
import { VarianceReportComponent } from './variance-report/variance-report.component'
import { ShiftStatusComponent } from './shift-status/shift-status.component'
import { DailyWasteComponent } from './daily-waste/daily-waste.component'
import { PurchasingOrderComponent } from './purchasing-order/purchasing-order.component'

const routes: Routes = [

  {
    path: 'no-of-cups',
    component: NoOfCupsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'employee-activities',
    component: ActivitiesComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'activities',
    component: ActivitiesForEmployeeComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'zamzam-water',
    component: ZamzamWaterComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'clean-equipment-count',
    component: CleanEquipmentCountComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'work-permissions',
    component: WorkPermissionsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'contractor-evaluation',
    component: ContractorEvaluationComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'contractor-information',
    component: ContractorInformationComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'items-unit',
    component: ItemsUnitComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'fines',
    component: FinesComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'work-permissions-desc',
    component: WorkPermissionDescComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'month-increment-percentage',
    component: MonthIncrementPercentComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'incidents',
    component: IncidentsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-maintenance',
    component: EquipmentMaintenanceComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'employees-issues',
    component: EmployeesIssuesComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'items',
    component: ItemsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'clean-bases',
    component: CleanBasesComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'materials',
    component: MaterialsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-order',
    component: EquipmentOrderComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-count',
    component: EquipmentCountComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-data',
    component: EquipmentDataComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'operation-activities',
    component: ActivitesForOperationsComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-main-status',
    component: EquipmentMainStatusComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'equipment-status',
    component: EquipmentStatusComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'activities-services',
    component: ActivitiesAndServicesComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'work-order',
    component: WorkOrderComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'clean-equipment-filter',
    component: CleanEquipmentFilterComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'variance-report',
    component: VarianceReportComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'shift-status',
    component: ShiftStatusComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'daily-waste',
    component: DailyWasteComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
  {
    path: 'purchasing-order',
    component: PurchasingOrderComponent,
    data: { title: 'reports-list' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class ReportsListRouterModule { }