import { ShortItemInfoComponent } from './ShortItemInfo/short-item-info.component'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { CommonModule } from '@angular/common'
import { SharedModule } from 'src/app/shared.module'
import { ChartistModule } from 'ng-chartist'

import { AvatarComponent } from './Avatar/avatar.component'
import { ChartCardComponent } from './ChartCard/chart-card.component'
import { ChatComponent } from './Chat/chat.component'
import { DonutComponent } from './Donut/donut.component'
import { InfoCardComponent } from './InfoCard/info-card.component'
import { InvoiceComponent } from './Invoice/invoice.component'
import { PaymentAccountComponent } from './PaymentAccount/payment-account.component'
import { PaymentCardComponent } from './PaymentCard/payment-card.component'
import { PaymentTransactionComponent } from './PaymentTransaction/payment-transaction.component'
import { PricingItemComponent } from './PricingItem/pricing-item.component'
import { ProductCardComponent } from './ProductCard/product-card.component'
import { ProfileHeadCardComponent } from './ProfileHeadCard/profile-head-card.component'
import { ProgressCardComponent } from './ProgressCard/progress-card.component'
import { ProgressGroupComponent } from './ProgressGroup/progress-group.component'

import { SliderCardComponent } from './SliderCard/slider-card.component'
import { UserCardComponent } from './UserCard/user-card.component'
import { SwitchComponent } from './switch/switch.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ChartsModule } from './charts/charts.module'
import { ChartsC3Component } from './charts/c3/c3.component'
import { ChartsChartComponent } from './charts/chart/chart.component'
import { ChartsChartistComponent } from './charts/chartist/chartist.component'
import { ChartsNvD3Component } from './charts/nvd3/nvd3.component'

const COMPONENTS = [
  AvatarComponent,
  ChartCardComponent,
  ChatComponent,
  DonutComponent,
  InfoCardComponent,
  InvoiceComponent,
  PaymentAccountComponent,
  PaymentCardComponent,
  PaymentTransactionComponent,
  PricingItemComponent,
  ProductCardComponent,
  ProfileHeadCardComponent,
  ProgressCardComponent,
  ProgressGroupComponent,
  SliderCardComponent,
  UserCardComponent,
  ShortItemInfoComponent,
  DatepickerComponent,
  SwitchComponent,
  CheckboxComponent,
  ChartsC3Component,
  ChartsChartComponent,
  ChartsChartistComponent,
  ChartsNvD3Component
]

@NgModule({
  imports: [SharedModule, FormsModule, ReactiveFormsModule, ChartistModule, CommonModule, ChartsModule],
  declarations: [...COMPONENTS],
  exports: [...COMPONENTS],
})
export class CleanUIModule {}
