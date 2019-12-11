import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { WorkOrderModelService } from './work-order.model.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { WORK_ORDER_VALIDATION_MESSAGES } from './work-order.validations.messages';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-work-order',
  templateUrl: './work-order.component.html',
  styleUrls: ['./work-order.component.scss'],
  providers: [WorkOrderModelService, ReportListService]
})
export class WorkOrderComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  workOrderReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**Converted Start Date */
  finalStartDate;

  /**Converted End Date */
  finalEndDate;

  /**Validation messages */
  validation_messages: any = WORK_ORDER_VALIDATION_MESSAGES;

  /**storing filtered Table Data */
  finalDomTableData: any[] = [];

  /**storing filtered Table Data */
  finalDomTableHeaders: any[] = [];

  /**storing table headings */
  mainHeaders: any[] = [];

  /**storing main Data (td) */
  mainData = [];

  /**storing Data After slice */
  dataAfterSlice = [];

  /**storing form parameters */
  parameters: any = [];

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  constructor(
    public workOrderModelService: WorkOrderModelService,
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService,
  ) {
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }

  /**ngModelChange event Method for Language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }
  /**Getting current language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Reactive Form */
  createForm(): void {
    this.workOrderReportForm = this._fb.group({
      p_start_date: [null, [Validators.required]],
      p_end_date: [null, [Validators.required]],
    })
  }

  /**Validation Messages */
  get p_start_date() {
    return this.workOrderReportForm.controls.p_start_date;
  }

  get p_end_date() {
    return this.workOrderReportForm.controls.p_end_date;
  }

  /**Converting Date Format In ts file */
  convertDate(selectedDate) {
    const d = selectedDate.getDate();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";

    const m = month[selectedDate.getMonth()];
    const y = selectedDate.getFullYear();

    return d + '-' + m + '-' + y
  }

  /** From Date */
  convertStartDate() {
    const selectedDate = new Date(this.workOrderReportForm.get('p_start_date').value);
    this.finalStartDate = this.convertDate(selectedDate);
  }

  /** End Date */
  convertEndDate() {
    const selectedDate = this.workOrderReportForm.get('p_end_date').value;
    this.finalEndDate = this.convertDate(selectedDate);
  }

  /**Submiting Form */
  async submitForm() {
    if (this.workOrderReportForm.valid) {
      this.isDataLoading = true;
      await this.convertStartDate();
      await this.convertEndDate();
      let body = this.workOrderReportForm.value
      body.p_start_date = this.finalStartDate,
        body.p_end_date = this.finalEndDate,

        this.reportsListService.postWorkOrder(body).subscribe(
          data => {
            // console.table('...=>', data.rows)
            this.workOrderModelService.displayData = data.rows
            this.workOrderModelService.savedData = data.rows
            this.isDataLoading = false
          },
          error => {
            this.isDataLoading = false
            this.ui.createMessage('error', 'Error while getting workOrder No data : ' + error.error.message)
          },
        )
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }

  }

  /** Reset Table And Form*/
  reset() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET the form inputs */
  resetForm() {
    this.workOrderReportForm.reset();
  }
  /**RESET the table */
  clearTable() {
    this.workOrderModelService.displayData = []
  }
  /** Search  text*/
  searchItems(): void {
    this.workOrderModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.workOrderModelService.sortData(sort)
  }
  /**export to excel */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    let domTableData = Object.values(ws);
    domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData;
    this.dataAfterSlice = this.finalDomTableData.splice(4);

    size = 4;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 4;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    this.convertStartDate();
    this.convertEndDate();
    let body = this.workOrderReportForm.value
    body.p_start_date = this.finalStartDate,
      body.p_end_date = this.finalEndDate
    if (this.lang == "en") {
      this.parameters.push('START DATE:', body.p_start_date, '    ', 'END DATE:', body.p_end_date)
    } else {
      this.parameters.push('تاريخ البدء:', body.p_start_date, '               ', 'تاريخ الانتهاء:', body.p_end_date)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.titleAr = "Work Order Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "تقرير ترتيب العمل"
      this.date = "التاريخ والوقت :"
    }

    this.workOrderModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);

  }
  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }
}
