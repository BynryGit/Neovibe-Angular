import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FilterService } from '../../../common/filter/filter.service';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';

@Component({
  selector: 'app-validation-list',
  templateUrl: './validation-list.component.html',
  styleUrls: ['./validation-list.component.scss']
})

export class ValidationListComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  validator_one = false; validator_two = false;
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
      name :  "Consumers",
    },
    {
      name :  "Received",
    },
    {
      name :  "Remaining",
    },
    {
      name :  "V1",
    },
    {
      name :  "V2",
    },
    {
      name :  "Duplicate"
    },
    {
      name :  "New"
    },
    {
      name :  "RCNT"
    },
    {
      name :  "Completed"
    },
    {
      name :  "Start Date"
    },
    {
      name :  "End Date"
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { }

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
        
        that.apiService.get(`meter-data/validation-schedule-log/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&state=4').subscribe(data => {
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

}
