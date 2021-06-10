import { Component, OnInit,Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray,AbstractControl} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {UtilityConfigurationComponent} from 'src/app/admin/utility-configuration/utility-configuration.component';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { event } from 'jquery';
import { UtilityService } from '../../../../utility/utility.service';
declare var $:any;
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ErrorMessage } from '../../../../error-messages/error-messages';
declare var $:any;
@Component({
  selector: 'app-utility-departments',
  templateUrl: './utility-departments.component.html',
  styleUrls: ['./utility-departments.component.scss'],
  providers: [ErrorMessage]
})
export class UtilityDepartmentsComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder,private utilityService:UtilityService) {
    this.apiService.get('dept-type/list').subscribe(data=>{
      this.departmentList = data;
     
    })
    this.apiService.get('utility/'+ this.utilityIdString +'/dept-type/list').subscribe(data=>{
      this.utilitydepartmentList = data;
     
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      departmentNameControl: [null, [Validators.required]],
      

    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      departmentNameControlEdit: [null, [Validators.required]],
    });
   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

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
  searchText;
  departmentList:any=[];
  utilitydepartmentList:any=[];
  departmentObj:any={};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
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
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  addDeptData;
  loginUser;
  disableAddDepartment(){
    this.loginUser = this.sessionService.getter("loginUser")
    if((this.loginUser) == 'Utility'){
      console.log("TRUE")
      return true;
      
    }
    else{
      return false;
    }
  }

  onAddDepartmentdata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.departmentNameControl.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      department_type_id:this.applicantDetailsForm.value.departmentNameControl.id_string,
    }

    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/dept-type',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/dept-type/list').subscribe(data=>{
            this.utilitydepartmentList = data;
            console.log('List: ', this.utilitydepartmentList);
            this.addedSuccessfullyToast=true;
            $('#add_utility_department').modal('hide');
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

  ngOnInit(): void {
  }

}
