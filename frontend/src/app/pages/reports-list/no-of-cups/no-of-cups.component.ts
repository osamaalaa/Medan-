import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { forkJoin } from 'rxjs';
import { NO_OF_CUPS_VALIDATION_MESSAGES } from './no-of-cups.validations.messages';
import { NoOfCupsModelService } from './no-of-cups.model.service';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-no-of-cups',
  templateUrl: './no-of-cups.component.html',
  styleUrls: ['./no-of-cups.component.scss'],
  providers: [NoOfCupsModelService]
})
export class NoOfCupsComponent implements OnInit {

  /**Language */
  lang: string;

  // Stored Reactive form Data
  noOfCupsForm: FormGroup;

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**Validation messages */
  validation_messages: any = NO_OF_CUPS_VALIDATION_MESSAGES;

  /**Storing Count x-axis Chart Data */
  finalCount: any[] = [];

  public barChartOptions: ChartOptions = {
    responsive: true,

    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = [];
  public barChartType: string = 'horizontalBar';
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData: ChartDataSets[] = [
    { data: this.finalCount, label: 'ITEM COUNT' }
  ];

  // public barChartColors: Color[] = [
  //   { backgroundColor: 'skyblue' }
  // ]

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public noOfCupsModelService: NoOfCupsModelService,
    public translate: TranslateService
  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage()
    this.fetchData();
  }

  /**Reactive Form */
  createForm(): void {
    this.noOfCupsForm = this._fb.group({
      P_TEMPLATE_ID: [null, [Validators.required]],
      p_location_id: [null, [Validators.required]],
      p_service_type_name: [null, [Validators.required]]
    })
  }

  /**Validation Messages */
  get P_TEMPLATE_ID() {
    return this.noOfCupsForm.controls.P_TEMPLATE_ID;
  }
  get p_location_id() {
    return this.noOfCupsForm.controls.p_location_id;
  }
  get p_service_type_name() {
    return this.noOfCupsForm.controls.p_service_type_name;
  }

  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = [];
  locationList: any[] = [];
  serviceTypeName: any[] = [];
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let locationBody = {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }

    let serviceTypeNameBody = { p_service_type_id: 1 }

    let templateBody = {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }
    forkJoin([
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getAllServiceTypeNames(serviceTypeNameBody)
    ]).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.templateList = results[0].rows;
        // console.table( this.templateList)
        this.locationList = results[1].rows;
        this.serviceTypeName = results[2].rows;
        // console.table(this.serviceTypeName)

      }
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

  /**Submiting Form */
  submitForm() {
    this.clearChart();
    this.clearTable();
    this.fetchData();
  }



  fetchData() {
    let body = this.noOfCupsForm.value
    this.reportsListService.postNoOfCups(body).subscribe(
      data => {
        // console.table(data.rows)
        if (data.rows.length != 0) {
          let chartData = data.rows;
          for (var i = 0; i < chartData.length; i++) {

            let itemCount = chartData[i].ITEM_COUNT;
            this.finalCount.push(itemCount);
            // this.barChartData[0].data.push(itemCount);

            let itemName = chartData[i].EN_NAME;
            this.barChartLabels.push(itemName);
          }
        } else {
          console.log('no data')
        }
        this.setTableData(data.rows)
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

  setTableData(data) {
    this.noOfCupsModelService.displayData = data
    this.noOfCupsModelService.savedData = data
  }

  reset() {
    this.resetForm();
    this.clearChart();
    this.clearTable();
    this.fetchData();
  }


  resetForm() {
    this.noOfCupsForm.reset()
  }

  clearChart() {
    for (var i = 0; i < this.barChartData[0].data.length; i++) {
      this.barChartData[0].data.splice(0)
    }
    this.barChartLabels = []
  }

  clearTable() {
    this.noOfCupsModelService.displayData = []
  }

  events
  public chartClicked({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active)
  }

  public chartHovered({ event, active }: { event: MouseEvent; active: {}[] }): void {
    console.log(event, active)
  }

  /** Search  text*/
  searchItems(): void {
    this.noOfCupsModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.noOfCupsModelService.sortData(sort)
  }

}
