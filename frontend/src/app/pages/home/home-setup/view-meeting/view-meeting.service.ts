import { Injectable } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Observable, of, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';

export enum ROLES {
    MANAGER = "manager",
    MEMBER = "member",
    BOARD_MEMBER = "board-member"
}
@Injectable()
export class ViewMeetingService {

    /**EVENT-DRIVEN-APPROACH *****************************************/
    refreshResolution$ = new Subject<any>();

    getRefreshResolution() {
        return this.refreshResolution$.asObservable();
    }
    /************************************************************* */

    /**EVENT-DRIVEN-APPROACH *****************************************/
    navigate = new Subject<any>();

    getNavigate() {
        return this.navigate.asObservable();
    }
    /************************************************************* */

    role: ROLES;

    private viewMeetingData: any;

    constructor(
        private homeService: HomeService
    ) {
        this.getUserDetails();
        this.getRole();
    }

    setData(data: any) {
        this.viewMeetingData = data;
    }

    getData() {
        return this.viewMeetingData;
    }

    USER: any;
    USER_ID: any;
    /**Getting Employee Id*/
    public getUserDetails() {
        this.USER = this.homeService.getEmployeeId();
        this.USER_ID = JSON.parse(this.USER).USER_ID;
    }


    public getRole(): Observable<any> {

        if (this.role) {
            return of(this.role)
        } else {
            let USER_ID = this.USER_ID;
            return this.homeService.getAllUserRoles(USER_ID)
                .pipe(
                    flatMap(data => {
                        // console.log('login===>', data)
                        let loginuserrole = data.rows


                        for (var i = 0; i < loginuserrole.length; i++) {
                            let allLoginUsers = loginuserrole[i];
                            let rolename = allLoginUsers.ROLE_NAME_EN.toLowerCase();
                            let projectmanagerROle = 'Project Manager'.toLowerCase();
                            let memberRole = 'Project member'.toLowerCase();
                            let boardRoleChairman = 'Board Commitee Chairman'.toLowerCase();

                            if (rolename == projectmanagerROle || (rolename == projectmanagerROle && rolename == memberRole) || (rolename == projectmanagerROle && rolename == memberRole && rolename == boardRoleChairman)) {
                                this.role = ROLES.MANAGER
                                // console.log('role===>', this.role)
                            } else if (rolename == memberRole) {
                                if (this.role != ROLES.MANAGER) {
                                    this.role = ROLES.MEMBER;
                                }

                            } 
                            // else if (rolename == boardRoleChairman) {
                            //     this.role = ROLES.BOARD_MEMBER;
                            // }

                        }

                        return of(this.role)
                    })
                )
        }
    }

    //role = member /manager


}