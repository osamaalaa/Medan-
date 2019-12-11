import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router'

@Component({
  selector: 'app-detailed-my-issue',
  templateUrl: './detailed-my-issue.component.html',
  styleUrls: ['./detailed-my-issue.component.scss']
})
export class DetailedMyIssueComponent implements OnInit {

  DETAILS;

  constructor(public router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.getItemTemplateDetailsData()
  }

  private getItemTemplateDetailsData(): void {
    this.DETAILS = this.route.snapshot.data['issueIdDetails'].rows[0];
  }

  navigateToList() {
    this.router.navigate(['/medan/home/myissues'], { relativeTo: this.route })
  }

}
