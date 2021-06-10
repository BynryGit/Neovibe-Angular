import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { SessionService } from '../../../common-services/session-service/session.service';
import { ApiService } from '../../../common-services/api-service/api.service';

@Component({
  selector: 'app-validation-dashboard',
  templateUrl: './validation-dashboard.component.html',
  styleUrls: ['./validation-dashboard.component.scss']
})
export class ValidationDashboardComponent implements OnInit {

  reading_details;
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Validation Chart Settings 1 Start
    public ValidationChartType1: ChartType = 'doughnut';
    public ValidationChartLabel1: Label[] = ['Total Consumer', ''];
    public ValidationChartData1: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(53, 63, 223, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
    ];
  
    public ValidationChartOptions1: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 90,
    };
  // Validation Chart Settings 1 End
 
  // Validation Chart Settings 2 Start
    public ValidationChartType2: ChartType = 'doughnut';
    public ValidationChartLabel2: Label[] = ['Total Received', ''];
    public ValidationChartData2: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(176, 180, 205, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
    ];
    public ValidationChartOptions2: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 86,
    };
  // Validation Chart Settings 2 End

  // Validation Chart Settings 3 Start
    public ValidationChartType3: ChartType = 'doughnut';
    public ValidationChartLabel3: Label[] = ['Validation 1', ''];
    public ValidationChartData3: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(237, 155, 34, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
    ];
    public ValidationChartOptions3: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 90,
    };
  // Validation Chart Settings 3 End

  // Validation Chart Settings 4 Start
    public ValidationChartType4: ChartType = 'doughnut';
    public ValidationChartLabel4: Label[] = ['Validation 2', ''];
    public ValidationChartData4: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
    ];
    public ValidationChartOptions4: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 86,
    };
  // Validation Chart Settings 4 End

  // Validation Chart Settings 5 Start
    public ValidationChartType5: ChartType = 'doughnut';
    public ValidationChartLabel5: Label[] = ['Completed', ''];
    public ValidationChartData5: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(50, 208, 175, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
    ];
    public ValidationChartOptions5: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 90,
    };
  // Validation Chart Settings 5 End

  // Validation Chart Settings 6 Start
    public ValidationChartType6: ChartType = 'doughnut';
    public ValidationChartLabel6: Label[] = ['Pending', ''];
    public ValidationChartData6: ChartDataSets[] = [ 
      { weight: 20, backgroundColor: ['rgba(237, 104, 104, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
    ];
    public ValidationChartOptions6: ChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false },
      cutoutPercentage: 86,
    };
  // Validation Chart Settings 6 End

  // Validation Chart Settings 7 Start
  public ValidationChartType7: ChartType = 'doughnut';
  public ValidationChartLabel7: Label[] = ['Duplicate', ''];
  public ValidationChartData7: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(237, 155, 34, 1)', 'rgba(255,255,255, 1)'], data: [500, 500], borderWidth: 0 },
  ];
  public ValidationChartOptions7: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 90,
  };
  // Validation Chart Settings 7 End

  // Validation Chart Settings 8 Start
  public ValidationChartType8: ChartType = 'doughnut';
  public ValidationChartLabel8: Label[] = ['Revisit', ''];
  public ValidationChartData8: ChartDataSets[] = [ 
    { weight: 20, backgroundColor: ['rgba(255, 111, 32, 1)', 'rgba(255,255,255, 1)'], data: [100, 10], borderWidth: 0 },
  ];
  public ValidationChartOptions8: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cutoutPercentage: 86,
  };
  // Validation Chart Settings 8 End

  constructor(private sessionService : SessionService, private apiService : ApiService) { 
    // Get Meter Reading Summary API Start
    this.apiService.get('meter-data/validation/summary?utility_id_string=' + this.utilityIdString).subscribe(
      data=>{
        if (data.state == "success") {
          this.reading_details = data.result;
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Validation Summary", error.error.error)
        }else{
          console.log("Validation Summary", error)
        }
      }
    )
    // Get Meter Reading Summary API End
  }

  ngOnInit(): void {
  }

}
