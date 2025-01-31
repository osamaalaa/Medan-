import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable()
export class ReportsTableModelService extends TableBase {
  constructor() {
    super();
  }

  /** Searches for EN_NAME, ID, EN_DESC in the data and resets data into displayData */
  public searchItems(searchText: string): void {

    if (searchText) {
      let isTextInPRIMARY_NAME = (item: any) =>
        item.PRIMARY_NAME ? item.PRIMARY_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInASSET_NAME = (item: any) =>
        item.ASSET_NAME ? item.ASSET_NAME.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInBOQ_DESCRIPTION = (item: any) =>
        item.BOQ_DESCRIPTION ? item.BOQ_DESCRIPTION.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInJOB_ORDER_STATUS_EN = (item: any) =>
        item.JOB_ORDER_STATUS_EN ? item.JOB_ORDER_STATUS_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInTEMPLATE_NAME_EN = (item: any) =>
        item.TEMPLATE_NAME_EN ? item.TEMPLATE_NAME_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInSERVICE_TITLE_EN = (item: any) =>
        item.SERVICE_TITLE_EN ? item.SERVICE_TITLE_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInSERVICE_TYPE_EN = (item: any) =>
        item.SERVICE_TYPE_EN ? item.SERVICE_TYPE_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      this.displayData = this.savedData.filter(
        item => isTextInPRIMARY_NAME(item) ||
          isTextInASSET_NAME(item) ||
          isTextInBOQ_DESCRIPTION(item) ||
          isTextInJOB_ORDER_STATUS_EN(item) ||
          isTextInTEMPLATE_NAME_EN(item) ||
          isTextInSERVICE_TITLE_EN(item) ||
          isTextInSERVICE_TYPE_EN(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

  //EXPORT TO EXCEL FUNCTION
  generateExcel(mainData, mainHead, parameters, parameters1, dateValue, titleAr, date) {

    //Excel Title, Header, Data
    const title = titleAr + '                                                                         ' + date + dateValue;
    let params = parameters;
    let params1 = parameters1;
    const header = mainHead;
    // data = [[],[],[]];
    const data = mainData;

    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Verdana Sans Serif', family: 4, size: 16, underline: 'single', bold: true, }
    // let subTitleRow = worksheet.addRow(['Date : ' + new Date()])
    worksheet.addRow([]);
    // Add Image
    // let logo = workbook.addImage({
    //   base64: logoFile.logoBase64,
    //   extension: 'png',
    // });
    // worksheet.addImage(logo, 'E1:F3');
    worksheet.mergeCells('A1:G2');

    let paramRow = worksheet.addRow([params])
    paramRow.font = { name: 'Verdana Sans Serif', family: 4, size: 10, bold: true }
    worksheet.mergeCells('A3:G3');

    paramRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    let paramRow1 = worksheet.addRow([params1])
    paramRow1.font = { name: 'Verdana Sans Serif', family: 4, size: 10, bold: true }
    worksheet.mergeCells('A4:G4');

    paramRow1.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })

    //Blank Row 
    worksheet.addRow([]);
    //Add Header Row
    let headerRow = worksheet.addRow(header);

    // Cell Style : Fill and Border
    headerRow.eachCell((cell, number) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFFFFF00' },
        bgColor: { argb: 'FF0000FF' }
      }
      cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    })
    // worksheet.addRows(data);
    // Add Data and Conditional Formatting
    data.forEach(d => {
      let row = worksheet.addRow(d);
      // let qty = row.getCell(5);
      // let color = 'FF99FF99';
      // if (+qty.value < 500) {
      //   color = 'FF9999'
      // }
      // qty.fill = {
      //   type: 'pattern',
      //   pattern: 'solid',
      //   fgColor: { argb: color }
      // }
    }
    );
    worksheet.getColumn(1).width = 20;
    worksheet.getColumn(2).width = 20;
    worksheet.getColumn(3).width = 20;
    worksheet.getColumn(4).width = 20;
    worksheet.getColumn(5).width = 20;
    worksheet.getColumn(6).width = 20;
    worksheet.getColumn(7).width = 30;
    // worksheet.getColumn(4).width = 30;
    worksheet.addRow([]);
    //Footer Row
    let footerRow = worksheet.addRow(['This is system generated excel sheet.']);
    footerRow.getCell(1).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFCCFFE5' }
    };
    footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
    //Merge Cells
    worksheet.mergeCells(`A${footerRow.number}:G${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'StatisticsReport.xlsx');
    })
  }

}