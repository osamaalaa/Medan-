import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder } from '@angular/forms'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { UIService } from 'src/app/services/ui.service'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { forkJoin } from 'rxjs'
import { ContractorInformationModelService } from './contractor-information.model.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-contractor-information',
  templateUrl: './contractor-information.component.html',
  styleUrls: ['./contractor-information.component.scss'],
  providers: [ContractorInformationModelService],
})
export class ContractorInformationComponent implements OnInit {

  /**Language */
  lang: any

  // Stored Reactive form Data
  contractorInformationForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Storing Count x-axis */
  finalCount: any[] = []

  /**Search Variable */
  searchText: string = ''

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public contractorInformationModelService: ContractorInformationModelService,
    private translate: TranslateService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
    this.fetchData();
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
    this.contractorInformationForm = this._fb.group({
      p_supp_code: [null],
    })
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  supplierList: any[] = []
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;

    let supplierCodeBody = { p_supp_code: '' }
    forkJoin([this.reportsListService.postContractorEvaluation(supplierCodeBody)]).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.supplierList = results[0].rows
      },
    )
  }



  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  fetchData() {
    let body = this.contractorInformationForm.value
    this.reportsListService.postContractorEvaluation(body).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting contractor informations : ' + error.error.message,
        )
      },
    )
  }

  setTableData(data) {
    this.contractorInformationModelService.displayData = data
    this.contractorInformationModelService.savedData = data
  }

  reset() {
    this.resetForm();
    this.clearTable();
    this.fetchData();
  }

  resetForm() {
    this.contractorInformationForm.reset()
  }


  clearTable() {
    this.contractorInformationModelService.displayData = []
  }


  /** Search  text*/
  searchItems(): void {
    this.contractorInformationModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.contractorInformationModelService.sortData(sort)
  }

}
