import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { Label } from 'ng2-charts'
import { Subscription } from 'rxjs'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ItemsModelService } from './items.model.service'
import { forkJoin } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [ItemsModelService, ReportListService],
})
export class ItemsComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Form Data */
  itemsReportForm: FormGroup

  /**Spinner */
  isDataLoading: boolean = false

  /**Search */
  searchText: string = ''

  displayTable: boolean

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public itemsModelService: ItemsModelService,
    private ui: UIService,
    private translate: TranslateService,
    private reportListService: ReportListService
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
   // this.fetchData();
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
    this.itemsReportForm = this._fb.group({
      p_item_code: [null],
      p_item_name_en: [null],
      p_item_name_ar: [null],
      p_store_id: [null],
    })
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  itemsUnitList: any[] = []
  getAllLookups() {
    let itemsUnitBody: {
      p_item_code: ''
      p_item_name_en: ''
      p_item_name_ar: ''
      p_store_id: ''
    }
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    forkJoin(
      this.reportsListService.postItemsUnit(itemsUnitBody)).subscribe(results => {
      this.isDataLoading = false;
      this.isfetchingLookup = false;
      this.itemsUnitList = results[0].rows
      //console.table(this.itemsUnitList)
    })
  }


  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  fetchData() {
    let body = this.itemsReportForm.value
    this.isDataLoading = true
    this.reportsListService.postItems(body).subscribe(
      data => {
        this.itemsModelService.displayData = data.rows
        this.itemsModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting items unit : ' + error.error.message)
      },
    )
  }

  reset() {
    this.resetForm();
    this.clearTable();
  //  this.fetchData();
  }


  resetForm() {
    this.itemsReportForm.reset()
  }


  clearTable() {
    this.itemsModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.itemsModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.itemsModelService.sortData(sort)
  }

  public exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Items.xlsx');
  }
}
