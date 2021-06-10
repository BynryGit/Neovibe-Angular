import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { FilterService } from 'src/app/common/filter/filter.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { SuccessMessage, AlreadyExistMessage } from '../../../error-messages/error-messages';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
import { FormControl, FormGroup, Validators, FormBuilder, FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-billing-schedule-add',
  templateUrl: './billing-schedule-add.component.html',
  styleUrls: ['./billing-schedule-add.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage]
})
export class BillingScheduleAddComponent implements OnInit {

  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  bill_schedule_dict;
  faCalendarAlt = faCalendarAlt;
  today_date = new Date()
  start_dte: NgbDateStruct; end_dte: NgbDateStruct;
  bill_cycle_list; bill_obj: any = {};

  utilityIdString = this.sessionService.getter("utility_id_string");
  frequency_list; frequency_obj: any = {};
  utility_product_list; utility_product_obj: any = {};
  recurrence_list; recurrence_obj: any = {};
  occur_val_list; occur_val_obj: any = {};
  repeat_val_list; repeat_val_obj: any = {};
  bill_schedule_name_Obj: any = {};
  schedule_desc_obj: any = {};
  week_day_list = [];
  month_day_list = [];

  year;month;day;year1;month1;day1;

select(model){  
  this.year = model?.year,
  this.month = model?.month,
  this.day = model?.day
}
selectDate(model1){
  this.year1 = model1?.year,
  this.month1 = model1?.month,
  this.day1 = model1?.day
}
  minDate = undefined;
  successtoast = false; errortoast = false; showfrequency = false; showdays = false; showweeks = false; showmonth = false; showyear = false; showrepeate = false

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data => {
      // Used For Showing Add Bill Schedule Modal Start
      $('#AddBillScheduleModal').modal('show');
      // Used For Showing Add Bill Schedule Modal End
    })
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  resetForm(){
    this.billScheduleFormSubmitted = false;
    this.billScheduleForm.reset()
  }
  constructor(private filterService: FilterService, private apiService: ApiService, private sessionService: SessionService,
    private formBuilder: FormBuilder, private router:Router,private config: NgbDatepickerConfig,private config_time: NgbTimepickerConfig) {

   const current = new Date();
    this.minDate = {
      year: current.getFullYear() ,
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    // Dropdown API Start
    this.getUtilityProductList();
    this.getRecurrence();
    // Dropdown API End

    this.billScheduleForm = this.formBuilder.group({
      BillScheduleNameControl: [null, [Validators.required,Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator,Validators.maxLength(30)]],
      DiscriptionControl: [null, [Validators.required]],
      ProductControl: [null, [Validators.required]],
      BillCycleControl: [null, [Validators.required]],
      IsRecurringControl: [null, [Validators.required]],
      FrequencyControl:[null, ],
      RepeatEveryControl:[null, ],
      OccursOnControl:[null,],
      StartDateControl:[null,[Validators.required]],
      EndDateControl:[null, [Validators.required]],
    });
  }


  billScheduleForm: FormGroup;
  billScheduleFormSubmitted = false;

  get bd() { return this.billScheduleForm.controls; }
  
  error:any={isError:false,errorMessage:''};


  add_bill_schedule() {
    let start_date = this.year+"-"+this.month+"-"+this.day+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
    let end_date = this.year1+"-"+this.month1+"-"+this.day1+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()

    this.billScheduleFormSubmitted = true;
    if (this.billScheduleForm.invalid) {
      return;      
    }else{

      if(new Date(start_date) > new Date(end_date)){
      this.error={isError:true};
      return;
      }

      this.bill_schedule_dict = {
      utility_id: this.sessionService.getter("utility_id_string"),
      bill_cycle_id: this.billScheduleForm.value.BillCycleControl.id_string,
      utility_product_id: this.billScheduleForm.value.ProductControl.id_string,
      name: this.billScheduleForm.value.BillScheduleNameControl,
      description: this.billScheduleForm.value.DiscriptionControl,
      start_date:start_date,
      end_date:end_date,
    }

    if (this.billScheduleForm.value.IsRecurringControl.value == 'Yes') {

      this.bill_schedule_dict['recurring_id'] = this.billScheduleForm.value.IsRecurringControl.id_string
      this.bill_schedule_dict['frequency_id'] = this.billScheduleForm.value.FrequencyControl.id_string

      if (this.billScheduleForm.value.FrequencyControl.value == 'Daily') {
        this.bill_schedule_dict['repeat_every_id'] = this.billScheduleForm.value.RepeatEveryControl.id_string
      }

      if (this.billScheduleForm.value.FrequencyControl.value == 'Weekly') {
        for (let week_day of this.billScheduleForm.value.OccursOnControl) {
          this.week_day_list.push(
            {
              id_string: week_day.id_string,
              value: week_day.value
            }
          );
        }
        this.bill_schedule_dict['repeat_every_id'] = this.billScheduleForm.value.RepeatEveryControl.id_string
        this.bill_schedule_dict['occurs_on'] = this.week_day_list
      }

      if (this.billScheduleForm.value.FrequencyControl.value == 'Monthly') {
        this.month_day_list.push(
          {
            id_string: this.billScheduleForm.value.OccursOnControl.id_string,
            value: this.billScheduleForm.value.OccursOnControl.value
          }
        );
        this.bill_schedule_dict['repeat_every_id'] = this.billScheduleForm.value.RepeatEveryControl.id_string
        this.bill_schedule_dict['occurs_on'] = this.month_day_list
      }

      if (this.billScheduleForm.value.FrequencyControl.value == 'Yearly') {
        this.bill_schedule_dict['repeat_every_id'] = this.billScheduleForm.value.RepeatEveryControl.id_string
      }

    }
    else {
      this.bill_schedule_dict['recurring_id'] = this.billScheduleForm.value.IsRecurringControl.id_string
    }
    // Build Json For Schedule End

    console.log('this.bill_schedule_dict', this.bill_schedule_dict);

    // Add Schedule API End
    this.apiService.post('billing/schedule-bill', this.bill_schedule_dict).subscribe(
      data => {
        if (data.state == "success") {
          $('#AddScheduleModal').modal('hide');
          this.successtoast = true;
          setTimeout(() => {
              this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                this.router.navigate(['billing']);
              });
            }, 500);          
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "exception") {
          $('#AddScheduleModal').modal('hide');
          this.errortoast = true;
        } else {
          console.log(error)
          alert(error.result)
        }
      }
    )
    // Add Schedule API End
    }
  }

  // Utility Product Dropdown API Start
  getUtilityProductList = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/product/list').subscribe(
      data => {
        this.utility_product_list = data.results
      },
      error => {
        console.log(error)
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
        console.log(error)
      }
    )
  }
  // Recurrence Dropdown API End

  // Repeat Day Dropdown API Start
  getRepeatDay = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Day').subscribe(
      data => {
        this.repeat_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Repeat Day Dropdown API End

  // Repeat Week Dropdown API Start
  getRepeatWeek = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Week').subscribe(
      data => {
        this.repeat_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Repeat Week Dropdown API End

  // Repeat Month Dropdown API Start
  getRepeatMonth = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Month').subscribe(
      data => {
        this.repeat_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Repeat Month Dropdown API End

  // Repeat Year Dropdown API Start
  getRepeatYear = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Year').subscribe(
      data => {
        this.repeat_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Repeat Year Dropdown API End

  // Occur Month Dropdown API Start
  getOccurMonth = () => {
    this.apiService.get('global-lookup/list?category=Occur_Month').subscribe(
      data => {
        this.occur_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Occur Month Dropdown API End

  // Occur Week Dropdown API Start
  getOccurWeek = () => {
    this.apiService.get('global-lookup/list?category=Occur_Week').subscribe(
      data => {
        this.occur_val_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Occur Week Dropdown API End



  // Frequency Dropdown API Start
  getFrequency = () => {
    this.apiService.get('global-lookup/list?category=Frequency').subscribe(
      data => {
        this.frequency_list = data.results;
      },
      error => {
        console.log(error)
      }
    )
  }
  // Frequency Dropdown API End

  // On Change For Utility Service Start
  onUtilityServiceChange() {
    this.billScheduleForm.controls.BillCycleControl.reset()
    let utility_service_id_string = this.billScheduleForm.value.ProductControl.id_string;
    this.apiService.get('billing/utility/' + this.utilityIdString + '/bill-cycle/list?utility_product_id=' + utility_service_id_string).subscribe(data => {
      this.bill_cycle_list = data.results;
    })
  }
  // On Change For Utility Service End


  // On Change For Recurrence Start
  onRecurrenceChange() {
    if (this.billScheduleForm.value.IsRecurringControl.value == 'Yes') {
      this.getFrequency();
      this.showfrequency = true;
      this.billScheduleForm.controls['StartDateControl'].setValue(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())
      this.billScheduleForm.controls.FrequencyControl.reset()      
    } else {
      this.showfrequency = false; this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;this.showrepeate = false;
      this.billScheduleForm.controls['StartDateControl'].setValue(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())
    }
  }
  // On Change For Recurrence End

  // On Change For Frequency Start
  onfrequencyChange() {
    if (this.billScheduleForm.value.FrequencyControl.value == 'Daily') {
      this.showrepeate = true; this.showweeks = false; this.showmonth = false;
      this.getRepeatDay();
      this.billScheduleForm.controls.RepeatEveryControl.reset()
    } else if (this.billScheduleForm.value.FrequencyControl.value == 'Weekly') {         
      this.showrepeate = true; this.showweeks = true; this.showmonth = false;
      this.getOccurWeek();
      this.getRepeatWeek();
      this.billScheduleForm.controls.RepeatEveryControl.reset()
      this.billScheduleForm.controls.OccursOnControl.reset()

    } else if (this.billScheduleForm.value.FrequencyControl.value == 'Monthly') {      
      this.showrepeate = true; this.showweeks = false; this.showmonth = true;
      this.getRepeatMonth();
      this.getOccurMonth();
      this.billScheduleForm.controls.RepeatEveryControl.reset()
      this.billScheduleForm.controls.OccursOnControl.reset()

    } else if (this.billScheduleForm.value.FrequencyControl.value == 'Yearly') {     
      this.showrepeate = true; this.showweeks = false; this.showmonth = false;
      this.getRepeatYear();
      this.billScheduleForm.controls.RepeatEveryControl.reset()
    } else {
      this.showrepeate = false; this.showweeks = false; this.showmonth = false;
    }
  }
  // On Change For Frequency End


}
