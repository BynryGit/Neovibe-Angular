import { Component, OnInit ,ElementRef,ViewChild} from '@angular/core';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { StepperFormService } from '../../common/stepper-form/stepper-form.service';
import { FormControl,AbstractControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { UtilityService } from '../utility.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { Router } from '@angular/router';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { ErrorMessage } from '../../error-messages/error-messages';
import { CommonService } from 'src/app/common/common.service';



declare var $: any;
@Component({
  selector: 'app-utility-add',
  templateUrl: './utility-add.component.html',
  styleUrls: ['./utility-add.component.scss'],
  providers: [ErrorMessage]
})
export class UtilityAddComponent implements OnInit {
  @ViewChild('inputFile') myInputVariable: ElementRef;

  @ViewChild('inputFile1') myInputVariable1: ElementRef;

  firstName = ''; 
  middleName = ''; 
  lastName = ''; 
  mobileNo = ''; 
  email = ''; 
  name = ''; 

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  

  // toaster
  showtoast = false; 
  autohide = true;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  textValue = 'Thomas Shelby';

  model: NgbDateStruct;
  date: {day: number, year: number, month: string}; 

  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faPlus = faPlus;

  public applicantDetailsCollapse = false;
  public applicantPayCollapse = true;
  public applicantAddrsCollapse = true;
  public applicantKycCollapse = true;

  selectedUtility: any;
  selectedDocument: any;
  selectedConsumerCategory: any;
  selectedConsumerSubCategory: any;
  selectedVip: string[];
  selectedPipeline: string[];
  selectedPaymentType: any;
  selectedPaymentType2: any;
  selectedPaymentType3: any;
  Selectedregion:any;
  Selectedcountry:any;
  Selectedstate:any;
  Selectedcity:any;
  selectedScheme: any;
  selectedScheme2: any;
  selectedPaymentMode: any;
  selectedPaymentMode2: any;
  selectedStateProvince: any;
  selectedZipCode: any;
  selectedArea: any;
  selectedSubArea: any;
  selectedBillingAddress: any;
  selectedBillingCity: any;
  selectedBillingZipCode: any;
  selectedBillingArea: any;
  selectedBillingSubArea: any;
  selectedDocumentType = 'Personal details';
  selectedKycDocuments = 'Pancard';
  searchText;
  addedSuccessfullyToast=false;
  exceptionToast = false;
  utility_view_List:any={};
  currencyList:any=[];
  utility_name;
  utility_short_name;
  utility_id_string_admin;
  
  
  changeFn(val){
    console.log(val);
  }
  files: File[] = [];
  onSelect(event) {
		console.log(event);
    this.files.push(...event.addedFiles);
    console.log(this.files)
	}
	onRemove(event) {
		console.log(event);
		this.files.splice(this.files.indexOf(event), 1);
  }
  
  // toaster

  



  close() {
    this.autohide = false;
    // setTimeout(() => this.autohide = true, 5000);
  }
  addCustomUser = (term) => ({id: term, name: term});

  

  
  moduleDetailsForm: FormGroup;
  moduleDetailsFormSubmitted = false;
  productDetailsForm: FormGroup;
  productDetailsFormSubmitted = false;
  consumerDetailsForm: FormGroup;
  consumerDetailsFormSubmitted = false;
  utilityDetailsForm: FormGroup;
  applicantDetailsForm: FormGroup
  utilityDetailsFormSubmitted = false;
  applicantDetailsFormSubmitted = false;
  loginUser;
  

  

  constructor(private stepperFormService:StepperFormService,private formBuilder: FormBuilder,
    private utilityService:UtilityService,private sessionService:SessionService, private router:Router,private filterService : FilterService,private apiService:ApiService,private utilityservice:UtilityService,private commonService:CommonService) { 
 

    // Utility details form code start
    this.utilityDetailsForm = this.formBuilder.group({
      utilityName: ['', [Validators.required]],
      
      // utilityShortName: [null,[Validators.required]],
      // utilityCompanyID: [null, [Validators.required]],
      // utilityEmailID: [null, [Validators.required]],
      // utilityPhoneNo: [null, [Validators.required]],
      // utilityAddress: [null, [Validators.required]],
      // utilityPanNo: [null, [Validators.required]],
      // utilityTaxID: [null, [Validators.required]],

    });

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
          utilityNameControl: ['', [Validators.required, Validators.maxLength(50),Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator]],
          utilityShortName: ['', [Validators.required, Validators.maxLength(25),Validators.pattern("[a-zA-Z ]*$"),this.noWhitespaceValidator]],
          utilityEmailID: ['', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),this.noWhitespaceValidator]],
          utilityPhoneNo: ['', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]],
          utilityAddress: ['', [Validators.required,this.noWhitespaceValidator]],
          utilityPanNo: ['', [Validators.required, Validators.pattern('[A-Z]{5}[0-9]{4}[A-Z]{1}'),this.noWhitespaceValidator]],
          utilityTaxID: ['', [Validators.required,this.noWhitespaceValidator]],
          currencyNameControl:['',[Validators.required]]
          
    });

    

    this.apiService.get('currency/list').subscribe(data=>{
      this.currencyList = data;
    })

    this.apiService.get('document/list').subscribe(data=>{
      this.globalDocumentList = data.results;
      for(let item of this.globalDocumentList){
        var str1 = item.document_generated_name
      }
      this.imgURL = str1
      console.log("DOCUMENT",this.imgURL)
    })
    // Applicant details form code end

    // this.sessionService.setter("utility_id_string",this.id_string);
    // console.log("SSSEEESSION",this.id_string)
    this.loginUser = this.sessionService.getter("loginUser")
    if((this.loginUser) == 'Utility'){
      this.apiService.get('user/tenant/'+this.sessionService.getter("tenant_id_string")+'/utility/list?user_id='+this.sessionService.getter("id_string")).subscribe(data=>{
        this.dataSet = data.results
      })
    }
    else{
      this.utilityservice.getUtilityListByTenant().subscribe(utilitydata=>{
        this.dataSet = utilitydata.results
      })
    }
     
    

    

   


    // Module details form code start
    this.moduleDetailsForm = this.formBuilder.group({
        moduleDivControl: this.formBuilder.array(
        [this.formBuilder.group({utility_module:[null], utility_submodule:[null]})]
        )
    });
    // Module details form code end

      // Product details form code start
      this.productDetailsForm = this.formBuilder.group({
        productDivControl: this.formBuilder.array(
          [this.formBuilder.group({productControl:[null]})]
          )
       })

       this.filterService.getSearchText().subscribe(data=>{
        console.log("UTILINMMM",data.text);
        this.searchText = data.text;
      })
  }

  onUtilityCardClick(data:any){
  let id_string = data.id_string;
  if((this.loginUser) == 'Utility'){
    this.apiService.get('user/utility/'+id_string+'/detail-list').subscribe(item=>{
      this.sessionService.setter("utility_id_string_admin",item.results.utility.id_string)
      this.router.navigate(['utility/configuration'])
      
    },
    (err)=>{
      console.log('err: ', err);
    })
  }
  else{
    this.sessionService.setter("utility_id_string_admin",id_string)
    this.router.navigate(['utility/configuration'])
  }
}
  
  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  // Uitility details form control start
  get ud() { return this.utilityDetailsForm.controls; }
  // Uitility details form control end

  // module details form control start
  get md() { return this.moduleDetailsForm.controls; }
  // module details form control end

  // product details form control start
  get pd() { return this.productDetailsForm.controls; }
  // product details form control end

  // product details form control start
  get cd() { return this.consumerDetailsForm.controls; }
  // product details form control end

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  get Utility() {
    return this.utilityDetailsForm.get('utilityDetailsControl') as FormArray;
}
useridString:any=this.sessionService.getter("id_string");
module_id_string:any = this.sessionService.getter("module_id_string")
sub_module_id_string:any = this.sessionService.getter("sub_module_id_string")
utility_id_string_for_file:any = this.sessionService.getter("utility_id_string_admin")
fileObj: File;
fileUrl: string;
errorMsg: boolean;
fileExists:boolean=false;




 

  onFilePicked(event): void {

    this.errorMsg = false
    console.log(event);
    const FILE = (event.target as HTMLInputElement).files[0];
    this.fileObj = FILE;
    const fdata = event.target.files;
    for (let i = 0; i < fdata.length; i++) 
    {
      for (var pair of this.files.values()) 
      {
       if(pair.name == fdata[i].name)
       {
         this.fileExists = true;
         alert("File Already Exists")
       }
    }
    }
  }
  // onFileUpload() {
  //   if (!this.fileObj) {
  //     this.errorMsg = true
  //     return
  //   }
  //   const fileForm = new FormData();
  //   fileForm.append('file', this.fileObj);
  //   fileForm.append('user_id_string', this.useridString);
  //   fileForm.append('utility_id_string', this.utility_id_string);
  //   fileForm.append('module_id_string', this.module_id_string);
  //   fileForm.append('sub_module_id_string', this.sub_module_id_string);
  //   console.log('fileForm: *******', fileForm);
  //   this.commonService.fileUpload(fileForm).subscribe(res => {
  //     this.fileUrl = res['image'];
  //   });
  // }

  



  tenantName;
  utilityName;
  shortName;  
  imgURL;
  moduleList1:any=[];
  countriesList;
  globalDocumentList:any=[];
  regionsList;
  stateList;
  citiesList;
  submodulesList;
  productsList;
  categoryList;
  tenantList;
  count=1001;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  
  
  
  ngOnInit(): void {
    

    this.filterService.getButtonEvent().subscribe(data=>{
      if(data.event.type == 'click'){
        console.log("Add Clicked");
        $('#add_utility').modal('show');
        
      }
    })
  }

  // According to tenant idstring featch module list from tenantmodule
  tenant_id_string;
  moduleList=[];
  submoduleList;
  submoduleList1;
    // getTenantIdString(){            
    //   this.tenant_id_string = this.uitilityDetailsForm.value.tenentNameControl.id_string
    //   this.utilityService.getModuleListData(this.tenant_id_string).subscribe(modules=>{
    //     this.moduleList=[]
    //     for(let module of modules.results){
    //       this.moduleList.push({"id_string":module.id_string,"module_id":module.module_id.id_string,"name":module.module_id.name})
    //       }
    //   })
    // }

    // According to module idstring fetch submodule list from tenantsubmodule
    module;
    getModuleId(id){
      this.module = this.Transactions.at(id).get('utility_module').value.id_string
      this.utilityService.getSubModuleListData(this.module).subscribe(submodules=>{
        if(submodules.results != ''){
            this.submoduleList1=[];
          for(let submodule of submodules.results){
            this.submoduleList1.push({"submodule_id":submodule.sub_module_id.id_string,"name":submodule.sub_module_id.name})
          }
          this.submoduleList = this.submoduleList1
        }else{
        this.submoduleList = []
        }
      })
    }


  

  

       
    get Transactions() {
      return this.moduleDetailsForm.get('moduleDivControl') as FormArray;
    }  
    addModulesRow(){
      this.Transactions.push(this.formBuilder.group({utility_module:[null], utility_submodule:[null]}));
    }    
    removeTransactionRow(index){
      if (index != 0){
        this.Transactions.removeAt(index); 
      }else{
        return false
      }
    }

    get Product() {
      return this.productDetailsForm.get('productDivControl') as FormArray;
    }  
    addProductRow(){
      this.Product.push(this.formBuilder.group({productControl:[null]}));
    }
    removeProductRow(index){
      if (index != 0){
        this.Product.removeAt(index); 
      }else{
        return false
      }
    }
  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormSubmitted = false;
    this.errorMsg = false;
    this.myInputVariable.nativeElement.value = '';
    this.myInputVariable1.nativeElement.value = '';
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormSubmitted = false;
    this.errorMsg = false;
    this.myInputVariable.nativeElement.value = '';
    this.myInputVariable1.nativeElement.value = '';
  }
  
  utility_Obj: any = {};
  addObjectiveData;
  utilityList:any=[];
  dataSet;
  file_success : boolean = false;
  documentList:any=[];
  
  onAddUtilityObjdata(){
    this.applicantDetailsFormSubmitted = true;

    if (!this.fileObj) {
      this.errorMsg = true
      return
    }
    
    

    

    let data ={
      tenant:this.sessionService.getter("tenant_id_string"),
      short_name:this.applicantDetailsForm.value.utilityShortName,
      name:this.applicantDetailsForm.value.utilityNameControl,
      currency_id:this.applicantDetailsForm.value.currencyNameControl.id_string,
      // company_id:this.count-1,
      pan_no:this.applicantDetailsForm.value.utilityPanNo,
      tax_id:this.applicantDetailsForm.value.utilityTaxID,
      phone_no:this.applicantDetailsForm.value.utilityPhoneNo,
      email_id:this.applicantDetailsForm.value.utilityEmailID,
      address:this.applicantDetailsForm.value.utilityAddress,
      user_id:this.sessionService.getter("id_string")
      // long_logo:this.files[0].name
    }

    

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
      
    }else{
      this.apiService.post('utility/',data).subscribe(result=>{
        // const fileForm = new FormData();
        //     fileForm.append('file', this.fileObj);
        //     fileForm.append('file_name',this.fileObj.name)
        //     fileForm.append('user_id_string', this.useridString);
        //     fileForm.append('utility_id_string', this.utility_id_string_for_file);
        //     fileForm.append('module_id_string', this.module_id_string);
        //     fileForm.append('sub_module_id_string', this.sub_module_id_string);
        //     this.commonService.fileUpload(fileForm).subscribe(res => {
        //       this.fileUrl = res['image'];
        //       console.log("RESSSSSS",res)
        //       if(res['state']=='success'){
        //         this.file_success = true
        //       }

        //     },(err) => {
        //       alert("File Already Exists")
        // });
        if(result.state == 'success'){
          this.utilityservice.getUtilityListByTenant().subscribe(utilitydata=>{
            this.dataSet = utilitydata.results
            console.log('List: ', utilitydata);
            this.addedSuccessfullyToast=true;
            $('#add_utility').modal('hide');
            this.applicantDetailsForm.reset();
            this.myInputVariable.nativeElement.value = '';
            this.myInputVariable1.nativeElement.value = '';
            this.applicantDetailsFormSubmitted = false;

          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }
}