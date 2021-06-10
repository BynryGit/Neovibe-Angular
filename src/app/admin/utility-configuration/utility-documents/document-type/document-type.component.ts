import { Component, OnInit,Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,ValidatorFn, ValidationErrors} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-document-type',
  templateUrl: './document-type.component.html',
  styleUrls: ['./document-type.component.scss'],
  providers:[ErrorMessage]
})
export class DocumentTypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('document_type/list').subscribe(data=>{
      this.documentTypeList = data;
    })

    this.apiService.get('utility/'+this.utilityIdString+'/document-type/list').subscribe(data=>{
      this.utilitydocumentTypeList = data;
    })

    this.applicantDetailsForm = this.formBuilder.group({
      documentTypeControl:[null, [Validators.required]],
      documentUnitControl:[null, [Validators.required]],
      documentSizeControl: [null, [Validators.required,this.noWhitespaceValidator]]
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
  documentTypeList:any =[];
  utilitydocumentTypeList:any=[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  document_typeObj: any = {};
  document_typeObj1: any = {};
  bindvalue:string;
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

  selectedDocumentSizeUnit:any
  unit = [
  {id: 1, name: 'MB'},
  {id: 2, name: 'KB'},
  {id: 3, name:'GB'}
  ];

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
   }
 
   onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormSubmitted = false;
  }

  addDocumentTypedata;
  onAddDocumentTypeData(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.documentTypeControl.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      document_type_id:this.applicantDetailsForm.value.documentTypeControl.id_string,
      document_size:this.applicantDetailsForm.value.documentSizeControl + " " + this.applicantDetailsForm.value.documentUnitControl.name
      
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/document_type',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/document-type/list').subscribe(data=>{
            this.utilitydocumentTypeList = data;
            console.log('List: ', this.utilitydocumentTypeList);
            this.addedSuccessfullyToast=true;
            $('#add_document_type').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
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
