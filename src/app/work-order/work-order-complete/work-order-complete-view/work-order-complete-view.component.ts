import { Component, OnInit } from '@angular/core';
import { FilterService } from 'src/app/common/filter/filter.service';
declare var $: any;
import { ApiService } from 'src/app/common-services/api-service/api.service';

@Component({
  selector: 'app-work-order-complete-view',
  templateUrl: './work-order-complete-view.component.html',
  styleUrls: ['./work-order-complete-view.component.scss']
})
export class WorkOrderCompleteViewComponent implements OnInit {
  appointmentDetails;

  constructor(private filterService:FilterService, private apiService:ApiService) { }

  hideModal:boolean=false
  hideDetailModel(){
    this.hideModal=false
  }
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  ngOnInit(): void {
  this.filterService.getdisplayWorkOrderDetailModule().subscribe(detailVal=>{
          this.apiService.get('work-order/service-appointment/'+detailVal.id_string).subscribe(appointmentDetail=>{
          	if(appointmentDetail.state == 'success'){
            this.appointmentDetails = appointmentDetail.results
		       $('#completeWorkOrderModal').modal('show');
          	}
          })
    })
  }

}
