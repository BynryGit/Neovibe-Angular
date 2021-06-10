import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-payment-subtype',
  templateUrl: './payment-subtype.component.html',
  styleUrls: ['./payment-subtype.component.scss'],
  providers: [ErrorMessage]
})
export class PaymentSubtypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('payment/subtype/list').subscribe(data=>{
      this.payment_subtype = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
      this.payment_subtypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      paymentTypeControl: [null, [Validators.required]],
      paymentSubTypeControl: [null, [Validators.required]],
      glCodeControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      taxControl: [null, [Validators.required,this.noWhitespaceValidator]]
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
  payment_type:any={};
  payment_subtype:any={};
  payment_subtypeList:any={};
  payment_typeList:any={};
  payment_subtypeObj: any = {};
  payment_subtypeObj1: any = {};
  payment_subtypeObj3: any = {};
  payment_subtypeObj4: any = {};
  searchText;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
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
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
   }
 
   onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
   }

   onPaymentTypeChange(){
    let payment_type_id_string = this.applicantDetailsForm.value.paymentTypeControl.id_string
    // Zones dropdown api call start
    
    this.apiService.get('payment/subcatype/list?payment_type_id='+payment_type_id_string).subscribe(data=>{
      this.payment_subtypeList = data;
    },(err) => {
      this.payment_subtypeList = '';
    })

   }

   omit_special_char(event)
{   
   var k;  
   k = event.charCode;  //         k = event.keyCode;  (Both can be used)
   console.log("K",k)
   return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
}

   onAddClick(){
    // this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
    //   this.payment_subtypeList = data;
    // })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
    })
   }

  addPaymentSubTypeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 

  onAddPaymentSubTypedata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.paymentSubTypeControl.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      payment_subtype_id:this.applicantDetailsForm.value.paymentSubTypeControl.id_string,
      payment_type_id:this.applicantDetailsForm.value.paymentTypeControl.id_string,
      gl_code:this.applicantDetailsForm.value.glCodeControl,
      tax:this.applicantDetailsForm.value.taxControl,   
      is_active:true
      
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      
      this.disableAdd = false;
      return;
    }else{
      this.apiService.post('payment/subtype',data).subscribe(result=>{
       
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
            this.payment_subtypeList = data;
            
            this.addedSuccessfullyToast=true;
            $('#add_payment_subtype').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
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
