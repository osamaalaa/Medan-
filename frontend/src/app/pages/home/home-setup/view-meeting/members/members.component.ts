import { Component, OnInit, Input } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { UIService } from 'src/app/services/ui.service'
import { Router, ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  lang: any

  /**Storing MEETING MEMBERS IN ARRAY based on MEETING_ID */
  meetingMembers: any[] = []

  /**Storing MEETING_ID */
  MEETING_ID: number

  @Input() enableAttendanceAction: boolean

  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
    private translate: TranslateService,
  ) {
    this.getMeetingId()
  }

  ngOnInit() {
    this.getMeetingMembers()
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

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID']
  }

  /**Getting MEETING_MEMBERS BY MEETING_ID */
  public getMeetingMembers() {
    this.homeService.getMeetingMembers(this.MEETING_ID).subscribe(data => {
      this.meetingMembers = data.rows.map(item => {
        item.ATTENDANCE_FLAG = item.ATTENDANCE_FLAG == 1 ? true : false
        return item
      })
    })
  }

  /**Attendance */
  public attendance(mmId: any, flag: any) {
    let body = {}
    this.homeService.postAttendance(mmId, flag ? 'attend' : 'not attend', body).subscribe(data => {
      if (data.message == 'successed') {
        // this.fetchMeetingData();
      } else {
        console.log('failed to insert attendance')
      }
    })
  }
}
