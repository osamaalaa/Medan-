import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { UIService } from 'src/app/services/ui.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-issue',
  templateUrl: './add-new-issue.component.html',
  styleUrls: ['./add-new-issue.component.scss']
})
export class AddNewIssueComponent implements OnInit {

  EMPLOYEE_ID: any;
  USER: any

  constructor(private homeService: HomeService,
    private ui: UIService,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.getUserDetails();
  }

  ngOnInit() { 
  }

  /**Getting Employee Id*/
  getUserDetails() {
    this.USER = this.homeService.getEmployeeId();
    this.EMPLOYEE_ID = JSON.parse(this.USER).EMPLOYEE_ID;
  }

  /** On Add New Issue*/
  addNewIssue(formData: any) {
    this.homeService.insertIssue(formData).subscribe(
      data => {
        this.ui.createMessage('success', 'New Issue Added Successfully');
        this.router.navigate(['/medan/home/myissues'])
      }
    )
  }

}
