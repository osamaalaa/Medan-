import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../services/home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-screen-sharing',
  templateUrl: './screen-sharing.component.html',
  styleUrls: ['./screen-sharing.component.scss']
})
export class ScreenSharingComponent implements OnInit {
  // genValue;
  // selectedId = '';
  // selectedId1 = '';

  constructor(private homeService: HomeService, public router: Router) { 
    // let value = Math.floor(Math.random() * 1000000000);
    // this.genValue = value;
    // this.selectedId1 = this.genValue;
    // this.selectedId=  this.selectedId1;
  };

  ngOnInit() { }

  // onClickRoom(value) {
  //   this.homeService.storeRoomId(value);
  // }

}
