import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared.module'
import { ReportsListRouterModule } from './reports-list-routing.module';
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { ChartistModule } from 'ng-chartist'
import { NvD3Module } from 'ng2-nvd3';
import { NoOfCupsComponent } from './no-of-cups/no-of-cups.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ActivitiesForEmployeeComponent } from './activities-for-employee/activities-for-employee.component';
import { ZamzamWaterComponent } from './zamzam-water/zamzam-water.component'
import { ChartsModule } from 'ng2-charts';
import { ChartModule } from 'angular2-chartjs';
import { CleanEquipmentCountComponent } from './clean-equipment-count/clean-equipment-count.component';
import { WorkPermissionsComponent } from './work-permissions/work-permissions.component';
import { ContractorEvaluationComponent } from './contractor-evaluation/contractor-evaluation.component';
import { ContractorInformationComponent } from './contractor-information/contractor-information.component';
import { ItemsUnitComponent } from './items-unit/items-unit.component';
import { FinesComponent } from './fines/fines.component';
import { WorkPermissionDescComponent } from './work-permission-desc/work-permission-desc.component';
import { MonthIncrementPercentComponent } from './month-increment-percent/month-increment-percent.component';
import { EquipmentMaintenanceComponent } from './equipment-maintenance/equipment-maintenance.component';
import { IncidentsComponent } from './incidents/incidents.component';
import { EmployeesIssuesComponent } from './employees-issues/employees-issues.component';
import { ItemsComponent } from './items/items.component';
import { CleanBasesComponent } from './clean-bases/clean-bases.component';
import { MaterialsComponent } from './materials/materials.component';
import { EquipmentOrderComponent } from './equipment-order/equipment-order.component';
import { EquipmentCountComponent } from './equipment-count/equipment-count.component';
import { EquipmentDataComponent } from './equipment-data/equipment-data.component';
import { ActivitesForOperationsComponent } from './activites-for-operations/activites-for-operations.component';
import { EquipmentMainStatusComponent } from './equipment-main-status/equipment-main-status.component';
import { EquipmentStatusComponent } from './equipment-status/equipment-status.component';
import { ActivitiesAndServicesComponent } from './activities-and-services/activities-and-services.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { CleanEquipmentFilterComponent } from './clean-equipment-filter/clean-equipment-filter.component';
import { VarianceReportComponent } from './variance-report/variance-report.component';
import { VarianceTableComponent } from './variance-report/variance-table/variance-table.component';
import { VarianceSearchComponent } from './variance-report/variance-search/variance-search.component';
import { VarianceStatisticsComponent } from './variance-report/variance-statistics/variance-statistics.component';
import { VarianceIncidentsComponent } from './variance-report/variance-statistics/variance-incidents/variance-incidents.component';
import { VarianceIssuesComponent } from './variance-report/variance-statistics/variance-issues/variance-issues.component';
import { VarianceLaboursComponent } from './variance-report/variance-statistics/variance-labours/variance-labours.component';
import { VarianceToolsComponent } from './variance-report/variance-statistics/variance-tools/variance-tools.component';
import { ShiftStatusComponent } from './shift-status/shift-status.component';
import { DailyWasteComponent } from './daily-waste/daily-waste.component';
import { PurchasingOrderComponent } from './purchasing-order/purchasing-order.component';

const COMPONENTS = [
    NoOfCupsComponent,
    ActivitiesComponent,
    ActivitiesForEmployeeComponent,
    ZamzamWaterComponent,
    CleanEquipmentCountComponent,
    WorkPermissionsComponent,
    ContractorEvaluationComponent,
    ContractorInformationComponent,
    ItemsUnitComponent,
    FinesComponent,
    WorkPermissionDescComponent,
    MonthIncrementPercentComponent,
    EquipmentMaintenanceComponent,
    IncidentsComponent,
    EmployeesIssuesComponent,
    ItemsComponent,
    CleanBasesComponent,
    MaterialsComponent,
    EquipmentOrderComponent,
    EquipmentCountComponent,
    EquipmentDataComponent,
    ActivitesForOperationsComponent,
    EquipmentMainStatusComponent,
    EquipmentStatusComponent,
    ActivitiesAndServicesComponent,
    WorkOrderComponent,
    CleanEquipmentFilterComponent,
    VarianceReportComponent,
    VarianceTableComponent,
    VarianceSearchComponent,
    VarianceStatisticsComponent,
    VarianceIncidentsComponent,
    VarianceIssuesComponent,
    VarianceLaboursComponent,
    VarianceToolsComponent,
    ShiftStatusComponent,
    DailyWasteComponent,
    PurchasingOrderComponent
]
const PROVIDERS = [
]

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ReportsListRouterModule,
        CleanUIModule,
        FormsModule,
        ReactiveFormsModule,
        ChartistModule,
        NvD3Module,
        FormsModule,
        ReactiveFormsModule,
        ChartsModule,
        ChartModule
    ],
    declarations: [...COMPONENTS,],
    providers: [...PROVIDERS],
})
export class ReportsListModule { }
