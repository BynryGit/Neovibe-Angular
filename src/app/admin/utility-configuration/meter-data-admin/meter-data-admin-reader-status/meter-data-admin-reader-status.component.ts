import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-meter-data-admin-reader-status',
  templateUrl: './meter-data-admin-reader-status.component.html',
  styleUrls: ['./meter-data-admin-reader-status.component.scss'],
  providers: [ErrorMessage]
})
export class MeterDataAdminReaderStatusComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 

    this.apiService.get('meter-status/list').subscribe(data=>{
      this.meter_status_list = data;
    })

    this.apiService.get('meter-data/utility/'+this.utilityIdString+'/reader-status/list').subscribe(data=>{
      this.reader_status_list = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      meterStatusControl: [null, [Validators.required]],
      readerStatusCodeControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      readerStatusNameControl:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      meterStatusControlEdit: [null, [Validators.required]],
      readerStatusCodeControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      readerStatusNameControlEdit:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  meter_status_list:any=[];
  reader_status_list:any=[];

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd:boolean = false;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

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

  onAddReaderStatus(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.readerStatusNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      meter_status_id:this.applicantDetailsForm.value.meterStatusControl.id_string,
      status_code:this.applicantDetailsForm.value.readerStatusCodeControl
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.post('meter-data/reader-status',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('meter-data/utility/'+this.utilityIdString+'/reader-status/list').subscribe(data=>{
            this.reader_status_list = data;
            this.addedSuccessfullyToast=true;
            $('#add_reader_status').modal('hide');
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

onEditReaderStatus(){
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      name:this.applicantDetailsFormEdit.value.readerStatusNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      meter_status_id:this.applicantDetailsFormEdit.value.meterStatusControlEdit.id_string,
      status_code:this.applicantDetailsFormEdit.value.readerStatusCodeControlEdit,
      
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.put('meter-data/reader-status/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('meter-data/utility/'+this.utilityIdString+'/reader-status/list').subscribe(data=>{
            this.reader_status_list = data;
            this.editedSuccessfullyToast=true;
            $('#edit_reader_status').modal('hide');
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
