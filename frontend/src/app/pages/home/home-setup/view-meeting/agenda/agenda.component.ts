import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {

  /**Storing Format of file */
  attachFormat: any;

  /**Storing Attachment */
  attachment: any;

  /**Storing MEETING_ID */
  MEETING_ID: number;


  constructor(
    private homeService: HomeService,
    private route: ActivatedRoute,
  ) {
    this.getMeetingId()
  }

  ngOnInit() {
    this.getAgendaAttachmentFile();
  }

  /**Getting the MEETING_ID */
  public getMeetingId() {
    this.MEETING_ID = this.route.snapshot.params['MEETING_ID'];
  }

  /**Getting Agenda Attachment */
  public getAgendaAttachmentFile() {
    this.homeService.getAttachment(this.MEETING_ID).subscribe(data => {
      if (data.rows.length != 0) {
        this.attachment = data.rows[0].FILE_NAME;
        let Format = this.attachment.split(".");
        this.attachFormat = Format[4];
      } else {
        console.log('no image on this meeting');
      }

    })
  }

  pageMember: 1;
  totalPagesMember: 0;

  public afterLoadCompleteMember(pdfData: any) {
    this.totalPagesMember = pdfData.numPages;
  }

}
