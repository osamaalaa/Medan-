import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { FinesModelService } from './fines.model.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { FINES_VALIDATION_MESSAGES } from './fines.validations.messages';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-fines',
  templateUrl: './fines.component.html',
  styleUrls: ['./fines.component.scss'],
  providers: [FinesModelService, ReportListService]
})
export class FinesComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: string;

  /**Loading spinner */
  isDataLoading: boolean;

  // Stored Reactive form Data
  finesForm: FormGroup;

  /**Validation messages */
  validation_messages: any = FINES_VALIDATION_MESSAGES;

  searchText: string = "";

  /**Converted Start Date */
  finalStartDate;

  /**Converted End Date */
  finalEndDate;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public finesModelService: FinesModelService,
    public translate: TranslateService,
    private reportListService: ReportListService,
  ) { }

  ngOnInit() {
    this.getAllLookups();
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
   // this.fetchData();
  }

  /**Reactive Form */
  createForm(): void {
    this.finesForm = this._fb.group({
      p_from_date: [null, [Validators.required]],
      p_to_date: [null, [Validators.required]],
      p_location_id: [null],
      p_template_id: [null],
    })
  }

  /**Validation Messages */
  get p_from_date() {
    return this.finesForm.controls.p_from_date;
  }
  get p_to_date() {
    return this.finesForm.controls.p_to_date;
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

  /** From Date */
  convertStartDate() {
    if(!this.finesForm.get('p_from_date').value){
      return
    }
    const selectedDate = new Date(this.finesForm.get('p_from_date').value);
    this.finalStartDate = this.convertDate(selectedDate);
  }

  /** End Date */
  convertEndDate() {
    if(!this.finesForm.get('p_to_date').value){
      return
    }
    const selectedDate = this.finesForm.get('p_to_date').value;
    this.finalEndDate = this.convertDate(selectedDate);
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allLocations: any[] = []
  allTemplate: any[] = []

  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true
    let locationBody: {
      p_loc_name_en: ''
      p_loc_name_ar: ''
    }
    let templateBody: {
      p_shift_name_en: ''
      p_shift_name_ar: ''
    }

    forkJoin(
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getAllTemplates(templateBody),
    ).subscribe(results => {
      this.isDataLoading = false;
      this.isfetchingLookup = false
        ; (this.allLocations = results[0].rows), (this.allTemplate = results[1].rows)
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

  /**Submiting Form */
  async submitForm() {
    await this.convertStartDate();
    await this.convertEndDate();

    this.fetchData();
  }

  fetchData() {
    this.isDataLoading = true
    let body = this.finesForm.value;
    body.p_from_date = this.finalStartDate,
      body.p_to_date = this.finalEndDate,
      this.reportsListService.postFines(body).subscribe(
        data => {
          console.table(data.rows)
          this.setTableData(data.rows)
          this.isDataLoading = false
        },
        error => {
          this.isDataLoading = false
          this.ui.createMessage(
            'error',
            'Error while getting fines  No data : ' + error.error.message,
          )
        },
      )
  }

  setTableData(data) {
    this.finesModelService.displayData = data
    this.finesModelService.savedData = data
  }

  reset() {
    this.resetForm();
    this.clearTable();
  }

  resetForm() {
    this.finesForm.reset()
  }

  clearTable() {
    this.finesModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.finesModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.finesModelService.sortData(sort)
  }

  public exportToExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'Fines.xlsx');
  }

}
