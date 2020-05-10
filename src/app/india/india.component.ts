import { Component, OnInit } from '@angular/core';
import { CovidApiServiceService } from '../covid-api-service.service';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d'

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  indiaData: any;
  statesData: any;
  flags: any = {};
  updateFlag: boolean;
  isSelected: string;
  pieChartOptions: any;
  barChartOptions: any;
  data: any = {
    stateList: ["India"],
    total: 0,
    active: 0,
    recovered: 0,
    deaths: 0,
    confirmed: 0
  };

  Highcharts = Highcharts;

  constructor(private service: CovidApiServiceService) { 
    Highcharts3d(Highcharts);
  }

  ngOnInit(): void {
    this.isSelected = "India";
    this.initializePieChart();
    this.initializeBarChart()
    Highcharts.chart('pie-container', this.pieChartOptions);
    Highcharts.chart('bar-container', this.barChartOptions);
    this.getIndiaData();
  }

  getIndiaData() {
    this.flags.isIndiaDataLoaded = false;
    this.flags.isError = false;
    this.service.getIndiaData().subscribe((data: {}) => {
      this.indiaData = data;
      this.statesData = this.indiaData['state_wise'];
      this.data.stateList = this.data.stateList.concat(Object.keys(this.statesData));
      this.updateBarChart();
      this.getDataByState(this.isSelected);
      this.flags.isIndiaDataLoaded = true;
    }, (error) => {
      this.flags.isError = true;
    });
  }

  initializePieChart() {  
    this.pieChartOptions = {
      chart: {
          type: 'pie',
          // options3d: {             // 3D Options
          //   enabled: true,
          //   alpha: 45,
          //   beta: 0
          // }
      },
      title: {
          text: ''
      },
      credits: {
        enabled: false,
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
            cursor: 'pointer',
            animation: false,
            depth: 35,
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            showInLegend: true,
          }
      },
      series: [{
        name: 'COVID-19',
        colorByPoint: true,
        data: [{
          name: 'Active Cases',
          color: 'rgba(255, 215, 0, 0.7)'
        }, {
          name: 'Deaths',
          color: 'rgba(255, 7, 58, .8)'
        }, {
          name: 'Recovered',
          color: 'rgba(136, 213, 156, .8)'
        }],
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 768
          },
          chartOptions: {
            legend: {
              enabled: true
            },
            plotOptions: {
              pie: {
                cursor: 'pointer',
                animation: false,
                depth: 35,
                dataLabels: {
                  alignTo: 'connectors',
                  enabled: true,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                },
                showInLegend: true,
              }
            },
          }
        }]
      }
    };
  }

  initializeBarChart() {
    this.barChartOptions = {
      chart: {
          type: 'column',
      },
      title: {
          text: '<p class="small">LOCATION WITH HIGHEST CASES</p>'
      },
      credits: {
        enabled: false,
      },
      xAxis: {
          categories: [],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Cases'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y}</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: this.isSelected,
          data: []
      }, {
        name: this.isSelected,
        data: []
      }, {
        name: this.isSelected,
        data: []
      }, {
        name: this.isSelected,
        data: []
      }, {
        name: this.isSelected,
        data: []
      }]
  }
  }

  getDataByState(state) {
    if (state == "India") {
      this.data.confirmed = this.indiaData['total_values']['confirmed'];
      this.data.active = this.indiaData['total_values']['active'];
      this.data.deaths = this.indiaData['total_values']['deaths'];
      this.data.recovered = this.indiaData['total_values']['recovered'];
    }
    else {
      this.data.confirmed = this.statesData[state]['confirmed'];
      this.data.active = this.statesData[state]['active'];
      this.data.deaths = this.statesData[state]['deaths'];
      this.data.recovered = this.statesData[state]['recovered'];
    }
    this.updatePieChart();
  }

  updatePieChart() {    
    this.pieChartOptions.series[0]['data'][0].y = parseInt(this.data.active);
    this.pieChartOptions.series[0]['data'][1].y = parseInt(this.data.deaths);
    this.pieChartOptions.series[0]['data'][2].y = parseInt(this.data.recovered); 
    Highcharts.chart('pie-container', this.pieChartOptions);
  }

  updateBarChart() {    
    this.barChartOptions.xAxis['categories'] = [
      'Confirmed Cases',
      'Active Cases',
      'Deaths',
      'Recovered'
    ];

    this.barChartOptions.series[0]['name'] = this.data.stateList[1];
    this.barChartOptions.series[1]['name'] = this.data.stateList[2];
    this.barChartOptions.series[2]['name'] = this.data.stateList[3];
    this.barChartOptions.series[3]['name'] = this.data.stateList[4];
    this.barChartOptions.series[4]['name'] = this.data.stateList[5];

    for (let i = 1; i <= 5; i++) {
      this.barChartOptions.series[i-1]['data'][0] = parseInt(this.statesData[this.data.stateList[i]]['confirmed'].split(',').join(''));
      this.barChartOptions.series[i-1]['data'][1] = parseInt(this.statesData[this.data.stateList[i]]['active'].split(',').join(''));
      this.barChartOptions.series[i-1]['data'][2] = parseInt(this.statesData[this.data.stateList[i]]['deaths'].split(',').join(''));
      this.barChartOptions.series[i-1]['data'][3] = parseInt(this.statesData[this.data.stateList[i]]['recovered'].split(',').join(''));
    }
    Highcharts.chart('bar-container', this.barChartOptions);
  }

  onChangeState() {
    this.getDataByState(this.isSelected);
  }
}
