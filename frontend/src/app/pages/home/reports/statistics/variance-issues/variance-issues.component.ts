import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { ReportsService } from '../../reports.service'
import { Subscription } from 'rxjs'
// import * as c3 from 'c3'
declare var c3: any
@Component({
  selector: 'app-variance-issues',
  templateUrl: './variance-issues.component.html',
  styleUrls: ['./variance-issues.component.scss'],
})
export class VarianceIssuesComponent implements OnInit, OnDestroy {
  dataLoaded = false
  finalWeeks: any[] = []
  
  // issuesCount: any [] = [];
  finalIssuesCount: any[] = []
  dataLength: any
  //LINE CHART DATA
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
    series: [this.finalIssuesCount],
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
  // Dummy for testing
  dummyNames: any[] = ['ديتول', 'زجاج', 'معدات تنظيف', 'ورق']
  dummyValues: any[] = ['10', '15', '6', '21']
  dummyBackgroundColors: any[] = []
  dummyBorderColors: any[] = []
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
  //public barChartType: string = 'horizontalBar';
  public barChartType: ChartType = 'bar'
  public barChartLegend = true
  public barChartPlugins = []
  public barChartData: ChartDataSets[] = [{ data: this.finalIssuesCount, label: 'Materials Count' }]
  public dummyBarChartData: ChartDataSets[] = [
    {
      data: this.dummyValues,
      label: 'Materials Count',
      backgroundColor: this.dummyBackgroundColors,
      borderColor: this.dummyBorderColors,
    },
  ]
  area
  colors = {
    primary: this.random_rgba(0.7),
    def: this.random_rgba(0.7),
    success: this.random_rgba(0.7),
    danger: this.random_rgba(0.7),
  }
  overlappingBarData = {
    labels: ['Detol', 'Cleaning Items', 'Bottle', 'Paper'],
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
      bindto: '#meterialsChart',
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
  constructor(private reportsService: ReportsService) {}
  ngOnInit() {
    this.getSearchResponseListener()
    this.getResetResponseListener()
    this.dummyDataColorsGenerator()
    this.chartRandomData()
    // this.getSearchClicked()
  }
  random_rgba(a: any) {
    var o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + a + ')'
  }
  dummyDataColorsGenerator() {
    for (var index = 0; index < 5; index++) {
      this.dummyBackgroundColors.push(this.random_rgba(0.4))
      this.dummyBorderColors.push(this.random_rgba(1))
    }
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
    this.searchSubscription = this.reportsService
      .getSearchResponseVarianceReport()
      .subscribe(data => {
       // console.log("VarianceIssues--->", data);
        if (data.searchResponse.rows.length != 0) {
          this.dataLoaded = true
          this.emptyArray(this.finalIssuesCount)
          this.emptyArray(this.finalWeeks)
          // this.showDummyData = true
          this.dataLength = data.searchResponse.rows.length
          let chartData = data.searchResponse.rows
          for (var i = 0; i < chartData.length; i++) {
            let itemCount = chartData[i].MATERIAL_COUNT
            this.finalIssuesCount.push(itemCount)
            let rawStartDate = chartData[i].START_WEEK
            let spliceStartDate = rawStartDate.slice(8, -14)
            let rawEndDate = chartData[i].END_WEEK
            let spliceEndDate = rawEndDate.slice(8, -14)
            this.finalWeeks.push(spliceStartDate + '-' + spliceEndDate)
            // let itemName = 'ISSUE COUNT'
            // this.barChartLabels.push(itemName)
          }
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