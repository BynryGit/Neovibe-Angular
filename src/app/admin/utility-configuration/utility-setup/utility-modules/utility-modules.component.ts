import { Component, OnInit,Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {UtilityConfigurationComponent} from 'src/app/admin/utility-configuration/utility-configuration.component';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { event } from 'jquery';
import { UtilityService } from '../../../../utility/utility.service';
declare var $:any;

@Component({
  selector: 'app-utility-modules',
  templateUrl: './utility-modules.component.html',
  styleUrls: ['./utility-modules.component.scss']
})
export class UtilityModulesComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder,private utilityService:UtilityService) { 
    // Module details form code start
    this.moduleDetailsForm = this.formBuilder.group({
      moduleDivControl: this.formBuilder.array(
      [this.formBuilder.group({utility_module:[null,Validators.required], utility_submodule:[null,Validators.required]})]
      )
  });
  // Module details form code end

  this.utilityService.getProductListData().subscribe(products=>{
    this.productsList = products.results
    console.log(this.productsList)
  })
  this.utilityService.getTenantListData().subscribe(tenants=>{
    this.tenantList = tenants.results
  })
  this.apiService.get('utility/'+this.utilityIdString+'/module/list').subscribe(data=>{
    this.utility_moduleList = data;
  })
  }

  // module details form control start
  get md() { return this.moduleDetailsForm.controls; }
  // module details form control end

  get Transactions() {
    return this.moduleDetailsForm.get('moduleDivControl') as FormArray;
  }  
  addModulesRow(){
    this.Transactions.push(this.formBuilder.group({utility_module:[null,Validators.required], utility_submodule:[null,Validators.required]}));
  }    
  removeTransactionRow(index){
    if (index != 0){
      this.Transactions.removeAt(index); 
    }else{
      return false
    }
  }

  onCancelClick(){
    this.moduleDetailsFormSubmitted = false
    this.moduleDetailsForm.reset();
  }

  // According to tenant idstring featch module list from tenantmodule
  tenant_id_string;
  moduleList=[];
  submoduleList;
  uniquesubmoduleList;
  finaluniquesubmoduleList;
  submoduleList1;
  submoduleList2;
    getTenantIdString(){            
      this.tenant_id_string = this.sessionService.getter("tenant_id_string")
      console.log(this.tenant_id_string)
      this.utilityService.getModuleListData(this.tenant_id_string).subscribe(modules=>{
        this.moduleList=[]
        for(let module of modules.results){
          this.moduleList.push({"id_string":module.id_string,"module_id":module.module_id.id_string,"name":module.module_id.name})

          
          }
          console.log("MODULE LIST",this.moduleList1)
      })
    }
  
  // According to module idstring featch submodule list from tenantsubmodule
  module;
  getModuleId(id){
    this.module = this.Transactions.at(id).get('utility_module').value.module_id
    this.utilityService.getSubModuleListData(this.module).subscribe(submodules=>{
      console.log("SUBMODULE DATA",submodules)
      if(submodules.results != ''){
          this.submoduleList1=[];
          this.uniquesubmoduleList=[];
        for(let submodule of submodules.results){
          this.submoduleList1.push({"submodule_id":submodule.sub_module_id.id_string,"name":submodule.sub_module_id.name})
          this.uniquesubmoduleList.push(submodule.sub_module_id.name)
        }
        this.submoduleList = this.submoduleList1
      }else{
      this.submoduleList = []
      }
    })
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
  regionList:any;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  countryObj: any = {};
  bindvalue:string;
  countryList:any=[];
  searchText;
  moduleDetailsForm: FormGroup;
  moduleDetailsFormSubmitted = false;
  moduleList1:any=[];
  utility_moduleList:any=[];
  submodulesList;
  productsList;
  categoryList;
  tenantList;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

  loginUser;
  disableAddModule(){
    this.loginUser = this.sessionService.getter("loginUser")
    if((this.loginUser) == 'Utility'){
      console.log("TRUE")
      return true;
      
    }
    else{
      return false;
    }
  }
  


 
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onUtilitySubmit(){    
    this.moduleDetailsFormSubmitted = true;

    let data = {
      name:this.sessionService.getter("utility_name"),
      tenant :this.sessionService.getter("tenant_id_string"),
      utility :this.sessionService.getter("utility_id_string_admin"),
      utility_module_submodule : this.moduleDetailsForm.value.moduleDivControl,
    }

    if (this.moduleDetailsForm.invalid) {
      console.log(this.md)
      return;
    }else{
      this.utilityService.addUtility(data).subscribe(result=>{
        if(result.state === 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/module/list').subscribe(data=>{
            this.utility_moduleList = data;
            this.moduleDetailsFormSubmitted = false;
            this.addedSuccessfullyToast=true;
            this.moduleDetailsForm.reset();
            $('#add_utility_modules').modal('hide');
  
          })
        }
        console.log(result.state)
      },(err) => {
        this.exceptionToast=true;
      });
    }


    
  }

  

  ngOnInit(): void {
   console.log(this.sessionService.getter("utility_name")) 
  }

}
