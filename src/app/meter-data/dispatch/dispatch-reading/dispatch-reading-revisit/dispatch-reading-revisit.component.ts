import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { faPrint, faFileCsv, faFilePdf, faFileExcel} from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-dispatch-reading-revisit',
  templateUrl: './dispatch-reading-revisit.component.html',
  styleUrls: ['./dispatch-reading-revisit.component.scss']
})
export class DispatchReadingRevisitComponent implements OnInit {

  faPrint = faPrint;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  dataSet;
  processing;
  schedule_log_details;
  revisit_route_task_assignment_dict;
  de_assign_revisit_route_task_assignment_dict;
  subscription: Subscription
  dtOptions: DataTables.Settings = {};
  successtoast = false; errortoast = false;
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
      name :  "Consumer No",
    },
    {
      name :  "Meter No",
    },
    {
      name :  "Meter Reader",
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
      if (data.privilege === 'REVISIT'){
        // Get Schedule Log API Start
        this.apiService.get('meter-data/schedule-log/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {
              this.schedule_log_details = data.result
            }
          },
          error => {
            console.log(error)
            if (error.error.state == "error") {
              alert(error.error.results)
            }else{
              console.log(error)
            }
          }
        )
        // Get Schedule Log API End

        // Get Read Cycle Revisit Task List API Start
        this.apiService.get(`meter-data/schedule-log/`+ data.id_string + '/read-cycle-revisit-task/list?utility__id_string=' + this.utilityIdString).subscribe(data => {
          this.dataSet = data.results;
        });
        // Get Read Cycle Revisit Task List API Start

        // Open Dispatch Revisit Modal Start
        $('#DispatchRevisitModal').modal('show');
        // Open Dispatch Revisit Modal End
      }
    });
  }

  // For Assign Revisit Task To Reader Start
  AssignRevisitTask(route_task_assignment_id_staring, meter_no, consumer_no, meter_reader_id_string){
    // Build Json Data For Assign Revisit Route Task Assignment Start
    this.revisit_route_task_assignment_dict ={
      route_task_assignment_id_staring: route_task_assignment_id_staring,
      meter_no: meter_no,
      consumer_no: consumer_no,
      meter_reader_id_string: meter_reader_id_string
    }
    // Build Json For Assign Revisit Route Task Assignment End

    // Assign Revisit Route Task Assignment API Start
    this.apiService.post('meter-data/assign-revisit-task-assignment',this.revisit_route_task_assignment_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#DispatchRevisitModal').modal('hide');
          this.successtoast = true;
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "exception") {
          $('#DispatchRevisitModal').modal('hide');
          this.errortoast = true;
        }else{
          console.log(error)
          alert(error.result)
        }
      }
    )
    // Assign Revisit Route Task Assignment API End
  }
  // For Assign Revisit Task To  Reader End

  // For De-Assign Revisit Task To Reader Start
  DeassignRevisitTask(route_task_assignment_id_staring, meter_no, consumer_no){
    // Build Json Data For De-Assign Revisit Route Task Assignment Start
    this.de_assign_revisit_route_task_assignment_dict ={
      route_task_assignment_id_staring: route_task_assignment_id_staring,
      meter_no: meter_no,
      consumer_no: consumer_no,
    }
    // Build Json For De-Assign Revisit Route Task Assignment End

    // De-Assign Revisit Route Task Assignment API Start
    this.apiService.post('meter-data/de-assign-revisit-task-assignment',this.de_assign_revisit_route_task_assignment_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#DispatchRevisitModal').modal('hide');
          this.successtoast = true;
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "exception") {
          $('#DispatchRevisitModal').modal('hide');
          this.errortoast = true;
        }else{
          console.log(error)
          alert(error.result)
        }
      }
    )
    // De-Assign Revisit Route Task Assignment API End
  }
  // For De-Assign Revisit Task To  Reader End

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End

}
