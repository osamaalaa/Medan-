import { Component, OnInit, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivitesForOperationsModelService } from './activites-for-operations.model.service'
import { forkJoin } from 'rxjs'
import { ACTIVITES_FOR_OPERATIONS_VALIDATION_MESSAGES } from './activites-for-operations.validations.messages'
import { TranslateService } from '@ngx-translate/core'
import { ReportListService } from '../reports-list.service';
import * as XLSX from 'xlsx';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-activites-for-operations',
  templateUrl: './activites-for-operations.component.html',
  styleUrls: ['./activites-for-operations.component.scss'],
  providers: [ActivitesForOperationsModelService, ReportListService],
})
export class ActivitesForOperationsComponent implements OnInit {

  /**Getting the dom */
  @ViewChild('TABLE') table: ElementRef

  /**Language */
  lang: any

  /**Storing Form Data */
  activitesForOperationsForm: FormGroup

  /**Loading spinner */
  isDataLoading: boolean = false

  /**Search Variable */
  searchText: string = ''

  /**Validation messages */
  validation_messages: any = ACTIVITES_FOR_OPERATIONS_VALIDATION_MESSAGES

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

  /**storing Shift label in english*/
  templateEnName: any;

  /**storing Shift label in arabic*/
  templateArName: any;

  /**storing OperationType label in english*/
  operationTypeEnName: any;

  /**storing OperationType label in arabic*/
  operationTypeArName: any;

  /**storing Location label in english*/
  locationEnName: any;

  /**storing Location label in arabic*/
  locationArName: any;

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public activitesForOperationsModelService: ActivitesForOperationsModelService,
    private ui: UIService,
    private translate: TranslateService,
    public reportListService: ReportListService
  ) {
    this.getAllLookups()
  }

  ngOnInit() {
    this.createForm()
    this.onLangugateChange()
    this.fetchCurrentLanguage();
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
    this.activitesForOperationsForm = this._fb.group({
      P_TEMPLATE_ID: [null],
      p_location_id: [null],
      p_service_op_type: [null],
    })
  }

  /**Getting Location By Id For Label Names*/
  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    if (locId.PIN_ID != null) {
      this.reportsListService.getLocationNameById(locId).subscribe(data => {
        this.locationEnName = data.rows[0] ? data.rows[0].LABEL_EN : ''
        this.locationArName = data.rows[0] ? data.rows[0].LABEL_AR : ''
      })
    } else {
      console.log("Location Id Empty");
    }

  }

  // *---------DropDowns for Form To Execute All At-A-Time --------------* //
  isfetchingLookup: boolean = false
  templateList: any[] = [];
  locationList: any[] = [];
  operationData: any[] = [];
  getAllLookups() {
    this.isfetchingLookup = true;

    let operationType = { p_service_op_type: "" }

    let templateBody = {
      p_shift_name_en: "",
      p_shift_name_ar: ""
    }
    forkJoin([
      this.reportsListService.getAllTemplates(templateBody),
      this.reportsListService.getAllProjectsAndLocations(),
      this.reportsListService.getAllOperationType(operationType)
    ]).subscribe(
      results => {
        this.isfetchingLookup = false;
        this.templateList = results[0].rows;
        this.locationList = HelperUtil.treeify(results[1].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
        this.operationData = results[2].rows;
      }
    )
  }

  /**Submiting Form */
  submitForm() {
    this.isDataLoading = true;
    let body = this.activitesForOperationsForm.value
    let payload = {};
    for (var key in body) {
      if (key == "p_location_id" && body[key]) {
        payload[key] = body[key]
      } else {
        if (body[key]) {
          payload[key] = body[key].id
        }
      }
    }
    this.getLocationNameById(body.p_location_id)
    this.reportsListService.postActivitesForOperationsData(payload).subscribe(
      data => {
        //console.table(data.rows)
        this.activitesForOperationsModelService.displayData = data.rows
        this.activitesForOperationsModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting activities for operations : ' + error.error.message,
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
    this.activitesForOperationsForm.reset()
  }
  /**RESET the table */
  clearTable() {
    this.activitesForOperationsModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.activitesForOperationsModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.activitesForOperationsModelService.sortData(sort)
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

    let body = this.activitesForOperationsForm.value
    this.templateEnName = body.P_TEMPLATE_ID ? body.P_TEMPLATE_ID.enName : ''
    this.templateArName = body.P_TEMPLATE_ID ? body.P_TEMPLATE_ID.arName : ''
    this.operationTypeEnName = body.p_service_op_type ? body.p_service_op_type.enName : ''
    this.operationTypeArName = body.p_service_op_type ? body.p_service_op_type.arName : ''

    if (this.lang == "en") {
      this.parameters.push('SHIFT:', this.templateEnName, '     ', 'LOCATION:', this.locationEnName, '       ', 'OPERATION TYPE:', this.operationTypeEnName)
    } else {
      this.parameters.push('تحول:', this.templateArName, '           ', 'موقعك:', this.locationArName, '           ', 'نوع العملية:', this.operationTypeArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]
    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.titleAr = "Work Orders By Maintenance Type Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "أوامر العمل طبقا لنوع الصيانة"
      this.date = "التاريخ والوقت :"
    }

    this.activitesForOperationsModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, dateValue, this.titleAr, this.date);

  }
  /**FORMATING Date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }
}
