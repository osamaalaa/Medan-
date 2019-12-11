import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class ClosedMeetingsModelService extends TableBase {


  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {
  
    if (searchText) {
      let isTextInMEETING_DESC = (item: any) =>
        item.MEETING_DESC.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

     


      this.displayData = this.savedData.filter(
        item => isTextInMEETING_DESC(item)  ,
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}
