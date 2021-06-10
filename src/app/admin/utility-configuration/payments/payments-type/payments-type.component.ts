import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;


@Component({
  selector: 'app-payments-type',
  templateUrl: './payments-type.component.html',
  styleUrls: ['./payments-type.component.scss'],
  providers: [ErrorMessage]
})
export class PaymentsTypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService, private formBuilder: FormBuilder) {

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
    })

    // payment Details edit form code start
    // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    paymentTypeControl: [null, [Validators.required]],
  });
    // payment Details edit form code end

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
  payment_typeList:any={};
  service_List:any={};
  payment_typeObj: any = {};
  paymentDetailsForm: FormGroup;
  payment_details_list =[];
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
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
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
    
  }

  onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
    
  }


  addPaymentTypeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  get PaymentDetails() {
    return this.paymentDetailsForm.get('paymentControl') as FormArray;
  }
  
  addServiceDetailsRowEdit(){
    this.PaymentDetails.push(this.formBuilder.group({payment_details:[null]}));
  }

  
 

  onAddPaymentTypedata(){
    this.applicantDetailsFormSubmitted = true;
    for(let services of this.applicantDetailsForm.value.paymentTypeControl){
      this.payment_details_list.push(
        {
          id_string:services.id_string,
          
        }
      );
    }
    console.log(this.payment_details_list);
    let data ={
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      payment_details:this.payment_details_list,
      // utility_product_id:this.applicantDetailsForm.value.serviceNameControl.id_string
      
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('payment/type',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
            this.payment_typeList = data;
            console.log('List: ', this.payment_typeList);
            this.addedSuccessfullyToast=true;
            $('#add_payment_type').modal('hide');
            this.payment_details_list = [];
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
