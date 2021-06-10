import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../../common-services/api-service/api.service';
// import { ErrorMessage } from '../../../error-messages/error-messages';
import { SessionService } from '../../../common-services/session-service/session.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-outage',
  templateUrl: './update-outage.component.html',
  styleUrls: ['./update-outage.component.scss'],
})
export class UpdateOutageComponent implements OnInit {
  @Input() trigger;
  @Input() consumerId;
  product_list = [];
  addOutageForm: FormGroup;
  outageFormSubmitted: boolean = false;
  consumer: any;
  utilityIdString = this.sessionService.getter('utility_id_string')
  consumerIdString: string;
  user_remark: any;
  workOrderDict = [];
  categoryList = [];
  showtoast: boolean = false;
  exception_message : string;
  showexceptiontoast: boolean = false;
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  constructor(
    private apiService: ApiService,
    private sessionService : SessionService,
    private formBuilder: FormBuilder
  ) {
    this.addOutageForm = this.formBuilder.group({
      product: [null, [Validators.required]],
      category: [null, [Validators.required]],
      date_time: [null, Validators.required],
      user_remark: [null],
    });
  }

  ngOnInit(): void {
    this.trigger;
    this.consumerIdString = this.consumerId;
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
              this.product_list.push({
                id_string: item.id_string,
                meter_no: item.meter_id.meter_no,
                name: item.meter_id.utility_product_id.name,
                product_id_string: item.meter_id.utility_product_id.id_string,
              });
            }
          },
          (error) => {
            console.log(error.error);
          }
        );
      // Api call for meter list

      // Api for fetching the outage work orders

      this.apiService
        .get(
          'work-order/utility/' +
            this.utilityIdString +
            '/list' +
            '?filter_key=OUTAGE'
        )
        .subscribe((data) => {
          for (let item of data['results']) {
            this.workOrderDict.push({
              id_string: item.id_string,
              product_id_string: item.utility_product.id_string,
              name: item.name,
            });
          }
        });
      // Api for fetching the outage work end
    });
  }

  // add complaint details form control start
  get af() {
    return this.addOutageForm.controls;
  }
  // add complaint details form control end

  filterSubCategory() {
    this.addOutageForm.get('category').reset()
    this.addOutageForm.get('date_time').reset()
    this.categoryList = [];
    this.categoryList = this.workOrderDict.filter(
      (x) =>
        x.product_id_string ==
        this.addOutageForm.controls.product.value.product_id_string
    );
    if (!this.categoryList) {
      this.categoryList = [];
    }
  }

  onAddOutageFormSubmit() {
    this.outageFormSubmitted = true;
    // Time string in the iso-8601 format
    let time_obj = this.addOutageForm.controls.date_time.value;
    let time_string =
      time_obj.getFullYear() +
      '-' +
      String(Number(time_obj.getMonth()) + 1) +
      '-' +
      time_obj.getDate() +
      ' ' +
      time_obj.getHours() +
      ':' +
      time_obj.getMinutes() +
      ':' +
      time_obj.getSeconds();

    this.user_remark = this.addOutageForm.controls.user_remark.value;
    if (this.addOutageForm.invalid) {
      return;
    } else {
      let data = {
        consumer_service_contract_detail_id: this.addOutageForm.controls.product.value.id_string,
        work_order_master_id: this.addOutageForm.controls.category.value.id_string,
        consumer_id: this.consumer.id_string,
        sa_date: time_string,
        address_line_1: this.consumer.billing_address_line_1,
        street: this.consumer.billing_street,
        zipcode: this.consumer.billing_zipcode,
        state_id: this.consumer.billing_state.id_string,
        city_id: this.consumer.billing_city.id_string,
        area_id: this.consumer.billing_area.id_string,
        sub_area_id: this.consumer.billing_sub_area.id_string,
        premise_id: this.consumer.premise.id_string,
        utility_id: this.utilityIdString,
        sa_user_remark: this.user_remark,
      };
      this.apiService.post('consumer/outage', data).subscribe(data=>{
        this.showtoast = true;
      },error=>{
        this.exception_message = error.error.result
        this.showexceptiontoast = true;
      })
    }
  }
}
