import { Component, OnInit, Renderer } from '@angular/core'
import qs from 'qs'
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router'
import { Title } from '@angular/platform-browser'
import { filter, map, mergeMap } from 'rxjs/operators'
import { Store } from '@ngrx/store'
import * as SettingsActions from 'src/app/store/settings/actions'

import { TranslateService } from '@ngx-translate/core'
import { NzI18nService, en_US, ar_EG } from 'ng-zorro-antd'
var en = require('../assets/i18n/en.json')
var ar = require('../assets/i18n/ar.json')
import arNz from '@angular/common/locales/ar';
import { registerLocaleData } from '@angular/common'
registerLocaleData(arNz);
import * as arDateLocale from 'date-fns/locale/ar';
import * as enDateLocale from 'date-fns/locale/en';

@Component({
  selector: 'app-root',
  template: `
    <ng-progress></ng-progress>
    <router-outlet (activate)="onActivate($event)"></router-outlet>
  `,
})
export class AppComponent implements OnInit {
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private store: Store<any>,
    private renderer: Renderer,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('ar')
    translate.use('ar')
    // this.i18n.setLocale(en_US);
    this.translate.setTranslation('en', en)
    this.translate.setTranslation('ar', ar)

    let currentLang = this.translate.currentLang

    
    this.translate.onLangChange.subscribe(lang=>{
      if(lang.lang == 'ar'){
        // this.i18n.setLocale(ar_EG);
        this.addArabicCss()
      }else{
        // this.i18n.setLocale(en_US);
        this.removeArabicCss();
      }
    })


    if(currentLang == 'ar'){
      this.addArabicCss()
    }else{
      this.removeArabicCss();
    }
    
  }

  addArabicCss(){
    this.renderer.setElementClass(document.body, 'rtl-ar', true);
  }

  removeArabicCss(){
    this.renderer.setElementClass(document.body, 'rtl-ar', false);

  }


  ngOnInit() {
    // set page title from router data variable

    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        map(route => {
          while (route.firstChild) {
            route = route.firstChild
          }
          return route
        }),
        filter(route => route.outlet === 'primary'),
        mergeMap(route => route.data),
      )
      .subscribe(event => this.titleService.setTitle('AOT | ' + event['title']))

    // listen url query params and set them to ngrx store
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        const queryString = event.url.match(/\?(.*)/)
        if (queryString) {
          const queryParams = qs.parse(queryString[1])
          const keys = Object.keys(queryParams)
          if (keys.length) {
            keys.forEach(key => {
              this.store.dispatch(
                new SettingsActions.SetStateAction({
                  [key]: queryParams[key] === 'true',
                }),
              )
            })
          }
        }
      })

    // detecting & set mobile/tablet/desktop viewports
    const setViewPort = (isMobileView: any = false, isTabletView: any = false) => {
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          isMobileView,
        }),
      )
      this.store.dispatch(
        new SettingsActions.SetStateAction({
          isTabletView,
        }),
      )
    }
    const detectViewPort = (load = false) => {
      const _isMobileView = window.innerWidth < 768
      const _isTabletView = window.innerWidth < 992
      const _isDesktopView = !_isMobileView && !_isTabletView
      const isMobileView = JSON.parse(window.localStorage.getItem('app.settings.isMobileView'))
      const isTabletView = JSON.parse(window.localStorage.getItem('app.settings.isTabletView'))
      const isDesktopView = !isMobileView && !isTabletView
      if (_isDesktopView && (_isDesktopView !== isDesktopView || load)) {
        setViewPort(false, false)
      }
      if (_isTabletView && !_isMobileView && (_isTabletView !== isTabletView || load)) {
        setViewPort(false, true)
        this.store.dispatch(
          new SettingsActions.SetStateAction({
            isMenuCollapsed: true,
          }),
        )
      }
      if (_isMobileView && (_isMobileView !== isMobileView || load)) {
        setViewPort(true, false)
      }
    }
    detectViewPort(true)
    window.addEventListener('resize', () => {
      detectViewPort()
    })
  }

  onActivate(event:any) {
    window.scroll(0, 0)
  }
}
