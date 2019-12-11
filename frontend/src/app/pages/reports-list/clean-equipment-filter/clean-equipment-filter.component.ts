import { Component, OnInit } from '@angular/core';
import { CleanEquipmentFilterModelService } from './clean-equipment-filter.model.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { CLEAN_EQUIPMENT_FILTER_VALIDATION_MESSAGES } from './clean-equipment-filter.validations.messages';

@Component({
  selector: 'app-clean-equipment-filter',
  templateUrl: './clean-equipment-filter.component.html',
  styleUrls: ['./clean-equipment-filter.component.scss'],
  providers: [CleanEquipmentFilterModelService]
})
export class CleanEquipmentFilterComponent implements OnInit {

  lang: string;

  /**Loading spinner */
  isDataLoading: boolean = false

  // Stored Reactive form Data
  cleanEquipmentFilterForm: FormGroup;

  /**Converted Date */
  finalDate;

  /**Validation messages */
  validation_messages: any = CLEAN_EQUIPMENT_FILTER_VALIDATION_MESSAGES

  displayTable: boolean;

  searchText = '';

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public cleanEquipmentFilterModelService: CleanEquipmentFilterModelService,
    public translate: TranslateService
  ) {
    this.getAllLookups();
    this.createForm();
  }

  ngOnInit() {
    this.onLangugateChange();
    this.fetchCurrentLanguage();
    this.fetchData();
  }

  /**Reactive Form */
  createForm(): void {
    this.cleanEquipmentFilterForm = this._fb.group({
      p_date: [null, [Validators.required]],
      p_equib_serial: [null]
    })
  }

  /**Validation Messages */
  get p_date() {
    return this.cleanEquipmentFilterForm.controls.p_date
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

  /**First Month From Date */
  convertPickedDate() {
    const selectedDate = new Date(this.cleanEquipmentFilterForm.get('p_date').value);
    this.finalDate = this.convertDate(selectedDate);
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  equipSerial: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let assetSerialBody: {
      p_equib_serial: "",
    }

    forkJoin([
      this.reportsListService.getAssetSerial(assetSerialBody)
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.equipSerial = results[0].rows;
      }
    )
  }

  /**Submiting Form */
  async submitForm() {
    await this.convertPickedDate();
    if (this.cleanEquipmentFilterForm.valid) {
      this.fetchData();
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }


  fetchData() {
    let body = this.cleanEquipmentFilterForm.value
    body.p_date = this.finalDate
    this.reportsListService.postCleanEquipmentFilter(body).subscribe(
      data => {
        this.cleanEquipmentFilterModelService.displayData = data.rows;
        this.cleanEquipmentFilterModelService.savedData = data.rows;
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting clean equipment  filter : ' + error.error.message,
        )
      },
    )
  }

  reset() {
    this.resetForm();
    this.clearTable();
    this.fetchData();
  }


  resetForm() {
    this.cleanEquipmentFilterForm.reset()
  }

  clearTable() {
    this.cleanEquipmentFilterModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.cleanEquipmentFilterModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.cleanEquipmentFilterModelService.sortData(sort)
  }

}

