import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';

@Injectable()
export class FinesModelService extends TableBase {
  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {

    if (searchText) {
      let isTextInISSUE_TITLE = (item: any) =>
        item.ISSUE_TITLE ? item.ISSUE_TITLE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInISSUE_TYPE_EN = (item: any) =>
        item.ISSUE_TYPE_EN ? item.ISSUE_TYPE_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInISSUE_SUMMARY = (item: any) =>
        item.ISSUE_SUMMARY ? item.ISSUE_SUMMARY.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      this.displayData = this.savedData.filter(
        item => isTextInISSUE_TITLE(item) || isTextInISSUE_TYPE_EN(item) || isTextInISSUE_SUMMARY(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

}