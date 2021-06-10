import { Component, OnInit } from '@angular/core';
import { faPrint, faFileInvoiceDollar, faPen } from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { FilterService } from 'src/app/common/filter/filter.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-billing-schedule-list',
  templateUrl: './billing-schedule-list.component.html',
  styleUrls: ['./billing-schedule-list.component.scss']
})
export class BillingScheduleListComponent implements OnInit {

  faPrint = faPrint;
  faFileInvoiceDollar= faFileInvoiceDollar;
  faPen=faPen;
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString = this.sessionService.getter("utility_id_string");

  blocks = [
    {
        name:       "Name",
    },
    {
        name:       "Bill Cycle",
    },
    {
        name:       "Product",
    }, 
    {
        name:       "Start Date",
    },
    {
        name:       "End Date",
    },   
    
    {
        name:        "Recurring",
    },
    {
        name:       "Frequency",
    },
    {
        name:       "Repeat Every",
    },
    
    {
        name:       "Status",
    },
    {
        name:       "Action",
    }
]

  constructor(private filterService : FilterService, private apiService : ApiService, private router: Router, private sessionService : SessionService) { }

  ngOnInit(): void {

   // API For Getting Reading Schedule List Start
   const that = this;
   this.dtOptions = {
     pagingType: 'full_numbers',
     pageLength: 100,
     serverSide: true,
     
     ajax: (dataTablesParameters: any, callback) => {
       that.processing = true
       const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
       
       that.apiService.get(`billing/schedule-bill/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
           that.dataSet = data.results;
           console.log('that.dataSet: ', that.dataSet);
           this.dtTrigger.next();
           that.processing = false
           callback({
             recordsTotal: data.count,
             recordsFiltered: data.count,
             data: []
           });
       });
     },
   };
   // API For Reading Schedule List End

  }

 // For Edit Bill Schedule Start
 EditBillSchedule(event,id_string,privilege){
  this.filterService.sendButtonEventByIdString(event,id_string,privilege)
}
// For Edit Bill Schedule End

  // For View Schedule Start
  ViewBillSchedule(event,id_string,privilege){
    this.filterService.sendButtonEventByIdString(event,id_string,privilege)
  }
  // For View Schedule End


  RunBillSchedule(event,id_string,privilege){
    this.router.navigate(['billing/run-schedule',id_string])
  }
}
