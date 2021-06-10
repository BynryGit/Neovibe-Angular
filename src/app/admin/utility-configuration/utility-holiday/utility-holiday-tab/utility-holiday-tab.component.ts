import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus,faAd } from '@fortawesome/free-solid-svg-icons';
import { FormControl,AbstractControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { FilterService } from '../../../../common/filter/filter.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../../common-services/session-service/session.service';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTimepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomDateParserFormatter} from '../../../../common-services/dateformat-service/dateformat-service.service'
declare var $ : any;
import { Subject } from 'rxjs';




@Component({
  selector: 'app-utility-holiday-tab',
  templateUrl: './utility-holiday-tab.component.html',
  styleUrls: ['./utility-holiday-tab.component.scss'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},ErrorMessage
   ]
})
export class UtilityHolidayTabComponent implements OnInit {

  constructor(private fb: FormBuilder,private filterService : FilterService,private formBuilder: FormBuilder,private apiService : ApiService,private sessionService : SessionService,private config: NgbDatepickerConfig,private config_time: NgbTimepickerConfig) { 
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('utility/'+this.utilityIdString+'/leave_type/list').subscribe(data=>{
      this.utility_leaveList = data;
      
    })
    this.apiService.get('utility/'+this.utilityIdString+'/holiday/list').subscribe(data=>{
      this.utility_holidayList = data;
      
    })

    const current = new Date();
    this.minDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      holidayNameControl: [null, [Validators.required,this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      dateControl: [null, [Validators.required]],
      holidayTypeControl:[null, [Validators.required]],
      time_start:[null,],
      time_end:[null,],
      descriptionControl:[null, [Validators.required,this.noWhitespaceValidator]],
    });

    // Applicant details form code start
    this.applicantDetailsFormEdit = this.formBuilder.group({
      holidayNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      dateControlEdit: [null, [Validators.required]],
      holidayTypeControlEdit:[null, [Validators.required]],
      time_startEdit:[null,],
      time_endEdit:[null,],
      descriptionControlEdit:[null, [Validators.required,this.noWhitespaceValidator]],
    });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  minDate = undefined;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd : boolean = false;

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.disableAdd = false;
    this.adjustDuration = this.fb.group({            
      durationType: '',
    });
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.disableAdd = false;
    this.adjustDuration = this.fb.group({            
      durationType: '',
    });
  }
  from_start_hour;
  from_start_min;
  to_start_hour;
  to_start_min;
  final_from_time;
  final_to_time;
  fromChange(model){
    this.from_start_hour = model.hour
    this.from_start_min = model.minute
    
  }

  toChange(model){
    this.to_start_hour = model.hour
    this.to_start_min = model.minute
  }

  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  dtOptions: any = {};
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faPrint = faPrint;
  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;
  faAd = faAd;
  addType: FormGroup;
  addType1: FormGroup;
  searchText;
  utility_leaveList: any =[];
  utility_holidayList: any =[];
  countryList: any =[];
  stateList: any =[];
  today_date = new Date();
  
 
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  time_start: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  time_end: NgbTimeStruct = {hour: 13, minute: 30, second: 0};
  seconds = false;

showTable: boolean = true;
adjustDuration: FormGroup;
addHolidayData;
editHolidayData;
holidayObj: any = {};
holidayObj1: any = {};
holidayObj3: any = {};
holidayObj_edit: any = {};
holidayObj1_edit: any = {};
holidayObj3_edit: any = {};
year;
month;
day;


select(model){  
  console.log("Daaaate",model);
  this.year = model.year,
  this.month = model.month,
  this.day = model.day
}


id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
}





  onAddHoliday(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.holidayNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      holiday_type_id:this.applicantDetailsForm.value.holidayTypeControl.id_string,
      description:this.applicantDetailsForm.value.descriptionControl,
      date:this.year+"-"+this.month+"-"+this.day
      
    }

    this.disableAdd = true;

    if (this.applicantDetailsForm.value.time_start != null) {
        data['start_time'] = this.applicantDetailsForm.value.time_start.hour+":"+this.applicantDetailsForm.value.time_start.minute+":"+this.applicantDetailsForm.value.time_start.second
     }

     if (this.applicantDetailsForm.value.time_end != null) {
      data['end_time'] = this.applicantDetailsForm.value.time_end.hour+":"+this.applicantDetailsForm.value.time_end.minute+":"+this.applicantDetailsForm.value.time_end.second
   }

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/holiday',data).subscribe(result=>{
        
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        this.applicantDetailsForm.reset();
        this.disableAdd = false;
        this.applicantDetailsFormSubmitted = false;
        $('#add_holiday').modal('hide');
        this.adjustDuration = this.fb.group({            
             durationType: '',
        });
        }
      },(err) => {
        this.disableAdd = false;
        this.exceptionToast=true;
      });
    }
  }

  onEditHoliday(){
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      name:this.applicantDetailsFormEdit.value.holidayNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      holiday_type_id:this.applicantDetailsFormEdit.value.holidayTypeControlEdit.id_string,
      description:this.applicantDetailsFormEdit.value.descriptionControlEdit,
      date:this.year+"-"+this.month+"-"+this.day
      
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.value.time_startEdit != null) {
      data['start_time'] = this.applicantDetailsFormEdit.value.time_startEdit.hour+":"+this.applicantDetailsFormEdit.value.time_startEdit.minute+":"+this.applicantDetailsFormEdit.value.time_startEdit.second
   }

   if (this.applicantDetailsFormEdit.value.time_endEdit != null) {
    data['end_time'] = this.applicantDetailsFormEdit.value.time_endEdit.hour+":"+this.applicantDetailsFormEdit.value.time_endEdit.minute+":"+this.applicantDetailsFormEdit.value.time_endEdit.second
 }


    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      console.log(this.ade)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('utility/holiday/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        $('#edit_holiday').modal('hide');
            this.adjustDuration = this.fb.group({            
              durationType: '',
            });
            this.applicantDetailsFormEdit.reset();
            this.disableAdd = false;
            this.applicantDetailsFormEditSubmitted = false;
        }
      },(err) => {
        this.disableAdd = false;
        this.exceptionToast=true;
      });
    }
  }

  

blocks = [
  {
      name:       "Name",
  },
  {
     name:       "Holiday Type",
  },
  {
     name:       "Date",
  },
  {
     name:       "Action",
  },
]


dataSet = [
]



  
  ngOnInit(): void {
    this.adjustDuration = this.fb.group({            
      durationType: '',
    });
    const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing:false,
      //   dom: 'Bfrtip',
      //   buttons: [
      //     'copy', 'csv', 'excel', 'print'
      // ],
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
          
          that.apiService.get(`utility/${that.utilityIdString}/holiday/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.dataSet = resp.results;

              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
        },
      };
    
  }

}
