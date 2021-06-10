import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-complaints-subtype',
  templateUrl: './complaints-subtype.component.html',
  styleUrls: ['./complaints-subtype.component.scss'],
  providers: [ErrorMessage]
})
export class ComplaintsSubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('complaint/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.complaint_subtypeList = data;
    })
    this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.complaint_typeList = data;
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      complaintSubTypeControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      complaintTypeControl: [null, [Validators.required]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      complaintSubTypeControlEdit: [null, [Validators.required,,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      complaintTypeControlEdit: [null, [Validators.required]],
      complaintTypeControlEditHidden:[null]
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
  complaint_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  complaint_subtype;
  complaint_subtypeList:any={};
  complaint_typeList:any={};
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

   id_string;
   onCardClickEvent(item:any){
     this.id_string = item.id_string;
     this.apiService.get('complaint/subtype/'+item.id_string).subscribe(result=>{
       if(result.state == 'success'){
         this.applicantDetailsFormEdit.controls.complaintTypeControlEdit.setValue(result.results.complaint_type.name);
         this.applicantDetailsFormEdit.controls.complaintTypeControlEditHidden.setValue(result.results.complaint_type.id_string);
         this.applicantDetailsFormEdit.controls.complaintSubTypeControlEdit.setValue(result.results.name)
       }
     },(err) => {
       this.exceptionToast=true;
     });
   }

   edit_dropdown_change;
   onComplaintTypeEditChange(){
     this.applicantDetailsFormEdit.value.complaintTypeControlEditHidden = this.applicantDetailsFormEdit.value.complaintTypeControlEdit.id_string
   }
 
   onCancelClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormEdit.reset();
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormEdit.reset();
   }

   onAddClick(){
    this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.complaint_typeList = data;
    })
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addcomplaintSubTypeData;
  editcomplaintSubTypeData;

  onAddComplaintSubTypedata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.complaintSubTypeControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      complaint_type_id:this.applicantDetailsForm.value.complaintTypeControl.id_string,
      is_active:true
      
    }

    if (this.applicantDetailsForm.invalid) {
      return;
    }else{
      this.apiService.post('complaint/subtype',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('complaint/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
            this.complaint_subtypeList = data;
            this.addedSuccessfullyToast=true;
            $('#add_complaint_subtype').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }else if(result.state == "exception"){
          this.exceptionToast=true;

        }
      },(err) => {
        alert(err.error.result)
      });
    }
  }

  onEditComplaintSubTypedata(){
    this.applicantDetailsFormEditSubmitted = true;
    let data={
    name:this.applicantDetailsFormEdit.value.complaintSubTypeControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    complaint_type_id:this.applicantDetailsFormEdit.value.complaintTypeControlEditHidden,
    is_active:true
    }
    if (this.applicantDetailsFormEdit.invalid) {
      return;
    }else{
      this.apiService.put('complaint/subtype/'+this.id_string,data).subscribe(result=>{
        
        if(result.state == 'success'){
          this.apiService.get('complaint/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
            this.complaint_subtypeList = data;
            this.editedSuccessfullyToast=true;
            $('#edit_complaint_subtype').modal('hide');
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
          })
        }else if(result.state == "exception"){
          this.exceptionToast=true;
        }
      });
    }
  }
  ngOnInit(): void {
  }

}
