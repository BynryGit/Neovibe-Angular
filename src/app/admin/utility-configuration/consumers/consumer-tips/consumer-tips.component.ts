import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-consumer-tips',
  templateUrl: './consumer-tips.component.html',
  styleUrls: ['./consumer-tips.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumerTipsComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      tipNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      descriptionControl: [null, [Validators.required,this.noWhitespaceValidator]],
      
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      tipNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      descriptionControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
     
    });
    this.apiService.get('utility/'+this.utilityIdString+'/tip/list').subscribe(data=>{
      this.tipList = data;
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
  tipList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
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
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsFormEditSubmitted = false;
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

  onAddTipdata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      tip:this.applicantDetailsForm.value.tipNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      description:this.applicantDetailsForm.value.descriptionControl,
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log(this.ad)
      console.log("Data",data);
      this.apiService.post('utility/tip',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/tip/list').subscribe(data=>{
            this.tipList = data;
            console.log('List: ', this.tipList);
            this.addedSuccessfullyToast=true;
            $('#addTips').modal('hide');
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

onEditTipdata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    tip:this.applicantDetailsFormEdit.value.tipNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    description:this.applicantDetailsFormEdit.value.descriptionControledit,
  }
  this.disableAdd = true;
  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/tip/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/tip/list').subscribe(data=>{
          this.tipList = data;
          console.log('List: ', this.tipList);
          this.editedSuccessfullyToast=true;
          $('#editTips').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.disableAdd = false;
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;
      this.disableAdd = false;
    });
  }

}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  this.apiService.get('utility/tip/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      console.log("RESULT",result)
      this.applicantDetailsFormEdit.controls.tipNameControlEdit.setValue(result.results.tip)
      this.applicantDetailsFormEdit.controls.descriptionControlEdit.setValue(result.results.description)
     
      
    }
  },(err) => {
  });
}

  ngOnInit(): void {
  }

}
