import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-document-subtype',
  templateUrl: './document-subtype.component.html',
  styleUrls: ['./document-subtype.component.scss'],
  providers: [ErrorMessage]
})
export class DocumentSubtypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('utility/'+this.utilityIdString+'/document-type/list').subscribe(data=>{
      this.utilitydocumentTypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/document_subtype/list').subscribe(data=>{
      this.utilitydocumentSubTypeList = data;
    })

    this.applicantDetailsForm = this.formBuilder.group({
      documentSubTypeControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      documentTypeControl: [null, [Validators.required]]
    });
  
     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      documentSubTypeControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      documentTypeControlEdit: [null, [Validators.required]]
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
  utilitydocumentTypeList:any=[];
  utilitydocumentSubTypeList:any=[];
  countryList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  document_typeObj: any = {};
  document_subtypeObj:any ={};
  document_subtypeObj1:any={};
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
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

  onCloseClick(){
   this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };


  addDocumentSubTypedata;
  onAddDocumentSubTypeData(){
    this.applicantDetailsFormSubmitted = true;

    let data ={
      name:this.applicantDetailsForm.value.documentSubTypeControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      document_type_id:this.applicantDetailsForm.value.documentTypeControl.id_string,
      is_active:true
      
      
    }

    if (this.applicantDetailsForm.invalid) {
      return;
    }else{
      this.apiService.post('utility/document_subtype',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/document_subtype/list').subscribe(data=>{
            this.utilitydocumentSubTypeList = data;
            this.addedSuccessfullyToast=true;
            $('#add_document_subtype').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
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
  this.apiService.get('utility/document_subtype/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      this.applicantDetailsFormEdit.controls.documentSubTypeControlEdit.setValue(result.results.name)
      this.applicantDetailsFormEdit.controls.documentTypeControlEdit.setValue(result.results.document_type.name)
    }
  },(err) => {
    this.exceptionToast=true;
  });
}

editDocumentSubTypedata;
onEditDocumentSubTypeData(){
  this.applicantDetailsFormEditSubmitted = true;
  this.apiService.get('utility/document_subtype/'+this.id_string).subscribe(result=>{
      this.applicantDetailsFormEdit.value.documentTypeControlEdit = result.results.document_type.id_string
  },(err) => {
    this.exceptionToast=true;
  });
  let data ={
    name:this.applicantDetailsFormEdit.value.documentSubTypeControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    document_type_id:this.applicantDetailsFormEdit.value.documentTypeControlEdit.id_string,
    is_active:true
    
    
  }
  if (this.applicantDetailsFormEdit.invalid) {
    return;
  }else{
    this.apiService.put('utility/document_subtype/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/document_subtype/list').subscribe(data=>{
          this.utilitydocumentSubTypeList = data;
          this.editedSuccessfullyToast=true;
          $('#edit_document_subtype').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;

    });
  }
}

  onAddClick(){
    this.apiService.get('utility/'+this.utilityIdString+'/document-type/list').subscribe(data => {
      this.utilitydocumentTypeList = data;
    }) 
  }

  
   


  ngOnInit(): void {
  }

}
