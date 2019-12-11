import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { AuthService } from 'src/app/services/auth.service'
import { AuthGuard } from 'src/app/components/LayoutComponents/Guard/auth.guard'
import { LayoutsModule } from 'src/app/layouts/layouts.module'
import { HomeSetupComponent } from './home-setup/home-setup.component';
import { MyIssuesComponent } from './my-issues/my-issues.component';
import { AddNewIssueComponent } from './my-issues/add-new-issue/add-new-issue.component';
import { DetailedMyIssueComponent } from './my-issues/detailed-my-issue/detailed-my-issue.component';

import { HomeResolver,HomeDetailedResolver,CommitteDetailedResolver } from './home.resolves';
import { CommiteeDetailedComponent } from './home-setup/meeting-box/commitee-detailed/commitee-detailed.component';
import { MeetingFormComponent } from './home-setup/meeting-box/meeting-form/meeting-form.component';
import { AddCommiteeMemberFormComponent } from './home-setup/meeting-box/add-commitee-member-form/add-commitee-member-form.component';


import { ScreenSharingComponent } from './screen-sharing/screen-sharing.component';
import { AddScreenSharingComponent } from './screen-sharing/add-screen-sharing/add-screen-sharing.component';
import { ScreenSharingFormComponent } from './screen-sharing/screen-sharing-form/screen-sharing-form.component';
import { ViewMeetingComponent } from './home-setup/view-meeting/view-meeting.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { EditMeetingFormComponent } from './home-setup/meeting-box/edit-meeting-form/edit-meeting-form.component';
import { ReportsComponent } from './reports/reports.component'



const routes: Routes = [

  {
    path: '',
    component: HomeSetupComponent,
    data: { title: 'Home' },
    canActivate: [AuthGuard],
  },

  {
    path: 'myissues',
    component: MyIssuesComponent,
    data: { title: 'myissues MyIssues' },
    canActivate: [AuthGuard],
  },
  {
    path: 'myissues/add',
    component: AddNewIssueComponent,
    data: { title: 'myissues Add' },
    canActivate: [AuthGuard]
  },
  {
    path: 'myissues/:ISSUE_ID/details',
    component: DetailedMyIssueComponent,
    data: { title: 'myissues Details' },
    canActivate: [AuthGuard],
    resolve: {
      issueIdDetails: HomeResolver
    }
  },
  {
    path: 'meeting/:MEETING_ID/details',
    component: EditMeetingFormComponent,
    data: { title: 'Home Details' },
    canActivate: [AuthGuard],
    resolve: {
      homeIdDetails: HomeDetailedResolver
    }
  },
  {
    path: 'commitee/:COMMITTEE_ID/details',
    component: CommiteeDetailedComponent,
    data: { title: 'Home Details' },
    canActivate: [AuthGuard],
    resolve: {
      homeIdcommitteeDetails: CommitteDetailedResolver
    }
  },
  {
    path: 'meetingbox/:COMMITTEE_ID/add',
    component: MeetingFormComponent,
    data: { title: 'meeting Form Add' },
    canActivate: [AuthGuard]
  },
  {
    path: 'commitee/:COMMITTEE_ID/details/add',
    component: AddCommiteeMemberFormComponent,
    data: { title: 'Home Details add' },
    canActivate: [AuthGuard],
  },
  {
    path: 'commitee/:COMMITTEE_ID/details/addMeeting',
    component: MeetingFormComponent,
    data: { title: 'meeting Form Add'},
  },
  {
    path: 'screenshare',
    component: ScreenSharingComponent,
    data: { title: 'screen-share' },
    canActivate: [AuthGuard]
  },
  {
    path: 'screenshare/add',
    component: AddScreenSharingComponent,
    data: { title: 'screen-share' },
    canActivate: [AuthGuard]
  },
  {
    path: 'meeting/:MEETING_ID/viewmeeting/screensharing',
    component: ScreenSharingFormComponent,
    data: {title: 'screen-sharing'},
    canActivate: [AuthGuard]
  },
  {
    path: 'meetingbox/:COMMITTEE_ID/add/add',
    component: AddCommiteeMemberFormComponent,
    data: { title: 'meeting Form Add' },
    canActivate: [AuthGuard]
  },
  {
    path: 'commitee/:COMMITTEE_ID/details/addMeeting/add',
    component: AddCommiteeMemberFormComponent,
    data: { title: 'meeting Form Add' },
    canActivate: [AuthGuard]
  },
  {
    path: 'meeting/:MEETING_ID/viewmeeting',
    component:ViewMeetingComponent,
    data: { title: 'view meeting'},
    canActivate: [AuthGuard]
  },
  {
    path: 'dashbord',
    component: DashbordComponent,
    data: { title: 'Dashboard' },
    canActivate: [AuthGuard],
  },
  {
    path: 'reports',
    component: ReportsComponent,
    data: { title: 'reports' },
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [LayoutsModule, RouterModule.forChild(routes)],
  providers: [AuthService],
  exports: [RouterModule],
})
export class HomeRouterModule { }
