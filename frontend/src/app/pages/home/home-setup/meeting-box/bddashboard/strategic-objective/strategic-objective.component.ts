import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-strategic-objective',
  templateUrl: './strategic-objective.component.html',
  styleUrls: ['./strategic-objective.component.scss']
})
export class StrategicObjectiveComponent implements OnInit {

  lang: string;

  constructor(public translate: TranslateService) { }

  ngOnInit() {

    this.onLangugateChange();
    this.fetchCurrentLanguage();
  }

  onLangugateChange() {
    this.translate.onLangChange.subscribe(lang => {

      this.lang = lang.lang
      console.log(this.lang)
    })
  }

  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }

  data = [
    {
      title: 'Title 1'
    },
    {
      title: 'Title 2'
    },
    {
      title: 'Title 3'
    },
    {
      title: 'Title 4'
    },
  ];

}
