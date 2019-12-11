import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-decisions',
  templateUrl: './decisions.component.html',
  styleUrls: ['./decisions.component.scss']
})
export class DecisionsComponent implements OnInit {
 
  @ViewChild('avatarPro') avatar:TemplateRef<any>

  date = new Date();
  ngOnInit(): void {
 
  }
  data = [
    {
      title: 'Wo Classification',
      description:"Medan Enhancement and bug fixing ADF"
    },
    {
      title: 'Change the subject of WO email approval',
      description:"Medan Enhancement and bug fixing ADF"
    },
    {
      title: 'Change the subject of issue email',
      description:"Medan Enhancement and bug fixing ADF"
    }
  ];

}
