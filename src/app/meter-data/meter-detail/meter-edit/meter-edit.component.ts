import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { SuccessMessage, AlreadyExistMessage, ErrorMessage } from '../../../error-messages/error-messages';
import { FilterService } from './../../../common/filter/filter.service';
import { ApiService } from './../../../common-services/api-service/api.service';
import { SessionService } from './../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-meter-edit',
  templateUrl: './meter-edit.component.html',
  styleUrls: ['./meter-edit.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage, ErrorMessage]
})
export class MeterEditComponent implements OnInit {

  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  ErrorMessage = new ErrorMessage()
  subscription: Subscription 
  install_dte: NgbDateStruct;
  faCalendarAlt = faCalendarAlt;
  meter_dict;
  successtoast = false; errortoast= false;
  today_date = new Date()
  meter_make_list; meter_make_obj : any = {};
  meter_type_list; meter_type_obj : any = {};
  service_type_list; service_type_obj : any = {};
  route_list; route_obj : any = {};
  premise_list; premise_obj : any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");  
  invalid_route = false; invalid_premise = false; 

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) {
    // Dropdown API Start
    this.getMeter_type();
    this.getService_type();
    this.getRoute();
    this.getPremise();
    this.getMeter_make();
    // Dropdown API End
  }

  ngOnInit(): void {
    this.subscription = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege === 'EDIT'){
        // Get Meter API Start
        this.apiService.get('meter-data/meter/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {
              // Used For Clear Modal Data Start
              this.invalid_route = false; this.invalid_premise = false; 
              // Used For Clear Modal Data End

              // Set Data To Edit Meter Modal Start
              $('#meter_id_string').val(data.result.id_string)
              $('#meter_no').val(data.result.meter_no)
              $('#device_no').val(data.result.device_no)
              $('#consumer_no').val(data.result.consumer_detail.consumer_number)
              $('#meter_make').val(data.result.meter_make)
              $('#current_reading').val(data.result.current_reading)
              $('#latitude').val(data.result.latitude)
              $('#longitude').val(data.result.longitude)
              
              this.meter_type_obj.meter_type = {id_string: data.result.meter_type_id.id_string, value: data.result.meter_type_id.value}
              this.service_type_obj.service_type = {id_string: data.result.utility_product_id.id_string, name: data.result.utility_product_id.name}
              this.route_obj.route = {id_string: data.result.route_id.id_string, name: data.result.route_id.name}
              this.premise_obj.premise = {id_string: data.result.premise_id.id_string, name: data.result.premise_id.name}
              this.meter_make_obj.make = {id_string: data.result.meter_make_id.id_string, name: data.result.meter_make_id.name}

              if (data.result.install_date === null){
                // Nothing to do
              }else{
                var install_date = new Date(data.result.install_date)
                $("#install_date").val(install_date.getFullYear() + '-' + (((install_date.getMonth() + 1) < 10) ? '0' : '') + (install_date.getMonth() + 1) + '-' + ((install_date.getDate() < 10) ? '0' : '') + install_date.getDate())
              }

              $('#EditMeterModal').modal('show');
              // Set Data To Edit Meter Modal End
            }
          },
          error => {
            if (error.error.state == "error") {
              console.log("Meter Edit", error.error.results)
            }else{
              console.log("Meter Edit", error)
            }
          }
        )
        // Get Meter API End
      }
    });
  }

  // Route Dropdown API Start
  getRoute = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/route/list').subscribe(
      data => {
        this.route_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Route Dropdown API End

  // Premise Dropdown API Start
  getPremise = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/premise/list').subscribe(
      data => {
        this.premise_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Premise Dropdown API End

  // Meter Type Dropdown API Start
  getMeter_type = () => {
    this.apiService.get('global-lookup/list?category=Meter_Type').subscribe(
      data => {
        this.meter_type_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Meter Type Dropdown API End

  // Meter Make Dropdown API Start
   getMeter_make = () => {
    this.apiService.get('meter-data/meter-make/list').subscribe(
      data => {
        this.meter_make_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Meter Make Dropdown API End

  // Service Type Dropdown API Start
  getService_type = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/product/list').subscribe(
      data => {
        this.service_type_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Service Type Dropdown API End

  edit_meter() {
    if(!this.route_obj.route){
      this.invalid_route = true
      return
    }else{
      this.invalid_route = false
    }
    if(!this.premise_obj.premise){
      this.invalid_premise = true
      return
    }else{
      this.invalid_premise = false
    }
    // Build Json Data For Meter Start
    this.meter_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      route_id:this.route_obj.route.id_string,
      premise_id:this.premise_obj.premise.id_string,
      meter_no:$("#device_no").val(),
      device_no:$("#meter_no").val(),
      latitude:$("#latitude").val(),
      longitude:$("#longitude").val(),
    }
    
    if ($("#install_date").val() != ''){
      this.meter_dict['install_date'] = $("#install_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
    }
    // Build Json Data For Meter End

    // Edit Meter API Start
    this.apiService.put('meter-data/meter/'+ $('#meter_id_string').val(),this.meter_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#EditMeterModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        console.log("Edit Meter", error)
        if (error.error.state == "exception") {
          $('#EditMeterModal').modal('hide');
        }else{
          console.log("Edit Meter", error)
        }
      }
    )
    // Edit Meter API End
  }

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End
}
