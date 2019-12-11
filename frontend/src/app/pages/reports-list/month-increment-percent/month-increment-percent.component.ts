import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MonthIncrementPercentModelService } from './month-increment-percent.model.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UIService } from 'src/app/services/ui.service';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { forkJoin } from 'rxjs';
import { MONTH_INCREMENT_PERCENT_VALIDATION_MESSAGES } from './month-increment-percent.validations.messages';
import { TranslateService } from '@ngx-translate/core';
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx'
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-month-increment-percent',
  templateUrl: './month-increment-percent.component.html',
  styleUrls: ['./month-increment-percent.component.scss'],
  providers: [MonthIncrementPercentModelService, ReportListService]
})
export class MonthIncrementPercentComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**storing current language */
  lang: string;

  // Stored Reactive form Data
  monthIncrementPercentForm: FormGroup;

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Validation messages */
  validation_messages: any = MONTH_INCREMENT_PERCENT_VALIDATION_MESSAGES;

  /**Converted First Month Start Date */
  finalFirstMonthStartDate;

  /**Converted First Month End Date */
  finalFirstMonthEndDate;

  /**Converted Second Month Start Date */
  finalSecondMonthStartDate;

  /**Converted Second Month End Date */
  finalSecondMonthEndDate;

  /**storing text entered for searching*/
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

  /**storing form parameters for row1 */
  parameters: any = [];

  /**storing form parameters for row2 */
  parameter1: any = [];

  /**storing form parameters for row3 */
  parameter2: any = [];

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  /**storing item name in english */
  itemEnName: any;

  /**storing item name in arabic */
  itemArName: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  /**Stoing location name in english */
  locationEnName: any;

  /**Stoing location name in arabic */
  locationArName: any;

  constructor(
    private _fb: FormBuilder,
    private ui: UIService,
    private reportsListService: ReportsListService,
    public monthIncrementPercentModelService: MonthIncrementPercentModelService,
    public translate: TranslateService,
    private reportListService: ReportListService,
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
    this.monthIncrementPercentForm = this._fb.group({
      p_first_month_start_date: [null, [Validators.required]],
      p_first_month_end_date: [null, [Validators.required]],
      p_second_month_start_date: [null, [Validators.required]],
      p_second_month_end_date: [null, [Validators.required]],
      p_item_code: [null],
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

  /**getting current language */
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Validation Messages */
  get p_first_month_start_date() {
    return this.monthIncrementPercentForm.controls.p_first_month_start_date;
  }
  get p_first_month_end_date() {
    return this.monthIncrementPercentForm.controls.p_first_month_end_date;
  }
  get p_second_month_start_date() {
    return this.monthIncrementPercentForm.controls.p_second_month_start_date;
  }
  get p_second_month_end_date() {
    return this.monthIncrementPercentForm.controls.p_second_month_end_date;
  }
  get p_item_code() {
    return this.monthIncrementPercentForm.controls.p_item_code;
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
  convertFirstMonthStartDate() {
    const selectedDate = new Date(this.monthIncrementPercentForm.get('p_first_month_start_date').value);
    this.finalFirstMonthStartDate = this.convertDate(selectedDate);
  }

  /**First Month End Date */
  convertFirstMonthEndDate() {
    const selectedDate = this.monthIncrementPercentForm.get('p_first_month_end_date').value;
    this.finalFirstMonthEndDate = this.convertDate(selectedDate);
  }

  /**Second Month Start Date */
  convertSecondMonthStartDate() {
    const selectedDate = this.monthIncrementPercentForm.get('p_second_month_start_date').value;
    this.finalSecondMonthStartDate = this.convertDate(selectedDate);
  }

  /**Second Month End Date */
  convertSecondMonthEndDate() {
    const selectedDate = this.monthIncrementPercentForm.get('p_second_month_end_date').value;
    this.finalSecondMonthEndDate = this.convertDate(selectedDate);
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  itemsList: any[] = [];
  allLocations: any[] = [];
  templateList: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;
    let itemsUnitBody: {
      p_item_code: "",
      p_item_name_en: "",
      p_item_name_ar: ""
    }
    let templateBody = {
      p_shift_name_en: '',
      p_shift_name_ar: '',
    }

    forkJoin([
      this.reportsListService.postItems(itemsUnitBody),
      this.reportsListService.getAllProjectsAndLocations(),
      this.reportsListService.getAllTemplates(templateBody)
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.itemsList = results[0].rows;
        this.allLocations = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null)
        this.templateList = results[2].rows;
      }
    )
  }

  /**Submiting Form */
  async submitForm() {
    this.isDataLoading = true;
    this.clearTable();
    await this.convertFirstMonthStartDate();
    await this.convertFirstMonthEndDate();
    await this.convertSecondMonthStartDate();
    await this.convertSecondMonthEndDate();
    if (this.monthIncrementPercentForm.valid) {
      let body = this.monthIncrementPercentForm.value
      let payload = {};
      if (body.p_item_code) {
        payload['p_item_code'] = body.p_item_code.item_code
      }
      for (var key in body) {
        if (key == "p_location_id" && body[key]) {
          payload[key] = body[key]
        } else {
          if (body[key]) {
            payload[key] = body[key].id
          }

        }
      }

      payload['p_first_month_start_date'] = this.finalFirstMonthStartDate
      payload['p_first_month_end_date'] = this.finalFirstMonthEndDate
      payload['p_second_month_start_date'] = this.finalSecondMonthStartDate
      payload['p_second_month_end_date'] = this.finalSecondMonthEndDate
      this.getLocationNameById(body.p_location_id)
      // console.log("body...>" + JSON.stringify(payload));
      this.reportsListService.postMonthIncrementPercentage(payload).subscribe(data => {
        this.isDataLoading = false
        this.monthIncrementPercentModelService.displayData = data.rows;
        this.monthIncrementPercentModelService.savedData = data.rows;
      })
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }

  }

  /**getting location label by id */
  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    this.reportsListService.getLocationNameById(locId).subscribe(data => {
      this.locationEnName = data.rows[0].LABEL_EN
      this.locationArName = data.rows[0].LABEL_AR
    })
  }

  /**RESET form and table */
  reset() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET form only */
  resetForm() {
    this.monthIncrementPercentForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.monthIncrementPercentModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.monthIncrementPercentModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.monthIncrementPercentModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    this.parameter1 = [];
    this.parameter2 = [];
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

    let body = this.monthIncrementPercentForm.value
    this.convertFirstMonthStartDate();
    this.convertFirstMonthEndDate();
    this.convertSecondMonthStartDate();
    this.convertSecondMonthEndDate();
    body.p_first_month_start_date = this.finalFirstMonthStartDate,
      body.p_first_month_end_date = this.finalFirstMonthEndDate,
      body.p_second_month_start_date = this.finalSecondMonthStartDate,
      body.p_second_month_end_date = this.finalSecondMonthEndDate
    this.itemEnName = body.p_item_code ? body.p_item_code.enName : ''
    this.itemArName = body.p_item_code ? body.p_item_code.arName : ''
    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''
    if (this.lang == "en") {
      this.parameters.push('FIRST-MONTH-START-DATE:', body.p_first_month_start_date, '    ',
        'FIRST-MONTH-END-DATE:', body.p_first_month_end_date, '    ',

        'ITEM-NAME:', this.itemEnName)
    } else {
      this.parameters.push('بداية الشهر الأول:', body.p_first_month_start_date, '    ',
        'نهاية الشهر الأول:', body.p_first_month_end_date, '    ',

        'اسم العنصر:', this.itemArName)
    }

    if (this.lang == "en") {
      this.parameter1.push('SECOND-MONTH-START-DATE:', body.p_second_month_start_date, '    ',
        'SECOND-MONTH-END-DATE:', body.p_second_month_end_date)
    } else {
      this.parameter1.push('بداية الشهر الثاني:', body.p_second_month_start_date, '    ',
        'الثاني-نهاية الشهر:', body.p_second_month_end_date)
    }

    if (this.lang == "en") {
      this.parameter2.push('SHIFT:', this.templateEnName, '                    ',
        'LOCATION:', this.locationEnName)
    } else {
      this.parameter2.push('موقعك:', this.templateArName, '                    ',
        'موقعك:', this.locationArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]
    let removeComma1 = [this.parameter1.join(' ')]
    let removeComma2 = [this.parameter2.join(' ')]

    let finalParameters = removeComma.toString();
    let parameter1 = removeComma1.toString();
    let parameter2 = removeComma2.toString();

    if (this.lang == "en") {
      this.titleAr = "Month Increment Percent Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "شهر زيادة تقرير النسبة المئوية"
      this.date = "التاريخ والوقت :"
    }

    this.monthIncrementPercentModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, parameter1, parameter2, dateValue, this.titleAr,
      this.date);

  }

  /**formatting date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}
