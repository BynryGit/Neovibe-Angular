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
  selector: 'app-notification-type',
  templateUrl: './notification-type.component.html',
  styleUrls: ['./notification-type.component.scss'],
  providers: [ErrorMessage]
})
export class NotificationTypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('utility/'+this.utilityIdString+'/notification_type/list').subscribe(data => {
      this.notification_typeList = data;
    }) 

     // Applicant details form code start
     this.applicantDetailsForm = this.formBuilder.group({
      notificationTypeNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],

    });

    // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      notificationTypeNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
    });
   

   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

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
  notification_typeList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  notification_typeObj: any = {};
  notification_typeObj_edit:any = {};
  bindvalue:string;
  searchText;

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
  }

  onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  this.apiService.get('utility/notification_type/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      this.applicantDetailsFormEdit.controls.notificationTypeNameControlEdit.setValue(result.results.name)
    }
  },(err) => {
    this.exceptionToast=true;
  });
}

  addNotificationTypeData;
  editNotificationTypeData;

  onAddNotificationTypeData(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.notificationTypeNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      is_active:true
    }

    if (this.applicantDetailsForm.invalid) {
      return;
    }else{
      this.apiService.post('utility/notification_type',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/notification_type/list').subscribe(data=>{
            this.notification_typeList = data;
            this.addedSuccessfullyToast=true;
            $('#add_notification_type').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
}

onEditNotificationTypeData(){
  this.applicantDetailsFormEditSubmitted = true;
  let data={
    name:this.applicantDetailsFormEdit.value.notificationTypeNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    is_active:true
  }

  if (this.applicantDetailsFormEdit.invalid) {
    
    return;
  }else{
   
    this.apiService.put('utility/notification_type/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/notification_type/list').subscribe(data=>{
          this.notification_typeList = data;
          this.editedSuccessfullyToast=true;
          $('#edit_notification_type').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;
  
    });
  }

}



  ngOnInit(): void {
  }

}
