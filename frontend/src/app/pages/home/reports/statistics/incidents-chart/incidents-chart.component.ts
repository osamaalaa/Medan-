import { Component, OnInit, OnDestroy } from '@angular/core'
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js'
import { Label } from 'ng2-charts'
import { ReportsService } from '../../reports.service'
import { Subscription } from 'rxjs'
import * as pluginDataLabels from 'chartjs-plugin-datalabels'

@Component({
  selector: 'app-incidents-chart',
  templateUrl: './incidents-chart.component.html',
  styleUrls: ['./incidents-chart.component.scss'],
})
export class IncidentsChartComponent implements OnInit, OnDestroy {

  /**Chart Data Storing */
  finalIncidentCount: any[] = []

  /**Chart Data Background Colors Storing */
  backgroundColors: any[] = []

  /**Chart Data Border Colors storing */
  borderColors: any[] = []

  /**Barchart */
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
  // public barChartType: string = 'horizontalBar';
  public barChartType: ChartType = 'horizontalBar'
  public barChartLegend = true
  public barChartPlugins = [pluginDataLabels]

  public barChartData: ChartDataSets[] = [
    {
      data: this.finalIncidentCount,
      label: 'Incidents Count',
      backgroundColor: this.backgroundColors,
      borderColor: this.borderColors,
    },
  ]

  constructor(private reportsService: ReportsService) { }

  ngOnInit() {
    this.getSearchResponseListener()
    this.getResetResponseListener()
  }

  /**Random Colors Changes */
  random_rgba(a: any) {
    var o = Math.round,
      r = Math.random,
      s = 255
    return 'rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + a + ')'
  }

  /**event driven subscription (listening)*/
  searchSubscription: Subscription
  getSearchResponseListener() {
    this.searchSubscription = this.reportsService.getSearchResponseIncidents().subscribe(data => {

      if (data.searchResponse.rows.length != 0) {
        for (var i = 0; i < data.searchResponse.rows.length; i++) {
          this.backgroundColors.push(this.random_rgba(0.4))
          this.borderColors.push(this.random_rgba(1))
        }
        console.log(data.searchResponse.rows.lengt)
        let chartData = data.searchResponse.rows
        for (var i = 0; i < chartData.length; i++) {
          let itemCount = chartData[i].INCIDENT_COUNT
          this.finalIncidentCount.push(itemCount)

          let itemName = chartData[i].VIOLATION_NAME_EN
          this.barChartLabels.push(itemName)
        }
      } else {
        console.log('no data')
      }
    })
  }

  /**Reset Charts Data */
  resetSubscription: Subscription
  getResetResponseListener() {
    this.resetSubscription = this.reportsService.getResetResponse().subscribe(data => {
      if (data === 'reset') {
        for (var i = 0; i < this.barChartData[0].data.length; i++) {
          this.barChartData[0].data.splice(0)
        }
        this.barChartLabels = []
      }
    })
  }

  /**Destroy Search Subscription && Reset Subscription */
  ngOnDestroy() {
    if (this.searchSubscription && this.resetSubscription) {
      this.searchSubscription.unsubscribe();
      this.resetSubscription.unsubscribe();
    } else if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    } else if (this.resetSubscription) {
      this.resetSubscription.unsubscribe();
    } else {
      console.log('No unsubscriptions are available');
    }
  }
}
