import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-consumer-contactus',
  templateUrl: './consumer-contactus.component.html',
  styleUrls: ['./consumer-contactus.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumerContactusComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      emailNameControl: [null, [Validators.required,Validators.email]],
      emergencyNoControl: [null, [Validators.required,Validators.maxLength(10),this.noWhitespaceValidator]],
      workingDaysControl: [null, [Validators.required,this.noWhitespaceValidator]],
      siteNameControl:[null, [Validators.required,this.noWhitespaceValidator]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      emailNameControlEdit: [null, [Validators.required,Validators.email]],
      emergencyNoControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      workingDaysControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      siteNameControlEdit:[null, [Validators.required,this.noWhitespaceValidator]]
    });
    this.apiService.get('utility/'+this.utilityIdString+'/contact-us/list').subscribe(data=>{
      this.contactUsList = data;
    })
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
  contactUsList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
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
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsFormEditSubmitted = false;
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onAddContactUsdata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      email:this.applicantDetailsForm.value.emailNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      emergency_no:this.applicantDetailsForm.value.emergencyNoControl,
      working_days:this.applicantDetailsForm.value.workingDaysControl,
      portal_site:this.applicantDetailsForm.value.siteNameControl,
      utility_product_id:1
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log(this.ad)
      console.log("Data",data);
      this.apiService.post('utility/contact-us',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/contact-us/list').subscribe(data=>{
            this.contactUsList = data;
            console.log('List: ', this.contactUsList);
            this.addedSuccessfullyToast=true;
            $('#addConsumerContactUs').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
}

onEditContactUsdata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
      email:this.applicantDetailsFormEdit.value.emailNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      emergency_no:this.applicantDetailsFormEdit.value.emergencyNoControlEdit,
      working_days:this.applicantDetailsFormEdit.value.workingDaysControlEdit,
      portal_site:this.applicantDetailsFormEdit.value.siteNameControlEdit,
      utility_product_id:1
  }

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/contact-us/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/contact-us/list').subscribe(data=>{
          this.contactUsList = data;
          console.log('List: ', this.contactUsList);
          this.editedSuccessfullyToast=true;
          $('#editConsumerContactUs').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;

    });
  }


}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('utility/contact-us/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      console.log("RESULT",result)
      this.applicantDetailsFormEdit.controls.emailNameControlEdit.setValue(result.results.email)
      this.applicantDetailsFormEdit.controls.emergencyNoControlEdit.setValue(result.results.emergency_no)
      this.applicantDetailsFormEdit.controls.workingDaysControlEdit.setValue(result.results.working_days)
      this.applicantDetailsFormEdit.controls.siteNameControlEdit.setValue(result.results.portal_site)
      
     
      
    }
  },(err) => {
  });
}

  ngOnInit(): void {
  }

}
