import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../../common/filter/filter.service';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';
import { SuccessMessage, AlreadyExistMessage, ErrorMessage } from '../../../error-messages/error-messages';

declare var $: any;

@Component({
  selector: 'app-validation-add',
  templateUrl: './validation-add.component.html',
  styleUrls: ['./validation-add.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage, ErrorMessage]
})

export class ValidationAddComponent implements OnInit {

  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  ErrorMessage = new ErrorMessage()
  schedule_log_list; schedule_log_obj : any = {};
  route_list; route_obj : any = {};
  meter_Obj: any = {}; current_reading_Obj: any = {};
  meter_status_list; meter_status_obj : any = {};
  reader_status_list; reader_status_obj : any = {};
  invalid_schedule_log = false; invalid_route = false; invalid_meter = false; invalid_reading = false; invalid_status = false; invalid_reader_status = false;
  utilityIdString = this.sessionService.getter("utility_id_string");

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { 
    this.getScheduleLog();
    this.getRoute();
    this.getMeter_status();
    this.getReader_status();
  }

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      this.invalid_route = false; this.invalid_schedule_log = false; this.invalid_meter = false; this.invalid_reading = false; this.invalid_status = false; this.invalid_reader_status = false;
      // Used For Showing Add Validation Modal Start
      $('#validationAddModal').modal('show');
      // Used For Showing Add Validation Modal End
    })
  }

  // Schedule Log Dropdown API Start
  getScheduleLog = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/route/list').subscribe(
      data => {
        this.schedule_log_list = data.results;
      },
      error => {
        console.log("Schedule Log", error)
      }
    )
  }
  // Schedule Log API End

  // Route Dropdown API Start
  getRoute = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/route/list').subscribe(
      data => {
        this.route_list = data.results;
      },
      error => {
        console.log("Route List", error)
      }
    )
  }
  // Route Dropdown API End

  // Meter Status Dropdown API Start
  getMeter_status = () => {
    this.apiService.get('meter-status/list').subscribe(
      data => {
        this.meter_status_list = data.results;
      },
      error => {
        console.log("Meter Status", error)
      }
    )
  }
  // Meter Status Dropdown API End

  // Meter Status Dropdown API Start
  getReader_status = () => {
    this.apiService.get('meter-status/list').subscribe(
      data => {
        this.reader_status_list = data.results;
      },
      error => {
        console.log("Reader Status", error)
      }
    )
  }
  // Meter Status Dropdown API End

}
