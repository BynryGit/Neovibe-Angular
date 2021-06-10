import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { faPrint, faFileCsv, faFilePdf, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { SuccessMessage, ErrorMessage } from '../../../../error-messages/error-messages';

declare var $: any;

@Component({
  selector: 'app-dispatch-reading-view',
  templateUrl: './dispatch-reading-view.component.html',
  styleUrls: ['./dispatch-reading-view.component.scss'],
  providers: [SuccessMessage, ErrorMessage]
})

export class DispatchReadingViewComponent implements OnInit {

  dataSet;
  user_details;
  processing;
  schedule_log_details;
  route_task_assignment_dict;
  faPrint = faPrint;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  successtoast = false; errortoast = false;
  SuccessMessage = new SuccessMessage()
  ErrorMessage = new ErrorMessage()
  subscription: Subscription
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  utilityIdString = this.sessionService.getter("utility_id_string");

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
      name :  "Route",
    },
    {
      name :  "Consumer",
    },
    {
      name :  "Reading",
    },
    {
      name :  "Meter Reader",
    },
    {
      name :  "Assign Date",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action",
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { }

  ngOnInit(): void {
    this.subscription = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege === 'VIEW'){
        // Get Schedule Log API Start
        this.apiService.get('meter-data/schedule-log/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {
              this.schedule_log_details = data.result
            }
          },
          error => {
            if (error.error.state == "error") {
              console.log("View Schedule Route", error.error.results)
            }else{
              console.log("View Schedule Route", error)
            }
          }
        )
        // Get Schedule Log API End

        this.apiService.get(`meter-data/schedule-log/`+ data.id_string + '/route/list?utility__id_string=' + this.utilityIdString).subscribe(data => {
          this.dataSet = data.results;
        });

        // Get Route List API Start
        // const that = this;
        // this.dtOptions = {
        //   pagingType: 'full_numbers',
        //   pageLength: 5,
        //   serverSide: true,
          
        //   ajax: (dataTablesParameters: any, callback) => {
        //     that.processing = true
        //     const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
            
        //     that.apiService.get(`meter-data/schedule-log/${data.id_string}/route/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
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
        // Get Route List API End

        // Open Dispatch Route Modal Start
        $('#DispatchRouteModal').modal('show');
        // Open Dispatch Route Modal End
      }
    });
  }

  // For Assign Task To Reader Start
  AssignTask(read_cycle_id_string, route_id_string, schedule_log_id_string, meter_reader_id_string){
    // Build Json Data For Route Task Assignment Start
    this.route_task_assignment_dict ={
      utility_id: this.sessionService.getter("utility_id_string"),
      read_cycle_id: read_cycle_id_string,
      route_id: route_id_string,
      schedule_log_id: schedule_log_id_string,
      meter_reader_id: meter_reader_id_string
    }
    // Build Json For Route Task Assignment End

    // Add Route Task Assignment API End
    this.apiService.post('meter-data/route-task-assignment',this.route_task_assignment_dict).subscribe(
      data=>{
        if (data.state == "success") {
          this.successtoast = true;
          $('#DispatchRouteModal').modal('hide');
          window.location.reload();
        }
      },
      error => {
        if (error.error.state == "exception") {
          this.errortoast = true;
          $('#DispatchRouteModal').modal('hide');
        }else{
          console.log("Assign Route", error)
        }
      }
    )
    // Add Route Task Assignment API End
  }
  // For Assign Task To  Reader End

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End
}
