import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class IncidentReportDataModelService extends TableBase {


  constructor(

  ) {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {

    if (searchText) {

      let isTextInDESCRIPTION = (item: any) =>
        item.DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1;

      let isTextInPRIMARY_NAME = (item: any) =>
      item.PRIMARY_NAME ? item.PRIMARY_NAME.toString()
        .toLowerCase()
        .indexOf(searchText.toString().toLowerCase()) !== -1:false;


      this.displayData = this.savedData.filter(
        item => isTextInDESCRIPTION(item) ||
        isTextInPRIMARY_NAME(item)
      )
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }


}