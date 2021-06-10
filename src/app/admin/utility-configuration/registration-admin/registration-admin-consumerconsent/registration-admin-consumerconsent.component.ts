import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-registration-admin-consumerconsent',
  templateUrl: './registration-admin-consumerconsent.component.html',
  styleUrls: ['./registration-admin-consumerconsent.component.scss']
})
export class RegistrationAdminConsumerconsentComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    
    // this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
    //   this.consumer_categoryList = data;
    // })
    // this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list').subscribe(data=>{
    //   this.consumer_subcategoryList = data;
    // })

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/consent/list').subscribe(data=>{
      this.consentList = data;
    }) 

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      consumerCategoryControl: [null, [Validators.required]],
      consumerSubCategoryControl: [null, [Validators.required]],
      consumerConsentControl:[null, [Validators.required,this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      consumerCategoryControlEdit: [null, [Validators.required]],
      consumerSubCategoryControlEdit: [null, [Validators.required]],
      consumerConsentControlEdit:[null, [Validators.required,this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      consumerCategoryControlEditHidden:[null,],
      consumerSubCategoryControlEditHidden:[null,]
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
  consumer_categoryList:any=[];
  consumer_subcategoryList:any=[];

  // registration_typeList:any={};
  // registration_subtypeList:any={};
  consentList:any={};
  consent_Obj: any = {};
  consent_Obj1: any = {};
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

   id_string;
   onCardClickEvent(item:any){
     this.id_string = item.id_string;
     this.apiService.get('consumer/consent/'+item.id_string).subscribe(result=>{
       if(result.state == 'success'){
         this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
          this.consumer_categoryList = data;
        })
         this.applicantDetailsFormEdit.controls.consumerConsentControlEdit.setValue(result.results.name);
         this.applicantDetailsFormEdit.controls.consumerCategoryControlEditHidden.setValue(result.results.consumer_category.id_string);
         this.applicantDetailsFormEdit.controls.consumerSubCategoryControlEditHidden.setValue(result.results.consumer_subcategory.id_string)
         this.applicantDetailsFormEdit.controls.consumerCategoryControlEdit.setValue(result.results.consumer_category.name);
         this.applicantDetailsFormEdit.controls.consumerSubCategoryControlEdit.setValue(result.results.consumer_subcategory.name)
         
       }
     },(err) => {
       this.exceptionToast=true;
     });
   }

  

 
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

   categoryChange(){
    let category_id_string = this.applicantDetailsForm.value.consumerCategoryControl.id_string
    // Zones dropdown api call start
    
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list?category_id='+category_id_string).subscribe(data=>{
      this.consumer_subcategoryList = data;
    },(err) => {
      this.consumer_subcategoryList = '';
    })
    // Zone categories dropdown api call end

   }

   categoryChangeEdit(){
    let category_id_string = this.applicantDetailsFormEdit.value.consumerCategoryControlEdit.id_string
    // Zones dropdown api call start
    
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list?category_id='+category_id_string).subscribe(data=>{
      this.consumer_subcategoryList = data;
    },(err) => {
      this.consumer_subcategoryList = '';
    })
    // Zone categories dropdown api call end
    this.applicantDetailsFormEdit.value.consumerCategoryControlEditHidden = this.applicantDetailsFormEdit.value.consumerCategoryControlEdit.id_string;
  

    

   }


   subCategoryChangeEdit(){
    this.applicantDetailsFormEdit.value.consumerSubCategoryControlEditHidden = this.applicantDetailsFormEdit.value.consumerSubCategoryControlEdit.id_string;
    
   }


  addConsentData;
  editConsentData;

  onAddConsentdata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.consumerConsentControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      consumer_category_id:this.applicantDetailsForm.value.consumerCategoryControl.id_string,
      consumer_subcategory_id:this.applicantDetailsForm.value.consumerSubCategoryControl.id_string,
      is_active:true,
      utility_product_id:1
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.post('consumer/consent',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/consent/list').subscribe(data=>{
            this.consentList = data;
            this.addedSuccessfullyToast=true;
            $('#add_consumer_consent').modal('hide');
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

  onEditConsentdata(){
    this.applicantDetailsFormEditSubmitted = true;
   
    let data={
    name:this.applicantDetailsFormEdit.value.consumerConsentControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    consumer_category_id:this.applicantDetailsFormEdit.value.consumerCategoryControlEdit.id_string,
    consumer_subcategory_id:this.applicantDetailsFormEdit.value.consumerSubCategoryControlEditHidden,
    is_active:true,
    utility_product_id:1
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.put('consumer/consent/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/consent/list').subscribe(data=>{
            this.consentList = data;
            this.editedSuccessfullyToast=true;
            $('#edit_consumer_consent').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;
  
      });
    }
  }

  onAddClick(){
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    })
    // this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list').subscribe(data=>{
    //   this.consumer_subcategoryList = data;
    // })
  }
  

  

  ngOnInit(): void {
  }

}
