import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray,AbstractControl} from '@angular/forms';
import { ErrorMessage } from 'src/app/error-messages/error-messages';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { CustomDateParserFormatter} from '../../../../common-services/dateformat-service/dateformat-service.service'

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.scss'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},ErrorMessage
   ]
})
export class OfferDetailsComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_type/list').subscribe(data => {
      this.offer_typeList = data;
    })
    
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data => {
      this.offer_subtypeList = data;
    })

    this.apiService.get('consumer/'+this.utilityIdString+'/offer/list').subscribe(data => {
      this.offer_List = data;
    })

    // this.apiService.get('utility/'+this.utilityIdString+'/sub_module/list').subscribe(data => {
    //   this.submodule_list = data;
    // })

    this.apiService.get('utility/'+this.utilityIdString+'/module/list').subscribe(data => {
      this.module_list = data;
      console.log("DATA",data)
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.productList = data;
    })

     // Applicant details form code start
     this.applicantDetailsForm = this.formBuilder.group({
      moduleNameControl: [null, [Validators.required]],
      subModuleNameControl: [null, [Validators.required]],
      typeNameControl:[null, [Validators.required]],
      subTypeNameControl:[null, [Validators.required]],
      offerNameControl:[null, [Validators.required,this.noWhitespaceValidator]],
      productNameControl:[null, [Validators.required]],
      maxAmountNameControl:[null, [Validators.required]],
      percentNameControl:[null, [Validators.required]],
      codeNameControl:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      effectiveDateControl:[null, [Validators.required]],
      expiryDateControl:[null, [Validators.required]],
      descriptionControl:[null, [Validators.required,this.noWhitespaceValidator]],
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      moduleNameControlEdit: [null, [Validators.required]],
      subModuleNameControlEdit: [null, [Validators.required]],
      typeNameControlEdit:[null, [Validators.required]],
      subTypeNameControlEdit:[null, [Validators.required]],
      offerNameControlEdit:[null, [Validators.required,this.noWhitespaceValidator]],
      productNameControlEdit:[null, [Validators.required]],
      maxAmountNameControlEdit:[null, [Validators.required]],
      percentNameControlEdit:[null, [Validators.required]],
      codeNameControlEdit:[null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
      effectiveDateControlEdit:[null, [Validators.required]],
      expiryDateControlEdit:[null, [Validators.required]],
      descriptionControlEdit:[null, [Validators.required,this.noWhitespaceValidator]],
    });

    // service Details form code start
    this.serviceDetailsForm = this.formBuilder.group({
      serviceControl: this.formBuilder.array(
        [this.formBuilder.group({service_details:[null]})]
        ),
    });
    // service Details form code end

    // service Details edit form code start
    this.serviceDetailsFormEdit = this.formBuilder.group({
      serviceControlEdit: this.formBuilder.array(
        [this.formBuilder.group({service_details_edit:[null]})]
        ),
    });
    // service Details edit form code end
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
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
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
  serviceDetailsForm: FormGroup;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  today_date = new Date();
  effective_year;
  effective_month;
  effective_day;
  expiry_day;
  expiry_year;
  expiry_month;
  effective_year_edit;
  effective_month_edit;
  effective_day_edit;
  expiry_day_edit;
  expiry_year_edit;
  expiry_month_edit;
  offer_typeList:any=[];
  productList:any=[];
  offer_List:any=[];
  offer_subtypeList:any=[];
  module_list:any=[];
  submodule_list:any=[];
  offer_subtype_filterList:any=[];
  offerObj:any={};
  offerObj_edit:any={};
  offer_subTypeObj:any={};
  offer_subTypeObj_edit:any={};
  moduleObj:any={};
  submoduleObj:any={};
  moduleObj_edit:any={};
  submoduleObj_edit:any={};
  service_details_list = [];
  service_details_list_edit = [];
  serviceDetailsFormEdit: FormGroup;
  editOfferdata;
  select_effective_date(model){  
    console.log("Date Effective",model);
    this.effective_year = model.year,
    this.effective_month = model.month,
    this.effective_day = model.day
  }

  select_expiry_date(model){  
    console.log("Date Expiry",model);
    this.expiry_year = model.year,
    this.expiry_month = model.month,
    this.expiry_day = model.day
  }

  select_effective_date_edit(model){  
    console.log("Date Effective",model);
    this.effective_year_edit = model.year,
    this.effective_month_edit = model.month,
    this.effective_day_edit = model.day
  }

  select_expiry_date_edit(model){  
    console.log("Date Expiry",model);
    this.expiry_year_edit = model.year,
    this.expiry_month_edit = model.month,
    this.expiry_day_edit = model.day
  }
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    
  }

  get ServiceDetails() {
    return this.serviceDetailsForm.get('serviceControl') as FormArray;
  }
  
  addServiceDetailsRow(){
    this.ServiceDetails.push(this.formBuilder.group({service_details:[null]}));
  }

  get ServiceDetailsEdit() {
    return this.serviceDetailsFormEdit.get('serviceControlEdit') as FormArray;
  }
  
  addServiceDetailsRowEdit(){
    this.ServiceDetailsEdit.push(this.formBuilder.group({service_details_edit:[null]}));
  }

  typeChange(){
    let offer_type_id_string = this.applicantDetailsForm.value.typeNameControl.id_string;
    console.log(offer_type_id_string)
    // offer subtype dropdown call start
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list?offer_type_id='+offer_type_id_string).subscribe(data=>{
      this.offer_subtype_filterList = data;
      
    })
    // offer subtype dropdown call end
  }

  typeEditChange(){
    let offer_type_edit_id_string = this.applicantDetailsFormEdit.value.typeNameControlEdit.id_string;
    console.log(offer_type_edit_id_string)
    // offer subtype dropdown call start
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list?offer_type_id='+offer_type_edit_id_string).subscribe(data=>{
      this.offer_subtype_filterList = data;
      
    })
    // offer subtype dropdown call end
  }

  moduleChange(){
    let module_id_string = this.applicantDetailsForm.value.moduleNameControl.id_string;
    console.log(module_id_string)
    // Submodule dropdown api call start
    this.apiService.get('utility/'+this.utilityIdString+'/module/'+module_id_string+'/submodule/list').subscribe(data=>{
      this.submodule_list = data;
    })
    // Submodule dropdown api call end
  }

  moduleEditChange(){
    let module_id_string = this.applicantDetailsFormEdit.value.moduleNameControlEdit.id_string;
    console.log(module_id_string)
    // Submodule dropdown api call start
    this.apiService.get('utility/module/'+module_id_string+'/submodule/list').subscribe(data=>{
      this.submodule_list = data;
    })
    // Submodule dropdown api call end
  }
  
  addOfferdata;
  onAddOfferData(){
    this.applicantDetailsFormSubmitted = true;
    for(let services of this.applicantDetailsForm.value.productNameControl){
      this.service_details_list.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    console.log(this.service_details_list)
    let data ={
      offer_name:this.applicantDetailsForm.value.offerNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      module_id:this.applicantDetailsForm.value.moduleNameControl.id_string,
      submodule_id:this.applicantDetailsForm.value.subModuleNameControl.id_string,
      offer_type_id:this.applicantDetailsForm.value.typeNameControl.id_string,
      offer_sub_type_id:this.applicantDetailsForm.value.subTypeNameControl.id_string,
      service_obj:this.service_details_list,
      effective_date:this.effective_year+"-"+this.effective_month+"-"+this.effective_day+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      expiry_date:this.expiry_year+"-"+this.expiry_month+"-"+this.expiry_day+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      offer_code:this.applicantDetailsForm.value.codeNameControl,
      offer_max_amount:this.applicantDetailsForm.value.maxAmountNameControl,
      offer_percentage:this.applicantDetailsForm.value.percentNameControl,
      description:this.applicantDetailsForm.value.descriptionControl,
      is_active:true

      
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('consumer/offer',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/'+this.utilityIdString+'/offer/list').subscribe(data=>{
            this.offer_List = data;
            console.log('List: ', this.offer_List);
            this.addedSuccessfullyToast=true;
            $('#add_consumer_offers').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }

   

  }

  onEditOfferData(){
    this.applicantDetailsFormEditSubmitted = true;
    for(let services of this.applicantDetailsFormEdit.value.productNameControlEdit){
      this.service_details_list_edit.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    let data ={
      offer_name:this.applicantDetailsFormEdit.value.offerNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      module_id:this.applicantDetailsFormEdit.value.moduleNameControlEdit.id_string,
      submodule_id:this.applicantDetailsFormEdit.value.subModuleNameControlEdit.id_string,
      offer_type_id:this.applicantDetailsFormEdit.value.typeNameControlEdit.id_string,
      offer_sub_type_id:this.applicantDetailsFormEdit.value.subTypeNameControlEdit.id_string,
      service_obj:this.service_details_list_edit,
      effective_date:this.effective_year_edit+"-"+this.effective_month_edit+"-"+this.effective_day_edit+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      expiry_date:this.expiry_year_edit+"-"+this.expiry_month_edit+"-"+this.expiry_day_edit+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      offer_code:this.applicantDetailsFormEdit.value.codeNameControlEdit,
      offer_max_amount:this.applicantDetailsFormEdit.value.maxAmountNameControlEdit,
      offer_percentage:this.applicantDetailsFormEdit.value.percentNameControlEdit,
      description:this.applicantDetailsFormEdit.value.descriptionControlEdit,
      is_active:true
    }

    if (this.applicantDetailsFormEdit.invalid) {
      console.log(this.ade)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('consumer/offer/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/'+this.utilityIdString+'/offer/list').subscribe(data=>{
            this.offer_List = data;
            console.log('List: ', this.offer_List);
            this.editedSuccessfullyToast=true;
            $('#edit_consumer_offers').modal('hide');
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
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_type/list').subscribe(data => {
      this.offer_typeList = data;
    })
    
    this.apiService.get('consumer/'+this.utilityIdString+'/offer_subtype/list').subscribe(data => {
      this.offer_subtypeList = data;
    })

  }

  ngOnInit(): void {
  }

}
