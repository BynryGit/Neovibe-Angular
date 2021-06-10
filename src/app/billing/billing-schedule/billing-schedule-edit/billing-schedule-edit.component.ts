import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { FilterService } from 'src/app/common/filter/filter.service';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { SuccessMessage, AlreadyExistMessage } from '../../../error-messages/error-messages';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
declare var $: any;
import { FormControl, FormGroup, Validators, FormBuilder, FormArray , AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-billing-schedule-edit',
  templateUrl: './billing-schedule-edit.component.html',
  styleUrls: ['./billing-schedule-edit.component.scss']
})
export class BillingScheduleEditComponent implements OnInit {

  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  bill_schedule_dict;
  faCalendarAlt = faCalendarAlt;
  today_date = new Date()
  start_dte: NgbDateStruct; end_dte: NgbDateStruct;
  bill_cycle_list; bill_obj: any = {};

  utility_product_list; utility_product_obj : any = {};
  frequency_list; frequency_obj : any = {};
  recurrence_list; recurrence_obj: any = {};
  repeat_day_list; repeat_day_obj: any = {};
  repeat_week_list; repeat_week_obj: any = {};
  repeat_month_list; repeat_month_obj: any = {};
  repeat_year_list; repeat_year_obj: any = {};
  occur_month_list; occur_month_obj: any = {};
  occur_week_list; occur_week_obj: any = {};

  utilityIdString = this.sessionService.getter("utility_id_string");
  occur_val_list; occur_val_obj: any = {};
  repeat_val_list; repeat_val_obj: any = {};
  bill_schedule_name_Obj: any = {};
  schedule_desc_obj: any = {};
  subscription: Subscription
  week_day_list = [];
  month_day_list = [];

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  resetEditForm(){
    this.billScheduleEditFormSubmitted = false;
    this.billScheduleEditForm.reset()
  }

  billScheduleEditForm: FormGroup;
  billScheduleEditFormSubmitted = false;

  get bd() { return this.billScheduleEditForm.controls; }

  successtoast = false; errortoast = false; showfrequency = false; showdays = false; showweeks = false; showmonth = false; showyear = false; showrepeate = false

  constructor(private filterService: FilterService, private apiService: ApiService, private sessionService: SessionService,private formBuilder: FormBuilder, private router:Router) { 
    // Dropdown API Start
    this.getUtilityProductList();
    this.getRecurrence();
    // Dropdown API End

    this.billScheduleEditForm = this.formBuilder.group({
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


  ngOnInit(): void {
    this.subscription  = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege === 'EDIT'){
        // Get Schedule API Start
        this.apiService.get('billing/schedule-bill/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {
              // Set Data To Edit Schedule Modal Start
              if (data.result.recurring_id.value == 'Yes'){
                if (data.result.frequency_id.value == 'Daily'){
                  this.frequency_obj.frequency = {id_string: data.result.frequency_id.id_string, value: data.result.frequency_id.value}
                  this.repeat_day_obj.day = {id_string: data.result.repeat_every_id.id_string, value: data.result.repeat_every_id.value}
                  this.showfrequency = true; this.showdays = true; this.showweeks = false; this.showmonth = false; this.showyear = false;
                
                }else if (data.result.frequency_id.value == 'Weekly'){
                  var occure_list = [];
                  for (let x of data.result.occurs_on){
                    occure_list.push({id_string: x.id_string, value: x.value})
                  }
                  this.occur_week_obj.week = occure_list
                  this.frequency_obj.frequency = {id_string: data.result.frequency_id.id_string, value: data.result.frequency_id.value}
                  this.repeat_week_obj.week = {id_string: data.result.repeat_every_id.id_string, value: data.result.repeat_every_id.value}
                  this.showfrequency = true; this.showweeks = true; this.showdays = false; this.showmonth = false; this.showyear = false;
                
                }else if (data.result.frequency_id.value == 'Monthly'){
                  this.frequency_obj.frequency = {id_string: data.result.frequency_id.id_string, value: data.result.frequency_id.value}
                  this.repeat_month_obj.month = {id_string: data.result.repeat_every_id.id_string, value: data.result.repeat_every_id.value}
                  for (let x of data.result.occurs_on){
                    this.occur_month_obj.month = {id_string: x.id_string, value: x.value}
                  }
                  this.showfrequency = true; this.showmonth = true; this.showweeks = false; this.showdays = false; this.showyear = false;
                
                }else if (data.result.frequency_id.value == 'Yearly'){
                  this.frequency_obj.frequency = {id_string: data.result.frequency_id.id_string, value: data.result.frequency_id.value}
                  this.repeat_year_obj.year = {id_string: data.result.repeat_every_id.id_string, value: data.result.repeat_every_id.value}
                  this.showfrequency = true; this.showyear = true; this.showdays = false; this.showweeks = false; this.showmonth = false;
                
                }else{
                  this.showfrequency = false; this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
                }
              
              }else{
                this.showfrequency = false; this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
              }

              if (data.result.end_date === null){
                // Nothing to do
              }else{
                var end_date = new Date(data.result.end_date)
                $("#edit_end_date").val(end_date.getFullYear() + '-' + (((end_date.getMonth() + 1) < 10) ? '0' : '') + (end_date.getMonth() + 1) + '-' + ((end_date.getDate() < 10) ? '0' : '') + end_date.getDate())
              }

              this.utility_product_obj.utility_product = {id_string: data.result.utility_product_id.id_string, name: data.result.utility_product_id.name}
              this.bill_obj.bill_cycle = {id_string: data.result.bill_cycle_id.id_string, label: data.result.bill_cycle_id.bill_cycle_name}
              this.recurrence_obj.recurrence = {id_string: data.result.recurring_id.id_string, value: data.result.recurring_id.value}
              
              var start_date = new Date(data.result.start_date)
              $("#edit_start_date").val(start_date.getFullYear() + '-' + (((start_date.getMonth() + 1) < 10) ? '0' : '') + (start_date.getMonth() + 1) + '-' + ((start_date.getDate() < 10) ? '0' : '') + start_date.getDate())
              $('#schedule_id_string').val(data.result.id_string)
              $('#edit_name').val(data.result.name)
              $('#edit_description').val(data.result.description)
              $('#EditScheduleBillModal').modal('show');
              // Set Data To Edit Schedule Modal End
            }
          },
          error => {
            console.log(error)
            if (error.error.state == "error") {
              alert(error.error.results)
            }else{
              console.log(error)
            }
          }
        )
        // Get Schedule API End
      }
    });
  }

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

  // Utility Product Dropdown API Start
  getUtilityProductList = () => {
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(
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
        this.repeat_day_list = data.results
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
        this.repeat_week_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Repeat Week Dropdown API End

  // Repeat Month Dropdown API start
  getRepeatMonth = () => {
    this.apiService.get('global-lookup/list?category=Repeat_Month').subscribe(
      data => {
        this.repeat_month_list = data.results
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
        this.repeat_year_list = data.results
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
        this.occur_month_list = data.results
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
        this.occur_week_list = data.results
      },
      error => {
        console.log(error)
      }
    )
  }
  // Occur Week Dropdown API End


  // On Change For Recurrence Start
  onRecurrenceChange(){
    if (this.recurrence_obj.recurrence.value == 'Yes'){
      this.showfrequency = true;
      $('#edit_start_date').val(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())
    
    }else{
      this.showfrequency = false; this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
      $('#edit_start_date').val(this.today_date.getFullYear() + '-' + (((this.today_date.getMonth() + 1) < 10) ? '0' : '') + (this.today_date.getMonth() + 1) + '-' + ((this.today_date.getDate() < 10) ? '0' : '') + this.today_date.getDate())
    }
  }
  // On Change For Recurrence End

  // On Change For Frequency Start
  onfrequencyChange(){
    if (this.frequency_obj.frequency.value == 'Daily'){
      this.showdays = true; this.showweeks = false; this.showmonth = false; this.showyear = false;
    
    }else if (this.frequency_obj.frequency.value == 'Weekly'){
      this.showweeks = true; this.showdays = false; this.showmonth = false; this.showyear = false;
    
    }else if(this.frequency_obj.frequency.value == 'Monthly'){
      this.showmonth = true; this.showweeks = false; this.showdays = false; this.showyear = false;
    
    }else if(this.frequency_obj.frequency.value == 'Yearly'){
      this.showyear = true; this.showdays = false; this.showweeks = false; this.showmonth = false;
    
    }else{
      this.showdays = false; this.showweeks = false; this.showmonth = false; this.showyear = false;
    }
  }
  // On Change For Frequency End

  edit_schedule() {
    // Build Json Data For Schedule Start
    this.bill_schedule_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      bill_cycle_id:this.bill_obj.bill_cycle.id_string,
      utility_product_id:this.utility_product_obj.utility_product.id_string,
      name:$("#edit_name").val(),
      description:$("#edit_description").val(),
      start_date: $("#edit_start_date").val() + ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
    }
    
    if ($("#edit_end_date").val() != ''){
      this.bill_schedule_dict['end_date'] = $("#edit_end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
    }
    
    if (this.recurrence_obj.recurrence.value == 'Yes'){
      
      this.bill_schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      this.bill_schedule_dict['frequency_id'] = this.frequency_obj.frequency.id_string
      
      if (this.frequency_obj.frequency.value == 'Daily'){
        this.bill_schedule_dict['repeat_every_id'] = this.repeat_day_obj.day.id_string
      }
      
      if (this.frequency_obj.frequency.value == 'Weekly'){
        for(let week_day of this.occur_week_obj.week){
          this.week_day_list.push(
            {
              id_string: week_day.id_string,
              value: week_day.value
            }
          );
        }
        this.bill_schedule_dict['repeat_every_id'] = this.repeat_week_obj.week.id_string
        this.bill_schedule_dict['occurs_on'] = this.week_day_list
      }
      
      if (this.frequency_obj.frequency.value == 'Monthly'){
          this.month_day_list.push(
            {
              id_string: this.occur_month_obj.month.id_string,
              value: this.occur_month_obj.month.value
            }
          );
        this.bill_schedule_dict['repeat_every_id'] = this.repeat_month_obj.month.id_string
        this.bill_schedule_dict['occurs_on'] = this.month_day_list
      }
      
      if (this.frequency_obj.frequency.value == 'Yearly'){
        this.bill_schedule_dict['repeat_every_id'] = this.repeat_year_obj.year.id_string
      
      }
    }
    else{
      this.bill_schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
    }
    // Build Json Data For Schedule End
    console.log('this.bill_schedule_dict: ', this.bill_schedule_dict);


    // Edit Schedule API Start
    this.apiService.put('billing/schedule-bill/'+ $('#schedule_id_string').val(),this.bill_schedule_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#EditScheduleBillModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "exception") {
          $('#EditScheduleBillModal').modal('hide');
          this.errortoast = true;
        }else{
          console.log(error)
          alert(error.result)
        }
      }
    )
    // Edit Schedule API End
  }

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End

}
