import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class MyCommitteeMeetingModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
     
    if (searchText) {
      let isTextInCOMMITTEE_NAME_EN = (item: any) =>
        item.COMMITTEE_NAME_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInACTIVE_MEETINGS = (item: any) =>
        item.ACTIVE_MEETINGS.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInMEMBERS_COUNT = (item: any) =>
        item.MEMBERS_COUNT.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;
          
          let isTextInFINISHED_MEETINGS = (item: any) =>
          item.FINISHED_MEETINGS.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;

        let isTextInCLOSED_MEETINGS = (item: any) =>
          item.CLOSED_MEETINGS.toString()
            .toLowerCase()
            .indexOf(searchText.toString().toLowerCase()) !== -1;
  
      


      this.displayData = this.savedData.filter(
        item => isTextInCOMMITTEE_NAME_EN(item) || isTextInACTIVE_MEETINGS(item) || isTextInMEMBERS_COUNT(item) || isTextInFINISHED_MEETINGS(item)
        || isTextInCLOSED_MEETINGS(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}
