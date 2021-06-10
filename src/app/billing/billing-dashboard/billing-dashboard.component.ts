import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
declare let GMaps: any;
declare var $: any;

@Component({
  selector: 'app-billing-dashboard',
  templateUrl: './billing-dashboard.component.html',
  styleUrls: ['./billing-dashboard.component.scss']
})
export class BillingDashboardComponent implements OnInit {

    faPlus = faPlus;
  
    constructor() {}
  
    selectedNewStatus = 'Total';
    newStatus = [
      {id: 1, status: 'Total'},
    ];
  
    selectedRunningStatus = 'Completed';
    runningStatus = [
      {id: 1, status2: 'Completed'},
    ];
    
    selectedRunningStatus2 = 'Pending';
    runningStatus2 = [
      {id: 1, status3: 'Pending'},
    ];

    selectedRunningStatus3 = 'Missed';
    runningStatus3 = [
      {id: 1, status3: 'Missed'},
    ];


  
    selectedTimeStatus = '15 Days';
    timeStatus = [
      {id: 1, tim: '30 Days'},
      {id: 2, tim: '15 Days'}, 
      {id: 3, tim: '7 Days'}, 
    ];
  
    selectedTimeStatus2 = '15 Days';
    timeStatus2 = [
      {id: 1, tim2: '30 Days'},
      {id: 2, tim2: '15 Days'}, 
      {id: 3, tim2: '7 Days'}, 
    ];
  
    selectedTimeStatus3 = '15 Days';
    timeStatus3 = [
      {id: 1, tim3: '30 Days'},
      {id: 2, tim3: '15 Days'}, 
      {id: 3, tim3: '7 Days'}, 
    ];
  
    selectedTimeStatus4 = '15 Days';
    timeStatus4 = [
      {id: 1, tim4: '30 Days'},
      {id: 2, tim4: '15 Days'}, 
      {id: 3, tim4: '7 Days'}, 
    ];
  
    selectedUtility: any;
    utility = [
      {id: 1, name: 'utility 1'},
      {id: 2, name: 'utility 2'},
    ];
  
    selectedType :any;
    type = [
      {id: 1, typ: 'Monticello'},
      {id: 2, typ: 'Blmg'},
      {id: 3, typ: 'Pghse'},
      
    ];
  
    selectedMonth:any;
    month = [
      {id: 1, mnth: 'Last 30 days'},
      {id: 2, mnth: 'Last 60 days'},
      {id: 3, mnth: 'Last 90 days'},
      {id: 4, mnth: 'All'},
    ];

    selectedType2 = 'County';
    type2 = [
      {id: 1, typ: 'Monticello'},
      {id: 2, typ: 'Blmg'},
      {id: 3, typ: 'Pghse'},
    ];
  
    selectedMonth2 = 'Month';
    month2 = [
      {id: 1, mnth: 'Last 30 days'},
      {id: 2, mnth: 'Last 60 days'},
      {id: 3, mnth: 'Last 90 days'},
      {id: 4, mnth: 'All'},
    ];

    selectedMonth3 = 'Month';
    month3 = [
      {id: 1, mnth: 'Last 30 days'},
      {id: 2, mnth: 'Last 60 days'},
      {id: 3, mnth: 'Last 90 days'},
      {id: 4, mnth: 'All'},
    ];

    selectedArea3 = 'County';
    area3 = [
      {id: 1, are2: 'Bloomingburg'},
      {id: 2, are2: 'Poughkeepsie'},
      {id: 3, are2: 'Monticello'},
    ];
  
  
    selectedArea = 'Area';
    area = [
      {id: 1, are: 'Area 1'},
      {id: 2, are: 'Area 2'},
    ];
  
    selectedArea2 = 'County';
    area2 = [
      {id: 1, are2: 'Bloomingburg'},
      {id: 2, are2: 'Poughkeepsie'},
      {id: 3, are2: 'Monticello'},
    ];
  
    selectedFrequency = 'Yearly';
    frequency = [
      {id: 1, frq: 'Yearly'},
      {id: 2, frq: 'Quaterly'},
      {id: 3, frq: 'Monthly'},
    ];
    
    // Bar Chart settings  
    public barChartType: ChartType = 'bar';
    public barChartLabels: Label[] = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    public barChartLegend = true;
    public barChartPlugins = [];
    public barChartData: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [248, 200, 170, 300], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [52, 60, 130, 200], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [164, 100, 20, 90], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [32, 40, 20, 10], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData2: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [300, 250, 200, 150], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [150, 100, 80, 100], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 100, 70, 25], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 50, 50, 25], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData3: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [400, 300, 200, 500], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [200, 150, 100, 300], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [100, 100, 70, 100], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [100, 50, 30, 100], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData4: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [250, 300, 350, 400], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [200, 50, 100, 300], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 50, 70, 50], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 200, 180, 50], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData5: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [300, 400, 500, 600], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [200, 50, 300, 300], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 50, 80, 100], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 300, 120, 200], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData6: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [100, 200, 400, 600], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 100, 200, 200], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 30, 100, 100], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 70, 100, 300], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData7: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [300, 350, 450, 450], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [200, 50, 300, 400], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 50, 75, 30], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [75, 150, 75, 20], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData8: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [100, 100, 200, 300], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [75, 50, 80, 200], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [15, 25, 100, 60], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [10, 25, 20, 40], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartData9: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [100, 200, 400, 600], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [50, 100, 200, 200], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 30, 100, 100], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)' },
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [25, 70, 100, 300], label: 'Missed', backgroundColor: 'rgba(176, 180, 205, 0.8)', hoverBackgroundColor: 'rgba(176, 180, 205, 1)' }
    ];

    public barChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 100,
            max : 600,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
      legend: { 
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 20,
          usePointStyle: true
        }
      }
    };
  
    // Dots/Scatter Chart Settings
    public scatterChartValues = [0, 'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
    public scatterChartType: ChartType = 'scatter';
    public scatterChartLabels: Label[] = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7'];
    public scatterChartData: ChartDataSets[] = [
      { data: [{ x: 1, y: 1 },{ x: 2, y: 5 },{ x: 4, y: 5 },{ x: 6, y: 4 }], label: 'Scheme X', pointRadius: 7, backgroundColor: 'rgba(53, 63, 223, 0.8)' },
      { data: [{ x: 1, y: 3 },{ x: 3, y: 4 },{ x: 5, y: 6 },{ x: 7, y: 4 }], label: 'Scheme Y', pointRadius: 7, backgroundColor: 'rgba(53, 63, 223, 0.8)' },
    ];
    public chartColors = [{backgroundColor: 'transparent', borderColor: 'transparent', pointBackgroundColor: '#353FDF', pointHoverBackgroundColor: '#353FDF', pointHoverBorderColor: '#353FDF'}];
    public scatterChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { 
        position: 'bottom',
        labels: {
          boxWidth: 10,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 25,
          usePointStyle: true
        }
      },
      scales: {
        yAxes: [{
          scaleLabel: {
            display: true,
            labelString: 'No of registration',
            fontSize: 12,
            fontFamily: "'Poppins', sans-serif",
            fontColor: '#83848E',
          },
          ticks: {
            max : 10,
            min: 0,
            display:false
          },
          gridLines: {
            display:false
          }
        }],
        xAxes: [{
          ticks: {
            callback: value => this.scatterChartValues[value],
            stepSize: 1,
            max : 8,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
    };
  
    // Donut chart settings
    public doughnutChartType: ChartType = 'doughnut';
    public doughnutChartLabels: Label[] = ['Industrial','Municipal', 'Private'];
    public doughnutChartData: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [84, 82, 82], borderWidth: 0 },
    ];
     public doughnutChartData1: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [80, 62, 98], borderWidth: 0 },
    ];
    public doughnutChartData2: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [70, 72, 106], borderWidth: 0 },
    ];
    public doughnutChartData3: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [90, 45, 113], borderWidth: 0 },
    ];
    public doughnutChartData4: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [68, 74, 106], borderWidth: 0 },
    ];
    public doughnutChartData5: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [75, 88, 85], borderWidth: 0 },
    ];
    public doughnutChartData6: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [84, 60, 104], borderWidth: 0 },
    ];
    public doughnutChartData7: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [77, 80, 60], borderWidth: 0 },
    ];
    public doughnutChartData8: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)','rgba(53, 63, 223, 1)','rgba(50, 208, 175, 1)'], data: [99, 100, 49], borderWidth: 0 },
    ];
    public doughnutChartOptions: any = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { 
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 30,
          usePointStyle: true
        }
      },
      cutoutPercentage: 82,
    };
  
    scrollOptions = { 
      autoHide: true, 
      scrollbarMinSize: 67,
      scrollbarMaxSize: 180,
    };
  
    // Survey Chart settings  
    public surveyBarChartType: ChartType = 'bar';
    public surveyBarChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    public surveyBarChartLegend = true;
    public surveyBarChartPlugins = [];
    public surveyBarChartData: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [231, 204, 258, 279, 293, 293, 258, 279, 293, 204, 243, 293], label: 'New', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [147, 121, 147, 167, 197, 141, 147, 167, 141, 121, 141, 141], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [84, 83, 111, 112, 99, 103, 111, 112, 103, 83, 103, 103], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'}
    ];
    public surveyBarChartData2: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [31, 39, 42, 44, 47, 51, 57, 59, 63, 67, 71, 79], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [27, 33, 37, 39, 39, 42, 47, 43, 51, 54, 61, 63], label: 'Active', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)'}
    ];
    public surveyBarChartData3: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [54, 58, 62, 67, 47, 77, 81, 83, 91, 99, 111, 123], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [48, 51, 51, 12, 39, 51, 47, 65, 42, 34, 77, 97], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'}
    ];
    public surveyBarChartData4: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [9,8,12,16,21,24,31,16,21,24,31,12], label: 'New', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(53, 63, 223, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [4, 4, 3, 9, 9, 11, 12, 9, 9, 11, 12, 3], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [5, 4, 9, 7, 12, 13, 19, 7, 12, 13, 19, 9], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'}
    ];
    public surveyBarChartData5: ChartDataSets[] = [
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [22,34,31,22,34,31,22,34,31,22,34,31], label: 'Completed', backgroundColor: 'rgba(50, 208, 175, 0.8)', hoverBackgroundColor: 'rgba(50, 208, 175, 1)'},
      { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [32,24,31,32,24,31,32,24,31,32,24,31], label: 'Pending', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'}
    ];
    // public surveyBarChartData3: ChartDataSets[] = [
    //   { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [54, 58, 62, 67, 71, 77, 81, 83, 91, 99, 111, 123], label: 'Total', backgroundColor: 'rgba(53, 63, 223, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'},
    //   { barPercentage: 0.8, barThickness: 10, maxBarThickness: 12, data: [48, 51, 51, 12, 08, 51, 47, 65, 42, 34, 77, 97], label: 'Active', backgroundColor: 'rgba(255, 111, 32, 0.8)', hoverBackgroundColor: 'rgba(255, 111, 32, 1)'}
    // ];
    
    public surveyBarChartOptions: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 100,
            max : 300,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 30,
          usePointStyle: true
        }
      }
    };

    public surveyBarChartOptions2: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            max : 100,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 30,
          usePointStyle: true
        }
      }
    };

    public surveyBarChartOptions3: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            max : 130,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 30,
          usePointStyle: true
        }
      }
    };

    public surveyBarChartOptions4: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        xAxes: [{
          gridLines: {
            display:false
          }
        }],
        yAxes: [{
          ticks: {
            stepSize: 10,
            max : 50,
            min: 0
          },
          gridLines: {
            borderDash: [8, 8],
            color: "#B0B4CD"
          }
        }]
      },
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 7,
          fontSize: 12,
          fontFamily: "'Poppins', sans-serif",
          fontColor: '#83848E',
          padding: 30,
          usePointStyle: true
        }
      }
    };


    value = 248;
    value1 = 52;
    value2 = 164;
    value3 = 32;
    

    timeChange(){
      if(this.selectedTimeStatus == '30 Days'){
        this.value = 248
      }
      else if(this.selectedTimeStatus == '15 Days'){
        this.value = 190
      }
      else if(this.selectedTimeStatus == '7 Days'){
        this.value = 110
      }
    }

    time2change(){
      if(this.selectedTimeStatus2 == '30 Days'){
        this.value1 = 52
      }
      else if(this.selectedTimeStatus2 == '15 Days'){
        this.value1 = 48
      }
      else if(this.selectedTimeStatus2 == '7 Days'){
        this.value1 = 30
      }

    }

    time3change(){
      if(this.selectedTimeStatus3 == '30 Days'){
        this.value2 = 164
      }
      else if(this.selectedTimeStatus3 == '15 Days'){
        this.value2 = 115
      }
      else if(this.selectedTimeStatus3 == '7 Days'){
        this.value2 = 70
      }

    }

    time4change(){
      if(this.selectedTimeStatus3 == '30 Days'){
        this.value3 = 32
      }
      else if(this.selectedTimeStatus3 == '15 Days'){
        this.value3 = 27
      }
      else if(this.selectedTimeStatus3 == '7 Days'){
        this.value3 = 10
      }

    }
    
    ngOnInit(): void {
      this.selectedType = this.type[0].typ
      this.selectedMonth = this.month[0].mnth
      this.selectedType2 = this.type[0].typ
      this.selectedMonth2 = this.month[0].mnth
      setTimeout(function(){
        $('.sec-ttl-wrap').addClass('hide-it');
      }, 5000);;
      $(document).ready(function(){
        $('.toggle-button-wrap .nav-link').on('shown.bs.tab', function (e) {
          // alert('works');   
        });
  
        function myFunction(x) {
          if (x.matches) {
            $('.main-container').css('margin-left', '60px');
          } else {
            $('.main-container').css('margin-left', '70px');
          }
        }
        var x = window.matchMedia("(max-width: 1599px)")
        myFunction(x);
        x.addListener(myFunction);     
  
        var map1 = new GMaps({el: '#g-map1',lat: 19.9511395,lng: 73.7329294,});
        map1.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map1.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map2 = new GMaps({el: '#g-map2',lat: 19.9511395,lng: 73.7329294,});
        map2.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map2.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map3 = new GMaps({el: '#g-map3',lat: 19.9511395,lng: 73.7329294,});
        map3.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map3.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map4 = new GMaps({el: '#g-map4',lat: 19.9511395,lng: 73.7329294,});
        map4.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map4.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map5 = new GMaps({el: '#g-map5',lat: 19.9511395,lng: 73.7329294,});
        map5.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map5.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map6 = new GMaps({el: '#g-map6',lat: 19.9511395,lng: 73.7329294,});
        map6.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map6.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map7 = new GMaps({el: '#g-map7',lat: 19.9511395,lng: 73.7329294,});
        map7.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map7.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map8 = new GMaps({el: '#g-map8',lat: 19.9511395,lng: 73.7329294,});
        map8.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map8.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map9 = new GMaps({el: '#g-map9',lat: 19.9511395,lng: 73.7329294,});
        map9.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map9.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );
  
        var map10 = new GMaps({el: '#g-map10',lat: 19.9511395,lng: 73.7329294,});
        map10.addMarker (
          {lat: 19.9511395, lng: 73.7329294, title: 'Prismic Reflections', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'
          }, color: 'blue'}
        );
        map10.addMarker (
          {lat: 19.9517864, lng: 73.7337073, title: 'M.S.E.D.C.L', infoWindow: {
            content: '<div class="marker-details"><div class="marker-details-head"> <i class="icons8 icons8-marker"></i> <span class="p">8 Requests in this Area</span></div><div class="marker-details-body"><div class="bttn-list"> <button class="btn ikon-bttn colr1 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon1.png" alt="b"></button> <button class="btn ikon-bttn colr2 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon2.png" alt="b"></button> <button class="btn ikon-bttn colr3 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon3.png" alt="b"></button> <button class="btn ikon-bttn colr4 st"><img class="st" src="../../../assets/images/icons/marker-bttn-ikon4.png" alt="b"></button></div> <button class="btn ikon-bttn num st">+15</button> <button class="btn btn-block zoom-in st"><i class="icons8 icons8-search"></i>Zoom in</button></div></div>'        
          }, size: 'small'}
        );

        
  
        
        
      });
      
    }
  
  
  }
