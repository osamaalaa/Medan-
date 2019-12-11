import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { OldMeetingModelService } from './old-meetings.model.service'
import { MeetingBoxService, ROLES } from '../meeting-box.service'
import * as XLSX from 'xlsx'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-old-meetings',
  templateUrl: './old-meetings.component.html',
  styleUrls: ['./old-meetings.component.scss'],
  providers: [OldMeetingModelService, MeetingBoxService],
})
export class OldMeetingsComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef

  lang: any

  searchText: string = ''

  isDataLoading: boolean = false

  EMPLOYEE_ID: string | number

  MEMBERS_COUNT: string

  isManager: boolean

  isMember: boolean

  isBoardViewMember: boolean

  constructor(
    private homeService: HomeService,
    private ui: UIService,
    public oldMeetingModelService: OldMeetingModelService,
    private meetingBoxService: MeetingBoxService,
    private translate: TranslateService,
  ) {
    this.getUserDetails()
    this.initializeRole()
  }

  ngOnInit() {
    this.getOldMeetings()
    this.onLangugateChange()
    this.fetchCurrentLanguage()
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

  /**Get Old Meeting Data **/
  getOldMeetings(): void {
    this.isDataLoading = true
    this.homeService.getOldMeetings(this.EMPLOYEE_ID).subscribe(
      data => {
        this.oldMeetingModelService.savedData = data.rows
        this.oldMeetingModelService.displayData = data.rows
       // console.table(data.rows)
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting Old Meetings : ' + error.error.message)
      },
    )
  }



  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {
      this.lang = lang.lang
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }


  /** Search Items against search text*/
  searchItems(): void {
    this.oldMeetingModelService.searchItems(this.searchText)
  }

  public exportToExcel() {
    // var data = document.getElementById('OldMeetings')
    // const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data)
    // const wb: XLSX.WorkBook = XLSX.utils.book_new()
    // XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    // /* save to file */
    // XLSX.writeFile(wb, 'Sheet.xlsx')
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
    XLSX.writeFile(wb, 'Old-meeting.xlsx');
  }
}
