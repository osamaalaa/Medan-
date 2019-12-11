import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class CommitteeMembersModelService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {

        if (searchText) {
            let isTextInEMPLOYEE_NAME_EN = (item: any) =>
                item.EMPLOYEE_NAME_EN.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;

            let isTextInMEMEBR_ROL_EN = (item: any) =>
                item.MEMEBR_ROL_EN.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;

            let isTextInEMPLOYEE_EMAIL = (item: any) =>
                item.EMPLOYEE_EMAIL.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1;

            // let isTextInPHONE = (item: any) =>
            //     item.PHONE.toString()
            //         .toLowerCase()
            //         .indexOf(searchText.toString().toLowerCase()) !== -1;


            this.displayData = this.savedData.filter(
                item => isTextInEMPLOYEE_NAME_EN(item) || isTextInMEMEBR_ROL_EN(item) || isTextInEMPLOYEE_EMAIL(item) ,
            );
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }


}
