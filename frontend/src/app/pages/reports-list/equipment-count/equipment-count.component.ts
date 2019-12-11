import { Component, OnInit } from '@angular/core';
import { EquipmentCountModelService } from './equipment-count.model.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-equipment-count',
  templateUrl: './equipment-count.component.html',
  styleUrls: ['./equipment-count.component.scss'],
  providers: [EquipmentCountModelService]
})
export class EquipmentCountComponent implements OnInit {

  /**Language */
  lang: any

  /**Storing Form Data */
  equipmentCountReportForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**STORING EQUIPMENT COUNT */
  equipmentCount;

  /**show hide */
  displayTable: boolean;

  constructor(
    public equipmentCountModelService: EquipmentCountModelService,
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    private ui: UIService,
    private translate: TranslateService,

  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
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
    this.equipmentCountReportForm = this._fb.group({
      p_loc_id: [null],
      p_template_id: [null],
    })
  }



  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
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
        // console.table( this.templateList)
        this.locationList = results[1].rows;
        // console.table(this.locationList)

      }
    )
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData()
  }

  fetchData() {
    let body = this.equipmentCountReportForm.value
    this.reportsListService.postEquipmentCount(body).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
        if (data.rows.length != 0) {
          let chartData = data.rows;
          let count = data.rows[0].EQUIBMENT_COUNT;
          this.equipmentCount = count;
          this.displayTable = true;

        } else {
          console.log('no data');
        }
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting equipment count data : ' + error.error.message,
        )
      },
    )
  }

  setTableData(data) {
    console.log('===>', data)
    this.equipmentCountModelService.displayData = data
    this.equipmentCountModelService.savedData = data
  }

  reset() {
    this.resetForm();
    this.clearTable();
    this.fetchData();
  }

  resetForm() {
    this.equipmentCountReportForm.reset()
  }

  clearTable() {
    this.equipmentCountModelService.displayData = []
  }

}
