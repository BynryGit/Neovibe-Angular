import { Component, OnInit } from '@angular/core';
import { SuccessMessage, AlreadyExistMessage, ErrorMessage } from '../../../error-messages/error-messages';
import { FilterService } from './../../../common/filter/filter.service';
import { ApiService } from './../../../common-services/api-service/api.service';
import { SessionService } from './../../../common-services/session-service/session.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

declare var $: any;

@Component({
  selector: 'app-meter-add',
  templateUrl: './meter-add.component.html',
  styleUrls: ['./meter-add.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage, ErrorMessage]
})

export class MeterAddComponent implements OnInit {

  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  ErrorMessage = new ErrorMessage()
  fileToUpload: File = null;
  today_date = new Date()
  install_dte: NgbDateStruct;
  faCalendarAlt = faCalendarAlt;
  meter_make_list; meter_make_obj : any = {};
  meter_status_list; meter_status_obj : any = {};
  meter_type_list; meter_type_obj : any = {};
  service_type_list; service_type_obj : any = {};
  device_Obj: any = {}; current_reading_Obj: any = {};
  latitude_Obj: any = {}; longitude_Obj: any = {};
  route_list; route_obj : any = {};
  premise_list; premise_obj : any = {};
  meter_dict;
  utilityIdString = this.sessionService.getter("utility_id_string");  
  invalid_route = false; invalid_premise = false; successtoast = false; errortoast= false; invalid_file = false; invalid_device = false; invalid_make = false;
  invalid_reading = false; invalid_date = false; invalid_meter_type = false; invalid_product = false; invalid_status = false

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  
  // Data For Tabs Start
  tabList = [
    {
      name : 'Meter Add',
      class : 'nav-item nav-link st active',
      id : 'nav-meter-add-tab',
      href : '#nav-meter-add',
      ariaControls : "nav-meter-add",
      ariaSelected : "false"
    },
    {
      name : 'Meter Upload',
      class : 'nav-item nav-link st',
      id : 'nav-meter-upload-tab',
      href : '#nav-meter-upload',
      ariaControls : "nav-meter-upload",
      ariaSelected : "true"
    },
  ]
  // Data For Tabs End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { 
    // Dropdown API Start
    this.getMeter_type();
    this.getService_type();
    this.getRoute();
    this.getPremise();
    this.getMeter_make();
    this.getMeter_status();
    // Dropdown API End
  }

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      // Used For Showing Add Meter Modal Start

      // Used For Clear Modal Data Start
      this.invalid_file = false; this.invalid_route = false; this.invalid_premise = false; this.invalid_device = false; this.invalid_make = false;
      this.invalid_reading = false; this.invalid_date = false; this.invalid_meter_type = false; this.invalid_product = false; this.invalid_status = false
      this.meter_make_obj.make = null; this.route_obj.route = null; this.premise_obj.premise = null; this.meter_type_obj.meter_type = null; this.service_type_obj.service_type = null; this.meter_status_obj.status = null
      $('#AddMeterModal').on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,textarea,file")
              .val('')
              .end()
      })
      // Used For Clear Modal Data End
      $('#AddMeterModal').modal('show');
      // Used For Showing Add Meter Modal End
    })
  }

  // Add Meter API End
  add_meter() {
    // Validation Start
    if(!this.device_Obj.device_no){
      this.invalid_device = true
      return
    }else{
      this.invalid_device = false
    }
    if(!this.meter_make_obj.make){
      this.invalid_make = true
      return
    }else{
      this.invalid_make = false
    }
    if(!this.meter_status_obj.status){
      this.invalid_status = true
      return
    }else{
      this.invalid_status = false
    }
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
    if(!this.current_reading_Obj.current_reading){
      this.invalid_reading = true
      return
    }else{
      this.invalid_reading = false
    }
    if ($("#instl_date").val() == ''){
      this.invalid_date = true
      return
    }else{
      this.invalid_date = false
    }
    if(!this.meter_type_obj.meter_type){
      this.invalid_meter_type = true
      return
    }else{
      this.invalid_meter_type = false
    }
    if(!this.service_type_obj.service_type){
      this.invalid_product = true
      return
    }else{
      this.invalid_product = false
    }
    // Validation End

    // Build Json Data For Meter Start
    this.meter_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      device_no:this.device_Obj.device_no,
      meter_make_id:this.meter_make_obj.make.id_string,
      route_id:this.route_obj.route.id_string,
      premise_id:this.premise_obj.premise.id_string,
      current_reading:this.current_reading_Obj.current_reading,
      install_date: $("#instl_date").val() + ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      meter_type_id:this.meter_type_obj.meter_type.id_string,
      utility_product_id:this.service_type_obj.service_type.id_string,
      meter_status:this.meter_status_obj.status.id_string,
      latitude:this.latitude_Obj.latitude,
      longitude:this.longitude_Obj.longitude,
    }
    // Build Json Data For Meter Start

    this.apiService.post('meter-data/meter', this.meter_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#AddMeterModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        if (error.error.state == "exception") {
          $('#AddMeterModal').modal('hide');
          console.log("Add Meter", error)
        }else if(error.error.state == "error"){
          $('#AddMeterModal').modal('hide');
          console.log("Add Meter", error.error.result)
        }else{
          console.log("Add Meter", error)
        }
      }
    )
  }
  // Add Meter API End

  HandleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  // Upload Meter API End
  upload_meter() {
    const formData: FormData = new FormData();
    formData.append('meter_file', this.fileToUpload);
    formData.append('utility_id', this.sessionService.getter("utility_id_string").toString());

    if (this.fileToUpload == null){
      this.invalid_file = true
      return
    }else{
      this.invalid_file = false
    }
    
    this.apiService.post_form_data('meter-data/meter',formData).subscribe(
      data=>{
        if (data.state == "success") {
          $('#AddMeterModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        if (error.error.state == "exception") {
          $('#AddMeterModal').modal('hide');
          console.log("Upload Meter", error)
        }else if(error.error.state == "error"){
          $('#AddMeterModal').modal('hide');
          console.log("Upload Meter", error.error.result)
        }else{
          console.log("Upload Meter", error)
        }
      }
    )
  }
  // Upload Meter API End

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

  // Meter Status Dropdown API Start
  getMeter_status = () => {
    this.apiService.get('meter-status/list').subscribe(
      data => {
        this.meter_status_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Meter Status Dropdown API End

}
