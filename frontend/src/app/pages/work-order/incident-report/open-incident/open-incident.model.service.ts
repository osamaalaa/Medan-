import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class OpenIncidentModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
  
    if (searchText) {
      let isTextInINCIDENT_BRIEF = (item: any) =>
      item.INCIDENT_BRIEF ? item.INCIDENT_BRIEF.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInINCIDENT_TITLE = (item: any) =>
      item.INCIDENT_TITLE ? item.INCIDENT_TITLE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 :false;

    
      this.displayData = this.savedData.filter(
        item => isTextInINCIDENT_BRIEF(item) || isTextInINCIDENT_TITLE(item) ,
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}