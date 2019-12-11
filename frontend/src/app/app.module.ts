import { ArraySortPipe } from './pipes/sort.pipe'
import { MyFilterPipe } from './pipes/myfilter.pipe'
import { FloorPipe } from './pipes/floor.pipe'
import { InterceptorService } from './services/interceptor.service'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule, LOCALE_ID } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { IconDefinition } from '@ant-design/icons-angular'
import * as AllIcons from '@ant-design/icons-angular/icons'
import { NZ_ICONS } from 'ng-zorro-antd'
import { NgProgressModule } from '@ngx-progressbar/core'
import { NgProgressRouterModule } from '@ngx-progressbar/router'
import { NgProgressHttpModule } from '@ngx-progressbar/http'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { StoreModule } from '@ngrx/store'
import { StoreRouterConnectingModule } from '@ngrx/router-store'
import { reducers, metaReducers } from './store/reducers'

import { HTTP_INTERCEPTORS } from '@angular/common/http'

/**
 * Locale Registration
 */
import { registerLocaleData } from '@angular/common'
import { default as localeEn } from '@angular/common/locales/en'
import { NZ_I18N, en_US as localeZorro } from 'ng-zorro-antd'
import { ItemsValidators } from './validators/itemsValidators'
import { UIService } from './services/ui.service';
import { ProfileService } from './services/profile.service';
import { DataService } from './services/data.service';
import { WorkFlowService } from './services/api.workflow.service';

import { HomeService } from './services/home.service';
import { WorkOrderService } from 'src/app/services/workorder.service';
import { NumbersOnly } from './directives/number.directive';
import { UserService } from './services/user.service';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { ReportsListService } from './services/reports-list.service';
import {TranslateModule} from '@ngx-translate/core';
import { TranslateNumberPipe } from './pipes/arabic-numerals.pipe'

const LOCALE_PROVIDERS = [
  { provide: LOCALE_ID, useValue: 'en' },
  { provide: NZ_I18N, useValue: localeZorro },
]
registerLocaleData(localeEn, 'en')

/**
 * AntDesign Icons
 */
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition
}
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

@NgModule({
  declarations: [
    AppComponent,
    FloorPipe,
    MyFilterPipe,
    ArraySortPipe,
    NumbersOnly],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    /**
     * NgRx Store
     */
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),

    /**
     * Nprogress Modules
     */
    NgProgressModule.withConfig({
      thick: true,
      spinner: false,
      color: '#0190fe',
    }),
    NgProgressRouterModule,
    NgProgressHttpModule,
    NgZorroAntdModule.forRoot(),

    /**
     * Routing Module
     */
    AppRoutingModule,
    TranslateModule.forRoot(),
  ],
  providers: [
    ...LOCALE_PROVIDERS,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: NZ_ICONS, useValue: icons },
    UIService,
    ProfileService,
    DataService,
    ItemsValidators,
    WorkFlowService,
    HomeService,
    WorkOrderService,
    UserService,
    ReportsListService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
