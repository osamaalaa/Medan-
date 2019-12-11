import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

@Injectable()
export class ReportsListService {
  constructor(private http: HttpClient) {

  }

  /**Getting All Templates */
  getAllTemplates(body: any): Observable<any> {
    return this.http.post(`/statistics/getShiftIdByName`, body);
  }

  /**Getting All Locations */
  getAllLocations(body: any): Observable<any> {
    return this.http.post(`/statistics/getlocIdByName`, body);
  }

  /**Getting All PROJECTS AND LOCATIONS*/
  getAllProjectsAndLocations(): Observable<any> {
    return this.http.get(`/statistics/getProjectsAndItsLocations`);
  }

  /**Getting All Service Type Names */
  getAllServiceTypeNames(body: any): Observable<any> {
    return this.http.post(`/statistics/getServiceTypeNameById`, body);
  }

  /**Posting NO OF CUPS  */
  postNoOfCups(body: any): Observable<any> {
    return this.http.post(`/statistics/getNoOfCup`, body);
  }

  /**Posting zamzam water  */
  postZamZamWater(body: any): Observable<any> {
    return this.http.post(`/statistics/getZamByLocShf`, body);
  }
  /**Getting Activities DATA */
  activitiesData(body: any): Observable<any> {
    return this.http.post(`/statistics/activitiesDetailsForEmp`, body)
  }
  /**Getting Activities DATA */
  getAllEmployees(): Observable<any> {
    return this.http.get(`/employees/getAllEmployees`)
  }

  /**Getting Activities For DATA */
  activitiesForEmployeeData(body: any): Observable<any> {
    return this.http.post(`/statistics/activitiesDetailsForEmpforLocAndSHift`, body)
  }

  /**Posting Contractor Evaluation */
  postContractorEvaluation(body: any): Observable<any> {
    return this.http.post(`/statistics/getContractorEvaluation`, body)
  }

  /**Getting Permissions Id  */
  getPermissions(body: any): Observable<any> {
    return this.http.post(`/statistics/getPermissionById`, body)
  }

  /**Getting Work Permissions Data */
  postWorkPermissionsData(body: any): Observable<any> {
    return this.http.post(`/statistics/getpermissionfiltersByNumberOrLocation`, body)
  }

  /* Getting permissions status */
  getPermissionStatus(): Observable<any> {
    return this.http.get('/statistics/getPermissionStatus')
  }

  /**Getting Items Unit Id and Data */
  postItemsUnit(body: any): Observable<any> {
    return this.http.post(`/statistics/getItemsWithItemCode`, body)
  }

  /**Getting Work Permission Description Data */
  postWorkPermissionDes(body: any): Observable<any> {
    return this.http.post(`/statistics/getPermissionDescription`, body)
  }

  /**Posting month increment percentage Data */
  postMonthIncrementPercentage(body: any): Observable<any> {
    return this.http.post(`/statistics/getprecentageincreament`, body)
  }

  /**getting asset serial Data */
  getAssetSerial(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetSerial`, body)
  }

  /**Getting Incidents Details Data */
  postIncidentsDetails(body: any): Observable<any> {
    return this.http.post(`/statistics/getIncidentsDetails`, body)
  }

  /**Getting Incident No Data */
  postIncidentNo(body: any): Observable<any> {
    return this.http.post(`/statistics/getIncidentNo`, body)
  }

  /**Getting Employees  Data */
  postEmployeesIssues(body: any): Observable<any> {
    return this.http.post(`/statistics/getissuesByLocagionAndShiftId`, body)
  }

  /**Getting Items Data */
  postItems(body: any): Observable<any> {
    return this.http.post(`/statistics/getItems`, body)
  }

  /**Getting Clean Bases Data */
  postCleanBases(body: any): Observable<any> {
    return this.http.post(`/statistics/getCountForCleanBases`, body)
  }

  /**Getting Equipment Maintenance Data*/
  postEquipmentMaintenance(body: any): Observable<any> {
    return this.http.post(`/statistics/getMissions`, body)
  }

  /**Posting materials */
  postMaterials(body: any): Observable<any> {
    return this.http.post(`/statistics/getMaterialByLocOrShift`, body)
  }

  /**Posting Equipment Order */
  postEquipmentOrder(body: any): Observable<any> {
    return this.http.post(`/statistics/getRangeOfEquibment`, body)
  }

  /**Posting Equipment Count */
  postEquipmentCount(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetCount`, body)
  }

  /**Getting All Operations Data*/
  getAllOperationType(body: any): Observable<any> {
    return this.http.post(`/statistics/getOpType`, body)
  }

  getLookUps(LOOKUP_ID: any): Observable<any> {

    return this.http.get(`/lookupDetials/lookupDetials/${LOOKUP_ID}`)
  }

  /**Getting All Activites For Operations Data*/
  postActivitesForOperationsData(body: any): Observable<any> {
    return this.http.post(`/statistics/getActivity`, body)
  }

  /**Getting All Activites For Operations Data*/
  postEquipmentData(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetData`, body)
  }

  /**Getting Equipment Main status Data*/
  postEquipmentMainStatus(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetStatus`, body)
  }

  /**Getting Equipment status Data*/
  postEquipmentStatus(body: any): Observable<any> {
    return this.http.post(`/statistics/getAssetStatus`, body)
  }

  /**Getting Activities And Services Data*/
  postActivitiesAndServices(body: any): Observable<any> {
    return this.http.post(`/statistics/gitActivityByLocOrShift`, body)
  }

  /**POSTING WORK ORDER */
  /**Getting Activities And Services Data*/
  postWorkOrder(body: any): Observable<any> {
    return this.http.post(`/statistics/gitworkOrderByWeek`, body)
  }

  /**Getting Clean Equipment Filter Data*/
  postCleanEquipmentFilter(body: any): Observable<any> {
    return this.http.post(`/statistics/getMissions`, body)
  }

  /**POST FINES*/
  postFines(body: any): Observable<any> {
    return this.http.post(`/statistics/getIssuesType`, body)
  }

  /**POST FINES*/
  postShiftStatus(body: any): Observable<any> {
    return this.http.post(`/statistics/getMaterialInLocationByItemAndLoc`, body)
  }

  /**POST CleanBases  Data*/
  postCleanBasesData(body: any): Observable<any> {
    return this.http.post(`/statistics/getItemsWithItemCode`, body)
  }

  /**POST CleanBases  Data*/
  postDailyWaste(body: any): Observable<any> {
    return this.http.post(`/statistics/getWasteByLocOrShift`, body)
  }

  /**POST CleanBases  Data*/
  postPurchasingOrder(body: any): Observable<any> {
    return this.http.post(`/statistics/purshasingOrder`, body)
  }

  /**filter locationName By id*/
  getLocationNameById(body: any): Observable<any> {
    return this.http.post(`/statistics/getlocNameById`, body)
  }


}
