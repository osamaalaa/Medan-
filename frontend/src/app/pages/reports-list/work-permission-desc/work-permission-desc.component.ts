import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { ReportsListService } from 'src/app/services/reports-list.service';
import { UIService } from 'src/app/services/ui.service';
import { WorkPermissionDescModelService } from './work-permission-desc.model.service';
import { forkJoin } from 'rxjs';
import * as pluginDataLabels from 'chartjs-plugin-labels';
import { TranslateService } from '@ngx-translate/core';
import { HelperUtil } from 'src/app/common/Helper.Util';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-work-permission-desc',
  templateUrl: './work-permission-desc.component.html',
  styleUrls: ['./work-permission-desc.component.scss'],
  providers: [WorkPermissionDescModelService]
})
export class WorkPermissionDescComponent implements OnInit {

  @ViewChild('TABLE') table: ElementRef
  /**language */
  lang: string;

  /**Form Data */
  workPermissionDescReportForm: FormGroup;

  /**Spinner */
  isDataLoading: boolean = false;

  searchText: string = "";

  displayTable: boolean;

  domTableData: any[] = []

  finalDomTableData: any[] = []

  finalDomTableHeaders: any[] = []

  mainHeaders: any[] = []

  mainData = []

  dataAfterSlice = []

  parameters: any = []

  titleAr: any;

  date: any;

  locationEnName: any;

  locationArName: any;

  constructor(
    public reportsListService: ReportsListService,
    private _fb: FormBuilder,
    public workPermissionDescModelService: WorkPermissionDescModelService,
    private ui: UIService,
    public translate: TranslateService

  ) {
    this.getAllLookups();
  }

  ngOnInit() {
    this.createForm();
    this.onLangugateChange();
    this.fetchCurrentLanguage();
    // this.fetchData();

  }
  /**Reactive Form */
  createForm(): void {
    this.workPermissionDescReportForm = this._fb.group({
      p_location_id: [null]
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

  getLocationNameById(id) {
    let locId = { PIN_ID: id }
    this.reportsListService.getLocationNameById(locId).subscribe(data => {
      // console.log('loc===> ', data);
      this.locationEnName = data.rows[0].LABEL_EN
      this.locationArName = data.rows[0].LABEL_AR
    })
  }


  // *---------DropDowns for Form To Execute At-A-Time --------------* //
  isfetchingLookup: boolean = false
  allLocations: any[] = [];
  getAllLookups() {
    this.isDataLoading = true;
    this.isfetchingLookup = true;
    let locationBody: {
      p_loc_name_en: "",
      p_loc_name_ar: ""
    }
    forkJoin(
      this.reportsListService.getAllProjectsAndLocations(),
    ).subscribe(
      results => {
        this.isDataLoading = false;
        this.isfetchingLookup = false;
        this.allLocations = HelperUtil.treeify(results[0].rows, 'PIN_ID', 'PARENT_PIN_ID', null)
      }
    )
  }


  /**Submiting Form */
  submitForm() {
    this.fetchData();
  }

  fetchData() {
    let body = this.workPermissionDescReportForm.value
    this.getLocationNameById(body.p_location_id)
    // console.log('body===> ', body);
    this.isDataLoading = true;
    console.log('wpd==> ', body);
    
    this.reportsListService.postWorkPermissionDes(body).subscribe(
      data => {
        console.table(data.rows);
        this.workPermissionDescModelService.displayData = data.rows
        this.workPermissionDescModelService.savedData = data.rows
        this.isDataLoading = false

      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting work permission desc All : ' + error.error.message)
      },
    )
  }

  reset() {
    this.resetForm();
    this.clearTable();
    // this.fetchData();
  }

  resetForm() {
    this.workPermissionDescReportForm.reset()
  }

  clearTable() {
    this.workPermissionDescModelService.displayData = []
  }


  /** Search  text*/
  searchItems(): void {
    this.workPermissionDescModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.workPermissionDescModelService.sortData(sort)
  }

  public exportToExcel() {
    let dateValue = this.printDate()

    this.mainData = []
    this.parameters = []
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement)

    this.domTableData = Object.values(ws)

    this.domTableData.map(x => {
      this.finalDomTableData.push(x.v)
    })

    this.finalDomTableHeaders = this.finalDomTableData

    this.dataAfterSlice = this.finalDomTableData.splice(2)

    size = 2
    while (this.dataAfterSlice.length > 0) this.mainData.push(this.dataAfterSlice.splice(0, size))

    var headersArray = [],
      size = 2
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size))
    this.mainHeaders = headersArray[0]

    let body = this.workPermissionDescReportForm.value
    if (this.lang == "en") {
      this.parameters.push('LOCATION:', this.locationEnName)
    } else {
      this.parameters.push('موقعك:', this.locationArName)
    }


    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString()

    if (this.lang == "en") {
      this.titleAr = "Work-Permissions Desc"
      this.date = "Date & Time :"
    } else {
      this.titleAr = "وصف أذونات العمل"
      this.date = "التاريخ والوقت :"
    }

    // console.log('headers==> ', this.mainHeaders);
    // console.log('data==> ', this.mainData);

    this.workPermissionDescModelService.generateExcel(
      this.mainData,
      this.mainHeaders,
      finalParameters,
      dateValue,
      this.titleAr,
      this.date
    )
  }

  printDate() {
    var date = new Date()

    var str = date.toString()
    var res = str.split('G')
    return res[0]
  }
}

