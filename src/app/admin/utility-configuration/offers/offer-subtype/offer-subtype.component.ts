import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { FilterService } from '../../../../common/filter/filter.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,ValidatorFn, ValidationErrors} from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-offer-subtype',
  templateUrl: './offer-subtype.component.html',
  styleUrls: ['./offer-subtype.component.scss'],
  providers:[ErrorMessage]
})
export class OfferSubtypeComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_type/list').subscribe(data => {
      this.offer_typeList = data;
    })
    
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data => {
      this.offer_subtypeList = data;
    })

      // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    offerTypeNameControl: [null, [Validators.required]],
    offerSubTypeNameControl:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
    
    

  });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({

    offerTypeNameControlEdit: [null, [Validators.required]],
    offerSubTypeNameControlEdit:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
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
   utilityIdString = this.sessionService.getter("utility_id_string_admin");
   offer_subtypeObj: any = {};
   offer_subtypeObj_edit: any={};
   bindvalue:string;
   offer_typeList:any=[];
   offer_subtypeList:any=[];
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


  addOfferSubTypeData;
  editOfferSubTypeData;

  onAddOfferSubTypeData(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.offerSubTypeNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      offer_type_id:this.applicantDetailsForm.value.offerTypeNameControl.id_string,
      is_active:true
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('consumer/offer_subtype',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data=>{
            this.offer_subtypeList = data;
            console.log('List: ', this.offer_subtypeList);
            this.addedSuccessfullyToast=true;
            $('#add_offer_subtype').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }

  onEditOfferSubTypeData(){
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      name:this.applicantDetailsFormEdit.value.offerSubTypeNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      offer_type_id:this.applicantDetailsFormEdit.value.offerTypeNameControlEdit.id_string,
      is_active:true
    }

    if (this.applicantDetailsFormEdit.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('consumer/offer_subtype/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data=>{
            this.offer_subtypeList = data;
            console.log('List: ', this.offer_subtypeList);
            this.editedSuccessfullyToast=true;
            $('#edit_offer_subtype').modal('hide');
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
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
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data => {
      this.offer_subtypeList = data;
    }) 
  }

  ngOnInit(): void {
  }

}
