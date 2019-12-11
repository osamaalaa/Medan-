import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

@Injectable()
export class HomeService {

  constructor(private http: HttpClient) {
  }

  /**Get user role  API */
  getAllUserRoles(USER_ID: string | number): Observable<any> {
    return this.http.get(`/userRole/getAllUserRolesByUserId/${USER_ID}`)
  }
  /**Get Work Orderdetails API */
  getworkorderdetails(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/workOrderInProg/workOrderInProg/${EMPLOYEE_ID}`)
  }
  /**Get Work Approvals API */
  getworkapprovals(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/workOrderApprovals/workOrderApprovals/${EMPLOYEE_ID}`)

  }
  /**Get Wishlist API */
  getwishlist(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/wishList/wishList/${EMPLOYEE_ID}`)
  }
  /**Get UnAssigned Tasks API */
  UnAssignedTasks(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/notAssignedTasks/notAssignedTasks/${EMPLOYEE_ID}`)
  }
  /**Get My Inbox API */
  getmyinbox(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/myInbox/myInbox/${EMPLOYEE_ID}`)
  }
  /**Get Open Issues API */
  getOpenIssues(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/openIssues/openIssues/${EMPLOYEE_ID}`)
  }
  /**Get Meeting All API */
  getMeetingAll(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/getMeetings/getMeetings/${EMPLOYEE_ID}/${EMPLOYEE_ID}`)
  }
  /**Get Open Incidents API */
  getOpenIncidents(EMPLOYEE_ID: string | number): Observable<any> {

    return this.http.get(`/openIncidents/openIncidents/${EMPLOYEE_ID}`)
  }
  /**Get Open Tickets API */
  getOpenTickets(EMPLOYEE_ID: string | number): Observable<any> {
    return this.http.get(`/issues/getMaxissuesAssignment/${EMPLOYEE_ID}`)
  }
  /**Get Home All CountAPI */
  getHomeallcount(EMPLOYEE_ID, PROJECT_MANAGER_ID, CREATED_BY, PROJECT_ID, to_mailbox, ASSIGN_TO, WORK_ORDER_OWNER: string | number): Observable<any> {
    return this.http.get(`/toolBoxNumbers/toolBoxNumbers/${EMPLOYEE_ID}/${PROJECT_MANAGER_ID}/${CREATED_BY}/${PROJECT_ID}/${to_mailbox}/${ASSIGN_TO}/${WORK_ORDER_OWNER}`)
  }
  /**Get Active  Meetings API */
  getActiveMeetings(EMPLOYEE_ID: string | number): Observable<any> {
    return this.http.get(`/getMeetings/activeMeetingsByEmpId/${EMPLOYEE_ID}`)
  }
  /**Get Old Meetings API */
  getOldMeetings(EMPLOYEE_ID: string | number): Observable<any> {
    return this.http.get(`/getMeetings/oldMeetingsByEmpId/${EMPLOYEE_ID}`)
  }
  /**Get Committee  API */
  getCommittee(EMPLOYEE_ID: string | number): Observable<any> {
    return this.http.get(`/getCommittee/loggedUserCommittee/${EMPLOYEE_ID}`)
  }
  /**Get Home Deatils   By Id */
  getDetailsById(MEETING_ID: number): Observable<any> {
    return this.http.get(`/Meetings/getOneMeetingsByID/${MEETING_ID}`)
  }

  /**Issues API */
  /**Get All Issues API */
  getIssues(): Observable<any> {
    return this.http.get(`/issues/getIssues`)
  }

  /**Insert Issue API */
  insertIssue(formData: any): Observable<any> {
    return this.http.post(`/issues/insertNewIssue`, formData);
  }

  /**LookUP For Getting All Projects */
  getAllProjects(): Observable<any> {
    return this.http.get(`/projects/getAllProjects`)
  }
  /**Getting WorkOrders by ProjectId */
  getWorkOrderById(projectId: number): Observable<any> {
    return this.http.get(`/getWorkOrder/getWorkOrder/${projectId}`)
  }

  /**Getting EmployeeId from localstorage */
  getEmployeeId() {
    return localStorage.getItem('user');
  }
  /**Getting EmployeeId from localstorage */
  getEmployeeRole() {
    return localStorage.getItem('role');
  }
  /**Get One Issue By Id */
  getIssueById(ISSUE_ID: number): Observable<any> {
    return this.http.get(`/issues/getAllIssuesByID/${ISSUE_ID}`)
  }
  /**Get All Users */
  getAllUsers(): Observable<any> {
    return this.http.get(`/getUsers/getUsers`)
  }
  /**Get Project By Id */
  getProjectById(projectId: number): Observable<any> {
    return this.http.get(`/projects/getOneProjectByID/${projectId}`)
  }
  /**Get All Commite Members  */
  getallcommiteemembers(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/CommitteMembers/getAllCommitteMembers/${COMMITTEE_ID}`)
  }
  /**Get All Commite  By Id  */
  getcommiteeById(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/Committee/getOnecommitteByID/${COMMITTEE_ID}`)
  }
  /**Get All Commite Members Details By Id  */
  getCommitteeMembers(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/getCommitteeMembers/getCommitteeMembers/${COMMITTEE_ID}`)
  }
  /**Insert new meeting data */
  addmeetingcommittee(body: any): Observable<any> {
    return this.http.post(`/webresources/insertMeeting`, body)
  }
  /**Delete Commite Members Details By Id  */
  deleteCommiteMembers(COMMITTEE_MEMBERS_ID: string | number): Observable<any> {
    /**
     * TODO: Remove hardcoded deleted by
     */
    return this.http.post(`/webresources/deleteMember`, { COMMITTEE_MEMBERS_ID: COMMITTEE_MEMBERS_ID, DELETED_BY: 1 });
  }
  /**Get All Active Meetings all  */
  getAllActiveMeetings(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/getMeetings/activeMeetingsMembersByCommitteeId/${COMMITTEE_ID}`)
  }
  /**Get All finished Meetings   */
  getAllFinishedMeetings(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/getMeetings/finishedMeetingsMembersByCommitteeId/${COMMITTEE_ID}`)
  }
  /**Get All Closed  Meetings   */
  getAllClosedMeetings(COMMITTEE_ID: number): Observable<any> {
    return this.http.get(`/getMeetings/closedMeetingsMembersByCommitteeId/${COMMITTEE_ID}`)
  }
  getLookUps(LOOKUP_ID: any): Observable<any> {

    return this.http.get(`/lookupDetials/lookupDetials/${LOOKUP_ID}`)
  }
  /**Insert new  committee  Memeber details */
  addCommitteeMember(body: any): Observable<any> {
    return this.http.post(`/webresources/insertCommitteeMembers`, body)
  }
  /**Get All Comments */
  getAllComments(MeetingId: any): Observable<any> {
    return this.http.get(`/meetingComments/getCommentsOfMinutes/${MeetingId}`)
  }
  /**Insert new  comments Data */
  addcommentsdata(bodydata: any): Observable<any> {
    return this.http.post(`/webResources/insertComment`, bodydata)
  }

  /**Getting EmployeeId from localstorage */
  getEmployeeall(): Observable<any> {
    return this.http.get(`/getAllMembers/getAllMembers`)
  }

  /**Getting Meeting Members */
  getMeetingMembers(meetingId: number): Observable<any> {
    return this.http.get(`/getMeetingMembers/getMeetingMembers/${meetingId}`)
  }

  /**Getting R_MEETING_AGENDA_ID */
  getMeetingAgendaId(body: any): Observable<any> {
    return this.http.post(`/webresources/insertMeetingAgenda`, body)
  }

  /** Delete upload-file using meetingid */
  deleteUploadFile(deleteId: number, body): Observable<any> {
    return this.http.post(`/webResources/deleteMeetingAgenda/${deleteId}`, body)
  }

  getAttachment(meetingId: any): Observable<any> {
    return this.http.get(`/webResources/getAttachment/1/${meetingId}`)
  }
  getPresentatioinAttachment(meetingId: any): Observable<any> {
    return this.http.get(`/webResources/getPresentationAttachment/${meetingId}`)
  }
  /**Getting R_MEETING_AGENDA_ID */
  addCommitteeMemberMeeting(body: any): Observable<any> {
    return this.http.post(`/webResources/insertMeetingMembers`, body)
  }

  getMomAttachmentFile(meetingId: any): Observable<any> {
    return this.http.get(`/webResources/getAttachment/2/${meetingId}`)
  }

  /**Getting  Mom_R_MEETING_AGENDA_ID */
  getMeetingMomId(body: any): Observable<any> {
    return this.http.post(`/webresources/insertMeetingMinutes`, body)
  }

  insertApproval(body): Observable<any> {
    return this.http.post(`/webResources/Approved`, body)
  }

  /**Getting momid based on meetingid */
  getMomIdBasedOnMeetingId(MEETING_ID): Observable<any> {
    return this.http.get(`/MeetingMinutes/getOneMeetingMinutesID/${MEETING_ID}`)
  }

  /**Active screenshare status */
  insertActiveScreenShare(meeting_id: any, status: any, body): Observable<any> {
    //  this.http.post(`/Meetings/updateSharing/${meeting_id}/${status}`)
    return this.http.post(`/Meetings/updateSharing/${meeting_id}/${status}`, body)
  }

  /**Delete MOM */
  deleteMom(momId: any, body: any): Observable<any> {
    return this.http.post(`/MeetingMinutes/deleteMeetingMinutes/${momId}`, body)
  }

  /**close meeting */
  closeMeeting(body: any): Observable<any> {
    return this.http.post(`/webResources/closeMeeting`, body)
  }

  /**Get Approve status */
  getApproveStatus(mom: any, employeeId: any, meetingId: any): Observable<any> {
    return this.http.get(`/webResources/getComments/${mom}/${employeeId}/${meetingId}`)
  }

  /**Attendance post Insert */
  postAttendance(mmId: any, flag: any, body: any): Observable<any> {
    return this.http.post(`/webResources/updateMeetingMemberAttendance/${mmId}/${flag}`, body)
  }

  /**Get presentation Api for View-meeting */
  getPresentationView(): Observable<any> {
    return this.http.get(`/webresources/getMeetingPresentation`)
  }
  /**Getting R_MEETING_AGENDA_ID */
  getMeetingPresentationId(body: any): Observable<any> {
    return this.http.post(`/webresources/createMeetingPresentation`, body)
  }

  reqCloseMeeting(meeting_id, momId): Observable<any> {
    return this.http.post(`/webresources/reqCloseMeeting/${meeting_id}/${momId}`, {})
  }

  getPresentationComments(MEETING_AGENDA_ID): Observable<any> {
    return this.http.get(`/MeetingAgenda/getMeetingPresentationComments/${MEETING_AGENDA_ID}`)
  }

  getPresentationByMeeting(meeting_id): Observable<any> {
    return this.http.get(`/MeetingAgenda/getPresentationByMeetingID/${meeting_id}`)
  }
  getCommiteeMemberById(COMMITTEE_MEMBERS_ID): Observable<any> {
    return this.http.get(`/getCommitteeMembers/getCommitteeMembersByMemberId/${COMMITTEE_MEMBERS_ID}`)
  }

  /**Get Active sharing status meetings */
  getActiveSharing(): Observable<any> {
    return this.http.get(`/Meetings/getActiveSharing`)
  }

  /**LookUP For Getting All Projects */
  getAllAssets(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetData`, body)
  }

  /**LookUP For Getting All Projects */
  getAllServices(): Observable<any> {
    return this.http.get(`/Services/getAllServices`)
  }

  /**Getting REPORT DATA */
  getAllReports(body: any): Observable<any> {
    return this.http.post(`/statistics/getJobOrderMaterial`, body)
  }

  /* Getting Issues data for chart */
  getIssueByAsset(body: any): Observable<any> {
    return this.http.post('/statistics/getissueByAsset', body)
  }

  /* Getting Labours data for chart */
  getLabourCountAndName(body: any): Observable<any> {
    return this.http.post('/statistics/getLabourCountAndName', body)
  }

  /* Getting Equipments data for chart */
  getEquibByServiceType(body: any): Observable<any> {
    return this.http.post('/statistics/getEquibByServiceType', body)
  }

  /* Getting Incidents data for chart */
  getIncidentByProject(body: any): Observable<any> {
    return this.http.post('/statistics/getincidentByProject', body)
  }


  /**Getting SHIFT DATA or Template*/
  getAllShifts(): Observable<any> {
    return this.http.get(`/statistics/getShiftName`)
  }

  /**Getting All Templates */
  getAllTemplates(body: any): Observable<any> {
    return this.http.post(`/statistics/getShiftIdByName`, body);
  }

  /**Get Table Data */
  getJobOrderData(body: any): Observable<any> {
    return this.http.post(`/statistics/getJobOrderDateByAssetANdProject`, body);
  }

  /**Getting Equip Data */
  getEquibData(body: any): Observable<any> {
    return this.http.post(`/statistics/getEquibMentCountByAssPro`, body);
    // getEquibMentCountByAssPro This is the service to use after changing the data format...
  }

  /**Getting Labor Data */
  getLaborData(body: any): Observable<any> {
    return this.http.post(`/statistics/getLabourCountAndName`, body);
  }

  /**Getting Issues Data */
  getIssuesData(body: any): Observable<any> {
    return this.http.post(`/statistics/getJobOrderMaterial `, body);
  }

  /**Getting Incidents */
  getIncidentsData(body: any): Observable<any> {
    return this.http.post(`/statistics/getIncidentCountByAssPro`, body);
  }

  /**Getting All Locations */
  getAllLocations(body: any): Observable<any> {
    return this.http.post(`/statistics/getlocIdByName`, body);
  }

  /**POST VARIANCE REPORT*/
  postVarianceReport(body: any): Observable<any> {
    return this.http.post(`/statistics/ReportVariance`, body)
  }

 /**get Location By Id  name*/
 getLocationById(body: any): Observable<any> {
  return this.http.post(`/statistics/getlocNameById`, body)
} 

/**get Project  By Id  name */
getProjectByIdName(body: any): Observable<any> {
  return this.http.post(`/statistics/getProjectsById`, body)
} 
}
