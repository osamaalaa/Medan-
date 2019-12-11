import { Component, OnInit, Input } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { ActiveMeetingModelService } from './active-meeting.model.service'
import { MeetingBoxService, ROLES } from '../meeting-box.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-active-meeting',
  templateUrl: './active-meeting.component.html',
  styleUrls: ['./active-meeting.component.scss'],
  providers: [ActiveMeetingModelService, MeetingBoxService],
})
export class ActiveMeetingComponent implements OnInit {
  lang: any

  searchText: string = ''

  isDataLoading: boolean = false

  EMPLOYEE_ID: any

  isManager: boolean

  isMember: boolean

  isBoardViewMember: boolean

  excelData: any = []

  constructor(
    private homeService: HomeService,
    public activeMeetingModelService: ActiveMeetingModelService,
    private ui: UIService,
    private meetingBoxService: MeetingBoxService,
    private translate: TranslateService,
  ) {
    this.getUserDetails()
    this.initializeRole()
  }

  ngOnInit() {
    this.getActiveMeetings()
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

  /**Getting Employee Roles*/
  initializeRole() {
    this.meetingBoxService.getRole().subscribe(role => {
      this.isManager = role == ROLES.MANAGER
      this.isMember = role == ROLES.MEMBER
      this.isBoardViewMember = role == ROLES.BOARD_MEMBER
    })
  }

  /**Getting Employee Id*/
  getUserDetails() {
    let USER = this.homeService.getEmployeeId()
    this.EMPLOYEE_ID = JSON.parse(USER).EMPLOYEE_ID
  }

  /**Get Activing Meeting Data **/
  getActiveMeetings(): void {
    this.isDataLoading = true
    this.homeService.getActiveMeetings(this.EMPLOYEE_ID).subscribe(
      data => {
        this.activeMeetingModelService.savedData = data.rows
        this.activeMeetingModelService.displayData = data.rows
        this.isDataLoading = false
        this.excelData = data.rows
        this.excelData.map(j => {
          let format = j.MEETING_DATE.split('T')
          j.MEETING_DATE = format[0]
        })
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting Active Meetings : ' + error.error.message,
        )
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.activeMeetingModelService.searchItems(this.searchText)
  }

  public exportToExcel() {
    this.meetingBoxService.exportAsExcelFile(this.excelData, 'sample12')
  }
}
