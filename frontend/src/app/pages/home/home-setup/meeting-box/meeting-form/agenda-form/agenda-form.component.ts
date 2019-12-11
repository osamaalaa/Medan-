import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { UploadXHRArgs, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType, HttpParams, HttpHeaders, HttpBackend } from '@angular/common/http';
import { filter } from 'rxjs/operators';
import { CONSTANTS } from 'src/app/services/constants.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-agenda-form',
  templateUrl: './agenda-form.component.html',
  styleUrls: ['./agenda-form.component.scss']
})
export class AgendaFormComponent implements OnInit {

 // R_MEETING_AGENDA_ID: any;
  EMPLOYEE_ID:any;
  @Input() R_MEETING_AGENDA_ID = null
  @Output() onSubmit = new EventEmitter()
  constructor(
    private msg: NzMessageService,
    private handler: HttpBackend
  ) { }

  ngOnInit() {
    this.checkR_MEETING_AGENDA_ID();
  }
/** On Form Submit */
submitForm(): void {
    this.onSubmit.emit();
  
} 
checkR_MEETING_AGENDA_ID(): void {
 let data =this.R_MEETING_AGENDA_ID;
}
  /*......uploade in Agenda tab.....*/
  AgendaUploadId: any = 1;
  fileList = [];
  uploading: boolean = false;
  itemPicture: any;
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
  fileName: any;
  handleUpload(): void {
    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      formData.append('file', file);
      this.fileName = file.name;

    });
    this.uploading = true;
    var url = `${environment.INVENTORY_API_URL}/webResources/uploadFile/${this.AgendaUploadId}/${this.R_MEETING_AGENDA_ID}/${this.EMPLOYEE_ID}?file`
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    var http = new HttpClient(this.handler)
    const req = new HttpRequest('POST', url, formData, {
      headers: headers
    });
    http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          this.uploading = false;
          this.fileList = [];
          console.log("age")
          this.msg.success('Meeting Saved Successfully.');
          //  this.navigateToList();
        },
        () => {
          this.uploading = false;
          this.msg.error('upload failed.');
        }
      );
  }
}
