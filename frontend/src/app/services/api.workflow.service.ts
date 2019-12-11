import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WorkFlowService {
    workFlowCheckHeader: HttpHeaders;
    constructor(private http: HttpClient) {
        this.workFlowCheckHeader = new HttpHeaders().set('RESOURCE_NAME', 'WORKFLOW')
    }


    pushRequest(formData): Observable<any> {
        return this.http.post(`/requests/requestSubmit`, formData, {
            headers: this.workFlowCheckHeader
        })
    }

    workorderapproval(value: any): Observable<any> {
        return this.http.post(`/approveactions/takeapproveaction`, value, {
            headers: this.workFlowCheckHeader
        })
    }
}