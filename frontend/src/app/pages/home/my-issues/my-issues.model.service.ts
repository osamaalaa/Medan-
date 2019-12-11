import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class MyIssuesModelService extends TableBase {

    constructor() {
        super();
    }

    /** Searches for Issue Id, Title in the data and resets data into displayData */
    public searchItems(searchText: string): void {
        if (searchText) {
            let isTextInISSUE_ID = (item: any) =>
                item.ISSUE_ID ? item.ISSUE_ID.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInISSUE_TITLE = (item: any) =>
                item.ISSUE_TITLE ? item.ISSUE_TITLE.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInPROJECT_PRIMARYNAME = (item: any) => 
                item.PROJECT_PRIMARYNAME ? item.PROJECT_PRIMARYNAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false  
            
            let isTextInCREATED_BY_EMP_NAME_EN = (item: any) =>
                item.CREATED_BY_EMP_NAME_EN ? item.CREATED_BY_EMP_NAME_EN.toString()
                .toLowerCase()
                .indexOf(searchText.toString().toLowerCase()) !== -1 : false

            let isTextInASSIGN_TO_EMP_NAME_EN = (item: any) =>
                item.ASSIGN_TO_EMP_NAME_EN ? item.ASSIGN_TO_EMP_NAME_EN.toString()
                .toLowerCase()
                .indexOf(searchText.toString().toLowerCase()) !== -1 : false
            

            this.displayData = this.savedData.filter(
                item =>
                    isTextInISSUE_ID(item) ||
                    isTextInISSUE_TITLE(item) ||
                    isTextInPROJECT_PRIMARYNAME(item) ||
                    isTextInCREATED_BY_EMP_NAME_EN(item) ||
                    isTextInASSIGN_TO_EMP_NAME_EN(item)
            )
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}
