import { Component, OnInit } from '@angular/core'
import { AuthService } from 'src/app/services/auth.service'
import { ProfileService } from '../../../../services/profile.service';
import { HomeService } from 'src/app/services/home.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cui-topbar-profile-menu',
  templateUrl: './profile-menu.component.html',
  styleUrls: ['./profile-menu.component.scss'],
})
export class TopbarProfileMenuComponent implements OnInit {
  spinning: any = false
  badgeCount: number = 7
  userName: string
  employee: string
  email: string
  phone: string
  position: string
  img_url: any
  userid: any

  constructor(
    public authService: AuthService,
    private profileservice: ProfileService,
    private translate:TranslateService,
    private homeService:HomeService

    ) {
    this.spinning = true
    const userInfo = JSON.parse(localStorage.getItem('user'))
    this.userName = userInfo.USER_NAME || 'Anonymous'
    this.employee = userInfo.EMPLOYEE_ID
    this.email = userInfo.USER_EMAIL
    this.phone = userInfo.USER_MOBILE || '-'
    this.position = userInfo.POSITION_NAME
    this.userid = userInfo.USER_ID
    this.spinning = false;

    this.getUserProfile();
    this.onLangugateChange();
    this.fetchCurrentLanguage()


    // this.getUserImage()
  }

  badgeCountIncrease() {
    this.badgeCount = 0
  }

  logout() {
    this.authService.SignOut()
  }
  
  lang
  onLangugateChange(){
    this.translate.onLangChange.subscribe(lang=>{
      this.lang = lang.lang
    })
  }
  fetchCurrentLanguage() {
    this.lang = this.translate.currentLang
  }
  
  
  EN_NAME;
  AR_NAME;
  EMPLOYEE_EMAIL
  getUserProfile() {
    this.EN_NAME = JSON.parse(localStorage.getItem('user')).EN_NAME
    this.AR_NAME = JSON.parse(localStorage.getItem('user')).ARABIC_NAME
  }
Collapse




  getUserImage() {
    this.profileservice.getUserImage(this.userid).subscribe(url => {
      console.log(url.url)
      this.img_url = url.url
      this.spinning = false
    })
  }

  ngOnInit(){
    this.Loginuserrole()
  }


  managerTab = false;
  memberTab = false;
  boardViewerTab = false;
  public Loginuserrole(): void {
    let USER = this.homeService.getEmployeeId();
    let USER_ID = JSON.parse(USER).USER_ID;
    this.homeService.getAllUserRoles(USER_ID).subscribe(
      data => {
        let loginuserrole = data.rows

      

        for (var i = 0; i < loginuserrole.length; i++) {
          let allLoginUserRole = loginuserrole[i];
          let rolename = allLoginUserRole.ROLE_NAME_EN.toLowerCase();
          let projectmanagerROle = 'Project Manager'.toLowerCase();
          let memberRole = 'Project member'.toLowerCase();
          let boardRoleChairman = 'Board Commitee Chairman'.toLowerCase();

          if (rolename == projectmanagerROle || (rolename == projectmanagerROle && rolename == memberRole)) {
            this.managerTab = true;
          } else if (rolename == memberRole) {
            if (!this.managerTab) {
              this.memberTab = true;
            }

          } else if (rolename == boardRoleChairman) {
            this.boardViewerTab = true;
          }

        }
      },
      error => {
        // this.ui.createMessage('error', 'Error while getting Login User data : ' + error.error.message)
      },
    )
  }

}
