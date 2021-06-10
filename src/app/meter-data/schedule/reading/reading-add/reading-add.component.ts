import { Component, OnInit } from '@angular/core';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { SuccessMessage, AlreadyExistMessage, ErrorMessage } from '../../../../error-messages/error-messages';
import { FilterService } from '../../../../common/filter/filter.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-reading-add',
  templateUrl: './reading-add.component.html',
  styleUrls: ['./reading-add.component.scss'],
  providers: [SuccessMessage, AlreadyExistMessage, ErrorMessage]
})

export class ReadingAddComponent implements OnInit {

  schedule_dict;
  SuccessMessage = new SuccessMessage()
  AlreadyExistMessage = new AlreadyExistMessage()
  ErrorMessage = new ErrorMessage()
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
  invalid_name = false; invalid_utility_product = false; invalid_read_cycle = false; invalid_recurrance = false; invalid_end_date = false; invalid_start_date = false;

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) {
    // Dropdown API Start
    this.getActivity_type();
    this.getUtilityProductList();
    this.getRecurrence();
    // Dropdown API End
  }

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      // Used For Clear Modal Data Start
      this.utility_product_obj.utility_product = null; this.reading_obj.read_cycle = null; this.recurrence_obj.recurrence = null; this.frequency_obj.frequency = null; this.repeat_day_obj.day = null; this.repeat_year_obj.year = null; this.repeat_week_obj.week = null; this.occur_week_obj.week = null; this.repeat_month_obj.month = null; this.occur_month_obj.month = null;
      this.invalid_name = false; this.invalid_utility_product = false; this.invalid_read_cycle = false; this.invalid_recurrance = false; this.invalid_end_date = false; this.invalid_start_date = false;
      $('#AddScheduleModal').on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,textarea")
             .val('')
             .end()
      })
      // Used For Clear Modal Data End
      // Used For Showing Add Schedule Modal Start
      $('#AddScheduleModal').modal('show');
      // Used For Showing Add Schedule Modal End
    })
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

  // On Change For Utility Service Start
  onUtilityServiceChange(){
    let utility_service_id_string = this.utility_product_obj.utility_product.id_string;
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/read_cycle/list?utility_product_id=' + utility_service_id_string).subscribe(
      data=>{
        this.reading_cycle_list = data.results;
      },
      error => {
        console.log("Read Cycle", error)
      }
    )
  }
  // On Change For Utility Service End

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

  add_schedule() {
    // Validation Check Start
    if(!this.schedule_name_Obj.name){
      this.invalid_name = true
      return
    }else{
      this.invalid_name = false
    }
    if(!this.utility_product_obj.utility_product){
      this.invalid_utility_product = true
      return
    }else{
      this.invalid_utility_product = false
    }
    if(!this.reading_obj.read_cycle){
      this.invalid_read_cycle = true
      return
    }else{
      this.invalid_read_cycle = false
    }
    if(!this.recurrence_obj.recurrence){
      this.invalid_recurrance = true
      return
    }else{
      this.invalid_recurrance = false
    }
    if ($("#start_date").val() == ''){
      this.invalid_start_date = true
      return
    }else{
      this.invalid_start_date = false
    }
    // Validation Check End

    // Build Json Data For Schedule Start
    this.schedule_dict ={
      utility_id:this.sessionService.getter("utility_id_string"),
      read_cycle_id:this.reading_obj.read_cycle.id_string,
      activity_type_id:this.activity_obj.activity_type.id_string,
      utility_product_id:this.utility_product_obj.utility_product.id_string,
      name:this.schedule_name_Obj.name,
      description:this.schedule_desc_obj.description,
      start_date: $("#start_date").val() + ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
    }

    if (this.recurrence_obj.recurrence.value == 'Yes'){

      this.schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      this.schedule_dict['frequency_id'] = this.frequency_obj.frequency.id_string

      if (this.frequency_obj.frequency.value == 'Daily'){
        this.schedule_dict['repeat_every_id'] = this.repeat_day_obj.day.id_string
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
        this.schedule_dict['repeat_every_id'] = this.repeat_week_obj.week.id_string
        this.schedule_dict['occurs_on'] = this.week_day_list
      }

      if (this.frequency_obj.frequency.value == 'Monthly'){
          this.month_day_list.push(
            {
              id_string: this.occur_month_obj.month.id_string,
              value: this.occur_month_obj.month.value
            }
          );
        this.schedule_dict['repeat_every_id'] = this.repeat_month_obj.month.id_string
        this.schedule_dict['occurs_on'] = this.month_day_list
      }

      if (this.frequency_obj.frequency.value == 'Yearly'){
        this.schedule_dict['repeat_every_id'] = this.repeat_year_obj.year.id_string
      }

      if ($("#end_date").val() != ''){
        if ($("#start_date").val() >= $("#end_date").val()){
          this.invalid_end_date = true
          return
        }else{
          this.schedule_dict['end_date'] = $("#end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
    }
    else{
      this.schedule_dict['recurring_id'] = this.recurrence_obj.recurrence.id_string
      if ($("#end_date").val() != ''){
        if ($("#start_date").val() >= $("#end_date").val()){
          this.invalid_end_date = true
          return
        }else{
          this.schedule_dict['end_date'] = $("#end_date").val() + ' '+ this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds()
        }
      }
      else{
        this.invalid_end_date = true
        return
      }
    }
    // Build Json For Schedule End
    $("#add_schedule").attr('disabled', true);
    // Add Schedule API Start
    this.apiService.post('meter-data/schedule',this.schedule_dict).subscribe(
      data=>{
        $("#add_schedule").attr('disabled', false);
        if (data.state == "success") {
          $('#AddScheduleModal').modal('hide');
          this.successtoast = true;
          window.location.reload();
        }
      },
      error => {
        $("#add_schedule").attr('disabled', false);
        console.log("Add Schedule", error)
        if (error.error.state == "exception") {
          $('#AddScheduleModal').modal('hide');
          this.errortoast = true;
        }else{
          console.log("Add Schedule", error)
        }
      }
    )
    // Add Schedule API End
  }
}
