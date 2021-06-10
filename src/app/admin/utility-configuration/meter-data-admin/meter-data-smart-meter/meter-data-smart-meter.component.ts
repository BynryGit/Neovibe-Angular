import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-meter-data-smart-meter',
  templateUrl: './meter-data-smart-meter.component.html',
  styleUrls: ['./meter-data-smart-meter.component.scss'],
  providers: [ErrorMessage]
})
export class MeterDataSmartMeterComponent implements OnInit {

  constructor( private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.product_list = data;
    })

    this.apiService.get('meter-data/'+this.utilityIdString+'/smart-meter/list').subscribe(data=>{
      this.smart_meterList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      productNameControl: [null, [Validators.required]],
      apiNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      vendorNameControl: [null, [Validators.pattern("[a-zA-Z ]*$"),Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      apiKeyNameControl: [null, [Validators.pattern("[a-zA-Z ]*$"),Validators.required,this.noWhitespaceValidator]],
      apiURLNameControl: [null, [Validators.required,this.noWhitespaceValidator]],

    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      productNameControlEdit: [null, [Validators.required]],
      apiNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      vendorNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      apiKeyNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      apiURLNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
    });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  product_list:any =[];
  smart_meterList:any=[];
  searchText;
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

  onAddSmartMeterdata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      smart_meter_api_name:this.applicantDetailsForm.value.apiNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      utility_product_id:this.applicantDetailsForm.value.productNameControl.id_string,
      vendor_name:this.applicantDetailsForm.value.vendorNameControl,
      api_key:this.applicantDetailsForm.value.apiKeyNameControl,
      api_url:this.applicantDetailsForm.value.apiURLNameControl,
      request_parameter:{
        key:"YHNJK",
      } 
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('meter-data/smart-meter',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('meter-data/'+this.utilityIdString+'/smart-meter/list').subscribe(data=>{
            this.smart_meterList = data;
            console.log('List: ', this.smart_meterList);
            this.addedSuccessfullyToast=true;
            $('#add_smart_meter').modal('hide');
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
  console.log(this.id_string);
  this.apiService.get('meter/'+this.utilityIdString+'/smart-meter/list').subscribe(data => {
    this.smart_meterList = data;
  }) 
}
onEditSmartMeterdata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
      smart_meter_api_name:this.applicantDetailsFormEdit.value.apiNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      utility_product_id:this.applicantDetailsFormEdit.value.productNameControlEdit.id_string,
      vendor_name:this.applicantDetailsFormEdit.value.vendorNameControlEdit,
      api_key:this.applicantDetailsFormEdit.value.apiKeyNameControlEdit,
      api_url:this.applicantDetailsFormEdit.value.apiURLNameControlEdit,
      request_parameter:{
        key:"YHNJK",
      } 
  }

  

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('meter-data/smart-meter/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.apiService.get('meter-data/'+this.utilityIdString+'/smart-meter/list').subscribe(data=>{
          this.smart_meterList = data;
          console.log('List: ', this.smart_meterList);
          this.editedSuccessfullyToast=true;
          $('#edit_smart_meter').modal('hide');
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
