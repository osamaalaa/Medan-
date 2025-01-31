import { Injectable } from '@angular/core'
import { TableBase } from 'src/app/common/Table-base';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';

@Injectable()
export class ContractorEvaluationModelService extends TableBase {
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

      let isTextInCLASSIFICATION_EN = (item: any) =>
        item.CLASSIFICATION_EN ? item.CLASSIFICATION_EN.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      let isTextInSUPPLIER_CODE = (item: any) =>
        item.SUPPLIER_CODE ? item.SUPPLIER_CODE.toString()
          .toLowerCase()
          .indexOf(searchText.toString().toLowerCase()) !== -1 : false;

      this.displayData = this.savedData.filter(
        item => isTextInEN_NAME(item) || isTextInCLASSIFICATION_EN(item) || isTextInSUPPLIER_CODE(item),
      );
    } else {
      this.displayData = this.savedData
    }
    this.displayData = [...this.displayData] // refresh
  }

  //EXPORT TO EXCEL FUNCTION
  generateExcel(mainData, mainHead, parameters, dateValue, titleAr, date) {

    //Excel Title, Header, Data
    const title = titleAr + '                   ' + date + dateValue;
    let params = parameters;
    const header = mainHead;
    const data = mainData;
    //Create workbook and worksheet
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet('Report Data');
    //Add Row and formatting
    let titleRow = worksheet.addRow([title]);
    titleRow.font = { name: 'Verdana Sans Serif', family: 4, size: 16, underline: 'single', bold: true, }

    worksheet.addRow([]);
    worksheet.mergeCells('A1:C2');

    let paramRow = worksheet.addRow([params])
    paramRow.font = { name: 'Verdana Sans Serif', family: 4, size: 14, bold: true }
    worksheet.addRow([]);
    worksheet.mergeCells('A3:C4');

    paramRow.eachCell((cell, number) => {
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
    }
    );

    worksheet.getColumn(1).width = 40;
    worksheet.getColumn(2).width = 40;
    worksheet.getColumn(3).width = 40;
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
    worksheet.mergeCells(`A${footerRow.number}:C${footerRow.number}`);
    //Generate Excel File with given name
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Contractor-EvaluationReport.xlsx');
    })
  }

}