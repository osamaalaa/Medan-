import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { UIService } from 'src/app/services/ui.service'
import { VarianceTableModelService } from './variance-table.model.service'
import { VarianceReportsService } from '../variance-reports.service'
import { Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-variance-table',
  templateUrl: './variance-table.component.html',
  styleUrls: ['./variance-table.component.scss'],
  providers: [VarianceTableModelService]
})
export class VarianceTableComponent implements OnInit, OnDestroy {

  @ViewChild('TABLE') table: ElementRef

  parameters: any = [];

  projectLabel: any = [];

  lang: any

  isDataLoading: boolean = false

  searchText: string = ''

  constructor(
    public varianceTableModelService: VarianceTableModelService,
    private ui: UIService,
    private varianceReportsService: VarianceReportsService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getSearchResponseListener();
    this.getResetResponseListener();
    this.getSearchResponseBodyListener();
    this.getSearchResponseProjectLabelListener();
    //this.getChartTableData();
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

  /**event driven subscription (listening)*/
  searchTableSubscription: Subscription
  getSearchResponseListener() {
    this.searchTableSubscription = this.varianceReportsService.getSearchResponseTable().subscribe(data => {
      // console.table(data.searchResponse.rows)
      this.varianceTableModelService.displayData = data.searchResponse.rows
      this.varianceTableModelService.savedData = data.searchResponse.rows
    })
  }

  /**event driven subscription (listening)*/
  searchBodySubscription: Subscription
  getSearchResponseBodyListener() {
    this.searchTableSubscription = this.varianceReportsService.getSearchResponseBody().subscribe(data => {
      // console.log('searchParams===> ', data)
      this.parameters = data.searchResponse;
      // console.log('parameters===> ', this.parameters.p_from_date)
      // this.reportsTableModelService.displayData = data.searchResponse.rows
      // this.reportsTableModelService.savedData = data.searchResponse.rows
    })
  }

  /**event driven subscription (listening)*/
  searchProjectLabelSubscription: Subscription
  getSearchResponseProjectLabelListener() {
    this.searchProjectLabelSubscription = this.varianceReportsService.getSearchResponseProjectLabel().subscribe(data => {
      console.log('searchParamsLBAEL===> ', data)
      this.projectLabel = data.searchResponse;
      // console.log('parameters===> ', this.parameters.p_from_date)
      // this.reportsTableModelService.displayData = data.searchResponse.rows
      // this.reportsTableModelService.savedData = data.searchResponse.rows
    })
  }

  resetSubscription: Subscription
  getResetResponseListener() {
    this.resetSubscription = this.varianceReportsService.getResetResponse().subscribe(data => {
      if (data === 'reset') {
        this.varianceTableModelService.displayData = []
        this.varianceTableModelService.savedData = []
      }
    })
  }

  /** Search  text*/
  searchItems(): void {
    this.varianceTableModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.varianceTableModelService.sortData(sort)
  }



  public exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Report.xlsx');
  }

  ngOnDestroy() {
    if (this.searchTableSubscription || this.resetSubscription || this.searchProjectLabelSubscription) {
      this.searchTableSubscription.unsubscribe();
      this.resetSubscription.unsubscribe();
      this.searchProjectLabelSubscription.unsubscribe();
    }
  }

}
