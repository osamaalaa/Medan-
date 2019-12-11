import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { EmployeesIssuesModelService } from './employees-issues.model.service'
import { forkJoin } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import * as XLSX from 'xlsx';
import { ReportListService } from '../reports-list.service';

@Component({
  selector: 'app-employees-issues',
  templateUrl: './employees-issues.component.html',
  styleUrls: ['./employees-issues.component.scss'],
  providers: [EmployeesIssuesModelService, ReportListService],
})
export class EmployeesIssuesComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**language */
  lang: any

  /**Form Data */
  employeesIssuesReportForm: FormGroup

  /**Loading Spinner */
  isDataLoading: boolean

  /**Search */
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

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public employeesIssuesModelService: EmployeesIssuesModelService,
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
  }

  /**ngModelChange event Model for language */
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
    this.employeesIssuesReportForm = this._fb.group({
      p_location_id: [null],
      p_template_id: [null],
    })
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allLocations: any[] = []
  allTemplate: any[] = []

  getAllLookups() {
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
      this.isfetchingLookup = false
        ; (this.allLocations = results[0].rows), (this.allTemplate = results[1].rows)
    })
  }

  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  /**Fetching data */
  fetchData() {
    let body = this.employeesIssuesReportForm.value

    let payload = {};

    for (var key in body) {
      if (body[key]) {
        payload[key] = body[key].id
      }

    }
    //  console.log('body===> ', payload);
    this.isDataLoading = true
    this.reportsListService.postEmployeesIssues(payload).subscribe(
      data => {
        this.employeesIssuesModelService.displayData = data.rows
        this.employeesIssuesModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting employees issues data : ' + error.error.message,
        )
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
    this.employeesIssuesReportForm.reset()
  }

  /**RESET Table only */
  clearTable() {
    this.employeesIssuesModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.employeesIssuesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.employeesIssuesModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
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

    this.dataAfterSlice = this.finalDomTableData.splice(4);

    size = 4;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 4;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];

    let body = this.employeesIssuesReportForm.value
    this.locationEnName = body.p_location_id ? body.p_location_id.enName : ''
    this.locationArName = body.p_location_id ? body.p_location_id.arName : ''

    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName, '     ', 'SHIFT:', this.templateEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName, '             ', 'تحول:', this.templateArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();
    if (this.lang == "en") {
      this.titleAr = "Employees Violations Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "محضر مخالفات العاملين"
      this.date = "التاريخ والوقت :"
    }

    this.employeesIssuesModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);

  }

  /**Formatting date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}
