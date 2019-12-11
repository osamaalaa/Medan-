import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/app/shared.module'
import { HomeRouterModule } from './home-routing.module'
import { CleanUIModule } from 'src/app/components/CleanUIComponents/cleanui.module';
import { ChartistModule } from 'ng-chartist'
import { NvD3Module } from 'ng2-nvd3'

import 'd3'
import 'nvd3'
import { HomeSetupComponent } from './home-setup/home-setup.component';
import { HomeResolver, HomeDetailedResolver, CommitteDetailedResolver } from './home.resolves';
import { MyIssuesComponent } from './my-issues/my-issues.component';
import { AddNewIssueComponent } from './my-issues/add-new-issue/add-new-issue.component';
import { MyIssuesFormComponent } from './my-issues/my-issues-form/my-issues-form.component';
import { EditMyIssuesComponent } from './my-issues/edit-my-issues/edit-my-issues.component';
import { HomeService } from 'src/app/services/home.service';

import { DetailedMyIssueComponent } from './my-issues/detailed-my-issue/detailed-my-issue.component';
import { MeetingBoxComponent } from './home-setup/meeting-box/meeting-box.component';

import { CommiteeDetailedComponent } from './home-setup/meeting-box/commitee-detailed/commitee-detailed.component';
import { MeetingFormComponent } from './home-setup/meeting-box/meeting-form/meeting-form.component';
import { AddCommiteeMemberFormComponent } from './home-setup/meeting-box/add-commitee-member-form/add-commitee-member-form.component';
import { ScreenSharingComponent } from './screen-sharing/screen-sharing.component';
import { AddScreenSharingComponent } from './screen-sharing/add-screen-sharing/add-screen-sharing.component';
import { ScreenSharingFormComponent } from './screen-sharing/screen-sharing-form/screen-sharing-form.component';
import { ViewMeetingComponent } from './home-setup/view-meeting/view-meeting.component';
//import {LocalStorage, SessionStorage} from "angular2-localstorage/WebStorage";
import { GoogleChartsModule } from 'angular-google-charts';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ApprovalComponent } from './dashbord/approval/approval.component';
import { InprogressWorkorderComponent } from './dashbord/inprogress-workorder/inprogress-workorder.component';
import { MeetingAllComponent } from './dashbord/meeting-all/meeting-all.component';
import { MyInboxComponent } from './dashbord/my-inbox/my-inbox.component';
import { OldMeetingDetailedComponent } from './dashbord/old-meeting-detailed/old-meeting-detailed.component';
import { OpenIncidentsComponent } from './dashbord/open-incidents/open-incidents.component';
import { OpenIssuesComponent } from './dashbord/open-issues/open-issues.component';
import { OpenTicketsComponent } from './dashbord/open-tickets/open-tickets.component';
import { UnassigendTaskComponent } from './dashbord/unassigend-task/unassigend-task.component';
import { WishListComponent } from './dashbord/wish-list/wish-list.component';
import { EditMeetingFormComponent } from './home-setup/meeting-box/edit-meeting-form/edit-meeting-form.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { BddashboardComponent } from './home-setup/meeting-box/bddashboard/bddashboard.component';
import { SurveyComponent } from './home-setup/meeting-box/bddashboard/survey/survey.component';
import { MeetingAgendaComponent } from './home-setup/meeting-box/bddashboard/meeting-agenda/meeting-agenda.component';
import { StrategicPerformanceComponent } from './home-setup/meeting-box/bddashboard/strategic-performance/strategic-performance.component';
import { DecisionsComponent } from './home-setup/meeting-box/bddashboard/decisions/decisions.component';
import { StrategicObjectiveComponent } from './home-setup/meeting-box/bddashboard/strategic-objective/strategic-objective.component';
import { TermStudiesComponent } from './home-setup/meeting-box/bddashboard/term-studies/term-studies.component';
import { ChartsModule } from 'ng2-charts';
import { OldMeetingsComponent } from './home-setup/meeting-box/old-meetings/old-meetings.component';
import { MyCommitteeComponent } from './home-setup/meeting-box/my-committee/my-committee.component';
import { ActiveMeetingComponent } from './home-setup/meeting-box/active-meeting/active-meeting.component';
import { CommitteeMembersComponent } from './home-setup/meeting-box/commitee-detailed/committee-members/committee-members.component';
import { ActiveMeetingsComponent } from './home-setup/meeting-box/commitee-detailed/active-meetings/active-meetings.component';
import { FinishedMeetingsComponent } from './home-setup/meeting-box/commitee-detailed/finished-meetings/finished-meetings.component';
import { ClosedMeetingsComponent } from './home-setup/meeting-box/commitee-detailed/closed-meetings/closed-meetings.component';
import { AgendaFormComponent } from './home-setup/meeting-box/meeting-form/agenda-form/agenda-form.component';
import { MemberFormComponent } from './home-setup/meeting-box/meeting-form/member-form/member-form.component';


import { AgendaComponent } from './home-setup/view-meeting/agenda/agenda.component';
import { PresentationComponent } from './home-setup/view-meeting/presentation/presentation.component';
import { LiveViewComponent } from './home-setup/view-meeting/live-view/live-view.component';
import { MinutesOfMeetingComponent } from './home-setup/view-meeting/minutes-of-meeting/minutes-of-meeting.component';
import { ResolutionsComponent } from './home-setup/view-meeting/resolutions/resolutions.component';
import { MembersComponent } from './home-setup/view-meeting/members/members.component';
import { ReportsComponent } from './reports/reports.component';
import { SearchComponent } from './reports/search/search.component';
import { StatisticsComponent } from './reports/statistics/statistics.component';
import { ReportsTableComponent } from './reports/reports-table/reports-table.component';
import { LaboursChartComponent } from './reports/statistics/labours-chart/labours-chart.component';
import { ToolsChartComponent } from './reports/statistics/tools-chart/tools-chart.component';
import { IssuesChartComponent } from './reports/statistics/issues-chart/issues-chart.component';
import { IncidentsChartComponent } from './reports/statistics/incidents-chart/incidents-chart.component';
import { ChartModule } from 'angular2-chartjs';
import { VarianceIncidentsComponent } from './reports/statistics/variance-incidents/variance-incidents.component';
import { VarianceIssuesComponent } from './reports/statistics/variance-issues/variance-issues.component';
import { VarianceLaboursComponent } from './reports/statistics/variance-labours/variance-labours.component';
import { VarianceToolsComponent } from './reports/statistics/variance-tools/variance-tools.component';


// home

const COMPONENTS = [

  //homeComponent,
  HomeSetupComponent,
  MyIssuesComponent,
  AddNewIssueComponent,
  MyIssuesFormComponent,
  EditMyIssuesComponent,
  DetailedMyIssueComponent,
  MeetingBoxComponent,
  CommiteeDetailedComponent,
  ScreenSharingComponent,
  AddScreenSharingComponent,
  ScreenSharingFormComponent,
  MeetingBoxComponent,
  CommiteeDetailedComponent,
  MeetingFormComponent,
  AddCommiteeMemberFormComponent,
  ViewMeetingComponent,
  DashbordComponent,
  ApprovalComponent,
  InprogressWorkorderComponent,
  MeetingAllComponent,
  MyInboxComponent,
  OldMeetingDetailedComponent,
  OpenIncidentsComponent,
  OpenIssuesComponent,
  OpenTicketsComponent,
  UnassigendTaskComponent,
  WishListComponent,
  EditMeetingFormComponent,
  BddashboardComponent,
  SurveyComponent,
  MeetingAgendaComponent,
  StrategicPerformanceComponent,
  DecisionsComponent,
  StrategicObjectiveComponent,
  TermStudiesComponent,
  AgendaComponent,
  PresentationComponent,
  LiveViewComponent,
  MinutesOfMeetingComponent,
  ResolutionsComponent,
  MembersComponent,
  EditMeetingFormComponent,
  BddashboardComponent,
  SurveyComponent,
  MeetingAgendaComponent,
  StrategicPerformanceComponent,
  DecisionsComponent,
  StrategicObjectiveComponent,
  TermStudiesComponent,
  OldMeetingsComponent,
  MyCommitteeComponent,
  ActiveMeetingComponent,
  CommitteeMembersComponent,
  ActiveMeetingsComponent,
  FinishedMeetingsComponent,
  ClosedMeetingsComponent,
  AgendaFormComponent,
  MemberFormComponent,
  ReportsComponent,
  SearchComponent,
  StatisticsComponent,
  ReportsTableComponent,
  LaboursChartComponent,
  ToolsChartComponent,
  IssuesChartComponent,
  IncidentsChartComponent,
  VarianceIncidentsComponent,
  VarianceIssuesComponent,
  VarianceLaboursComponent,
  VarianceToolsComponent
]
const PROVIDERS = [
  HomeResolver,
  HomeDetailedResolver,
  CommitteDetailedResolver,
  MemberFormComponent
]

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HomeRouterModule,
    CleanUIModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    ChartistModule,
    NvD3Module,
    FormsModule,
    GoogleChartsModule.forRoot('AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'),
    PdfViewerModule,
    ChartsModule,
    ChartModule
  ],
  declarations: [...COMPONENTS,],
  providers: [...PROVIDERS],
  entryComponents: [MemberFormComponent]
})
export class HomeModule { }
