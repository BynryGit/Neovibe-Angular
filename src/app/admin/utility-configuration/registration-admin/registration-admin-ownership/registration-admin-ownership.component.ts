import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-registration-admin-ownership',
  templateUrl: './registration-admin-ownership.component.html',
  styleUrls: ['./registration-admin-ownership.component.scss'],
  providers: [ErrorMessage]
})
export class RegistrationAdminOwnershipComponent implements OnInit {

  constructor( private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/ownership/list').subscribe(data=>{
      this.ownershipList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      ownershipNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      ownershipNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
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
  ownershipObj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  ownership_type;
  ownershipList:any={};
  searchText;
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


  selectedsubtype:any
  subtype = [
  {id: 1, name: 'SubType 1'},
  {id: 2, name: 'SubType 2'},
  ];

  selectedtype:any
  type = [
  {id: 1, name: 'Type 1'},
  {id: 2, name: 'Type 2'},
  ];

  addOwnershipData;
  editRegistrationTypeData;

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  this.apiService.get('consumer/ownership/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      this.applicantDetailsFormEdit.controls.ownershipNameControlEdit.setValue(result.results.name)
    }
  },(err) => {
    this.exceptionToast=true;
  });
}

  onAddOwnershipdata(){
    
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.ownershipNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.post('consumer/ownership',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/ownership/list').subscribe(data=>{
            this.ownershipList = data;
            this.addedSuccessfullyToast=true;
            $('#addOwnership').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsFormSubmitted = false;
            this.applicantDetailsForm.reset();
          })
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;
      });
    }
  }

  onEditOwnershipdata(){
    
    this.applicantDetailsFormEditSubmitted = true;
    let data={
    name:this.applicantDetailsFormEdit.value.ownershipNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    is_active:true
    }

    this.disableAdd = true;
    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.put('consumer/ownership/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/ownership/list').subscribe(data=>{
            this.ownershipList = data;
            this.editedSuccessfullyToast=true;
            $('#editOwnership').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;
  
      });
    }
  }


  

  ngOnInit(): void {
  }

}
