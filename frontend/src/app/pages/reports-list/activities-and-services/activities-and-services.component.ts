import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { Subscription } from 'rxjs'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivitesAndServicesModelService } from './activities-and-services.model.service'
import { forkJoin } from 'rxjs'
import * as pluginDataLabels from 'chartjs-plugin-labels'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-activities-and-services',
  templateUrl: './activities-and-services.component.html',
  styleUrls: ['./activities-and-services.component.scss'],
  providers: [ActivitesAndServicesModelService]
})
export class ActivitiesAndServicesComponent implements OnInit {

  /**Language */
  lang: any

  /**Storing Form Data */
  activitesAndServicesForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''


  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public activitesAndServicesModelService: ActivitesAndServicesModelService,
    private ui: UIService,
    private translate: TranslateService,
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage();
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
    this.activitesAndServicesForm = this._fb.group({
      P_TEMPLATE_ID: [null],
      p_location_id: [null],
      p_service_op_type: [null],
    })
  }

  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = [];
  locationList: any[] = [];
  operationData: any[] = [];
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let locationBody = {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }

    let operationType = { p_service_op_type: "" }

    let templateBody = {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }
    forkJoin([
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getAllOperationType(operationType)
    ]).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.templateList = results[0].rows;
        this.locationList = results[1].rows;
        this.operationData = results[2].rows;
      }
    )
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  fetchData() {
    let body = this.activitesAndServicesForm.value
    this.isDataLoading = true;
    this.reportsListService.postActivitiesAndServices(body).subscribe(
      data => {
        console.table(data.rows);
        this.activitesAndServicesModelService.displayData = data.rows
        this.activitesAndServicesModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting activities services data : ' + error.error.message)
      },
    )
  }

  reset() {
    this.resetForm();
    this.clearTable();
    this.fetchData();
  }

  resetForm() {
    this.activitesAndServicesForm.reset()
  }

  clearTable() {
    this.activitesAndServicesModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.activitesAndServicesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.activitesAndServicesModelService.sortData(sort)
  }
}
