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
  selector: 'app-notification-subtype',
  templateUrl: './notification-subtype.component.html',
  styleUrls: ['./notification-subtype.component.scss'],
  providers:[ErrorMessage]
})
export class NotificationSubtypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('utility/'+this.utilityIdString+'/notification_type/list').subscribe(data => {
      this.notification_typeList = data;
    }) 
    this.apiService.get('utility/'+this.utilityIdString+'/notification_subtype/list').subscribe(data => {
      this.notification_subtypeList = data;
    }) 

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      notificationTypeNameControl: [null, [Validators.required]],
      notificationSubTypeNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],

    });

    // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      notificationTypeNameControlEdit: [null, [Validators.required]],
      notificationSubTypeNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      notificationTypeNameControlEditHidden:[null]
    });
   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }


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
  notification_subtypeList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  notification_typeObj: any = {};
  notification_typeObj_edit:any = {};
  notification_subtypeObj: any = {};
  notification_subtypeObj_edit:any = {};
  bindvalue:string;
  searchText;

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

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
     this.apiService.get('utility/notification_subtype/'+item.id_string).subscribe(result=>{
       if(result.state == 'success'){
         console.log("RESULT",result)
         this.applicantDetailsFormEdit.controls.notificationTypeNameControlEdit.setValue(result.results.notification_type.name);
         this.applicantDetailsFormEdit.controls.notificationTypeNameControlEditHidden.setValue(result.results.notification_type.id_string);
         this.applicantDetailsFormEdit.controls.notificationSubTypeNameControlEdit.setValue(result.results.name)
       }
     },(err) => {
       this.exceptionToast=true;
     });
   }

   edit_dropdown_change;
   onNotificationTypeEditChange(){
     
     this.applicantDetailsFormEdit.value.notificationTypeNameControlEditHidden = this.applicantDetailsFormEdit.value.notificationTypeNameControlEdit.id_string
     console.log("HHHH",this.applicantDetailsFormEdit.value.notificationTypeNameControlEditHidden)
   }

  addNotificationSubTypeData;
  editNotificationSubTypeData;

  onAddClick(){
    this.apiService.get('utility/'+this.utilityIdString+'/notification_type/list').subscribe(data => {
      this.notification_typeList = data;
    }) 

  }

  onAddNotificationSubTypeData(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.notificationSubTypeNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      notification_type_id:this.applicantDetailsForm.value.notificationTypeNameControl.id_string,
      is_active:true
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/notification_subtype',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/notification_subtype/list').subscribe(data=>{
            this.notification_subtypeList = data;
            console.log('List: ', this.notification_subtypeList);
            this.addedSuccessfullyToast=true;
            $('#add_notification_subtype').modal('hide');
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
  let data ={
    name:this.applicantDetailsFormEdit.value.notificationSubTypeNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      notification_type_id:this.applicantDetailsFormEdit.value.notificationTypeNameControlEditHidden,
      is_active:true
  }

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/notification_subtype/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/notification_subtype/list').subscribe(data=>{
          this.notification_subtypeList = data;
          console.log('List: ', this.notification_subtypeList);
          this.editedSuccessfullyToast=true;
          $('#edit_notification_subtype').modal('hide');
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
