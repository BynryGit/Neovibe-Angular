import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { SuccessMessage, ErrorMessage } from '../../../../error-messages/error-messages';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-reading-view',
  templateUrl: './reading-view.component.html',
  styleUrls: ['./reading-view.component.scss'],
  providers: [SuccessMessage, ErrorMessage]
})

export class ReadingViewComponent implements OnInit {

  dataSet;
  processing;
  schedule_details;
  start_date;
  end_date;
  description;
  faTrash = faTrash;
  occurs_on: String;
  subscription: Subscription
  datePipe = new DatePipe('en-US');
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  SuccessMessage = new SuccessMessage()
  ErrorMessage = new ErrorMessage()
  utilityIdString = this.sessionService.getter("utility_id_string");
  successtoast = false; errortoast = false;
 
  // Used For Scroll Modal Start
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  // Used For Modal Table End

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Name",
    },
    {
      name :  "Consumer",
    },
    {
      name :  "Date",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action",
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) {}

  ngOnInit(): void {    
    this.subscription = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege === 'VIEW'){
        // Get Schedule API Start
        this.apiService.get('meter-data/schedule/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {
              
              if (data.result.start_date === null){
                this.start_date = '-'
              }else{
                this.start_date = data.result.start_date
              }
              
              if (data.result.end_date === null){
                this.end_date = 'No-Limit'
              }else{
                this.end_date = this.datePipe.transform(data.result.end_date, 'dd MMM yy')
              }
              
              if (data.result.description === null){
                this.description = '-'
              }else{
                this.description = data.result.description
              }
              
              if(Object.keys(data.result.occurs_on).length != 0){
                this.occurs_on = ''
                for (let x of data.result.occurs_on){
                  if (this.occurs_on == ''){
                    this.occurs_on = x.value
                  }else{
                    this.occurs_on = this.occurs_on + ', ' + x.value
                  }
                }
              }else{
                this.occurs_on = '-'
              }
              this.schedule_details = data.result
            }
          },
          error => {
            console.log("View Schedule", error)
            if (error.error.state == "error") {
              console.log("View Schedule", error.error.result)
            }else{
              console.log("View Schedule", error)
            }
          }
        )
        // Get Schedule API End
        
        this.apiService.get(`meter-data/schedule-log/list?schedule_id=`+ data.id_string + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
          this.dataSet = data.results;
        });

        // Get Schedule Log List API Start
        // const that = this;
        // this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 5,
        //   serverSide: true,
          
        //   ajax: (dataTablesParameters: any, callback) => {
        //     that.processing = true
        //     const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
            
        //     that.apiService.get(`meter-data/schedule-log/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
        //         that.dataSet = data.results;
        //         this.dtTrigger.next();
        //         that.processing = false
        //         callback({
        //           recordsTotal: data.count,
        //           recordsFiltered: data.count,
        //           data: []
        //         });
        //     });
        //   },
        // };
        // Get Schedule Log List API End

        // Open Schedule View Modal Start
        $('#ScheduleDetailsModal').modal('show');
        // Open Schedule View Modal End
      }
    });
  }

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End

  // Used For Delete Schedule Start
  DeleteSchedule(schedule_id_string){
    if (confirm('Are you sure you want to delete this Schedule?')) {
      this.apiService.delete('meter-data/schedule/'+ schedule_id_string).subscribe(
        data=>{
          if (data.state == "success") {
            this.successtoast = true;
            window.location.reload();          
          }
        },
        error => {
          if (error.error.state == "error") {
            this.errortoast = true;
            console.log("Delete Schedule", error)
          }else{
            console.log("Delete Schedule", error)
          }
        }
      )
    }
  }
  // Used For Delete Schedule End

  // Used For Delete Schedule Log Start
  DeleteScheduleLog(schedule_log_id_string){
    if (confirm('Are you sure you want to delete this Schedule Log?')) {
      this.apiService.delete('meter-data/schedule-log/'+ schedule_log_id_string).subscribe(
        data=>{
          if (data.state == "success") {
            this.successtoast = true;
            window.location.reload();          
          }
        },
        error => {
          if (error.error.state == "error") {
            this.errortoast = true;
            console.log("Delete Schedule Log", error)
          }else{
            console.log("Delete Schedule Log", error)
          }
        }
      )
    }
  }
  // Used For Delete Schedule Log End
}
