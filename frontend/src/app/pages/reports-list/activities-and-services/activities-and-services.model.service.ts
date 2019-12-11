import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ActivitesAndServicesModelService extends TableBase {
    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {

        if (searchText) {
            let isTextInEMP_NAME_EN = (item: any) =>
                item.EMP_NAME_EN ? item.EMP_NAME_EN.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInACTIVITY_TITLE_EN = (item: any) =>
                item.ACTIVITY_TITLE_EN ? item.ACTIVITY_TITLE_EN.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInACTION_TYPE_EN = (item: any) =>
                item.ACTION_TYPE_EN ? item.ACTION_TYPE_EN.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item => isTextInEMP_NAME_EN(item) || isTextInACTIVITY_TITLE_EN(item) || isTextInACTION_TYPE_EN(item),
            );
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}