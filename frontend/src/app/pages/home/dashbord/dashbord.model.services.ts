/**
 * @author : srikanth
 * @date : 14/07/2019
 *
 * * Model service for Home Setup ModelService.
 *
 * *Features
 * *  Searching data
 * *  Storing data
 * *  Sorting data
 */
import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';


@Injectable()
export class DashBordSetupModelService extends TableBase {

    constructor() {
        super();
    }


    /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
  
    if (searchText) {
      let isTextInMEETING_DESCRIPTION = (item: any) =>
        item.MEETING_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInCOMMITTEE_NAME_EN = (item: any) =>
        item.COMMITTEE_NAME_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInMEMBERS_COUNT = (item: any) =>
        item.MEMBERS_COUNT.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
          
          let isTextInAPPROVE = (item: any) =>
          item.APPROVE.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;

        let isTextInCOMMENT_COUNT = (item: any) =>
          item.COMMENT_COUNT.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;
  
      


      this.displayData = this.savedData.filter(
        item => isTextInMEETING_DESCRIPTION(item) || isTextInCOMMITTEE_NAME_EN(item) || isTextInMEMBERS_COUNT(item) || isTextInAPPROVE(item)
        || isTextInCOMMENT_COUNT(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}