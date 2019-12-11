import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { forkJoin } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import { MaterialsModelService } from './materials.model.service'
import * as XLSX from 'xlsx'
import { ReportsListService } from 'src/app/services/reports-list.service'
import { ReportListService } from '../reports-list.service'
import { MATERIALS_VALIDATION_MESSAGES } from './materials.validations.messages';
import { HelperUtil } from 'src/app/common/Helper.Util';

@Component({
  selector: 'app-materials',
  templateUrl: './materials.component.html',
  styleUrls: ['./materials.component.scss'],
  providers: [MaterialsModelService, ReportListService]
})
export class MaterialsComponent implements OnInit {

  /**Getting DOM */
  @ViewChild('TABLE') table: ElementRef

  /**Storing language */
  lang: string

  /*Stored Reactive form Data*/
  materialReportForm: FormGroup

  /**Validation messages */
  validation_messages: any = MATERIALS_VALIDATION_MESSAGES;

  /**Converted From Date */
  finalFromDate

  /**Converted To Date */
  finalToDate

  /**Project LABEL */
  projectLabel: any

  /**Loading spinner */
  isDataLoading: boolean = false

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

  /**storing form parameters row1*/
  parameters: any = [];

  /**storing form parameters row2*/
  parameters1: any = [];

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  /**Storing project name in english */
  projectsEnName: any;

  /**Storing project name in arabic */
  projectsArName: any;

  /**Storing asset name in english */
  assetEnName: any;

  /**Storing asset name in arabic */
  assetArName: any;

  /**Storing service name in english */
  serviceEnName: any;

  /**Storing service name in arabic */
  serviceArName: any;

  /**Storing shift name in english */
  templateEnName: any;

  /**Storing shift name in arabic */
  templateArName: any;

  /**Storing location name in english */
  locationEnName: any;

  /**Storing location name in arabic */
  locationArName: any;

  constructor(
    private _fb: FormBuilder,
    private homeService: HomeService,
    public reportsListService: ReportsListService,
    private ui: UIService,
    public translate: TranslateService,
    public materialsModelService: MaterialsModelService
  ) {
    this.getAllLookups()
    this.createForm()
  }

  ngOnInit() {
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  /**Reactive Form */
  createForm(): void {
    this.materialReportForm = this._fb.group({
      p_from_date: [null, [Validators.required]],
      p_to_date: [null, [Validators.required]],
      p_project_id: [null],
      p_asset_id: [null],
      p_service_id: [null],
      p_template_id: [null],
      p_location_id: [null]
    })
  }

  /**Validation Messages */
  get p_from_date() {
    return this.materialReportForm.controls.p_from_date
  }
  get p_to_date() {
    return this.materialReportForm.controls.p_to_date
  }
  get p_project_id() {
    return this.materialReportForm.controls.p_project_id
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

  /**Converting Date Format In ts file */
  convertDate(selectedDate) {
    const d = selectedDate.getDate()

    var month = new Array()
    month[0] = 'January'
    month[1] = 'February'
    month[2] = 'March'
    month[3] = 'April'
    month[4] = 'May'
    month[5] = 'June'
    month[6] = 'July'
    month[7] = 'August'
    month[8] = 'September'
    month[9] = 'October'
    month[10] = 'November'
    month[11] = 'December'

    const m = month[selectedDate.getMonth()]
    const y = selectedDate.getFullYear()

    return d + '-' + m + '-' + y
  }

  /**From Date */
  convertFromDate() {
    const selectedDate = new Date(this.materialReportForm.get('p_from_date').value)
    this.finalFromDate = this.convertDate(selectedDate)
  }

  /**To Date */
  convertToDate() {
    const selectedDate = this.materialReportForm.get('p_to_date').value
    this.finalToDate = this.convertDate(selectedDate)
  }

  /**Getting location name by id */
  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    if (locId.PIN_ID != null) {
      this.reportsListService.getLocationNameById(locId).subscribe(data => {
        // console.log('loc,,,excel===> ', data);
        this.locationEnName = data.rows[0] ? data.rows[0].LABEL_EN : ''
        this.locationArName = data.rows[0] ? data.rows[0].LABEL_AR : ''
      })
    } else {
      console.log("Location Id Empty");
    }
  }

  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  projectsList: any[] = []
  allAssets: any[] = []
  servicesList: any[] = []
  allTemplates: any[] = []
  locationList: any[] = []
  getAllLookups() {
    this.isfetchingLookup = true
    let templateBody = {
      p_shift_name_en: '',
      p_shift_name_ar: '',
    }

    let assetBody = {
      "p_template_id": "",
      "p_location_id": ""
    }

    forkJoin(
      this.homeService.getAllProjects(),
      this.homeService.getAllAssets(assetBody),
      this.homeService.getAllServices(),
      this.homeService.getAllTemplates(templateBody),
      this.reportsListService.getAllProjectsAndLocations()
    ).subscribe(results => {
      this.isfetchingLookup = false
      this.projectsList = results[0].rows
      this.allAssets = results[1].rows
      this.servicesList = results[2].rows
      this.allTemplates = results[3].rows
      this.locationList = HelperUtil.treeify(results[4].rows, 'PIN_ID', 'PARENT_PIN_ID', null);
    })
  }

  /**Submiting Form */
  submitForm() {
    if (this.materialReportForm.valid) {
      this.fetchData();
    } else {
      this.ui.createMessage('error', 'Please Input & Validate all required Fields ..')
    }
  }

  /**Fetch data */
  fetchData() {
    this.isDataLoading = true;
    this.convertFromDate();
    this.convertToDate();
    let body = this.materialReportForm.value
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

    payload['p_from_date'] = this.finalFromDate
    payload['p_to_date'] = this.finalToDate

    this.getLocationNameById(body.p_location_id)
    // console.log('material==> ', JSON.stringify(payload));
    this.reportsListService.postMaterials(payload).subscribe(
      data => {
        this.setTableData(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting materials Data : ' + error.error.message,
        )
      },
    )
  }

  /**setting table data */
  setTableData(data) {
    this.materialsModelService.displayData = data
    this.materialsModelService.savedData = data
  }

  /**RESET form & table */
  resetAll() {
    this.resetForm();
    this.clearTable();
  }

  /**RESET form only */
  resetForm() {
    this.materialReportForm.reset()
  }

  /**RESET table only */
  clearTable() {
    this.materialsModelService.displayData = []
  }

  /** Search  text*/
  searchItems(): void {
    this.materialsModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.materialsModelService.sortData(sort)
  }

  /**EXPORT TO EXCEL */
  public exportToExcel() {
    let dateValue = this.printDate();
    this.mainData = [];
    this.parameters = [];
    this.parameters1 = [];
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

    this.convertFromDate();
    this.convertToDate();
    let body = this.materialReportForm.value
    this.projectsEnName = body.p_project_id ? body.p_project_id.enName : ''
    this.projectsArName = body.p_project_id ? body.p_project_id.arName : ''

    this.assetEnName = body.p_asset_id ? body.p_asset_id.enName : ''
    this.assetArName = body.p_asset_id ? body.p_asset_id.arName : ''

    this.serviceEnName = body.p_service_id ? body.p_service_id.enName : ''
    this.serviceArName = body.p_service_id ? body.p_service_id.arName : ''

    this.templateEnName = body.p_template_id ? body.p_template_id.enName : ''
    this.templateArName = body.p_template_id ? body.p_template_id.arName : ''

    body.p_from_date = this.finalFromDate,
      body.p_to_date = this.finalToDate
    if (this.lang == "en") {
      this.parameters.push('FROM_DATE:', body.p_from_date, ' ', 'TO_DATE:', body.p_to_date, ' ', 'PROJECT:', this.projectsEnName, ' ', 'LOCATION:', this.locationEnName)
    } else {
      this.parameters.push('من التاريخ:', body.p_from_date, '  ', 'حتي اليوم:', body.p_to_date, '  ', 'مشروع:', this.projectsArName, '   ', 'موقعك:', this.locationArName)
    }

    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();
    if (this.lang == "en") {
      this.parameters1.push('ASSET:', this.assetEnName, '       ', 'SERVICE:', this.serviceEnName, '     ', 'SHIFT:', this.templateEnName)
    } else {
      this.parameters1.push('مجموعة:', this.assetArName, '          ', 'الخدمات:', this.serviceArName, '       ', 'تحول:', this.templateArName)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma1 = [this.parameters1.join(' ')]

    let finalParameters1 = removeComma1.toString();

    if (this.lang == "en") {
      this.titleAr = "Materials used in Contracts Report"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "بيان المواد المستخدمة فى العقود"
      this.date = "التاريخ والوقت :"
    }
    this.materialsModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, finalParameters1, dateValue, this.titleAr, this.date);

  }

  /**Formatting date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

}

