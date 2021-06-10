import { Component, OnInit } from '@angular/core';
import { faPen, faRedoAlt} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-dispatch-reading-list',
  templateUrl: './dispatch-reading-list.component.html',
  styleUrls: ['./dispatch-reading-list.component.scss']
})

export class DispatchReadingListComponent implements OnInit {

  faPen=faPen;
  faRedoAlt=faRedoAlt;
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
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
      name :  "Consumer",
    },
    {
      name :  "Started",
    },
    {
      name :  "Dispatch",
    },
    {
      name :  "Completed",
    },
    {
      name :  "Start Date",
    },
    {
      name :  "End Date",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action"
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { }

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
        
        that.apiService.get(`meter-data/schedule-log/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&state=4').subscribe(data => {
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
    // API For Reading Schedule List End
  }

    // For View Reading Route Start
    ViewRoute(event,id_string,privilege){
      this.filterService.sendButtonEventByIdString(event,id_string,privilege)
    }
    // For View Reading Route End
  
    // For View Reading Revisit Route Start
    ViewRevisitRoute(event,id_string,privilege){
      this.filterService.sendButtonEventByIdString(event,id_string,privilege)
    }
    // For View Reading Revisit Route End
}
