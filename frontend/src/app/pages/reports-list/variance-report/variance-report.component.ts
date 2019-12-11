import { Component, OnInit } from '@angular/core';
import { VarianceReportsService } from '../variance-report/variance-reports.service'

@Component({
  selector: 'app-variance-report',
  templateUrl: './variance-report.component.html',
  styleUrls: ['./variance-report.component.scss'],
  providers: [VarianceReportsService]
})
export class VarianceReportComponent implements OnInit {
  displayStats: boolean;
  
  constructor(public varianceReportsService: VarianceReportsService) { }

  ngOnInit() {
  }

}
