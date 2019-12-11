import { Component, OnInit, Input } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { Router } from '@angular/router'
import { CommitteeMembersModelService } from './committee-members.model.service'
import { MeetingBoxService, ROLES } from '../../meeting-box.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-committee-members',
  templateUrl: './committee-members.component.html',
  styleUrls: ['./committee-members.component.scss'],
  providers: [CommitteeMembersModelService, MeetingBoxService],
})
export class CommitteeMembersComponent implements OnInit {
  lang: any

  isDataLoading: boolean = false

  searchText: string = ''

  COMMITTEE_ID: any

  isManager: boolean

  isMember: boolean

  isBoardViewMember: boolean

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    private route: ActivatedRoute,
    public router: Router,
    public committeeMembersModelService: CommitteeMembersModelService,
    private meetingBoxService: MeetingBoxService,
    private translate: TranslateService,
  ) {
    this.initializeRole()
    this.fetchCommitteId()
  }

  ngOnInit() {
    this.getCommitteeMembers()
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

  /**Get Committee Id  */
  fetchCommitteId(): void {
    this.COMMITTEE_ID = this.route.snapshot.params['COMMITTEE_ID']
  }

  /**Get All Commite Members Data  */
  getCommitteeMembers(): void {
    this.isDataLoading = true
    this.homeService.getCommitteeMembers(this.COMMITTEE_ID).subscribe(
      data => {
        this.committeeMembersModelService.savedData = data.rows
        this.committeeMembersModelService.displayData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage(
          'error',
          'Error while getting committee members : ' + error.error.message,
        )
      },
    )
  }

  /** Deletes Commite Members */
  deleteCommiteMembers(COMMITTEE_MEMBERS_ID: number | string): void {
    this.homeService.deleteCommiteMembers(COMMITTEE_MEMBERS_ID).subscribe(
      data => {
        this.ui.createMessage('success', 'Committe Member successfully Removed')
        this.getCommitteeMembers()
      },
      error => {
        this.ui.createMessage('error', 'Error while deleting Committe Member ')
      },
    )
  }

  /** Search Items against search text*/
  searchItems(): void {
    this.committeeMembersModelService.searchItems(this.searchText)
  }
}
