import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { forkJoin } from 'rxjs';
import { CLEAN_EQUIPMENT_COUNT_VALIDATION_MESSAGES } from './clean-equipment-count.validations.messages';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { CleanEquipmentCountModelService } from './clean-equipment-count.model.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-clean-equipment-count',
  templateUrl: './clean-equipment-count.component.html',
  styleUrls: ['./clean-equipment-count.component.scss'],
  providers: [CleanEquipmentCountModelService]
})
export class CleanEquipmentCountComponent implements OnInit {

  /**Language */
  lang: string;

  // Stored Reactive form Data
  cleanEquipmentForm: FormGroup;

  /**Validation messages */
  validation_messages: any = CLEAN_EQUIPMENT_COUNT_VALIDATION_MESSAGES;

  /**Storing Count x-axis */
  finalCount: any[] = [];

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

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
    public cleanEquipmentCountModelService: CleanEquipmentCountModelService,
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
    this.cleanEquipmentForm = this._fb.group({
      p_template_id: [null, [Validators.required]],
      p_location_id: [null, [Validators.required]],
    })
  }

  /**Validation Messages */
  get p_template_id() {
    return this.cleanEquipmentForm.controls.p_template_id;
  }
  get p_location_id() {
    return this.cleanEquipmentForm.controls.p_location_id;
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = [];
  locationList: any[] = [];
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let locationBody = {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }

    let templateBody = {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }
    forkJoin([
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllLocations(locationBody),
    ]).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.templateList = results[0].rows;
        this.locationList = results[1].rows;

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
    let body = this.cleanEquipmentForm.value
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
    this.cleanEquipmentCountModelService.displayData = data
    this.cleanEquipmentCountModelService.savedData = data
  }

  reset() {
    this.resetForm();
    this.clearChart();
    this.clearTable();
    this.fetchData();
  }

  resetForm() {
    this.cleanEquipmentForm.reset()
  }

  clearChart() {
    for (var i = 0; i < this.barChartData[0].data.length; i++) {
      this.barChartData[0].data.splice(0)
    }
    this.barChartLabels = []
  }

  clearTable() {
    this.cleanEquipmentCountModelService.displayData = []
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
    this.cleanEquipmentCountModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.cleanEquipmentCountModelService.sortData(sort)
  }

}
