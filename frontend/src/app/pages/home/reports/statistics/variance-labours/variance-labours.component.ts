import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { ReportsService } from '../../reports.service'
import { Subscription } from 'rxjs'
// import * as c3 from 'c3'
declare var c3: any
@Component({
  selector: 'app-variance-labours',
  templateUrl: './variance-labours.component.html',
  styleUrls: ['./variance-labours.component.scss'],
})
export class VarianceLaboursComponent implements OnInit, OnDestroy {
  dataLoaded = false
  finalWeeks: any[] = []
  finalLaboursCount: any[] = []
  // LINE CHART DATA
  chartData1: any[] = []
  chartData2: any[] = []
  chartData3: any[] = []
  // For dummy usage, remove when API is ready
  showDummyData = false
  dummyLineData = {
    labels: ['Week1', 'Week2', 'Week3', 'Week4'],
    series: [],
  }
  lineData = {
    labels: this.finalWeeks,
    // The day of START_WEEK and END_WEEK
    series: [this.finalLaboursCount],
    // LABOR_COUNT
  }
  lineOptions = {
    fullWidth: !0,
    chartPadding: {
      right: 40,
    },
  }
  getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
  }
  chartRandomData() {
    for (var i = 0; i < 4; i++) {
      this.chartData1.push(this.getRandomInt(1, 100))
      this.chartData2.push(this.getRandomInt(1, 100))
      this.chartData3.push(this.getRandomInt(1, 100))
    }
  }
  // laboursCount: any [] = [];
  // finalLaboursCount: any[] = []
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
        axisX: {},
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
  constructor(private reportsService: ReportsService) {
    // this.laboursCount = [];
    // this.finalLaboursCount = [];
  }
  ngOnInit() {
    this.getSearchResponseListener()
    this.getResetResponseListener()
    this.chartRandomData()
    // this.getSearchClicked()
  }
  random_rgba(a: any) {
    var o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + a + ')'
  }
  // For dummy usage, remove when API is ready
  // getSearchClicked() {
  //   this.reportsService.getSearched().subscribe(temp => {
  //     this.showDummyData = temp
  //   })
  // }
  /**event driven subscription (listening)*/
  searchSubscription: Subscription
  getSearchResponseListener() {
    this.showDummyDate = true
    this.searchSubscription = this.reportsService
      .getSearchResponseVarianceReport()
      .subscribe(data => {
       // console.log('VarianceLabour--->', data)
        if (data.searchResponse.rows.length != 0) {
          this.dataLoaded = true
          this.emptyArray(this.finalLaboursCount)
          this.emptyArray(this.finalWeeks)
          for (var i = 0; i < data.searchResponse.rows.length; i++) {
            this.backgroundColors.push(this.random_rgba(0.4))
            this.borderColors.push(this.random_rgba(1))
          }
          let chartData = data.searchResponse.rows
          for (var i = 0; i < chartData.length; i++) {
            // console.log("DATA: "+ JSON.stringify(chartData[i]))
            let itemCount = chartData[i].LABOR_COUNT
            this.finalLaboursCount.push(itemCount)
            let rawStartDate = chartData[i].START_WEEK
            let spliceStartDate = rawStartDate.slice(8, -14)
            let rawEndDate = chartData[i].END_WEEK
            let spliceEndDate = rawEndDate.slice(8, -14)
            this.finalWeeks.push(spliceStartDate + '-' + spliceEndDate)
          }
          // console.log('LabourCount===> ', this.finalLaboursCount)
          // console.log('finalWeeks===> ', this.finalWeeks)
        } else {
          console.log('no data')
        }
      })
  }
  emptyArray(array: any[]) {
    array.length = 0;
  }
  resetSubscription: Subscription
  getResetResponseListener() {
    this.resetSubscription = this.reportsService.getResetResponse().subscribe(data => {
      if (data === 'reset') {
        this.dataLoaded = false;
        // for (var i = 0; i < this.barChartData[0].data.length; i++) {
        //   this.barChartData[0].data.splice(0)
        // }
        // this.barChartLabels = []
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
