import { NgModule } from '@angular/core'
import { SharedModule } from 'src/app/shared.module'
import { ChartsRouterModule } from './charts-routing.module'
import { ChartistModule } from 'ng-chartist'
import { ChartModule } from 'angular2-chartjs'
import { NvD3Module } from 'ng2-nvd3'

import 'd3'
import 'nvd3'
// charts
import { ChartsC3Component } from 'src/app/components/CleanUIComponents/charts/c3/c3.component'
import { ChartsChartComponent } from 'src/app/components/CleanUIComponents/charts/chart/chart.component'
import { ChartsChartistComponent } from 'src/app/components/CleanUIComponents/charts/chartist/chartist.component'
import { ChartsNvD3Component } from 'src/app/components/CleanUIComponents/charts/nvd3/nvd3.component'

const COMPONENTS = [
  ChartsC3Component,
  ChartsChartComponent,
  ChartsChartistComponent,
  ChartsNvD3Component,
]

@NgModule({
  imports: [SharedModule, ChartsRouterModule, ChartistModule, ChartModule, NvD3Module],
  declarations: [],
})
export class ChartsModule {}
