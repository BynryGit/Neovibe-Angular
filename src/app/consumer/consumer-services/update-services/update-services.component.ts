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
import { SessionService } from '../../../common-services/session-service/session.service';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { ApiService } from '../../../common-services/api-service/api.service';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;

@Component({
  selector: 'app-update-services',
  templateUrl: './update-services.component.html',
  styleUrls: ['./update-services.component.scss'],
})
export class UpdateServicesComponent implements OnInit {
  @Input() trigger;
  @Input() consumerId;
  faPlus = faPlus;
  faStar = faStar;
  service_dict;
  faCalendarAlt = faCalendarAlt;
  consumerIdString: String;
  utilityIdString = this.sessionService.getter('utility_id_string')
  addServiceForm: FormGroup;
  addMeterForm: FormGroup;
  selectedService: any;
  addServiceFormSubmitted = false;
  workOrderIdString : string;
  servicesList = [];
  types = [];
  subTypes = [];
  profile = [];
  summery = [];
  meter_list = [];
  workOrderDict = [];
  services = null;
  consumer: any;
  exception_message: string;
  showexceptiontoast: boolean = false;
  showtoast: boolean = false;
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  showdateerror: boolean= false;
  isDisabled:boolean=false;
  activity_type_list; activity_obj : any = {};
  utility_product_list; utility_product_obj : any = {};
  frequency_list; frequency_obj : any = {};
  reading_cycle_list; reading_obj: any = {};
  recurrence_list; recurrence_obj: any = {};
  repeat_day_list; repeat_day_obj: any = {};
  repeat_week_list; repeat_week_obj: any = {};
  repeat_month_list; repeat_month_obj: any = {};
  repeat_year_list; repeat_year_obj: any = {};
  occur_month_list; occur_month_obj: any = {};
  occur_week_list; occur_week_obj: any = {};
  schedule_name_Obj: any = {};
  schedule_desc_obj: any = {};
  week_day_list = [];
  month_day_list = [];
  today_date = new Date()
  storeServiceid;
  storeServicenumber;
  start_dte: NgbDateStruct; end_dte: NgbDateStruct;
  successtoast = false; errortoast = false; showfrequency = false; showdays = false; showweeks = false; showmonth = false; showyear = false;
  invalid_name = false; invalid_utility_product = false; invalid_read_cycle = false; invalid_recurrance = false; invalid_end_date = false; invalid_start_date = false;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private sessionService : SessionService,
    private formBuilder: FormBuilder
  ) {
    // Update add service form code start
    this.addServiceForm = this.formBuilder.group({
      name: [null],
      base_rate: [null],
      tax_rate: [null],
      user_remark: [null],
      // sa_date: [null, [Validators.required]],
    });
    // Update add service form code end

    this.addMeterForm = this.formBuilder.group({
      meter: [null],
    });

    // Dropdown API Start
    this.getActivity_type();
    this.getUtilityProductList();
    this.getRecurrence();
    // Dropdown API End
  }



  ngOnInit(): void {
    // Code for receiving URL parameters start
    this.route.params.subscribe((params) => {
      this.consumerIdString = params.id;
    });
    // Code for receiving URL parameters end

    // Api call for consumer start
    this.apiService
      .get('consumer/' + this.consumerIdString)
      .subscribe((data) => {
        this.consumer = data['result'];
        // this.utilityIdString = data['result']['utility_id_string'];

        // Api call for meter list
        this.apiService
          .get(
            'consumer/' +
              this.consumer.utility_id_string +
              '/service-contract-detail/list?consumer_id=' +
              this.consumerIdString
          )
          .subscribe(
            (data) => {
              for (let item of data['results']) {
                this.meter_list.push({
                  id_string: item.id_string,
                  meter_no: item.meter_id.meter_no,
                  product_name: item.meter_id.utility_product_id.name,
                  product_id_string: item.meter_id.utility_product_id.id_string,
                });
              }
            },
            (error) => {
              console.log(error.error);
            }
          );
        // Api call for meter list end

        // Api for fetching the outage work orders

        this.apiService
          .get(
            'work-order/utility/' +
              this.utilityIdString +
              '/list' +
              '?filter_key=SERVICE'
          )
          .subscribe((data) => {
            console.log("servicesssssssssssssss",data)
            for (let item of data['results']) {
              this.workOrderDict.push({
                id_string: item.id_string,
                product_id_string: item.utility_product.id_string,
                name: item.name,
                base_rate : item.base_rate,
                tax_rate : item.tax_rate,
                is_taxable : item.is_taxable,
                description : item.description,
                utility_work_order_sub_type : item.utility_work_order_sub_type,
              });
            }
          });
        // Api for fetching the outage work end
      });
    // Api call for consumer end
  }

    // Activity Dropdown API Start
  getActivity_type = () => {
    this.apiService.get('global-lookup/list?category=Activity_Type&key=reading').subscribe(
      data => {
        this.activity_obj.activity_type = {id_string: data.results[0].id_string, value: data.results[0].value}
      },
      error => {
        console.log("Activity Type", error)
      }
    )
  }
  // // Activity Dropdown API End

  // Frequency Dropdown API Start
  getFrequency = () => {
    this.apiService.get('global-lookup/list?category=Frequency').subscribe(
      data => {
        this.frequency_list = data.results;
      },
      error => {
        console.log("Frequency", error)
      }
    )
  }
  // Frequency Dropdown API End

  // Utility Product Dropdown API Start
  getUtilityProductList = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/product/list').subscribe(
      data => {
        this.utility_product_list = data.results
      },
      error => {
        console.log("Utility Product", error)
      }
    )
  }
  // Utility Product Dropdown API End

  // Recurrence Dropdown API Start
  getRecurrence = () => {
    this.apiService.get('global-lookup/list?category=Recurrence').subscribe(
      data => {
        this.recurrence_list = data.results
      },
      error => {
        console.log("Recuurance", error)
      }
    )
  }
  // Recurrence Dropdown API End

  // Repeat Day Dropdown API Start
  getRepeatDay = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Day').subscribe(
      data => {
        this.repeat_day_list = data.results
      },
      error => {
        console.log("Reapeat Day", error)
      }
    )
  }
  // Repeat Day Dropdown API End

  // Repeat Week Dropdown API Start
  getRepeatWeek = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Week').subscribe(
      data => {
        this.repeat_week_list = data.results
      },
      error => {
        console.log("Reapeat Week", error)
      }
    )
  }
  // Repeat Week Dropdown API End

  // Repeat Month Dropdown API Start
  getRepeatMonth = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Month').subscribe(
      data => {
        this.repeat_month_list = data.results
      },
      error => {
        console.log("Reapeat Month", error)
      }
    )
  }
  // Repeat Month Dropdown API End

  // Repeat Year Dropdown API Start
  getRepeatYear = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Year').subscribe(
      data => {
        this.repeat_year_list = data.results
      },
      error => {
        console.log("Reapeat Year", error)
      }
    )
  }
  // Repeat Year Dropdown API End

  // Occur Month Dropdown API Start
  getOccurMonth = () => {
    this.apiService.get('global-lookup/list?category=Occur_Month').subscribe(
      data => {
        this.occur_month_list = data.results
      },
      error => {
        console.log("Occure Month", error)
      }
    )
  }
  // Occur Month Dropdown API End

  // Occur Week Dropdown API Start
  getOccurWeek = () => {
    this.apiService.get('global-lookup/list?category=Occur_Week').subscribe(
      data => {
        this.occur_week_list = data.results
      },
      error => {
        console.log("Occure Week", error)
      }
    )
  }
  // Occur Week Dropdown API End


  // On Change For Recurrence Start
  onRecurrenceChange(){
    if (this.recurrence_obj.recurrence.value == 'Yes'){
      this.getFrequency();
      this.showfrequency = true;
      $('#start_date').val(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())

    }else{
      this.showfrequency = false; this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
      $('#start_date').val(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())
    }
  }
  // On Change For Recurrence End

  // On Change For Frequency Start
  onfrequencyChange(){
    if (this.frequency_obj.frequency.value == 'Daily'){
      this.getRepeatDay();
      this.showdays = true; this.showweeks = false; this.showmonth = false; this.showyear = false;

    }else if (this.frequency_obj.frequency.value == 'Weekly'){
      this.getRepeatWeek();
      this.getOccurWeek();
      this.showweeks = true; this.showdays = false; this.showmonth = false; this.showyear = false;

    }else if(this.frequency_obj.frequency.value == 'Monthly'){
      this.getRepeatMonth();
      this.getOccurMonth();
      this.showmonth = true; this.showweeks = false; this.showdays = false; this.showyear = false;

    }else if(this.frequency_obj.frequency.value == 'Yearly'){
      this.getRepeatYear();
      this.showyear = true; this.showdays = false; this.showweeks = false; this.showmonth = false;

    }else{
      this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
    }
  }
  // On Change For Frequency End

  // add service details form control start
  get sd() {
    return this.addServiceForm.controls;
  }
  // add service details form control end

  serviceClicked(item) {
    this.workOrderIdString = item.id_string;
    this.selectedService = item;
    $('#addServiceModal').modal('show');
    this.addServiceForm.patchValue({
      name: item.name,
      base_rate: item.base_rate,
      tax_rate: item.tax_rate 
    });
  }

  fetchServiceFilter() {
    this.servicesList = [];
    this.servicesList = this.workOrderDict.filter(
      (x) =>
        x.product_id_string ==
        this.addMeterForm.controls.meter.value.product_id_string
    );
    if (!this.servicesList) {
      this.servicesList = [];
    }
  }

  onCancelClick(){
     this.addServiceFormSubmitted = false;
     this.servicesList = []
     this.addMeterForm.reset();
   }

  onAddServiceFormSubmit() {
    this.isDisabled = true;
    this.showdateerror = false;
    this.addServiceFormSubmitted = true;
    console.log("inside")
    // let date_obj = this.addServiceForm.value.sa_date
    // let str_date = ''
    // if (date_obj != null) {
    //   str_date = date_obj.year + "-"+ date_obj.month + "-"+ date_obj.day
    // }else {
    //   this.showdateerror = true 
    // }
    if ($("#start_date").val() == ''){
      this.invalid_start_date = true
      this.isDisabled = false;
      console.log("true")
      return
    }else{
      this.invalid_start_date = false
      console.log("false")
    }
    if (this.addServiceForm.invalid) {
      return;
    } else {
      this.service_dict = {
        consumer_id_string: this.consumerIdString,
        consumer_service_contract_detail_id: this.addMeterForm.controls.meter.value.id_string,
        work_order_master_id: this.workOrderIdString,
        consumer_id: this.consumer.id_string,
        start_date: $("#start_date").val() + ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
        // sa_date: str_date,
        address_line_1: this.consumer.billing_address_line_1,
        street: this.consumer.billing_street,
        zipcode: this.consumer.billing_zipcode,
        state_id: this.consumer.billing_state.id_string,
        city_id: this.consumer.billing_city.id_string,
        area_id: this.consumer.billing_area.id_string,
        sub_area_id: this.consumer.billing_sub_area.id_string,
        premise_id: this.consumer.premise.id_string,
        utility_id: this.utilityIdString,
        sa_user_remark: this.addServiceForm.controls.user_remark.value,      
      };

      if (this.recurrence_obj.recurrence.value == 'Yes'){
        console.log("yesssssss")

      this.service_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      this.service_dict['frequency_id'] = this.frequency_obj.frequency.id_string

      if (this.frequency_obj.frequency.value == 'Daily'){
        console.log("dailyyyy")
        this.service_dict['repeat_every_id'] = this.repeat_day_obj.day.id_string
      }

      if (this.frequency_obj.frequency.value == 'Weekly'){
        // for(let week_day of this.occur_week_obj.week){
        //   this.week_day_list.push(
        //     {
        //       id_string: week_day.id_string,
        //       value: week_day.value
        //     }
        //   );
        // }
        this.service_dict['repeat_every_id'] = this.repeat_week_obj.week.id_string
        // this.service_dict['occurs_on'] = this.week_day_list
      }

      if (this.frequency_obj.frequency.value == 'Monthly'){
          // this.month_day_list.push(
          //   {
          //     id_string: this.occur_month_obj.month.id_string,
          //     value: this.occur_month_obj.month.value
          //   }
          // );
        this.service_dict['repeat_every_id'] = this.repeat_month_obj.month.id_string
        // this.service_dict['occurs_on'] = this.month_day_list
      }

      if (this.frequency_obj.frequency.value == 'Yearly'){
        this.service_dict['repeat_every_id'] = this.repeat_year_obj.year.id_string
      }

      if ($("#end_date").val() != ''){
        if ($("#start_date").val() >= $("#end_date").val()){
          this.invalid_end_date = true
          return
        }else{
          this.service_dict['end_date'] = $("#end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
    }
    else{
      this.service_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      if ($("#end_date").val() != ''){
        if ($("#start_date").val() >= $("#end_date").val()){
          this.invalid_end_date = true
          return
        }else{
          this.service_dict['end_date'] = $("#end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
      else{
        this.invalid_end_date = true
        return
      }
    }

      this.apiService.post('consumer/service', this.service_dict).subscribe(
        (data) => {
          if (data.state == 'success') {
            console.log("service dictionary",this.service_dict)
            console.log("Add Schedule", data)
            this.storeServiceid = data.result.id_string
          console.log("id=====",this.storeServiceid )
          this.apiService.get('work-order/service-appointment/'+this.storeServiceid).subscribe(ress=>{
            console.log("resilllll",ress)
              this.storeServicenumber=ress.results.sa_number;
              console.log("number==",this.storeServicenumber)
            })
            this.showtoast = true;
            this.addServiceFormSubmitted = false;
             this.servicesList = []
             this.addMeterForm.reset();
             this.isDisabled = false;
            // window.location.reload();
            $('#addServiceModal').modal('hide');
            this.addServiceForm.reset()
          }
        },
         error => {
          console.log("Add Schedule", error)
          this.exception_message = error.error.result;
          this.showexceptiontoast = true;
        }
      );
    }
  }
}
