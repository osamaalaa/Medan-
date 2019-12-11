import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { ReportsTableModelService } from './reports-table.model.service'
import { ReportsService } from '../reports.service'
import { Subscription } from 'rxjs'
import { TranslateService } from '@ngx-translate/core'
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-reports-table',
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss'],
  providers: [ReportsTableModelService],
})
export class ReportsTableComponent implements OnInit, OnDestroy {

  /**GETTING DOM */
  @ViewChild('TABLE') table: ElementRef

  /**storing form parameters for excel */
  parameters: any = [];

  /**Storing form labels for excel */
  parametersLabel: any = [];

  /**storing current Language */
  lang: any

  /**loading spinner */
  isDataLoading: boolean = false

  /**searching text entered */
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
  parameters1: any = [];

  /**storing Report name in arabic & english */
  titleAr: any;

  /**storing report date */
  date: any;

  /**storing location name in english */
  locationNameEn: any;

  /**storing location name in arabic */
  locationNameAr: any;

  /**Storing project name in english */
  projectNameEn: any;

  /**Storing project name in arabic */
  projectNameAr: any;

  /**Storing asset name in arabic */
  assetsArName: any;

  /**Storing asset name in english */
  assetsEnName: any;

  /**Storing service name in english */
  servicesListEnName: any;

  /**Storing service name in arabic */
  servicesListArName: any;

  /**Storing shift name in english */
  templatesEnName: any;

  /**Storing shift name in arabic */
  templatesArName: any;

  /**storing serviceType in english */
  servicesTypeListEnName: any;

  /**storing serviceType in arabic */
  servicesTypeListArName: any;

  constructor(
    private homeService: HomeService,
    public reportsTableModelService: ReportsTableModelService,
    private ui: UIService,
    private reportsService: ReportsService,
    private translate: TranslateService,
  ) { }

  ngOnInit() {
    this.getSearchResponseListener();
    this.getResetResponseListener();
    this.getSearchResponseBodyListener();
    this.getSearchLocationEnListener()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
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

  /**event driven subscription (listening)*/
  searchTableSubscription: Subscription
  getSearchResponseListener() {
    this.searchTableSubscription = this.reportsService.getSearchResponseTable().subscribe(data => {
      this.reportsTableModelService.displayData = data.searchResponse.rows
      this.reportsTableModelService.savedData = data.searchResponse.rows
    })
  }

  /**event driven subscription (listening)*/
  searchBodySubscription: Subscription
  getSearchResponseBodyListener() {
    this.searchTableSubscription = this.reportsService.getSearchResponseBody().subscribe(data => {
      this.parametersLabel = data.searchResponse;
      let body = data.searchResponse
      this.assetsEnName = body.p_asset_id ? body.p_asset_id.enName : ''
      this.assetsArName = body.p_asset_id ? body.p_asset_id.arName : ''

      this.servicesTypeListEnName = body.p_service_type ? body.p_service_type.enName : ''
      this.servicesTypeListArName = body.p_service_type ? body.p_service_type.arName : ''

      this.templatesEnName = body.p_template_id ? body.p_template_id.enName : ''
      this.templatesArName = body.p_template_id ? body.p_template_id.arName : ''

      this.projectNameEn = body.p_project_id ? body.p_project_id.enName : ''
      this.projectNameAr = body.p_project_id ? body.p_project_id.arName : ''

      this.servicesListEnName = body.p_service_id ? body.p_service_id.enName : ''
      this.servicesListArName = body.p_service_id ? body.p_service_id.arName : ''

    })
  }

  /**event driven subscription (listening)*/
  searchLocationEnSubscription: Subscription
  getSearchLocationEnListener() {
    this.searchTableSubscription = this.reportsService.getSearchResponseLocationName().subscribe(data => {
      this.locationNameEn = data.locNameEn
      this.locationNameAr = data.locNameAr
    })
  }

  /**RESET LISTENER */
  resetSubscription: Subscription
  getResetResponseListener() {
    this.resetSubscription = this.reportsService.getResetResponse().subscribe(data => {
      if (data === 'reset') {
        this.reportsTableModelService.displayData = []
        this.reportsTableModelService.savedData = []
      }
    })
  }

  /** Search  text*/
  searchItems(): void {
    this.reportsTableModelService.searchItems(this.searchText)
  }
  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.reportsTableModelService.sortData(sort)
  }

  /**export to excel */
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

    this.dataAfterSlice = this.finalDomTableData.splice(7);

    size = 7;
    while (this.dataAfterSlice.length > 0)
      this.mainData.push(this.dataAfterSlice.splice(0, size));

    var headersArray = [], size = 7;
    while (this.finalDomTableHeaders.length > 0)
      headersArray.push(this.finalDomTableHeaders.splice(0, size));
    this.mainHeaders = headersArray[0];
    if (this.lang == "en") {
      this.parameters.push('FROM-DATE:', this.parametersLabel.p_from_date, '  ', 'TO-DATE:', this.parametersLabel.p_to_date, '   ', 'PROJECT-NAME:', this.projectNameEn, '  ', 'LOCATION:', this.locationNameEn)
    }
    else {
      this.parameters.push('من التاريخ:', this.parametersLabel.p_from_date, '  ', 'حتي اليوم:', this.parametersLabel.p_to_date, '   ', 'اسم المشروع:', this.projectNameAr, '  ', 'موقعك:', this.locationNameAr)
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma = [this.parameters.join(' ')]

    let finalParameters = removeComma.toString();

    if (this.lang == "en") {
      this.parameters1.push('ASSET:', this.assetsEnName, '      ', 'SERVICE TYPE:', this.servicesTypeListEnName, '      ', 'SHIFT:', this.templatesEnName, '      ', 'SERVICE:', this.servicesListEnName)
    }
    else if (this.lang == "ar") {
      this.parameters1.push('مجموعة:', this.assetsArName, '        ', 'نوع الخدمة:', this.servicesTypeListArName, '       ', 'تحول:', this.templatesArName, '      ', 'الخدمات:', this.servicesListEnName)
    }
    else {
      console.log("no data")
    }
    // var ar = ["0", "1", "2", "3"];
    let removeComma1 = [this.parameters1.join(' ')]

    let finalParameters1 = removeComma1.toString();
    // let title1=""
    if (this.lang == "en") {
      this.titleAr = "StatisticsReport"
      this.date = "Date & Time :"
    }
    else {
      this.titleAr = "تقرير الاحصاءات"
      this.date = "التاريخ والوقت :"
    }
    this.reportsTableModelService.generateExcel(this.mainData, this.mainHeaders, finalParameters, finalParameters1, dateValue, this.titleAr, this.date);
  }

  /**formating date */
  printDate() {
    var date = new Date();
    var str = date.toString();
    var res = str.split("G");
    return res[0];
  }

  ngOnDestroy() {
    if (this.searchTableSubscription || this.resetSubscription) {
      this.searchTableSubscription.unsubscribe();
      this.resetSubscription.unsubscribe();
    }
  }

}
