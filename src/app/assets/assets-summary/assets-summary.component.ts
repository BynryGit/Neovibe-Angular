import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';


@Component({
  selector: 'app-assets-summary',
  templateUrl: './assets-summary.component.html',
  styleUrls: ['./assets-summary.component.scss']
})
export class AssetsSummaryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // Donut chart settings 1
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: Label[] = ['Total Count', ''];
  public doughnutChartData: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(53, 63, 223, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
  ];
  public doughnutChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 90,
  };

  // Donut chart settings 2
  public doughnutChartType2: ChartType = 'doughnut';
  public doughnutChartLabels2: Label[] = ['Total Validation', ''];
  public doughnutChartData2: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(176, 180, 205, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
  ];
  public doughnutChartOptions2: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 86,
  };

  // Donut chart settings 3
  public doughnutChartType3: ChartType = 'doughnut';
  public doughnutChartLabels3: Label[] = ['Total Validation', ''];
  public doughnutChartData3: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(237, 155, 34, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
  ];
  public doughnutChartOptions3: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 90,
  };

      // Donut chart settings 4
  public doughnutChartType4: ChartType = 'doughnut';
  public doughnutChartLabels4: Label[] = ['Total Validation', ''];
  public doughnutChartData4: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
  ];
  public doughnutChartOptions4: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 86,
  };

  // Donut chart settings 5
  public doughnutChartType5: ChartType = 'doughnut';
  public doughnutChartLabels5: Label[] = ['Total Validation', ''];
  public doughnutChartData5: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(50, 208, 175, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
  ];
  public doughnutChartOptions5: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 90,
  };

      // Donut chart settings 6
  public doughnutChartType6: ChartType = 'doughnut';
  public doughnutChartLabels6: Label[] = ['Total Validation', ''];
  public doughnutChartData6: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(237, 104, 104, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
  ];
  public doughnutChartOptions6: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 86,
  };

}
