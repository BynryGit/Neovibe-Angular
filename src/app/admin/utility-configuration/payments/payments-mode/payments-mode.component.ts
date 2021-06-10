import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-payments-mode',
  templateUrl: './payments-mode.component.html',
  styleUrls: ['./payments-mode.component.scss'],
  providers: [ErrorMessage]
})
export class PaymentsModeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    
    this.apiService.get('payment/mode/list').subscribe(data=>{
      this.payment_mode = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
      this.payment_modeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
    })

    this.applicantDetailsForm = this.formBuilder.group({
      paymentModeControl: [null, [Validators.required]],
    });
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
  payment_mode_list=[];
  payment_type:any={};
  payment_subtype:any={};
  payment_mode:any={};
  payment_modeList:any={};
  payment_typeList:any={};
  service_List:any={};
  payment_subtypeList:any={};
  payment_modeObj: any = {};
  payment_modeObj1: any = {};
  payment_modeObj2: any = {};
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

  addPaymentModeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onCancelClick(){
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     
   }
 
   onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     
   }
 

  onAddPaymentModedata(){
    this.applicantDetailsFormSubmitted = true;
    for(let payment_mode of this.applicantDetailsForm.value.paymentModeControl){
      this.payment_mode_list.push(
        {
          id_string: payment_mode.id_string,
          // value: payment_mode.name
        }
      );
    }
    console.log('Payment List: ', this.applicantDetailsForm.value.paymentModeControl);
    let data ={
      
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      mode_details:this.payment_mode_list,
      // utility_product_id:this.payment_modeObj.service.id_string
      
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('payment/mode',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
            this.payment_modeList = data;
            console.log('List: ', this.payment_modeList);
            this.addedSuccessfullyToast=true;
            $('#add_payment_mode').modal('hide');
            this.payment_mode_list = []
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
