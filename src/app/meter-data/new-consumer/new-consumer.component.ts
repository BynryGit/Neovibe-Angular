import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';

@Component({
  selector: 'app-new-consumer',
  templateUrl: './new-consumer.component.html',
  styleUrls: ['./new-consumer.component.scss']
})

export class NewConsumerComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  schedule_log_id_String;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Read Cycle",
    },
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
      name :  "Current Reading",
    },
    {
      name :  "Reading Date",
    },
    {
      name :  "Action",
    }
  ]
  // Table Heading Parameter End

  constructor(private apiService : ApiService, private sessionService : SessionService, private route : ActivatedRoute) { 

  }

  ngOnInit(): void {
    // Get Id_String From URL Start
    this.route.params.subscribe(params => {
      this.schedule_log_id_String = params.id_string
    });
    // Get Id_String From URL End

    // API For Getting New Consumer List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/new-consumer/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&schedule_log_id=' + this.schedule_log_id_String).subscribe(data => {
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
    // API For New Consumer List End
  }
}