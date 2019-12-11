import { Injectable } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { Observable, of, Subject } from 'rxjs'
import { flatMap } from 'rxjs/operators'

@Injectable()
export class ReportsService {

  searchBoolean$ = new Subject<boolean>()
  getSearched() {
    return this.searchBoolean$.asObservable()
  }

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseEquib$ = new Subject<any>()

  getSearchResponseEquib() {
    return this.searchResponseEquib$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseTable$ = new Subject<any>()

  getSearchResponseTable() {
    return this.searchResponseTable$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseLabor$ = new Subject<any>()

  getSearchResponseLabor() {
    return this.searchResponseLabor$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseIssues$ = new Subject<any>()

  getSearchResponseIssues() {
    return this.searchResponseIssues$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseIncidents$ = new Subject<any>()

  getSearchResponseIncidents() {
    return this.searchResponseIncidents$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseBody$ = new Subject<any>()

  getSearchResponseBody() {
    return this.searchResponseBody$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseProjectLabel$ = new Subject<any>()

  getSearchResponseProjectLabel() {
    return this.searchResponseProjectLabel$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  reset$ = new Subject<any>()

  getResetResponse() {
    return this.reset$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseVarianceIncidents$ = new Subject<any>()

  getSearchResponseVarianceIncidents() {
    return this.searchResponseVarianceIncidents$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseVarianceIssues$ = new Subject<any>()

  getSearchResponseVarianceIssues() {
    return this.searchResponseVarianceIssues$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseVarianceLabor$ = new Subject<any>()

  getSearchResponseVarianceLabor() {
    return this.searchResponseVarianceLabor$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseVarianceEquib$ = new Subject<any>()

  getSearchResponseVarianceEquib() {
    return this.searchResponseVarianceEquib$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseVarianceReport$ = new Subject<any>()

  getSearchResponseVarianceReport() {
    return this.searchResponseVarianceReport$.asObservable()
  }
  /************************************************************* */

  /**EVENT-DRIVEN-APPROACH *****************************************/
  searchResponseLocationName$ = new Subject<any>()

  getSearchResponseLocationName() {
    return this.searchResponseLocationName$.asObservable()
  }
  /************************************************************* */

  constructor() { }
}
