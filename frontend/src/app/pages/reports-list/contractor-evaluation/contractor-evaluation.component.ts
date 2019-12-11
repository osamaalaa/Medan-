import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { UIService } from 'src/app/services/ui.service'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { forkJoin } from 'rxjs'
import { ContractorEvaluationModelService } from './contractor-evaluation.model.service'
import { TranslateService } from '@ngx-translate/core'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-contractor-evaluation',
  templateUrl: './contractor-evaluation.component.html',
  styleUrls: ['./contractor-evaluation.component.scss'],
  providers: [ContractorEvaluationModelService],
})
export class ContractorEvaluationComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  // Stored Reactive form Data
  contractorEvaluationForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

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

  /**storing supplier label in english*/
  supplierEnName: any;

  /**storing supplier label in arabic */
  supplierArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public contractorEvaluationModelService: ContractorEvaluationModelService,
    private translate: TranslateService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()

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
    this.contractorEvaluationForm = this._fb.group({
      p_supp_code: [null],

    })
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  supplierList: any[] = []
  allLocations: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    let supplierCodeBody = { p_supp_code: '' }
    forkJoin([this.reportsListService.postContractorEvaluation(supplierCodeBody),
    ]).subscribe(
      results => {
        this.isfetchingLookup = false
        this.supplierList = results[0].rows
      },
    )
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  /**fetch data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.contractorEvaluationForm.value
    let payload = {};
    if (body.p_supp_code) {
      payload['p_supp_code'] = body.p_supp_code.id
    }
    // console.log("data,,," + JSON.stringify(payload));
    this.reportsListService.postContractorEvaluation(payload).subscribe(
      data => {
        this.contractorEvaluationModelService.displayData = data.rows
        this.contractorEvaluationModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting contractor evaluation : ' + error.error.message,
        )
      },
    )
  }
  /** Reset Table And Form*/
  reset() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET the form inputs */
  resetForm() {
    this.contractorEvaluationForm.reset()
  }

  /**RESET the table */
  clearTable() {
    this.contractorEvaluationModelService.displayData = []
  }


  /** Search  text*/
  searchItems(): void {
    this.contractorEvaluationModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.contractorEvaluationModelService.sortData(sort)
  }

  /**export to excel */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    this.domTableData = Object.values(ws);
    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData;

    this.dataAfterSlice = this.finalDomTableData.splice(3);

    size = 3;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 3;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.contractorEvaluationForm.value
    this.supplierEnName = body.p_supp_code ? body.p_supp_code.enName : ''
    this.supplierArName = body.p_supp_code ? body.p_supp_code.arName : ''
    if (this.lang == "en") {
      this.parameters.push('SUPPLIER-CODE:', this.supplierEnName)
    } else {
      this.parameters.push('رمز المورد:', this.supplierArName)
    }

    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();


    if (this.lang == "en") {
      this.titleAr = "Contractor-Evaluation Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "تقرير تقييم المقاول"
      this.date = "التاريخ والوقت :"
    }

    this.contractorEvaluationModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr,
      this.date);
  }

  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}
