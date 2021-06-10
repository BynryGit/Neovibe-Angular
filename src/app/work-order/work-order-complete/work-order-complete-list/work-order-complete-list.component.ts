import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { Subject, Subscription } from 'rxjs';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { FilterService } from 'src/app/common/filter/filter.service';

@Component({
  selector: 'app-work-order-complete-list',
  templateUrl: './work-order-complete-list.component.html',
  styleUrls: ['./work-order-complete-list.component.scss']
})
export class WorkOrderCompleteListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  subscription: Subscription;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString;processing;serviceAppointments;serviceAppointmentList;

  constructor(private sessionService: SessionService,private commonService:CommonService,private apiService: ApiService,private filterService:FilterService) { }

  ngOnInit(): void {

  this.utilityIdString = this.sessionService.getter('utility_id_string')

    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: -1,
      serverSide: true,

      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;

       this.subscription = that.apiService.get(`work-order/service-appointment/list?state=${7}&utility_id_string=${that.utilityIdString}&page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
          that.serviceAppointments = resp.results;
          that.serviceAppointmentList = resp.results;
          that.dtTrigger.next();
          that.processing = false
          callback({
            recordsTotal: resp.count,
            recordsFiltered: resp.count,
            data: []
          });
        });
      },
    };
  }

   blocks = [
        {
            name:       "Appointment ID",
        },
        {
            name:       "Consumer Name",
        },
        {
            name:       "Type",
        },
        {
            name:       "Sub Type",
        },
        
        {
          name:       "Area",
        },
        {
          name:       "Sub Area",
        },
        {
          name:       "Completed Date",
        },
        {
            name:       "Status",
        },
        {
            name:       "Action"
        }   
    ]

  ViewCompleteWorkOrderDetail(detailVal){
      this.filterService.displayWorkOrderDetailModule(detailVal)
    }

}
