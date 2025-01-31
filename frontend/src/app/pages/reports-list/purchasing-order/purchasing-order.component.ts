import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { PurchasingOrderModelService } from './purchasing-order.model.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-purchasing-order',
  templateUrl: './purchasing-order.component.html',
  styleUrls: ['./purchasing-order.component.scss'],
  providers: [PurchasingOrderModelService, ReportListService]
})
export class PurchasingOrderComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string;

  // Stored Reactive form Data
  purchasingReportForm: FormGroup;

  /**Loading spinner */
  isDataLoading: boolean = false;

  /**Search Variable */
  searchText: string = '';

  /**storing Raw Table Data from html Table **/
  domTableData: any[] = [];

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

  /**storing Item label in english*/
  itemEnName: any;

  /**storing Item label in arabic*/
  itemArName: any;

  /**storing Location label in english*/
  locationEnName: any;

  /**storing Location  label in arabic*/
  locationArName: any;

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public purchasingOrderModelService: PurchasingOrderModelService,
    private ui: UIService,
    public translate: TranslateService,
    private reportListService: ReportListService,
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
    this.purchasingReportForm = this._fb.group({
      p_item_code: [null],
      p_item_name_en: [null],
      p_item_name_ar: [null],
      p_store_id: [null],
    })
  }
  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  itemsUnitList: any[] = [];
  getAllLookups() {
    let itemsUnitBody: {
      p_item_code: "",
      p_item_name_en: "",
      p_item_name_ar: ""
    }
    this.isfetchingLookup = true;
    forkJoin(
      this.reportsListService.postItems(itemsUnitBody),
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.itemsUnitList = results[0].rows
      }
    )
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


  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  /**fetch data */
  fetchData() {
    let body = this.purchasingReportForm.value
    let payload = {};
    if (body.p_item_code) {
      payload['p_item_code'] = body.p_item_code.item_code
    }
    this.isDataLoading = true;
    this.reportsListService.postPurchasingOrder(payload).subscribe(
      data => {
        this.isDataLoading = false
        this.purchasingOrderModelService.displayData = data.rows
        this.purchasingOrderModelService.savedData = data.rows
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting items reorder limit : ' + error.error.message)
      },
    )
  }
  /** Reset Table And Form*/
  reset() {
    this.resetForm();
    this.clearTable();
  }
  /**RESET the table */
  clearTable() {
    this.purchasingOrderModelService.displayData = []
  }
  /**RESET the form inputs */
  resetForm() {
    this.purchasingReportForm.reset();
  }
  /** Search  text*/
  searchItems(): void {
    this.purchasingOrderModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.purchasingOrderModelService.sortData(sort)
  }
  /**export to excel */
  public exportToExcel() {
    let dateValue = this.printDate()

    this.mainData = []

    this.parameters = []

    this.itemEnName = ''

    this.itemArName = ''

    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)
    this.domTableData = Object.values(ws)
    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData
    this.dataAfterSlice = this.finalDomTableData.splice(4)
    size = 4
    while (this.dataAfterSlice.length > 0) this.mainData.push(this.dataAfterSlice.splice(0, size))

    var headersArray = [],
      size = 4
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size))
    this.mainHeaders = headersArray[0]

    let body = this.purchasingReportForm.value
    this.itemEnName = body.p_item_code ? body.p_item_code.enName : ''
    this.itemArName = body.p_item_code ? body.p_item_code.arName : ''
    if (this.lang == "en") {
      this.parameters.push('ITEMS NAME:', this.itemEnName)
    } else {
      this.parameters.push('اسم البنود:', this.itemArName)
    }

    let removeComma = [this.parameters.join(' ')]
    let finalParameters = removeComma.toString()

    if (this.lang == "en") {
      this.titleAr = "Items reorder limit Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "حد إعادة الطلب لقطع الغيار"
      this.date = "التاريخ والوقت :"
    }

    this.purchasingOrderModelService.generateExcel(
      this.mainData,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }
  /**FORMATING Date */
  printDate() {
    var date = new Date()
    var str = date.toString()
    var res = str.split('G')
    return res[0]
  }
}
