import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { Subscription } from 'rxjs'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ShiftStatusModelService } from './shift-status.model.service'
import { forkJoin } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-shift-status',
  templateUrl: './shift-status.component.html',
  styleUrls: ['./shift-status.component.scss'],
  providers: [ShiftStatusModelService, ReportListService]
})
export class ShiftStatusComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  shiftStatusReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Chart Data */
  finalActivitiesEmp: any[] = []

  /**Search Variable */
  searchText: string = ''

  /** */
  displayTable: boolean

  
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { yAxes: [{}], xAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  }
  public barChartLabels: Label[] = []
  public barChartType: string = 'horizontalBar'
  public barChartLegend = true
  public barChartPlugins = []

  public barChartData: ChartDataSets[] = [
    { data: this.finalActivitiesEmp, label: 'Activities For Employee' },
  ]
  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public shiftStatusModelService: ShiftStatusModelService,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Reactive Form */
  createForm(): void {
    this.shiftStatusReportForm = this._fb.group({
      p_location_id: [null],
      p_item_code: [null],
    })
  }
  /**Validation Messages */
  // get p_location_id() {
  //   return this.shiftStatusReportForm.controls.p_location_id;
  // }
  // get p_template_id() {
  //   return this.shiftStatusReportForm.controls.p_template_id;
  // }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allLocations: any[] = []
  itemsUnitList: any[] = []

  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true
    let locationBody: {
      p_loc_name_en: ''
      p_loc_name_ar: ''
    }
    let itemsUnitBody: {
      p_item_code: ''
      p_item_name_en: ''
      p_item_name_ar: ''
      p_store_id: ''
    }

    forkJoin(
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.postItemsUnit(itemsUnitBody),
    ).subscribe(results => {
      this.isDataLoading = false;
      this.isfetchingLookup = false
        ; (this.allLocations = results[0].rows), (this.itemsUnitList = results[1].rows)
    })
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  fetchData() {
    let body = this.shiftStatusReportForm.value
    console.log('body===> ', body)
    this.reportsListService.postShiftStatus(body).subscribe(
      data => {
        console.log('res===> ', data)
        
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting shift-status : ' + error.error.message,
        )
      },
    )
  }

  setTableData(data) {
    this.shiftStatusModelService.displayData = data
    this.shiftStatusModelService.savedData = data
  }



  reset() {
    this.resetForm();
    this.clearTable();
  }


  resetForm() {
    this.shiftStatusReportForm.reset()
  }


  clearTable() {
    this.shiftStatusModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.shiftStatusModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.shiftStatusModelService.sortData(sort)
  }

  public exportToExcel() {

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'Shift-Status.xlsx');
  }

}
