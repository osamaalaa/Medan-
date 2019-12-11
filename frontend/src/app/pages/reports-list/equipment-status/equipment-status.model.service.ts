import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class EquipmentStatusModelService extends TableBase {
    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {

        if (searchText) {
            let isTextInASSET_NAME = (item: any) =>
                item.ASSET_NAME ? item.ASSET_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;


            let isTextInSTATUS_ENGLISH = (item: any) =>
                item.STATUS_ENGLISH ? item.STATUS_ENGLISH.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item => isTextInASSET_NAME(item) || isTextInSTATUS_ENGLISH(item) ,
            );
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }

}