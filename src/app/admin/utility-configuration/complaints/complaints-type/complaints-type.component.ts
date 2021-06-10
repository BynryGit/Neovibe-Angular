import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-complaints-type',
  templateUrl: './complaints-type.component.html',
  styleUrls: ['./complaints-type.component.scss'],
  providers: [ErrorMessage]
})
export class ComplaintsTypeComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.complaint_typeList = data;
    })

    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      complaintTypeControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      complaintTypeControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
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
  complaint_type_Obj: any = {};
  complaint_type_Obj_edit: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  complaint_type;
  complaint_typeList:any={};
  service_List:any={};
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
  this.apiService.get('complaint/type/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      this.applicantDetailsFormEdit.controls.complaintTypeControlEdit.setValue(result.results.name)
    }
  },(err) => {
    this.exceptionToast=true;
  });
}

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addcomplaintTypeData;
  editcomplaintTypeData;
  count: number = 0;

  onAddComplaintTypedata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.complaintTypeControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      // utility_product_id:this.complaint_type_Obj.service.id_string,
      is_active:true
      
    }

    if (this.applicantDetailsForm.invalid) {
      return;
    }else{
      this.apiService.post('complaint/type',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
            this.complaint_typeList = data;
            this.addedSuccessfullyToast=true;
            $('#add_complaint_type').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }

  onEditComplaintTypedata(){
    this.applicantDetailsFormEditSubmitted = true;
    let data={
    name:this.applicantDetailsFormEdit.value.complaintTypeControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    // utility_product_id:this.complaint_type_Obj_edit.service.id_string,
    is_active:true
    }

    if (this.applicantDetailsFormEdit.invalid) {
      return;
    }else{
      this.apiService.put('complaint/type/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
            this.complaint_typeList = data;
            this.editedSuccessfullyToast=true;
            $('#edit_complaint_type').modal('hide');
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
