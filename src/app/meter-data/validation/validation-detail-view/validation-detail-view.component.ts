import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from './../../../common-services/api-service/api.service';
import { SessionService } from './../../../common-services/session-service/session.service';
import { SuccessMessage, ErrorMessage } from '../../../error-messages/error-messages';

@Component({
  selector: 'app-validation-detail-view',
  templateUrl: './validation-detail-view.component.html',
  styleUrls: ['./validation-detail-view.component.scss'],
  providers: [SuccessMessage, ErrorMessage]
})

export class ValidationDetailViewComponent implements OnInit {

  validation_details;
  SuccessMessage = new SuccessMessage()
  ErrorMessage = new ErrorMessage()
  faChevronRight = faChevronRight; faChevronLeft = faChevronLeft;
  revisittoast= false; errortoast=false; successtoast=false; page; url;
  schedule_log_id_String; read_cycle_id_String; revisit_dict; validation_one_dict; validation_two_dict; search;
  user_summary = []; mr_summary = []; validator1_summary = []
  read_cycle_list; read_cycle_obj: any = {};
  route_list; route_obj: any = {};
  meter_status_list; meter_status_obj: any = {};
  reader_status_list; reader_status_obj: any = {};
  update_route_list; update_route_obj : any = {};
  premise_list; premise_obj : any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");

  // Data For Next Previous Button Start
  buttons = [
    {
      name : 'Previous',
      listClass : 'page-item',
      icon : this.faChevronLeft,
      href : ''
    },
    {
      name : 'Next',
      listClass : 'page-item',
      icon : this.faChevronRight,
      href : ''
    }
  ]
  // Data For Next Previous Button End

  ngOnInit(): void {
    this.getRoute();
    this.getPremise();
  }

  constructor(private apiService: ApiService, private sessionService: SessionService, private route : ActivatedRoute, private modalService: NgbModal) {
    this.getMeterStatusList();

    // Get Id_String From URL Start
    this.route.params.subscribe(params => {
      this.schedule_log_id_String = params.schedule_log_id
      this.read_cycle_id_String = params.read_cycle_id
      this.page = params.page
      this.search = params.search
    });
    // Get Id_String From URL End
    
    // Check For Search Value Start
    if (this.search === 'null'){
      this.url = `meter-data/schedule-log/`+ this.schedule_log_id_String + '/read-cycle/' + this.read_cycle_id_String + '/validation/list?page=' + this.page + '&page_size=1&utility__id_string=' + this.utilityIdString
    }else{
      this.url = `meter-data/schedule-log/`+ this.schedule_log_id_String + '/read-cycle/' + this.read_cycle_id_String + '/validation/list?page=' + this.page + '&page_size=1&utility__id_string=' + this.utilityIdString + '&search=' + this.search
    }
    // Check For Search Value End

    // Validation One List API Start
    this.apiService.get(this.url).subscribe(
      data=>{
        this.validation_details = data.results[0]
        
        if (data.previous === null){
          this.buttons[0].listClass = 'page-item disabled'
        }else{
          var minus_page = parseInt(this.page) - 1
          this.buttons[0].href = 'meter-data/validation-detail-view/' + this.validation_details.schedule_log_id.id_string + '/' + this.validation_details.read_cycle_id.id_string + '/' + minus_page + '/null'
        }

        if(data.next === null){
          this.buttons[1].listClass = 'page-item disabled'
        }else{
          var plus_page = parseInt(this.page) + 1
          this.buttons[1].href = 'meter-data/validation-detail-view/' + this.validation_details.schedule_log_id.id_string + '/' + this.validation_details.read_cycle_id.id_string + '/' + plus_page + '/null'
        }

        this.read_cycle_list = this.validation_details.additional_details.read_cycle_list
        this.read_cycle_obj.read_cycle = {id_string: this.validation_details.read_cycle_id.id_string, label: this.validation_details.read_cycle_id.label}
        this.route_obj.route = {id_string: this.validation_details.route_id.id_string, name: this.validation_details.route_id.name}
        this.meter_status_obj.meter_status = {id_string: this.validation_details.additional_details.meter_status_id_string, name: this.validation_details.additional_details.meter_status_name}
        this.reader_status_obj.reader_status = {id_string: this.validation_details.additional_details.reader_status_id_string, name: this.validation_details.additional_details.reader_status_name}
        
        // Set Data For Consumer Start
        this.user_summary.push(
          {
            name : "Tenant",
            value : this.validation_details.tenant.name
          },
          {
            name : "Utility",
            value : this.validation_details.utility.name
          },
          {
            name : "Read Cycle",
            value : this.validation_details.read_cycle_id.name
          },
          {
            name : "Route",
            value : this.validation_details.route_id.name
          },
          {
            name : "Address",
            value : this.validation_details.user_details.consumer_address
          }
        )
        // Set Data For Consumer End

        // Set Data For MR Start
        this.mr_summary.push(
          {
            name : "Name",
            value : this.validation_details.user_details.mr_name
          },
          {
            name : "Email",
            value : this.validation_details.user_details.mr_email
          },
          {
            name : "Phone No",
            value : this.validation_details.user_details.mr_phone_mobile
          }
        )
        // Set Data For MR End

        // Set Data For Validator 1 Start
        this.validator1_summary.push(
          {
            name : "Validator One Name",
            value : this.validation_details.user_details.v1_name
          },
          {
            name : "Validator One Email",
            value : this.validation_details.user_details.v1_email
          },
          {
            name : "Validator One Phone No",
            value : this.validation_details.user_details.v1_phone_mobile
          },
          {
            name : "Validator Two Name",
            value : this.validation_details.user_details.v2_name
          },
          {
            name : "Validator Two Email",
            value : this.validation_details.user_details.v2_email
          },
          {
            name : "Validator Two Phone No",
            value : this.validation_details.user_details.v2_phone_mobile
          }
        )
        // Set Data For Validator 1 End
      },
      error => {
        if (error.error.state == "error") {
          console.log("Validation Detail", error.error.results)
        }else{
          console.log("Validation Detail", error)
        }
      }
    )
    // Validation One List API End
  }

  // Meter Status Dropdown API Start
  getMeterStatusList = () => {
    this.apiService.get('meter-status/list').subscribe(
      data => {
        this.meter_status_list = data.results
      },
      error => {
        console.log("Meter Status", error)
      }
    )
  }
  // Meter Status Dropdown API End

  // On Change For Read Cycle Start
  onReadCycleChange() {
    // Route Dropdown API Start
    this.apiService.get('meter-data/read_cycle/' + this.read_cycle_obj.read_cycle.id_string).subscribe(
      data => {
        this.route_list = data.results.route_json
      },
      error => {
        console.log("Route List", error)
      }
    )
    // Route Dropdown API End
  }
  // On Change For Read Cycle End

  // On Change For Meter Status Start
  onMeterStatusChange() {
    // Reader Status API Start
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/reader-status/list?meter_status_id=' + this.meter_status_obj.meter_status.id_string).subscribe(
      data => {
        this.reader_status_list = data.results
      },
      error => {
        console.log("Reader Status", error)
      }
    )
    // Reader Status API End
  }
  // On Change For Meter Status End

  // Route Dropdown API Start
  getRoute = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/route/list').subscribe(
      data => {
        this.update_route_list = data.results;
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

  send_revisit(schedule_log_id_string, read_cycle_id_String, meter_reading_id_string) {
    // Build Json Data For Revisit Start
    this.revisit_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
    }
    // Build Json For Revisit End

    // Send To Revisit API Start
    this.apiService.put('meter-data/meter-reading/' + meter_reading_id_string + '/validation-revisit', this.revisit_dict).subscribe(
      data=>{
        if (data.state == "success") {
          this.revisittoast = true;
          var plus_page = parseInt(this.page) + 1
          location.href = ('/meter-data/validation-detail-view/' + schedule_log_id_string + '/' + read_cycle_id_String + '/' + plus_page + '/null');
        }
      },
      error => {
        if (error.error.state == "exception") {
          this.errortoast = true;
          console.log("Send revisit", error)
        }else{
          console.log("Send revisit", error)
        }
      }
    )
    // Send To Revisit API End
  }

  complete_validation_one(schedule_log_id_string, read_cycle_id_String, meter_reading_id_string) {
    // Build Json Data For Complete Validation One Start
    this.validation_one_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      meter_status_v1_id: this.meter_status_obj.meter_status.id_string,
      reader_status_v1_id: this.reader_status_obj.reader_status.id_string,
      current_meter_reading_v1: $('#current_meter_reading_v1').val(),
      is_meter_matching: $('#meter_matching').is(':checked'),
      is_reading_matching: $('#reading_matching').is(':checked'),
    }
    // Build Json For Complete Validation One End

    // Complete Validation One API Start
    this.apiService.put('meter-data/meter-reading/' + meter_reading_id_string + '/validation-one', this.validation_one_dict).subscribe(
      data=>{
        if (data.state == "success") {
          this.successtoast = true;
          var plus_page = parseInt(this.page) + 1
          location.href = ('/meter-data/validation-detail-view/' + schedule_log_id_string + '/' + read_cycle_id_String + '/' + plus_page + '/null');
        }
      },
      error => {
        if (error.error.state == "exception") {
          this.errortoast = true;
          console.log("Validation 1", error)
        }else{
          console.log("Validation 1", error)
        }
      }
    )
    // Complete Validation One API End
  }

  complete_validation_two(schedule_log_id_string, read_cycle_id_String, meter_reading_id_string) {
    // Build Json Data For Complete Validation Two Start
    this.validation_two_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      meter_status_v2_id: this.meter_status_obj.meter_status.id_string,
      reader_status_v2_id: this.reader_status_obj.reader_status.id_string,
      current_meter_reading_v2: $('#current_meter_reading_v1').val(),
      v2_remark: $('#v2_remark').val(),
    }
    // Build Json For Complete Validation Two End

    // Complete Validation Two API Start
    this.apiService.put('meter-data/meter-reading/' + meter_reading_id_string + '/validation-two', this.validation_two_dict).subscribe(
      data=>{
        if (data.state == "success") {
          this.successtoast = true;
          var plus_page = parseInt(this.page) + 1
          location.href = ('/meter-data/validation-detail-view/' + schedule_log_id_string + '/' + read_cycle_id_String + '/' + plus_page + '/null');
        }
      },
      error => {
        if (error.error.state == "exception") {
          this.errortoast = true;
          console.log("Validation 2", error)
        }else{
          console.log("Validation 2", error)
        }
      }
    )
    // Complete Validation Two API End
  }

  // Update Contact Modal Start
  ContactModal(contact) {
    this.modalService.open(contact, {backdropClass: 'dark-backdrop center-modal-backdrop', windowClass: 'center-modal', centered: true });
  }
  // Update Contact Modal End

  // Update Meter No Modal Start
  MeterNoModal(meter_no) {
    this.modalService.open(meter_no, {backdropClass: 'dark-backdrop center-modal-backdrop', windowClass: 'center-modal', centered: true });
  }
  // Update Meter No Modal End

  // Update Meter Status Modal Start
  MeterStatusModal(meter_status) {
    this.modalService.open(meter_status, {backdropClass: 'dark-backdrop center-modal-backdrop', windowClass: 'center-modal', centered: true });
  }
  // Update Meter Status Modal End

  // Update Route Modal Start
  RouteModal(route) {
    this.modalService.open(route, {backdropClass: 'dark-backdrop center-modal-backdrop', windowClass: 'center-modal', centered: true });
  }
  // Update Route Modal End

  // Update Contact API Start
  UpdateContact(email, password, id_string) {
    let data = {
      email : email,
      password : password,
      phone_mobile : $("#contact_no").val(),
    }
    
    this.apiService.put('consumer/' + id_string, data).subscribe(
      data=>{
        if (data.state == "success") {
          alert('Contact Updated Succesfully..')
          location.href = ('/meter-data/validation-detail-view/' + this.schedule_log_id_String + '/' + this.read_cycle_id_String + '/' + this.page + '/null');
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Update Contact", error)
        }else{
          console.log("Update Contact", error)
        }
      }
    )
  }
  // Update Contact API End

  // Update Meter Status API Start
  UpdateStatus(meter_reading_id_string) {
    alert('Status Updated Succesfully..')
    location.href = ('/meter-data/validation-detail-view/' + this.schedule_log_id_String + '/' + this.read_cycle_id_String + '/' + this.page + '/null');
  }
  // Update Meter Status API End
  
  // Update Meter No API Start
  UpdateMeterNo(meter_reading_id_string) {
    alert('Meter No Updated Succesfully..')
    location.href = ('/meter-data/validation-detail-view/' + this.schedule_log_id_String + '/' + this.read_cycle_id_String + '/' + this.page + '/null');
  }
  // Update Meter No API End

  // Update Route API Start
  UpdateRoute(id_string, device_no) {
    let data = {
      utility_id:this.sessionService.getter("utility_id_string"),
      device_no : device_no,
      route_id : this.update_route_obj.route.id_string,
      premise_id : this.premise_obj.premise.id_string,
    }
    
    this.apiService.put('meter-data/meter/' + id_string, data).subscribe(
      data=>{
        if (data.state == "success") {
          alert('Route Updated Succesfully..')
          location.href = ('/meter-data/validation-detail-view/' + this.schedule_log_id_String + '/' + this.read_cycle_id_String + '/' + this.page + '/null');
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Update Route", error)
        }else{
          console.log("Update Route", error)
        }
      }
    )
  }
  // Update Route API End
}