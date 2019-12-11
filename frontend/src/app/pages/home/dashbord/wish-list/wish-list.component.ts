import { Component, OnInit } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'

import { DashBordSetupModelService } from '../dashbord.model.services'
import { UIService } from 'src/app/services/ui.service'
import { ActivatedRoute } from '@angular/router'
import { NzIconModule } from 'ng-zorro-antd/icon'
import { CONSTANTS } from 'src/app/services/constants.service'

import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
})
export class WishListComponent implements OnInit {
  lang: any
  isDataLoading: boolean = false
  EMPLOYEE_ID: string | number
  PROJECT_ID: string | number
  USER: any

  constructor(
    private homeService: HomeService,
    public dashBordSetupModelService: DashBordSetupModelService,
    private ui: UIService,
    private translate: TranslateService,
  ) {
    this.getUserDetails()
  }

  ngOnInit() {
    this.Wishlist()
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

  /**Getting Employee Id*/
  getUserDetails() {
    this.USER = this.homeService.getEmployeeId()
    this.EMPLOYEE_ID = JSON.parse(this.USER).EMPLOYEE_ID
  }

  Wishlist(): void {
    this.isDataLoading = true
    this.homeService.getwishlist(this.EMPLOYEE_ID).subscribe(
      data => {
        this.dashBordSetupModelService.displayData = data.rows
        this.dashBordSetupModelService.savedData = data.rows
        this.isDataLoading = false
      },
      error => {
        this.isDataLoading = false
        this.ui.createMessage('error', 'Error while getting wish list : ' + error.error.message)
      },
    )
  }
}
