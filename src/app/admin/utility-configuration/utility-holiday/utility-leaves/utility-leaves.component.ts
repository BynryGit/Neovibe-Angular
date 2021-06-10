import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus,faAd } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { CustomDateParserFormatter} from '../../../../common-services/dateformat-service/dateformat-service.service'
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,ValidatorFn, ValidationErrors} from '@angular/forms';
declare var $:any;
import { Subject } from 'rxjs';

@Component({
  selector: 'app-utility-leaves',
  templateUrl: './utility-leaves.component.html',
  styleUrls: ['./utility-leaves.component.scss'],
  providers:[ErrorMessage,[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
   ]]
})
export class UtilityLeavesComponent implements OnInit {

  constructor(private fb: FormBuilder,private filterService : FilterService,private formBuilder: FormBuilder,private apiService : ApiService,private sessionService : SessionService) { 
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    $('#table1').DataTable().order([ 1, 'asc' ]).draw();

    this.applicantDetailsForm = this.formBuilder.group({
      
      time_mon_start:['', [Validators.required]],
      time_mon_end: ['', [Validators.required]],
      time_tue_start: ['', [Validators.required]],
      time_tue_end: ['', [Validators.required]],
      time_wed_start: ['', [Validators.required]],
      time_wed_end: ['', [Validators.required]],
      time_thu_start: ['', [Validators.required]],
      time_thu_end: ['', [Validators.required]],
      time_fri_start: ['', [Validators.required]],
      time_fri_end: ['', [Validators.required]],
      time_sat_start: ['', [Validators.required]],
      time_sat_end: ['', [Validators.required]],
      time_sun_start: ['', [Validators.required]],
      time_sun_end: ['', [Validators.required]],
  
    });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  showAddHoliday:boolean = false;
  showTable:boolean = true;
  showAdd:boolean = true;

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
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     console.log(this.ad)
   }
 
   onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
   }
 
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  // monTimeValidate(control: AbstractControl): ValidationErrors | null {
  //   if (control &&  control.get("time_mon_start") && control.get("time_mon_end")) {

  //     // the form controls and their value
  //     const startHour =  control.get("time_mon_start").value.hour;
  //     const endHour = control.get("time_mon_end").value.hour;
  //     const startMin =  control.get("time_mon_start").value.minute;
  //     const endMin = control.get("time_mon_end").value.minute;

  //     console.log(startHour,endHour)

  //     // not valid, return an error
  //     if (startHour > endHour) {
  //       console.log("SUUUUCCCESSS!!!")
  //       return { hourError: true };
  //     }else{
  //       if(startHour == endHour){
  //         if(startMin > endMin){
  //           console.log("SUUUUCCCESSS!!!")
  //           return { hourError: true };
  //         }
  //       }
  //     }
  //     // valid

  //     return null;
  //   }
  //   // form controls do not exist yet, return null
  //   return null;
  // }

  onAddClick(){
    this.showAdd = false;
    this.showTable = false;
    this.showAddHoliday = true;
    
    
  }

  // time_mon_start:NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_mon_end: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_tue_start: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_tue_end: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_wed_start: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_wed_end: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_thu_start: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_thu_end: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_fri_start: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_fri_end: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_sat_start: NgbTimeStruct = {hour: null, minute: null, second:null};
  // time_sat_end: NgbTimeStruct = {hour: null, minute: null, second:null};

  spinners = true;
  seconds = false;

addWorkingHoursData;
editWorkingHoursData;
working_hourObj: any = {};
holidayObj1: any = {};
holidayObj3: any = {};

onAddWorkingHours(){
  this.applicantDetailsFormSubmitted = true;
  let data={
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),

    mon_start:this.applicantDetailsForm.value.time_mon_start.hour+":"+this.applicantDetailsForm.value.time_mon_start.minute+":"+this.applicantDetailsForm.value.time_mon_start.second,
    mon_end:this.applicantDetailsForm.value.time_mon_end.hour+":"+this.applicantDetailsForm.value.time_mon_end.minute+":"+this.applicantDetailsForm.value.time_mon_end.second,

    tue_start:this.applicantDetailsForm.value.time_tue_start.hour+":"+this.applicantDetailsForm.value.time_tue_start.minute+":"+this.applicantDetailsForm.value.time_tue_start.second,
    tue_end:this.applicantDetailsForm.value.time_tue_end.hour+":"+this.applicantDetailsForm.value.time_tue_end.minute+":"+this.applicantDetailsForm.value.time_tue_end.second,

    wed_start:this.applicantDetailsForm.value.time_wed_start.hour+":"+this.applicantDetailsForm.value.time_wed_start.minute+":"+this.applicantDetailsForm.value.time_wed_start.second,
    wed_end:this.applicantDetailsForm.value.time_wed_end.hour+":"+this.applicantDetailsForm.value.time_wed_end.minute+":"+this.applicantDetailsForm.value.time_wed_end.second,

    thu_start:this.applicantDetailsForm.value.time_thu_start.hour+":"+this.applicantDetailsForm.value.time_thu_start.minute+":"+this.applicantDetailsForm.value.time_thu_start.second,
    thu_end:this.applicantDetailsForm.value.time_thu_end.hour+":"+this.applicantDetailsForm.value.time_thu_end.minute+":"+this.applicantDetailsForm.value.time_thu_end.second,

    fri_start:this.applicantDetailsForm.value.time_fri_start.hour+":"+this.applicantDetailsForm.value.time_fri_start.minute+":"+this.applicantDetailsForm.value.time_fri_start.second,
    fri_end:this.applicantDetailsForm.value.time_fri_end.hour+":"+this.applicantDetailsForm.value.time_fri_end.minute+":"+this.applicantDetailsForm.value.time_fri_end.second,

    sat_start:this.applicantDetailsForm.value.time_sat_start.hour+":"+this.applicantDetailsForm.value.time_sat_start.minute+":"+this.applicantDetailsForm.value.time_sat_start.second,
    sat_end:this.applicantDetailsForm.value.time_sat_end.hour+":"+this.applicantDetailsForm.value.time_sat_end.minute+":"+this.applicantDetailsForm.value.time_sat_end.second,

    sun_start:this.applicantDetailsForm.value.time_sun_start.hour+":"+this.applicantDetailsForm.value.time_sun_start.minute+":"+this.applicantDetailsForm.value.time_sun_start.second,
    sun_end:this.applicantDetailsForm.value.time_sun_end.hour+":"+this.applicantDetailsForm.value.time_sun_end.minute+":"+this.applicantDetailsForm.value.time_sun_end.second,
  }
  

  if (this.applicantDetailsForm.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/working_hour',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
          console.log('Data',this.addWorkingHoursData);
          this.addedSuccessfullyToast=true;
          this.showAddHoliday = false;
          this.showTable = true;
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }
}

  toggleSpinners() {
    this.spinners = !this.spinners;
}

id_string;
onSaveClick(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('utility/working-hour/'+this.id_string).subscribe(result=>{
    console.log('REEEEEEEE: ', result);
    const [hour, min, sec] = result.results.mon_start.split(':')
    console.log("JOJOJOJ",hour,min,sec)
    this.applicantDetailsForm.value.time_sat_start = hour
  },(err) => {
    this.exceptionToast=true;
  });
}

blocks = [
    {
      name:       "Tenant",
  },
  {
    name:       "Utility",
  },
  {
      name:       "Day",
  },
  {
     name:       "Start Time",
  },
  {
     name:       "End Time",
  }
]

dataSet = [
]

  ngOnInit(): void {
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
          
          that.apiService.get(`utility/${that.utilityIdString}/working-hour/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {

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
