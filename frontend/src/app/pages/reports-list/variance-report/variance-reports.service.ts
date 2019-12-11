import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable()
export class VarianceReportsService {

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseEquib$ = new Subject<any>();

    getSearchResponseEquib() {
        return this.searchResponseEquib$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseTable$ = new Subject<any>();

    getSearchResponseTable() {
        return this.searchResponseTable$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseLabor$ = new Subject<any>();

    getSearchResponseLabor() {
        return this.searchResponseLabor$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseIssues$ = new Subject<any>();

    getSearchResponseIssues() {
        return this.searchResponseIssues$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseIncidents$ = new Subject<any>();

    getSearchResponseIncidents() {
        return this.searchResponseIncidents$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseBody$ = new Subject<any>();

    getSearchResponseBody() {
        return this.searchResponseBody$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    searchResponseProjectLabel$ = new Subject<any>();

    getSearchResponseProjectLabel() {
        return this.searchResponseProjectLabel$.asObservable();
    }
    /************************************************************* */



    /**EVENT-DRIVEN-APPROACH *****************************************/
    reset$ = new Subject<any>();

    getResetResponse() {
        return this.reset$.asObservable();
    }
    /************************************************************* */

    constructor() { }

}