import { Component, OnInit } from '@angular/core';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { Subject } from 'rxjs';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnInit {

  faPen=faPen;
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Name",
    },
    {
      name :  "Read Cycle",
    },
    {
      name :  "Product",
    },
    {
      name :  "Start Date",
    },
    {
      name :  "End Date",
    },
    {
      name :  "Created Date",
    },
    {
      name :  "Recurance",
    },
    {
      name :  "Frequency",
    },
    {
      name :  "Status",
    },
    {
      name :  "Action"
    }
  ]
  // Table Heading Parameter End

  // Used For Calling Services
  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) {
    this.getSearchText();
  }

  ngOnInit(): void {
    // API For Getting Reading Schedule List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/schedule/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
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

  // Search Text Start
  getSearchText = () => {
    this.filterService.getSearchText().subscribe(
      data => {
        $('#table1').DataTable().search(data.text).draw()
      },
      error => {
        console.log(error)
      }
    )
  }
  // Search Text Start

  // For View Schedule Start
  ViewSchedule(event,id_string,privilege){
    this.filterService.sendButtonEventByIdString(event,id_string,privilege)
  }
  // For View Schedule End

  // For Edit Schedule Start
  EditSchedule(event,id_string,privilege){
    this.filterService.sendButtonEventByIdString(event,id_string,privilege)
  }
  // For Edit Schedule End
}
