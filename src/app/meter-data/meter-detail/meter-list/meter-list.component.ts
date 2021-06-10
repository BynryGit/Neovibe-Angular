import { Component, OnInit } from '@angular/core';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { FilterService } from './../../../common/filter/filter.service';
import { ApiService } from './../../../common-services/api-service/api.service';
import { SessionService } from './../../../common-services/session-service/session.service';

@Component({
  selector: 'app-meter-list',
  templateUrl: './meter-list.component.html',
  styleUrls: ['./meter-list.component.scss']
})
export class MeterListComponent implements OnInit {

  faPen=faPen;
  dtOptions: DataTables.Settings = {};
  dataSet;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Meter Number",
    },
    {
      name :  "Consumer Number",
    },
    {
      name :  "Product",
    },
    {
      name :  "Reading Type",
    },
    {
      name :  "Status",
    },
    {
      name :  "Condition",
    },
    {
      name :  "Current Reading",
    },
    {
      name :  "Meter Make",
    },
    {
      name :  "Install Date",
    },
    {
      name :  "Premise",
    },
    {
      name :  "Route",
    },
    {
      name :  "Action"
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService, private router:Router) {
    this.getSearchText();
  }

  ngOnInit(): void {
    // API For Getting Meter List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`meter-data/meter/list?page=${page}&page_size=${this.dtOptions.pageLength}` + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
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
    // API For Getting Meter List End
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

  // For View Meter Start
  ViewMeter(event,id_string){
    this.router.navigate(['/meter-data/meter-detail-view',id_string]);
  }
  // For View Meter End

  // For Edit Meter Start
  EditMeter(event,id_string,privilege){
    this.filterService.sendButtonEventByIdString(event,id_string,privilege)
  }
  // For Edit Meter End
}
