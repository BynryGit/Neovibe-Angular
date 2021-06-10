import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../../common/dashboard/dashboard.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';

@Component({
  selector: 'app-dispatch-reading-dashboard',
  templateUrl: './dispatch-reading-dashboard.component.html',
  styleUrls: ['./dispatch-reading-dashboard.component.scss']
})

export class DispatchReadingDashboardComponent implements OnInit {

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
      default : 'Dispatch'
    },
    {
      name : 'Complete',
      img : this.imageUrls.discontineud_image,
      count : '--',
      class : 'badge badge-pill badge-label-success',
      default : 'Dispatch'
    },
    {
      name : 'In Progress',
      img : this.imageUrls.contract_image,
      count : '--',
      class : 'badge badge-pill badge-label-rejected',
      default : 'Dispatch'
    },
    {
      name : 'Pending',
      img : this.imageUrls.expire_image,
      count : '--',
      class : 'badge badge-pill badge-label-pending',
      default : 'Dispatch'
    },
  ]

  constructor(private dashboardService:DashboardService, private sessionService : SessionService, private apiService : ApiService) { 
    // Get Reading Schedule Log Summary API Start
    this.apiService.get('meter-data/schedule-log/summary?utility_id_string=' + this.utilityIdString).subscribe(
      data=>{
        if (data.state == "success") {
          this.blocks[0].count = data.result.Total_Schedule_Log
          this.blocks[1].count = data.result.Complete_Schedule_Log
          this.blocks[2].count = data.result.InProgress_Schedule_Log
          this.blocks[3].count = data.result.Pending_Schedule_Log
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Schedule Log Summary", error.error.error)
        }else{
          console.log("Schedule Log Summary", error)
        }
      }
    )
    // Get Reading Schedule Log Summary API End
  }

  ngOnInit(): void {
    this.sendDashboardData()
  }

  sendDashboardData(){
    this.dashboardService.DashboardEvent.emit(this.blocks);
  }
}
