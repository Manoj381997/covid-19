import { Component, OnInit } from '@angular/core';
import { CovidApiServiceService } from '../covid-api-service.service';
import * as Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d'

@Component({
  selector: 'app-global',
  templateUrl: './global.component.html',
  styleUrls: ['./global.component.css']
})
export class GlobalComponent implements OnInit {

  worldData: any;
  countriesData: any = [];
  flags: any = {};
  updateFlag: boolean;
  isSelected: string;
  pieChartOptions: any;
  barChartOptions: any;
  data: any = {
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
    this.isSelected = "All Countries";
    this.initializePieChart();
    this.initializeBarChart();
    Highcharts.chart('pie-container', this.pieChartOptions);
    Highcharts.chart('bar-container', this.barChartOptions);
    this.getWorldData();
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

  getWorldData(): void {
    this.flags.isWorldDataLoaded = false;
    this.flags.isError = false;
    this.service.getWorldData().subscribe((data: {}) => {
      this.worldData = data;
      this.countriesData = this.worldData['countries_stat'];
      this.countriesData.splice(82, 1);
      this.updateBarChart();
      this.getDataByCountry(this.isSelected);
      this.flags.isWorldDataLoaded = true;
    }, (error) => {
      this.flags.isError = true;
    });
  }
  
  updateBarChart() {
    this.barChartOptions.xAxis['categories'] = [
      'Confirmed Cases',
      'Active Cases',
      'Deaths',
      'Recovered'
    ];

    this.barChartOptions.series[0]['name'] = this.countriesData[0]['country_name'];
    this.barChartOptions.series[1]['name'] = this.countriesData[1]['country_name'];
    this.barChartOptions.series[2]['name'] = this.countriesData[2]['country_name'];
    this.barChartOptions.series[3]['name'] = this.countriesData[3]['country_name'];
    this.barChartOptions.series[4]['name'] = this.countriesData[4]['country_name'];

    for (let i = 1; i <= 5; i++) {
      this.barChartOptions.series[i-1]['data'][0] = parseInt(this.countriesData[i]['cases'].replace(',',''));
      this.barChartOptions.series[i-1]['data'][1] = parseInt(this.countriesData[i]['active_cases'].replace(',',''));
      this.barChartOptions.series[i-1]['data'][2] = parseInt(this.countriesData[i]['deaths'].replace(',',''));
      this.barChartOptions.series[i-1]['data'][3] = parseInt(this.countriesData[i]['total_recovered'].replace(',',''));
    }
    Highcharts.chart('bar-container', this.barChartOptions);
  }

  getDataByCountry(country) {
    if (country == "All Countries") {
      this.data.confirmed = this.worldData['world_total']['total_cases'];
      this.data.active = this.worldData['world_total']['new_cases'];
      this.data.deaths = this.worldData['world_total']['total_deaths'];
      this.data.recovered = this.worldData['world_total']['total_recovered'];
    }
    else {
      for (let ctry of this.countriesData) {
        if (country == ctry['country_name']) {
          this.data.confirmed = ctry['cases'];
          this.data.active = ctry['active_cases'];
          this.data.deaths = ctry['deaths'];
          this.data.recovered = ctry['total_recovered'];
          break;
        }
      }
    }
    this.updatePieChart();
  }

  updatePieChart() {
    if (this.isSelected == "All Countries"){
      this.pieChartOptions.series[0]['data'][0]['name'] = 'Total Cases';
      this.pieChartOptions.series[0]['data'][0]['color'] = 'rgb(82, 160, 238, 0.8)';
      this.pieChartOptions.series[0]['data'][0].y = parseInt(this.worldData['world_total']['total_cases'].split(",").join(""));
    }
    else {
      this.pieChartOptions.series[0]['data'][0]['name'] = 'Active Cases';
      this.pieChartOptions.series[0]['data'][0]['color'] = 'rgba(255, 215, 0, 0.7)';
      this.pieChartOptions.series[0]['data'][0].y = parseInt(this.data.active.replace(',',''));
    }
    this.pieChartOptions.series[0]['data'][1].y = parseInt(this.data.deaths.replace(',',''));
    this.pieChartOptions.series[0]['data'][2].y = parseInt(this.data.recovered.replace(',','')); 
    Highcharts.chart('pie-container', this.pieChartOptions);
  }

  onChangeCountry() {
    this.getDataByCountry(this.isSelected);
  }
}
