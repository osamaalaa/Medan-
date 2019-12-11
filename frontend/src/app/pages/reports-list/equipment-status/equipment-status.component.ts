import { Component, OnInit } from '@angular/core';
import { EquipmentStatusModelService } from './equipment-status.model.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-equipment-status',
  templateUrl: './equipment-status.component.html',
  styleUrls: ['./equipment-status.component.scss'],
  providers: [EquipmentStatusModelService]
})
export class EquipmentStatusComponent implements OnInit {

  /**Language */
  lang: string;

  /**Loading spinner */
  isDataLoading: boolean = false

  // Reactive form Data
  equipmentStatusForm: FormGroup;

  /**Search */
  searchText = '';

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public equipmentStatusModelService: EquipmentStatusModelService,
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
    this.equipmentStatusForm = this._fb.group({
      p_equib_serial: [null]
    })
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

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  equipSerial: any[] = [];
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let assetSerialBody: {
      ASSET_SERIAL: "",
    }

    forkJoin([
      this.reportsListService.getAssetSerial(assetSerialBody)
    ]).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.equipSerial = results[0].rows;
      }
    )
  }

  /**Submiting Form */
  submitForm() {

    if (this.equipmentStatusForm.valid) {
      this.fetchData();
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  fetchData() {
    let body = this.equipmentStatusForm.value;
    console.log("data..." + JSON.stringify(body))
    this.reportsListService.postEquipmentStatus(body).subscribe(data => {
      console.log('output==>', data)
      this.equipmentStatusModelService.displayData = data.rows;
      this.equipmentStatusModelService.savedData = data.rows;
    })
  }

  reset() {
    this.resetForm();
    this.clearTable();
    this.fetchData();
  }

  resetForm() {
    this.equipmentStatusForm.reset()
  }

  clearTable() {
    this.equipmentStatusModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.equipmentStatusModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.equipmentStatusModelService.sortData(sort)
  }

}

