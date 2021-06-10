import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'; 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessage, AlreadyExistMessage, ErrorMessage } from '../../../../error-messages/error-messages';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-reading-edit',
  templateUrl: './reading-edit.component.html',
  styleUrls: ['./reading-edit.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage, ErrorMessage]
})
export class ReadingEditComponent implements OnInit {

  schedule_dict;
  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  ErrorMessage = new ErrorMessage()
  subscription: Subscription
  today_date = new Date()
  start_dte: NgbDateStruct; end_dte: NgbDateStruct;
  faCalendarAlt = faCalendarAlt;
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
  utilityIdString = this.sessionService.getter("utility_id_string");
  successtoast = false; errortoast = false; showfrequency = false; showdays = false; showweeks = false; showmonth = false; showyear = false;
  invalid_edit_recurrance = false; invalid_edit_frequency = false; invalid_edit_repeat_day = false; invalid_edit_repeat_year = false; invalid_edit_repeat_week = false; invalid_edit_occure_week = false; invalid_edit_repeat_month = false; invalid_edit_occure_month = false; invalid_edit_end_date = false;

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) { 
    // Dropdown API Start
    this.getActivity_type();
    this.getUtilityProductList();
    this.getRecurrence();
    this.getFrequency();
    // Dropdown API End
  }

  ngOnInit(): void {
    this.subscription  = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege === 'EDIT'){
        // Get Schedule API Start
        this.apiService.get('meter-data/schedule/'+ data.id_string).subscribe(
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

              this.activity_obj.activity_type = {id_string: data.result.activity_type_id.id_string, value: data.result.activity_type_id.value}
              this.utility_product_obj.utility_product = {id_string: data.result.utility_product_id.id_string, name: data.result.utility_product_id.name}
              this.reading_obj.read_cycle = {id_string: data.result.read_cycle_id.id_string, label: data.result.read_cycle_id.label}
              this.recurrence_obj.recurrence = {id_string: data.result.recurring_id.id_string, value: data.result.recurring_id.value}
              
              var start_date = new Date(data.result.start_date)
              $("#edit_start_date").val(start_date.getFullYear() + '-' + (((start_date.getMonth() + 1) < 10) ? '0' : '') + (start_date.getMonth() + 1) + '-' + ((start_date.getDate() < 10) ? '0' : '') + start_date.getDate())
              $('#schedule_id_string').val(data.result.id_string)
              $('#edit_name').val(data.result.name)
              $('#edit_description').val(data.result.description)
              $('#EditScheduleModal').modal('show');
              // Set Data To Edit Schedule Modal End
            }
          },
          error => {
            console.log("Edit Schedule", error)
            if (error.error.state == "error") {
              console.log("Edit Schedule", error.error.result)
            }else{
              console.log("Edit Schedule", error)
            }
          }
        )
        // Get Schedule API End
      }
    });
  }

  // Activity Dropdown API Start
  getActivity_type = () => {
    this.apiService.get('global-lookup/list?category=Activity_Type&key=reading').subscribe(
      data => {
        this.activity_type_list = data.results;
      },
      error => {
        console.log("Activity Type", error)
      }
    )
  }
  // Activity Dropdown API End

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
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(
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

  // Repeat Month Dropdown API start
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

  edit_schedule() {
    if(!this.recurrence_obj.recurrence){
      this.invalid_edit_recurrance = true
      return
    }else{
      this.invalid_edit_recurrance = false
    }
    // Build Json Data For Schedule Start
    this.schedule_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      read_cycle_id:this.reading_obj.read_cycle.id_string,
      activity_type_id:this.activity_obj.activity_type.id_string,
      utility_product_id:this.utility_product_obj.utility_product.id_string,
      name:$("#edit_name").val(),
      description:$("#edit_description").val(),
      start_date: $("#edit_start_date").val() + ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
    }
    
    if (this.recurrence_obj.recurrence.value == 'Yes'){

      if(!this.frequency_obj.frequency){
        this.invalid_edit_frequency = true
        return
      }else{
        this.invalid_edit_frequency = false
      }
      
      this.schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      this.schedule_dict['frequency_id'] = this.frequency_obj.frequency.id_string
      
      if (this.frequency_obj.frequency.value == 'Daily'){
        if(!this.repeat_day_obj.day){
          this.invalid_edit_repeat_day = true
          return
        }else{
          this.invalid_edit_repeat_day = false
          this.schedule_dict['repeat_every_id'] = this.repeat_day_obj.day.id_string
        }
      }
      
      if (this.frequency_obj.frequency.value == 'Weekly'){
        
        if(!this.repeat_week_obj.week){
          this.invalid_edit_repeat_week = true
          return
        }else{
          this.invalid_edit_repeat_week = false
          this.schedule_dict['repeat_every_id'] = this.repeat_week_obj.week.id_string
        }

        if(!this.occur_week_obj.week){
          this.invalid_edit_occure_week = true
          return
        }else{
          this.invalid_edit_occure_week = false
          for(let week_day of this.occur_week_obj.week){
            this.week_day_list.push(
              {
                id_string: week_day.id_string,
                value: week_day.value
              }
            );
          }
          this.schedule_dict['occurs_on'] = this.week_day_list
        }
      }
      
      if (this.frequency_obj.frequency.value == 'Monthly'){
        if(!this.repeat_month_obj.month){
          this.invalid_edit_repeat_month = true
          return
        }else{
          this.invalid_edit_repeat_month = false
          this.schedule_dict['repeat_every_id'] = this.repeat_month_obj.month.id_string
        }

        if(!this.occur_month_obj.month){
          this.invalid_edit_occure_month = true
          return
        }else{
          this.invalid_edit_occure_month = false
          this.month_day_list.push(
            {
              id_string: this.occur_month_obj.month.id_string,
              value: this.occur_month_obj.month.value
            }
          );
          this.schedule_dict['occurs_on'] = this.month_day_list
        }   
      }
      
      if (this.frequency_obj.frequency.value == 'Yearly'){
        if(!this.repeat_year_obj.year){
          this.invalid_edit_repeat_year = true
          return
        }else{
          this.invalid_edit_repeat_year = false
          this.schedule_dict['repeat_every_id'] = this.repeat_year_obj.year.id_string
        }
      }

      if ($("#edit_end_date").val() != ''){
        if ($("#edit_start_date").val() >= $("#edit_end_date").val()){
          this.invalid_edit_end_date = true
          return
        }else{
          this.schedule_dict['end_date'] = $("#edit_end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
    }
    else{
      this.schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      if ($("#edit_end_date").val() != ''){
        if ($("#edit_start_date").val() >= $("#edit_end_date").val()){
          this.invalid_edit_end_date = true
          return
        }else{
          this.schedule_dict['end_date'] = $("#edit_end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
      else{
        this.invalid_edit_end_date = true
        return
      }
    }
    // Build Json Data For Schedule End

    // Edit Schedule API Start
    this.apiService.put('meter-data/schedule/'+ $('#schedule_id_string').val(),this.schedule_dict).subscribe(
      data=>{
        if (data.state == "success") {
          $('#EditScheduleModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        console.log("Edit Schedule", error)
        if (error.error.state == "exception") {
          $('#EditScheduleModal').modal('hide');
          this.errortoast = true;
        }else{
          console.log("Edit Schedule", error)
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
