import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { FormControl,AbstractControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
declare var $:any;
import { CustomDateParserFormatter} from '../../../../common-services/dateformat-service/dateformat-service.service'
@Component({
  selector: 'app-consumer-service-agreements',
  templateUrl: './consumer-service-agreements.component.html',
  styleUrls: ['./consumer-service-agreements.component.scss'],
  providers:[
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter},ErrorMessage
   ]
})
export class ConsumerServiceAgreementsComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService, private formBuilder: FormBuilder) {
    
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.utility_productList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/service-contract/list').subscribe(data=>{
      this.service_contractList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/service-contract-template/list').subscribe(data=>{
      this.serviceContractTemplateList = data;
    })

    this.apiService.get('utility/'+ this.utility_id_string_admin +'/document/list').subscribe(data=>{
      this.imageDetailList = data.results
      for(let item of this.imageDetailList){
        var str1 = item.document_generated_name
      }
      this.imageUrl = str1
      console.log("URL",this.imageUrl)
    },(err) => {
      this.imageUrl='../../../assets/images/no-image-available.png';
      this.showButton = true;
    });

    this.applicantDetailsForm = this.formBuilder.group({
      agreementNameControl:[null, [Validators.required,this.noWhitespaceValidator, Validators.maxLength(20)]],
      depositAmountControl: [null, [Validators.required,this.noWhitespaceValidator]],
      termsControl: [null, [Validators.required,this.noWhitespaceValidator]],
      service_details: [null, [Validators.required]],
      categoryNameControl: [null, [Validators.required]],
      subCategoryNameControl: [null, [Validators.required]],
      durationControl: [null, [Validators.required]]
    });

    this.applicantDetailsFormEdit = this.formBuilder.group({
      agreementNameControlEdit:[null, [Validators.required,this.noWhitespaceValidator, Validators.maxLength(20)]],
      depositAmountControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      termsControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      service_details_edit: [null, [Validators.required]],
      categoryNameControlEdit: [null, [Validators.required]],
      subCategoryNameControlEdit: [null, [Validators.required]],
      durationControlEdit: [null, [Validators.required]]
    });
    
   }
   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  imageDetailList=[];
  showButton:boolean = false;
  imageUrl;
  buttonUrl
  utility_id_string_admin = this.sessionService.getter("utility_id_string_admin")
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
  consumer_categoryList:any={};
  service_contractList:any={};
  utility_productList:any={};
  serviceDetailsForm: FormGroup;
  serviceDetailsFormEdit: FormGroup;
  serviceContractTemplateList:any={};
  service_contract_view_List:any=null;
  consumer_subcategoryList:any={};
  consumer_subcategory_Obj: any = {};
  consumer_category_Obj: any = {};
  service_Obj :any = {};
  deposit_Obj:any={};
  terms_Obj:any={};
  start_date_Obj:any={};
  end_date_Obj:any={};
  contract_template_Obj:any={};
  consumer_subcategory_Obj_edit: any = {};
  consumer_category_Obj_edit: any = {};
  service_Obj_edit :any = {};
  deposit_Obj_edit:any={};
  contract_template_Obj_edit:any={};
  terms_Obj_edit:any={};
  start_date_Obj_edit:any={};
  end_date_Obj_edit:any={};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  consumer_subcategory;
  searchText;
  today_date = new Date();
  year_start;
  month_start;
  day_start;
  year_end;
  month_end;
  day_end;
  year_start_edit;
  month_start_edit;
  day_start_edit;
  year_end_edit;
  month_end_edit;
  day_end_edit;
  service_details_list = [];
  service_details_list_edit =[];
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd:boolean = false;
  name;
  shortname;
  taxid;
  companyid;
  emailid;
  panno;

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
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormSubmitted = false
     this.applicantDetailsForm.reset();
     this.disableAdd = false;
   }
 
   onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsFormSubmitted = false
     this.applicantDetailsForm.reset();
     this.disableAdd = false;
   }


  categoryChange(){
    let category_id_string = this.applicantDetailsForm.value.categoryNameControl.id_string;
    console.log(category_id_string)
    // Sub Category dropdown api call start
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list?category_id='+category_id_string).subscribe(data=>{
      this.consumer_subcategoryList = data;
    },(err) => {
      this.consumer_subcategoryList = '';
      alert("No Sub Category Available for selected Category")
    });
    // Sub Category dropdown api call end
  }

  categoryEditChange(){
    let category_id_string = this.applicantDetailsFormEdit.value.categoryNameControlEdit.id_string;
    console.log(category_id_string)
    // Sub Category dropdown api call start
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list?category_id='+category_id_string).subscribe(data=>{
      this.consumer_subcategoryList = data;
    },(err) => {
      this.consumer_subcategoryList = '';
      alert("No Sub Category Available for selected Category")
    });
    // Sub Category dropdown api call end
  }

  

  service_agreement_List:any={};
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  get ServiceDetailsEdit() {
    return this.serviceDetailsFormEdit.get('serviceControlEdit') as FormArray;
  }
  
  addServiceDetailsRowEdit(){
    this.ServiceDetailsEdit.push(this.formBuilder.group({service_details_edit:[null]}));
  }

  selectedDuration:any
  colType = [

  {id: 1, name: '1 Year'},
  {id: 2, name: '2 Years'},
  {id: 2, name: '3 Years'},
  {id: 2, name: '4 Years'},
  {id: 2, name: '5 Years'},
  {id: 2, name: '6 Years'},
  ];

  


  select_start(model){  
    console.log("Date Start",model);
    this.year_start = model.year,
    this.month_start = model.month,
    this.day_start = model.day
  }

  select_end(model){  
    console.log("Date End",model);
    this.year_end = model.year,
    this.month_end = model.month,
    this.day_end = model.day
  }

  select_start_edit(model){  
    console.log("Date Start Edit",model);
    this.year_start_edit = model.year,
    this.month_start_edit = model.month,
    this.day_start_edit = model.day
  }

  select_end_edit(model){  
    console.log("Date End Edit",model);
    this.year_end_edit = model.year,
    this.month_end_edit = model.month,
    this.day_end_edit = model.day
  }

  addContractdata;
  editContractdata;

  onAddContractData(){
    this.applicantDetailsFormSubmitted = true;
    
    for(let services of this.applicantDetailsForm.value.service_details){
      this.service_details_list.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    let data ={
      name:this.applicantDetailsForm.value.agreementNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      service_obj:this.service_details_list,
      consumer_category_id:this.applicantDetailsForm.value.categoryNameControl.id_string,
      consumer_sub_category_id:this.applicantDetailsForm.value.subCategoryNameControl.id_string,
      // start_date:this.year_start+"-"+this.month_start+"-"+this.day_start+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      // end_date:this.year_end+"-"+this.month_end+"-"+this.day_end+ ' ' + this.today_date.getHours() + ':' + this.today_date.getMinutes() + ':' + this.today_date.getSeconds(),
      // service_contract_template_id:this.contract_template_Obj.bindvalue.id_string,
      deposite_amount:this.applicantDetailsForm.value.depositAmountControl,
      terms:this.applicantDetailsForm.value.termsControl,
      duration:this.applicantDetailsForm.value.durationControl.id,
      is_active:true

      
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/service-contract',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/service-contract/list').subscribe(data=>{
            this.service_contractList = data;
            console.log('List: ', this.service_contractList);
            this.addedSuccessfullyToast=true;
            $('#add_service_agreements').modal('hide');
            this.service_details_list = [];
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

  onEditContractData(){
    this.applicantDetailsFormEditSubmitted = true;
    for(let services of this.applicantDetailsFormEdit.value.service_details_edit){
      this.service_details_list_edit.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    let data ={
      name:this.applicantDetailsFormEdit.value.agreementNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      service_obj:this.service_details_list_edit,
      consumer_category_id:this.applicantDetailsFormEdit.value.categoryNameControlEdit.id_string,
      consumer_sub_category_id:this.applicantDetailsFormEdit.value.subCategoryNameControlEdit.id_string,
      // service_contract_template_id:this.contract_template_Obj_edit.bindvalue.id_string,
      deposite_amount:this.applicantDetailsFormEdit.value.depositAmountControlEdit,
      terms:this.applicantDetailsFormEdit.value.termsControlEdit,
      duration:this.applicantDetailsFormEdit.value.durationControlEdit.id,
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('utility/service-contract/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/service-contract/list').subscribe(data=>{
            this.service_contractList = data;
            console.log('List: ', this.service_contractList);
            this.editedSuccessfullyToast=true;
            $('#edit_service_aggrements').modal('hide');
            this.service_details_list_edit = [];
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

  id_string;
  onEditClickEvent(item:any){
    this.id_string = item.id_string;
    console.log("Edit",this.id_string);
  }
  onViewClickEvent(item:any){
    this.id_string = item.id_string;
    this.apiService.get('utility/service-contract/'+this.id_string).subscribe(data=>{
      this.service_contract_view_List = data;
      console.log('View List result:',data);
    })

    if(this.utilityIdString){
      this.apiService.get('utility/'+this.utilityIdString).subscribe(data=>{
        this.name = data.result.name
        this.shortname = data.result.short_name
        this.companyid = data.result.company_id
        this.taxid = data.result.tax_id
        this.emailid = data.result.email_id,
        this.panno = data.result.pan_no

        console.log('View Utility List result:',this.name);
      })  

    }

  }
  
  ngOnInit(): void {
    
  }

}
