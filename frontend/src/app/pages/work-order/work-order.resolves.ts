/**
 * * All resolve files are here
 */
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { WorkOrderService } from 'src/app/services/workorder.service';


@Injectable()
export class IncidentReportReslover implements Resolve<any>{
    constructor(
        private workOrderService: WorkOrderService
    ) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.workOrderService.getIncidentReportById(route.params.INC_REP_REQUEST_ID)
    }
}
