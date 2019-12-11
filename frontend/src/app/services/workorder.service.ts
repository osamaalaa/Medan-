import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'

import 'rxjs/add/operator/map'

@Injectable()
export class WorkOrderService {
  constructor(private http: HttpClient) {

  }
  /**Getting EmployeeId from localstorage */
  getEmployeeId() {
    return localStorage.getItem('user');
  }
  /**Get Open Incidents */
  getIncidentReport(EMPLOYEE_ID: string | number): Observable<any> {
    return this.http.get(`/openIncidents/openIncidents/${EMPLOYEE_ID}`)
  }
  /**Get  Incidents Reports*/
  getIncidentData(): Observable<any> {
    return this.http.get(`/openIncidents/getIncidentsReports`)
  }
  /**Insert new incident  details */
  addNewIncident(body: any): Observable<any> {
    return this.http.post(`/webResources/insertIncidentReport`, body)
  }

  /**Get  All Projects Reports*/
  getAllProjects(): Observable<any> {
    return this.http.get(`/projects/getAllProjects`)
  }
  /**Get Incidents Report By Id*/
  getIncidentReportById(INC_REP_REQUEST_ID: string | number): Observable<any> {
    return this.http.get(`/openIncidents/openIncident/${INC_REP_REQUEST_ID}`)
  }
  /**Insert incident Status  change */
  insertIncidentStatus(body: any): Observable<any> {
    return this.http.post(`/webResources/updateIncidentStatus`, body)
  }
}