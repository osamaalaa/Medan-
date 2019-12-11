import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { VarianceReportsService } from '../../variance-reports.service'
import { Subscription } from 'rxjs'
// import * as c3 from 'c3'

declare var c3: any

@Component({
  selector: 'app-variance-labours',
  templateUrl: './variance-labours.component.html',
  styleUrls: ['./variance-labours.component.scss'],
})
export class VarianceLaboursComponent implements OnInit, OnDestroy {
  // laboursCount: any [] = [];

  finalLaboursCount: any[] = []
  backgroundColors: any[] = []
  borderColors: any[] = []
  dataLength: any

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
      yAxes: [
        {
          stacked: true,
        },
      ],
    },
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'end',
      },
    },
  }

  public barChartLabels: Label[] = []
  // public barChartType: string = 'horizontalBar'
  public barChartType: ChartType = 'bar'
  public barChartLegend = true
  public barChartPlugins = []
  public barChartData: ChartDataSets[] = [
    {
      data: this.finalLaboursCount,
      label: 'Labor Count',
      backgroundColor: this.backgroundColors,
      borderColor: this.borderColors,
    },
  ]

  showDummyDate = false
  area
  chartData1: any[] = []
  chartData2: any[] = []
  colors = {
    primary: this.random_rgba(0.7),
    def: this.random_rgba(0.7),
    success: this.random_rgba(0.7),
    danger: this.random_rgba(0.7),
  }

  overlappingBarData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun'],
    series: [this.chartData1, this.chartData2],
  }
  overlappingBarOptions = {
    seriesBarDistance: 10,
  }
  overlappingResponsiveOptions = [
    [
      '',
      {
        seriesBarDistance: 5,
        axisX: {
        },
      },
    ],
  ]

  ngAfterViewInit() {
    this.area = c3.generate({
      bindto: '#laborsChart',
      data: {
        columns: [this.chartData1, this.chartData2],
        types: {
          First: 'area',
          Second: 'area-spline',
        },
      },
      color: {
        pattern: [this.colors.primary, this.colors.success],
      },
    })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }

  chartRandomData() {
    for (var i = 0; i < 6; i++) {
      this.chartData1.push(this.getRandomInt(1, 31))
      this.chartData2.push(this.getRandomInt(1, 31))
    }
  }

  constructor(private varianceReportsService: VarianceReportsService) {
    // this.laboursCount = [];
    // this.finalLaboursCount = [];
  }



  ngOnInit() {
    this.getSearchResponseListener()
    this.getResetResponseListener()
    this.chartRandomData()
  }

  random_rgba(a: any) {
    var o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + a + ')'
  }

  /**event driven subscription (listening)*/
  searchSubscription: Subscription
  getSearchResponseListener() {
    this.showDummyDate = true
    this.searchSubscription = this.varianceReportsService
      .getSearchResponseLabor()
      .subscribe(data => {
        console.log('DataComp==>' + JSON.stringify(data.searchResponse.rows))

        if (data.searchResponse.rows.length != 0) {
          for (var i = 0; i < data.searchResponse.rows.length; i++) {
            this.backgroundColors.push(this.random_rgba(0.4))
            this.borderColors.push(this.random_rgba(1))
          }
          let chartData = data.searchResponse.rows
          for (var i = 0; i < chartData.length; i++) {
            let itemCount = chartData[i].LABOR_NO
            this.finalLaboursCount.push(itemCount)

            let itemName = chartData[i].PRIMARY_NAME
            this.barChartLabels.push(itemName)
          }
          // console.log(this.finalLaboursCount)
        } else {
          console.log('no data')
        }
      })
  }

  resetSubscription: Subscription
  getResetResponseListener() {
    this.resetSubscription = this.varianceReportsService.getResetResponse().subscribe(data => {
      if (data === 'reset') {
        for (var i = 0; i < this.barChartData[0].data.length; i++) {
          this.barChartData[0].data.splice(0)
        }
        this.barChartLabels = []
      }
    })
  }

  ngOnDestroy() {
    if (this.searchSubscription || this.resetSubscription) {
      this.searchSubscription.unsubscribe()
      this.resetSubscription.unsubscribe()
    }
  }
}
