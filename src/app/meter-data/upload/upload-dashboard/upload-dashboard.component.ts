import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../../common/dashboard/dashboard.service';
import { SessionService } from '../../../common-services/session-service/session.service';
import { ApiService } from '../../../common-services/api-service/api.service';

@Component({
  selector: 'app-upload-dashboard',
  templateUrl: './upload-dashboard.component.html',
  styleUrls: ['./upload-dashboard.component.scss']
})

export class UploadDashboardComponent implements OnInit {

  utilityIdString = this.sessionService.getter("utility_id_string");

  imageUrls = {
    new_image : '../../assets/images/dashboard-card-img1.png',
    expire_image : '../../assets/images/dashboard-card-img2.png',
    discontineud_image : '../../assets/images/dashboard-card-img3.png',
    contract_image : '../../assets/images/dashboard-card-img3.png'
  }

  blocks = [
    {
      name : 'Total Consumer',
      img : this.imageUrls.new_image,
      count : '--',
      class : 'badge badge-pill badge-label-finished',
      default : 'Upload'
    },
    {
      name : 'Uploded',
      img : this.imageUrls.discontineud_image,
      count : '--',
      class : 'badge badge-pill badge-label-unfinished',
      default : 'Upload'
    },
    {
      name : 'Pending',
      img : this.imageUrls.contract_image,
      count : '--',
      class : 'badge badge-pill badge-label-pending',
      default : 'Upload'
    },
    {
      name : 'Rejected',
      img : this.imageUrls.expire_image,
      count : '--',
      class : 'badge badge-pill badge-label-rejected',
      default : 'Upload'
    },
  ]

  constructor(private dashboardService:DashboardService, private sessionService : SessionService, private apiService : ApiService) { 
    // Get Reading Schedule Log Summary API Start
    this.apiService.get('meter-data/upload/summary?utility_id_string=' + this.utilityIdString).subscribe(
      data=>{
        if (data.state == "success") {
          this.blocks[0].count = data.result.total_consumer
          this.blocks[1].count = data.result.uploaded_route
          this.blocks[2].count = data.result.pending_route
          this.blocks[3].count = data.result.rejected_route
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Upload Summary", error.error.error)
        }else{
          console.log("Upload Summary", error)
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
