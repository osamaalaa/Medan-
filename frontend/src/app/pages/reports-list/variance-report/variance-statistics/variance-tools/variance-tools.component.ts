import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { VarianceReportsService } from '../../variance-reports.service'
import { Subscription } from 'rxjs'

declare var c3: any

@Component({
  selector: 'app-variance-tools',
  templateUrl: './variance-tools.component.html',
  styleUrls: ['./variance-tools.component.scss'],
})
export class VarianceToolsComponent implements OnInit, OnDestroy {
  /**Storing Count x-axis */
  finalToolCount: any[] = []
  backgroundColors: any[] = []
  borderColors: any[] = []
  dataLength: any

  // Dummy for testing

  dummyNames: any[] = ['مكنسه', 'معدات نظافه', 'جلايه', 'ماكينه نظافه']
  dummyValues: any[] = ['12', '5', '17', '10']
  dummyBackgroundColors: any[] = []
  dummyBorderColors: any[] = []

  showDummyData = false

  /**Storing Name y-axis */
  // finalItemName: any[] = [];

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
      data: this.finalToolCount,
      label: 'Equipments/Tools Count',
      backgroundColor: this.backgroundColors,
      borderColor: this.borderColors,
    },
  ]
  public dummyBarChartData: ChartDataSets[] = [
    {
      data: this.dummyValues,
      label: 'Equipments/Tools Count',
      backgroundColor: this.dummyBackgroundColors,
      borderColor: this.dummyBorderColors,
    },
  ]

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
    series: [{ data: this.chartData1}, {data: this.chartData2}],
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
      bindto: '#toolsChart',
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

  constructor(private varianceReportsService: VarianceReportsService) {}

  ngOnInit() {
    this.getSearchResponseListener()
    this.getResetResponseListener()
    this.dummyDataColorsGenerator()
    this.chartRandomData()
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

  /**event driven subscription (listening)*/
  searchSubscription: Subscription
  getSearchResponseListener() {
    this.searchSubscription = this.varianceReportsService
      .getSearchResponseEquib()
      .subscribe(data => {
        // console.log("DataComp==>" + JSON.stringify(data.searchResponse.rows));

        if (data.searchResponse.rows.length != 0) {
          this.showDummyData = true
          console.log('length' + data.searchResponse.rows.length)
          for (var i = 0; i < data.searchResponse.rows.length; i++) {
            this.backgroundColors.push(this.random_rgba(0.4))
            this.borderColors.push(this.random_rgba(1))
          }
          let chartData = data.searchResponse.rows
          for (var i = 0; i < chartData.length; i++) {
            let itemCount = chartData[i].EQUIBMENT_COUNT
            this.finalToolCount.push(itemCount)
            // this.barChartData[0].data.push(itemCount);

            let itemName = chartData[i].ASSET_NAME
            this.barChartLabels.push(itemName)
          }
          // console.log(this.finalToolCount)
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
