import { Component, OnInit } from '@angular/core'
import { HomeService } from 'src/app/services/home.service'
import { MyIssuesModelService } from './my-issues.model.service'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-my-issues',
  templateUrl: './my-issues.component.html',
  styleUrls: ['./my-issues.component.scss'],
  providers: [MyIssuesModelService],
})
export class MyIssuesComponent implements OnInit {
  lang: any

  searchText = ''

  searchValue = ''

  DETAILS: [] = []

  /** Table loader */
  isDataLoading: boolean = false

  constructor(
    private homeService: HomeService,
    public myIssuesModelService: MyIssuesModelService,
    private translate: TranslateService,
  ) {}

  ngOnInit() {
    this.fetchAllIssues()
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

  /** Search Items against search text*/
  searchItems(): void {
    this.myIssuesModelService.searchItems(this.searchText)
  }

  /**Sorts Table data */
  sortData(sort: { key: string; value: string }): void {
    this.myIssuesModelService.sortData(sort)
  }

  /**Search */
  searchName(): void {
    this.myIssuesModelService.searchName(this.searchValue)
  }

  /** Reset search name. */
  reset(): void {
    this.searchValue = ''
    this.myIssuesModelService.searchName(this.searchValue)
  }

  getIssueById(issueId): void {
    this.isDataLoading = true
    this.homeService.getIssueById(issueId).subscribe(data => {
      this.DETAILS = data.rows
      this.isDataLoading = false
    })
  }

  fetchAllIssues(): void {
    this.isDataLoading = true
    this.homeService.getIssues().subscribe(data => {
      this.myIssuesModelService.displayData = data.rows
      this.myIssuesModelService.savedData = data.rows
      this.isDataLoading = false
    })
  }
}
