import { Injectable } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Observable, of, Subject } from 'rxjs';
import { flatMap } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
export enum ROLES {
    MANAGER = "manager",
    MEMBER = "member",
    BOARD_MEMBER = "board-member"
}

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class MeetingBoxService {

    role: ROLES;

    constructor(
        private homeService: HomeService
    ) {
        this.getUserDetails();
        this.getRole();
    }
    USER: any;
    USER_ID: any;
    USER_NAME: any;
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

    public exportAsExcelFile(json: any[], excelFileName: string): void {

        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
        console.log('worksheet', worksheet);
        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
        //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        this.saveAsExcelFile(excelBuffer, excelFileName);
    }

    public saveAsExcelFile(buffer: any, fileName: string): void {
        const data: Blob = new Blob([buffer], {
            type: EXCEL_TYPE
        });
        FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    }

}