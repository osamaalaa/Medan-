import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { IncidentsModelService } from './incidents.model.service';
import { forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss'],
  providers: [IncidentsModelService, ReportListService]
})
export class IncidentsComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**language */
  lang: string;

  /**Form Data */
  incidentsReportForm: FormGroup;

  /**Loading Spinner */
  isDataLoading: boolean = false;

  /**INCIDENTS COUNT */
  incidentsCount: any;

  /**Search */
  searchText: string = "";

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

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  /**MAPPING EXCEL SERIAL TO DATE FORMAT */
  finalExcelCreationDate: any[] = []

  /**MAPPING EXCEL SERIAL TO DATE FORMAT */
  finalExcelTargetDate: any[] = []

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public incidentsModelService: IncidentsModelService,
    private ui: UIService,
    public translate: TranslateService,
    private reportListService: ReportListService
  ) {
    this.getAllLookups();
    this.createForm();

  }

  ngOnInit() {
    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }
  /**Reactive Form */
  createForm(): void {
    this.incidentsReportForm = this._fb.group({
      p_location_id: [null],
      p_template_id: [null]

    })
  }

  /**ngModelChange event Method for language */
  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  /**Getting current language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allLocations: any[] = [];
  allTemplate: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let locationBody: {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }
    let templateBody: {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }

    forkJoin(
      this.reportsListService.getAllLocations(locationBody),
      this.reportsListService.getAllTemplates(templateBody)
    ).subscribe(
      results => {
        this.isfetchingLookup = false;
        (this.allLocations = results[0].rows),
          this.allTemplate = results[1].rows
      }
    )
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  /**Fetching data */
  fetchData() {
    this.isDataLoading = true;
    let body = this.incidentsReportForm.value
    let payload = {};

    for (var key in body) {
      if (body[key]) {
        payload[key] = body[key].id
      }
    }
    // console.log("daat..." + JSON.stringify(payload))
    this.reportsListService.postIncidentsDetails(payload).subscribe(
      data => {
        this.incidentsModelService.displayData = data.rows
        this.incidentsModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting incidents  No data : ' + error.error.message)
      },
    )
  }

  /**RESET form & table */
  reset() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET form only */
  resetForm() {
    this.incidentsReportForm.reset()
  }

  /**RESET Table only */
  clearTable() {
    this.incidentsModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.incidentsModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.incidentsModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    this.finalExcelCreationDate = []
    this.finalExcelTargetDate = []
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);

    this.domTableData = Object.values(ws);

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData;

    this.dataAfterSlice = this.finalDomTableData.splice(5);

    size = 5;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 5;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.incidentsReportForm.value
    this.locationEnName = body.p_location_id ? body.p_location_id.enName : ''
    this.locationArName = body.p_location_id ? body.p_location_id.arName : ''
    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName, '    ', 'SHIFT:', this.templateEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName, '         ', 'تحول:', this.templateArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();
    if (this.lang == "en") {
      this.titleAr = "Incident Data in Location or Shift Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان الحوادث  للموقع والوردية"
      this.date = "التاريخ والوقت :"
    }
    // console.log('MAINDATA===> ', this.mainData);
    for (var i = 0; i < this.mainData.length; i++) {
      let excelData = this.mainData[i];
      let excelFromDate = excelData[3];

      const finalDate = this.serialToDate(excelFromDate);
      const formatted = this.formattingDate(finalDate);

      excelData.splice(3, 1, formatted)
      this.finalExcelCreationDate.push(excelData);

    }
    for (var i = 0; i < this.finalExcelCreationDate.length; i++) {
      let excelData = this.finalExcelCreationDate[i];
      let excelFromDate = excelData[4];

      const finalDate = this.serialToDate(excelFromDate);
      const formatted = this.formattingDate(finalDate);

      excelData.splice(4, 1, formatted)
      this.finalExcelTargetDate.push(excelData);

    }
    this.finalExcelTargetDate.pop();

    this.incidentsModelService.generateExcel(
      this.finalExcelTargetDate,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }

  /**Formatting Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

  /**CONVERT EXCEL SERIAL-NUMBER TO DATE FORMAT */
  serialToDate(serial: any) {
    // console.log('serial===> ', serial);
    var utc_days = Math.floor(serial - 25569);
    var utc_value = utc_days * 86400;
    var date_info = new Date(utc_value * 1000);
    var fractional_day = serial - Math.floor(serial) + 0.0000001;
    var total_seconds = Math.floor(86400 * fractional_day);
    var seconds = total_seconds % 60;
    total_seconds -= seconds;
    var hours = Math.floor(total_seconds / (60 * 60));
    var minutes = Math.floor(total_seconds / 60) % 60;

    return new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds);
  }

  /**FORMAT DATE AS DD-MM-YYYY */
  formattingDate(date: any): any {
    date = String(date).slice(0, -14)
    const formattedDate = format(date, 'DD-MM-YYYY')
    date = formattedDate
    return date;
  }

}
