import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl,FormArray } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-meter-data-admin-validation-assignments',
  templateUrl: './meter-data-admin-validation-assignments.component.html',
  styleUrls: ['./meter-data-admin-validation-assignments.component.scss'],
  providers: [ErrorMessage]
})
export class MeterDataAdminValidationAssignmentsComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('meter-data/'+this.utilityIdString+'/validation-assignment/list').subscribe(data=>{
      this.assignment_list = data;
    })

    this.apiService.get('meter-data/utility/'+this.utilityIdString+'/read_cycle/list').subscribe(data => {
      this.read_cycle_list = data;
    }) 


    if(this.loginUser == 'Tenant'){
      this.apiService.get('user/list?tenant_id_string='+this.tenantIdString).subscribe(data=>{
        this.user_list = data;
      })
    }
    else{
      this.apiService.get('user/list?utility_id_string='+this.utilityIdString).subscribe(data=>{
        this.user_list = data;
      })
    }
    

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      readCycleNameControl: [null, [Validators.required]],
      validator1NameControl: [null, [Validators.required]],
      validator2NameControl: [null, [Validators.required]],
      

    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      validator1NameControlEdit: [null, [Validators.required]],
      validator2NameControlEdit: [null, [Validators.required]],
    });
   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  loginUser;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  tenantIdString = this.sessionService.getter("tenant_id_string");
  assignment_list:any =[];
  user_list:any=[];
  read_cycle_list:any=[];
  searchText;
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
  disableAdd:boolean = false;

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
   this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.disableAdd = false;
  }

  onCloseClick(){
   this.applicantDetailsFormSubmitted = false;
   this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.disableAdd = false;
  }

 scrollOptions = { 
   autoHide: true, 
   scrollbarMinSize: 67,
   scrollbarMaxSize: 180,
 };

 onAddClick(){
  this.apiService.get('meter-data/utility/'+this.utilityIdString+'/read_cycle/list').subscribe(data => {
    this.read_cycle_list = data;
  }) 
 }

 onAddValidationdata(){
  this.applicantDetailsFormSubmitted = true;
  let data ={
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    validator1_id:this.applicantDetailsForm.value.validator1NameControl.id_string,
    validator2_id:this.applicantDetailsForm.value.validator2NameControl.id_string,
    read_cycle_id:this.applicantDetailsForm.value.readCycleNameControl.id_string,
  }
  this.disableAdd = true;

  if (this.applicantDetailsForm.invalid) {
    this.disableAdd = false;
    return;
  }else{
  
    this.apiService.post('meter-data/validation-assignment',data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('meter-data/'+this.utilityIdString+'/validation-assignment/list').subscribe(data=>{
          this.assignment_list = data;
          this.addedSuccessfullyToast=true;
          $('#add_validation_assignments').modal('hide');
          this.disableAdd = false;
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
        })
      }
    },(err) => {
      this.disableAdd = false;
      this.exceptionToast=true;
    });
  }
}
id_string;
onCardClickEvent(item:any){
this.id_string = item.id_string;

}
onEditValidationdata(){
this.applicantDetailsFormEditSubmitted = true;
let data ={
  tenant_id:this.sessionService.getter("tenant_id_string"),
  utility_id:this.sessionService.getter("utility_id_string_admin"),
  validator1_id:this.applicantDetailsFormEdit.value.validator1NameControlEdit.id_string,
  validator2_id:this.applicantDetailsFormEdit.value.validator2NameControlEdit.id_string,
  
}
this.disableAdd = true;



if (this.applicantDetailsFormEdit.invalid) {
  this.disableAdd = false;
  return;
}else{
  
  this.apiService.put('meter-data/validation-assignment/'+this.id_string,data).subscribe(result=>{
    if(result.state == 'success'){
      this.apiService.get('meter-data/'+this.utilityIdString+'/validation-assignment/list').subscribe(data=>{
        this.assignment_list = data;
      
        this.editedSuccessfullyToast=true;
        $('#edit_validation_assignments').modal('hide');
        this.disableAdd = false;
        this.applicantDetailsFormEdit.reset();
        this.applicantDetailsFormEditSubmitted = false;
      })
    }
  },(err) => {
    this.disableAdd = false;
    this.exceptionToast=true;

  });
}
}



  ngOnInit(): void {
  }

}
