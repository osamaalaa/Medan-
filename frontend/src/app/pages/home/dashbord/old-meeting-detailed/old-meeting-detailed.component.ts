import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';

import { DashBordSetupModelService } from '../dashbord.model.services';
import { UIService } from 'src/app/services/ui.service';
import { ActivatedRoute } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CONSTANTS } from 'src/app/services/constants.service';

import { WorkFlowService } from 'src/app/services/api.workflow.service';
import { DashbordComponent } from '../dashbord.component';

@Component({
  selector: 'app-old-meeting-detailed',
  templateUrl: './old-meeting-detailed.component.html',
  styleUrls: ['./old-meeting-detailed.component.scss']
})
export class OldMeetingDetailedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
