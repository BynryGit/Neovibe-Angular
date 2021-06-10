import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { ErrorMessage } from '../../error-messages/error-messages';


@Component({
  selector: 'app-search-consumer',
  templateUrl: './search-consumer.component.html',
  styleUrls: ['./search-consumer.component.scss'],
  providers: [ErrorMessage]
})
export class SearchConsumerComponent implements OnInit {

  errortoast = false; showtable = false;
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  ErrorMessage = new ErrorMessage()
  utilityIdString = this.sessionService.getter('utility_id_string')

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Meter Number",
    },
    {
      name :  "Consumer Number",
    },
    {
      name :  "Read Cycle",
    },
    {
      name :  "Action"
    }
  ]
  // Table Heading Parameter End

  constructor(private sessionService : SessionService, private apiService : ApiService, private router : Router) {
  }

  ngOnInit(): void {
  }

  // Search Consumer Function Start
  searchConsumer(value){
    this.apiService.get('meter-data/meter-reading/list?utility__id_string=' + this.utilityIdString + '&search=' +  $.trim(value)).subscribe(
      data=>{
        this.dataSet = data.results;
        this.showtable = true;
      },
      error => {
        this.errortoast = true
        this.showtable = false;
        console.log("Search Consumer", error)
      }
    )
    // API For Getting Meter List Start
    // const that = this;
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 10,
    //   serverSide: true,
      
    //   ajax: (dataTablesParameters: any, callback) => {
    //     that.processing = true
    //     const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
    //     that.apiService.get(`meter-data/meter-reading/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString + '&search=' +  $.trim(value)).subscribe(data => {
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
    // API For Getting Meter List End
  }
  // Search Consumer Function End

  // For View Reading Start
  ViewReading(meter_no, schedule_log_is_string, read_cycle_id_string){
    this.router.navigateByUrl('meter-data/validation-detail-view/'+  schedule_log_is_string + '/' + read_cycle_id_string + '/1/' + $.trim(meter_no));
  }
  // For View Reading End
}
