import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class CleanBasesModelService extends TableBase {
    constructor() {
        super();
    }

    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
    public searchItems(searchText: string): void {

        if (searchText) {
            let isTextInEN_NAME = (item: any) =>
                item.EN_NAME ? item.EN_NAME.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInEN_DESCRIPTION = (item: any) =>
                item.EN_DESCRIPTION ? item.EN_DESCRIPTION.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInMEASURE_UNIT = (item: any) =>
                item.MEASURE_UNIT ? item.MEASURE_UNIT.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInALL_ITEMS_EXCEPT_RESERVED = (item: any) =>
                item.ALL_ITEMS_EXCEPT_RESERVED ? item.ALL_ITEMS_EXCEPT_RESERVED.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            let isTextInALL_ITEMS_INCLUDE_RESERVED = (item: any) =>
                item.ALL_ITEMS_INCLUDE_RESERVED ? item.ALL_ITEMS_INCLUDE_RESERVED.toString()
                    .toLowerCase()
                    .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

            this.displayData = this.savedData.filter(
                item => isTextInEN_NAME(item) || isTextInEN_DESCRIPTION(item) || isTextInMEASURE_UNIT(item) || isTextInALL_ITEMS_EXCEPT_RESERVED(item) || isTextInALL_ITEMS_INCLUDE_RESERVED(item),
            );
        } else {
            this.displayData = this.savedData
        }
        this.displayData = [...this.displayData] // refresh
    }


}