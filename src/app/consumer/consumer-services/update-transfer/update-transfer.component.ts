import { Component, OnInit, Input } from '@angular/core';
import {
  faChevronLeft,
  faChevronRight,
  faPen,
  faCalendarAlt,
  faFilePdf,
  faMapMarkerAlt,
  faPrint,
  faTimesCircle,
  faEye,
  faPlus,
  faFileCsv,
  faStar,
  faFileExcel,
} from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../common-services/session-service/session.service'
import { ApiService } from '../../../common-services/api-service/api.service';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { ErrorMessage } from '../../../error-messages/error-messages';
import { Alert } from 'bootstrap';
declare var $: any;

@Component({
  selector: 'app-update-transfer',
  templateUrl: './update-transfer.component.html',
  styleUrls: ['./update-transfer.component.scss'],
})
export class UpdateTransferComponent implements OnInit {
  faCalendarAlt = faCalendarAlt;
  approveForm: FormGroup;
  approveFormSubmitted = false;
  workOrders = [];
  @Input() trigger;
  @Input() consumerId;
  consumerIdString: String;
  utilityIdString = this.sessionService.getter('utility_id_string')
  consumer: any;
  isDisabled:boolean=false;

  message = new ErrorMessage();
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  // meter list
  meter_list = [];

  // List to store the detail all region detail on the startup
  premises_data = [];
  sub_area_data = [];
  area_data = [];
  division_data = [];
  zone_data = [];
  // List end

  // Dynamic list

  d_premises_data = [];
  d_sub_area_data = [];
  d_area_data = [];
  d_division_data = [];
  d_zone_data = [];

  // end of dynamic list
  division_list;
  zone_list;
  area_list;
  subarea_list;
  premise_list;


  showtoast: boolean;
  showexceptiontoast: boolean;
  exception_message: string;
  constructor(
    private apiService: ApiService,
    private router: Router,
    private sessionService : SessionService,
    private formBuilder: FormBuilder
  ) {
    // Consumer disconnect form code start
    this.approveForm = this.formBuilder.group({
      meter: [null, [Validators.required]],
      date: [null, [Validators.required]],
      address_line_1: [null, [Validators.required]],
      street: [null, [Validators.required]],
      zip_code: [null, [Validators.required]],
      zone: [null, [Validators.required]],
      division: [null, [Validators.required]],
      area: [null, [Validators.required]],
      subarea: [null, [Validators.required]],
      premise: [null, [Validators.required]],
      reason: [null,[Validators.required]],
    });
    // Consumer disconnect form code end
  }

  ngOnInit(): void {
    this.trigger;
    this.consumerIdString = this.consumerId;
    this.showtoast = false;
    this.showexceptiontoast = false;
    this.apiService.get('consumer/' + this.consumerId).subscribe((data) => {
      this.consumer = data['result'];
      // this.utilityIdString = this.consumer.utility_id_string;

      // Api call for meter list
      this.apiService
        .get(
          'consumer/' +
            this.utilityIdString +
            '/service-contract-detail/list?consumer_id=' +
            this.consumerIdString
        )
        .subscribe(
          (data) => {
            for (let item of data['results']) {
              this.meter_list.push({
                id_string: item.id_string,
                meter_no: item.meter_id.meter_no,
              });
            }
          },
          (error) => {
            console.log(error.error);
          }
        );
      // Api call for meter list end

      // premise dropdown api call start
      this.apiService
        .get('utility/' + this.utilityIdString + '/premise/list')
        .subscribe(
          (data) => {
            for (const i of data['results']) {
              this.premises_data.push({
                name: i.name,
                id_string: i.id_string,
                subarea: i.subarea.id_string,
              });
              this.sub_area_data.push({
                name: i.subarea.name,
                id_string: i.subarea.id_string,
                area: i.subarea.area.id_string,
              });
              this.area_data.push({
                name: i.subarea.area.name,
                id_string: i.subarea.area.id_string,
                division: i.subarea.area.division.id_string,
              });
              this.division_data.push({
                name: i.subarea.area.division.name,
                id_string: i.subarea.area.division.id_string,
                zone: i.subarea.area.division.zone_id.id_string,
              });
              this.d_zone_data.push({
                name: i.subarea.area.division.zone_id.name,
                id_string: i.subarea.area.division.zone_id.id_string,
                city: i.subarea.area.division.zone_id.city.id_string,
              });
            }
            this.zone_list=this.d_zone_data
            // this.division_list=this.division_data
            // this.premise_list=this.premises_data
            // this.area_list=this.area_data
            // this.subarea_list=this.sub_area_data
          },
          (error) => {
            alert(error);
          }
        );
      // premise dropdown api call end
    });
  }

  // consumer disconnect form control start
  get af() {
    return this.approveForm.controls;
  }
  // consumer disconnect form control end

  // custom filter

  zonefilter() {
    this.d_premises_data = [];
    this.d_division_data = [];
    this.d_area_data = [];
    this.d_sub_area_data = [];
    this.d_division_data = this.division_data.filter(
      (x) => x.zone == this.approveForm.controls.zone.value.id_string
    );
    this.division_list=this.d_division_data
  }
  divisionfilter() {
    this.d_premises_data = [];
    this.d_area_data = [];
    this.d_sub_area_data = [];
    this.d_area_data = this.area_data.filter(
      (x) => x.division == this.approveForm.controls.division.value.id_string
    );
    this.area_list=this.d_area_data
  }
  areafilter() {
    this.d_premises_data = [];
    this.d_sub_area_data = [];
    this.d_sub_area_data = this.sub_area_data.filter(
      (x) => x.area == this.approveForm.controls.area.value.id_string
    );
    this.subarea_list=this.d_sub_area_data
  }
  subareafilter() {
    this.d_premises_data = [];
    this.d_premises_data = this.premises_data.filter(
      (x) => x.subarea == this.approveForm.controls.subarea.value.id_string
    );
    this.premise_list=this.d_premises_data
  }

  // custom filter end

  onCancelClick(){
     this.approveFormSubmitted = false;
     this.approveForm.reset();
   }

  onApproveFormSubmit() {
    this.isDisabled = true;
    this.approveFormSubmitted = true;
    let date_obj = this.approveForm.value.date;
    if (this.approveForm.invalid) {
      this.isDisabled = false;
      return;
    } else {
      let str_date = date_obj.year + '-' + date_obj.month + '-' + date_obj.day;
      let previous_data = {
        consumer_service_contract_detail_id: this.approveForm.value.meter
          .id_string,
        consumer_id: this.consumer.id_string,
        sa_date: str_date,
        address_line_1: this.consumer.billing_address_line_1,
        street: this.consumer.billing_street,
        zipcode: this.consumer.billing_zipcode,
        state_id: this.consumer.billing_state.id_string,
        city_id: this.consumer.billing_city.id_string,
        area_id: this.consumer.billing_area.id_string,
        sub_area_id: this.consumer.billing_sub_area.id_string,
        premise_id: this.consumer.premise.id_string,
        utility_id: this.consumer.utility_id_string,
        sa_description: this.approveForm.controls.reason.value,
      };
      let data = {
        custom_data: previous_data,
        consumer_service_contract_detail_id: this.approveForm.value.meter
          .id_string,
        consumer_id: this.consumer.id_string,
        sa_date: str_date,
        address_line_1: this.approveForm.controls.address_line_1.value,
        street: this.approveForm.controls.street.value,
        zipcode: this.approveForm.controls.zip_code.value,
        state_id: this.consumer.billing_state.id_string,
        city_id: this.consumer.billing_city.id_string,
        area_id: this.approveForm.controls.area.value.id_string,
        sub_area_id: this.approveForm.controls.subarea.value.id_string,
        premise_id: this.approveForm.controls.premise.value.id_string,
        zone_id: this.approveForm.controls.zone.value.id_string,
        division_id: this.approveForm.controls.division.value.id_string,
        utility_id: this.consumer.utility_id_string,
        sa_description: this.approveForm.controls.reason.value,
      };
      this.apiService.post('consumer/transfer', data).subscribe(
        (data) => {
          this.showtoast = true;
          this.approveFormSubmitted = false;
          this.approveForm.reset();
          $('#transferModal').modal('hide');
          this.isDisabled = false;
        },
        (error) => {
          this.exception_message = error.error.result;
          this.showexceptiontoast = true;
          this.isDisabled = false;
        }
      );
    }
  }
}
