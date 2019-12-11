import { Component, OnInit, Input } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { MyCommitteeMeetingModelService } from './my-committee.model.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute, Router } from '@angular/router'
import { MeetingBoxService, ROLES } from '../meeting-box.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-my-committee',
  templateUrl: './my-committee.component.html',
  styleUrls: ['./my-committee.component.scss'],
  providers: [MyCommitteeMeetingModelService, MeetingBoxService],
})
export class MyCommitteeComponent implements OnInit {
  lang: any

  searchText: string = ''

  isDataLoading: boolean = false

  EMPLOYEE_ID: string | number

  USER_ID: any

  isManager: boolean

  isMember: boolean

  isBoardViewMember: boolean

  constructor(
    private homeService: HomeService,
    public myCommitteeMeetingModelService: MyCommitteeMeetingModelService,
    private ui: UIService,
    private route: ActivatedRoute,
    private router: Router,
    private meetingBoxService: MeetingBoxService,
    private translate: TranslateService,
  ) {
    this.initializeRole()
    this.getUserDetails()
  }

  ngOnInit() {
    this.getCommittee()
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

  /**Get Committee  Data **/
  getCommittee(): void {
    this.isDataLoading = true
    this.homeService.getCommittee(this.EMPLOYEE_ID).subscribe(
      data => {
        this.myCommitteeMeetingModelService.savedData = data.rows
        this.myCommitteeMeetingModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Committee : ' + error.error.message)
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.myCommitteeMeetingModelService.searchItems(this.searchText)
  }
}
