/**
 * * All resolve files are here
 */
import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HomeService } from 'src/app/services/home.service';


@Injectable()
export class HomeResolver implements Resolve<any>{
   constructor(
       private homeService: HomeService
   ){}

   resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
       return this.homeService.getIssueById(route.params.ISSUE_ID)
   }
}
@Injectable()
export class HomeDetailedResolver implements Resolve<any>{
   constructor(
       private homeService: HomeService
   ){}

   resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
       return this.homeService.getDetailsById(route.params.MEETING_ID)
   }
}
@Injectable()
export class CommitteDetailedResolver implements Resolve<any>{
   constructor(
       private homeService: HomeService
   ){}

   resolve(route:ActivatedRouteSnapshot, state: RouterStateSnapshot){
       return this.homeService.getcommiteeById(route.params.COMMITTEE_ID)
   }
}