import { Component, OnInit } from '@angular/core';
import { DashboardService } from './../../../common/dashboard/dashboard.service';
import { SessionService } from './../../../common-services/session-service/session.service';
import { ApiService } from './../../../common-services/api-service/api.service';

@Component({
  selector: 'app-meter-dashboard',
  templateUrl: './meter-dashboard.component.html',
  styleUrls: ['./meter-dashboard.component.scss']
})
export class MeterDashboardComponent implements OnInit {
  
  utilityIdString = this.sessionService.getter("utility_id_string");

  imageUrls = {
    new_image : '../../assets/images/dashboard-card-img1.png',
    expire_image : '../../assets/images/dashboard-card-img2.png',
    discontineud_image : '../../assets/images/dashboard-card-img3.png',
    contract_image : '../../assets/images/dashboard-card-img3.png'
  }

  blocks = [
    {
      name : 'Total',
      img : this.imageUrls.new_image,
      count : '--',
      class : 'badge badge-pill badge-label-finished',
      default : 'Meters'
    },
    {
      name : 'Normal',
      img : this.imageUrls.expire_image,
      count : '--',
      class : 'badge badge-pill badge-label-success',
      default : 'Meters'
    },
    {
      name : 'Faulty',
      img : this.imageUrls.discontineud_image,
      count : '--',
      class : 'badge badge-pill badge-label-pending',
      default : 'Meters'
    },
    {
      name : 'RCNT',
      img : this.imageUrls.contract_image,
      count : '--',
      class : 'badge badge-pill badge-label-rejected',
      default : 'Meters'
    },
  ]

  constructor(private dashboardService : DashboardService, private sessionService : SessionService, private apiService : ApiService) {
    // Get Meter Summary API Start
    this.apiService.get('meter-data/meter/summary?utility_id_string=' + this.utilityIdString).subscribe(
      data=>{
        if (data.state == "success") {
          this.blocks[0].count = data.result.Total_Meter
          this.blocks[1].count = data.result.Normal_Meter
          this.blocks[2].count = data.result.Faulty_Meter
          this.blocks[3].count = data.result.RCNT_Meter
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Meter Summary", error.error.error)
        }else{
          console.log("Meter Summary", error)
        }
      }
    )
    // Get Meter Summary API End
  }

  ngOnInit(): void {
    this.sendDashboardData()
  }

  sendDashboardData(){
    this.dashboardService.DashboardEvent.emit(this.blocks);
  }
}
