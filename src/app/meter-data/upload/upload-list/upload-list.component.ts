import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { faUpload} from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';
import { SuccessMessage, ErrorMessage } from '../../../error-messages/error-messages';

@Component({
  selector: 'app-upload-list',
  templateUrl: './upload-list.component.html',
  styleUrls: ['./upload-list.component.scss'],
  providers: [SuccessMessage, ErrorMessage]
})

export class UploadListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  upload_route_dict;
  faUpload = faUpload;
  SuccessMessage = new SuccessMessage()
  ErrorMessage = new ErrorMessage()
  successtoast= false; errortoast=false;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Schedule Name",
    },
    {
      name :  "Read Cycle",
    },
    {
      name :  "Route",
    },
    {
      name :  "Consumers",
    },
    {
      name :  "Normal",
    },
    {
      name :  "Completed"
    },
    {
      name :  "Pending"
    },
    {
      name :  "Status"
    },
    {
      name :  "Action"
    }
  ]
  // Table Heading Parameter End

  constructor(private apiService : ApiService, private sessionService : SessionService) { }

  ngOnInit(): void {
    // API For Getting Validation Schedule List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/upload-route/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
            that.dataSet = data.results;
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
    // API For Validation Schedule List End
  }

  // For Upload Route Start
  UploadRoute(schedule_log_id_string, read_cycle_id_string, route_id_string){
    // Build Json Data For Upload Route Start
    this.upload_route_dict ={
      utility_id: this.sessionService.getter("utility_id_string"),
      schedule_log_id: schedule_log_id_string,
      read_cycle_id: read_cycle_id_string,
      route_id: route_id_string,
    }
    // Build Json For Upload Route End

    // Add Upload Route API Start
    this.apiService.post('meter-data/upload-route', this.upload_route_dict).subscribe(
      data=>{
        if (data.state == "success") {
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        if (error.error.state == "exception") {
          this.errortoast = true;
          console.log("Upload Route", error)
        }else{
          console.log("Upload Route", error)
        }
      }
    )
    // Add Upload Route API End
  }
  // For Upload Route End
}
