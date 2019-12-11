import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { CleanBasesModelService } from './clean-bases.model.service';
import { forkJoin } from 'rxjs';
import { CLEAN_BASES_VALIDATION_MESSAGES } from './clean-bases.validations.messages';
import { TranslateService } from '@ngx-translate/core';
import { ReportListService } from '../reports-list.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-clean-bases',
  templateUrl: './clean-bases.component.html',
  styleUrls: ['./clean-bases.component.scss'],
  providers: [CleanBasesModelService,ReportListService]
})
export class CleanBasesComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef 
  
  lang: string;

  /**Storing Form Data */
  cleanBasesReportForm: FormGroup;

  /**Loading spinner */
  isDataLoading: boolean = false;

  /**show or hide */
  displayTable: boolean;

  /**count data */
  cleanBasesCount: any;

  /**Converted Start Date */
  finalStartDate;

  /**Converted End Date */
  finalEndDate;

  /**Search Variable */
  searchText: string = ''


  /**Validation messages */
  validation_messages: any = CLEAN_BASES_VALIDATION_MESSAGES;

  finalCleanCount: any[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{}], xAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  //public barChartType: string = 'horizontalBar';
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: this.finalCleanCount, label: 'CLEAN BASES COUNT' },
  ];

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public cleanBasesModelService: CleanBasesModelService,
    private ui: UIService,
    public translate: TranslateService,
    public reportListService: ReportListService,
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();

  }
  /**Reactive Form */
  createForm(): void {
    this.cleanBasesReportForm = this._fb.group({
      p_start_date: [null, [Validators.required]],
      p_end_date: [null, [Validators.required]],
      p_location_id: [null, [Validators.required]],
      p_service_type_en: [null],
    
      p_item_code: [null]

    })
  }

  /**Validation Messages */
  get p_start_date() {
    return this.cleanBasesReportForm.controls.p_start_date;
  }

  get p_end_date() {
    return this.cleanBasesReportForm.controls.p_end_date;
  }

  get p_location_id() {
    return this.cleanBasesReportForm.controls.p_location_id;
  }

  isfetchingLookup: boolean = false
  allLocations: any[] = [];
  serviceTypeName: any[] = [];
  itemsUnitList: any[] = []

  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let locationBody: {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }
    let serviceTypeNameBody = { p_service_type_id: 1 }

    let itemsUnitBody: {
      p_item_code: ''
      p_item_name_en: ''
      p_item_name_ar: ''
      p_store_id: ''
    }

    forkJoin(
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getLookUps(181),
      this.reportsListService.postItemsUnit(itemsUnitBody)
    ).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.allLocations = results[0].rows,
          this.serviceTypeName = results[1].rows;
          this.itemsUnitList = results[2].rows;
      }
    )
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
    const selectedDate = new Date(this.cleanBasesReportForm.get('p_start_date').value);
    this.finalStartDate = this.convertDate(selectedDate);
  }

  /** End Date */
  convertEndDate() {
    const selectedDate = this.cleanBasesReportForm.get('p_end_date').value;
    this.finalEndDate = this.convertDate(selectedDate);
  }

  /**Submiting Form */
  async submitForm() {
    await this.convertStartDate();
    await this.convertEndDate();
    this.clearChart();
    let body = this.cleanBasesReportForm.value
    console.log("body..." + body);

    body.p_start_date = this.finalStartDate,
      body.p_end_date = this.finalEndDate,
      
      this.isDataLoading = true;
      console.log("datat..."+JSON.stringify(body));
      this.cleanBasesData(body)
    this.reportsListService.postCleanBases(body).subscribe(
      data => {
        this.isDataLoading = false
        if (data.rows.length != 0) {
          let chartData = data.rows;
          let count = data.rows[0].JOB_ORDER_COUNT;
          this.cleanBasesCount = count;
          this.displayTable = true;
          for (var i = 0; i < chartData.length; i++) {
            let itemCount = chartData[i].JOB_ORDER_COUNT
            this.finalCleanCount.push(itemCount)

            let itemName = 'CLEAN BASES COUNT'
            this.barChartLabels.push(itemName)
          }

        } else {
          console.log('no data');
        }
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting clean bases  No data : ' + error.error.message)
      },
    )

  }

  cleanBasesData(body)
  {
    console.log("body..."+JSON.stringify(body));
    this.reportsListService.postCleanBasesData(body).subscribe(
      data => {
        console.table(data.rows)
        this.cleanBasesModelService.displayData = data.rows
        this.cleanBasesModelService.savedData = data.rows
       // this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting activities All : ' + error.error.message,
        )
      },
    )
  }

  

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {

      this.lang = lang.lang
      console.log(this.lang)
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  reset() {
    this.resetForm();
    this.clearCount();
    this.clearChart();
    this.clearTable();
  }

  clearTable() {
    this.cleanBasesModelService.displayData = []
  }

  resetForm() {
    this.cleanBasesReportForm.reset()
    this.displayTable = false;
  }

  clearChart() {
    for (var i = 0; i < this.barChartData[0].data.length; i++) {
      this.barChartData[0].data.splice(0)
    }
    this.barChartLabels = []
  }

  clearCount() {
    this.cleanBasesCount = '';
  }

  /** Search  text*/
  searchItems(): void {
    this.cleanBasesModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.cleanBasesModelService.sortData(sort)
  }

  public exportToExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
   // XLSX.writeFile(wb, 'Employee-Activities.xlsx');
   XLSX.writeFile(wb, 'Clean-Bases.xlsx');
  }

}


