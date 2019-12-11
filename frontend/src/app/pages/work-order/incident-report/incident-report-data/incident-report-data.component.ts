import { Component, OnInit } from '@angular/core'
import { WorkOrderService } from 'src/app/services/workorder.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { IncidentReportDataModelService } from './incident-report-data.model.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-incident-report-data',
  templateUrl: './incident-report-data.component.html',
  styleUrls: ['./incident-report-data.component.scss'],
  providers: [IncidentReportDataModelService],
})
export class IncidentReportDataComponent implements OnInit {
  lang: any

  EMPLOYEE_ID: any

  isDataLoading: boolean = false

  searchText: string = ''

  constructor(
    private workOrderService: WorkOrderService,
    private ui: UIService,
    private route: ActivatedRoute,
    public incidentReportDataModelService: IncidentReportDataModelService,
    private translate: TranslateService,
  ) {
    this.getUserDetails()
  }

  ngOnInit() {
    this.getIncidentReport()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.workOrderService.getEmployeeId()
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID
  }

  /**Getting  Open Incident Report Data*/
  getIncidentReport(): void {
    this.isDataLoading = true
    this.workOrderService.getIncidentReport(this.EMPLOYEE_ID).subscribe(
      data => {
        this.incidentReportDataModelService.savedData = data.rows
        this.incidentReportDataModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Incident All : ' + error.error.message)
      },
    )
  }

  /** Search text*/
  searchItems(): void {
    this.incidentReportDataModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.incidentReportDataModelService.sortData(sort)
  }
}
