import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meeting-agenda',
  templateUrl: './meeting-agenda.component.html',
  styleUrls: ['./meeting-agenda.component.scss']
})
export class MeetingAgendaComponent implements OnInit {
  data: any[] = [];

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pi: number): void {
    this.data = new Array(4).fill({}).map((_, index) => {
      return {
        href: 'http://ant.design',
        title: `Meeting Agenda ${index+1}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description: 'Meeting Agends.',
        content:
          'Meeting Agends '
      };
    });
  }

}
