import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class NoOfCupsModelService extends TableBase {
  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {

    if (searchText) {
      let isTextInEN_NAME = (item: any) =>
        item.EN_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInMEASURE_UNIT = (item: any) =>
        item.MEASURE_UNIT.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      this.displayData = this.savedData.filter(
        item => isTextInEN_NAME(item) || isTextInMEASURE_UNIT(item) ,
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

}