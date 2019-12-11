import { Component, OnInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [ReportsService]
})
export class ReportsComponent implements OnInit {
  displayStats: boolean;

  constructor(public reportsService: ReportsService) { }

  ngOnInit() {

  }

}
