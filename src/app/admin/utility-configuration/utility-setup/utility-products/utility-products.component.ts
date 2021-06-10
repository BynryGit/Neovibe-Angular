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
import { ErrorMessage } from '../../../../error-messages/error-messages';
declare var $:any;


@Component({
  selector: 'app-utility-products',
  templateUrl: './utility-products.component.html',
  styleUrls: ['./utility-products.component.scss'],
  providers:[ErrorMessage]
})
export class UtilityProductsComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder,private utilityService:UtilityService) {
     // Product details form code start
     this.productDetailsForm = this.formBuilder.group({
      productControl: [null, [Validators.required]],
     })

     this.utilityService.getProductListData().subscribe(products=>{
      this.productsList = products.results
    })
    this.utilityService.getTenantListData().subscribe(tenants=>{
      this.tenantList = tenants.results
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.utility_productList = data;
    })

     
   }

    // product details form control start
  get pd() { return this.productDetailsForm.controls; }
  // product details form control end
   
  // get Product() {
  //   return this.productDetailsForm.get('productDivControl') as FormArray;
  // }  
  // addProductRow(){
  //   this.Product.push(this.formBuilder.group({productControl:[null]}));
  // }
  // removeProductRow(index){
  //   if (index != 0){
  //     this.Product.removeAt(index); 
  //   }else{
  //     return false
  //   }
  // }


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
  productDetailsForm: FormGroup;
  productDetailsFormSubmitted = false;
  moduleList1:any=[];
  submodulesList;
  productsList;
  utility_productList:any=[];
  categoryList;
  tenantList;
  disableAdd:boolean = false;



  // productDetailsForm: FormGroup;
  // productDetailsFormSubmitted = false;
  productDetailsFormEdit: FormGroup;
  productDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

   // Object for error messages start
   message = new ErrorMessage() 
   // Object for error messages start
 
   // Applicant details form control start
   get ad() { return this.productDetailsForm.controls; }
   // Applicant details form control end
 
   // Applicant details form control start
   get ade() { return this.productDetailsFormEdit.controls; }
   // Applicant details form control end

   loginUser;
  disableAddProduct(){
    this.loginUser = this.sessionService.getter("loginUser")
    if((this.loginUser) == 'Utility'){
      console.log("TRUE")
      return true;
      
    }
    else{
      return false;
    }
  }
 
   onCancelClick(){
     this.productDetailsForm.reset();
     
     
     this.productDetailsFormSubmitted = false;
     this.disableAdd = false;
   }
 
   onCloseClick(){
     this.productDetailsForm.reset();
     
     
     this.productDetailsFormSubmitted = false;;
     this.disableAdd = false;
   }
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  

  onAddProductData(){
    this.productDetailsFormSubmitted = true;
    let data = {
      name:this.productDetailsForm.value.productControl.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      product_id:this.productDetailsForm.value.productControl.id_string
  }
  this.disableAdd = true;

  if (this.productDetailsForm.invalid) {
    console.log(this.ad)
    this.disableAdd = false;
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/product',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
          this.utility_productList = data;
          console.log('List: ', this.utility_productList);
          this.addedSuccessfullyToast=true;
          $('#add_utility_products').modal('hide');
          this.disableAdd = false;
          this.productDetailsForm.reset();
          this.productDetailsFormSubmitted = false;
        })
      }
    },(err) => {
      this.disableAdd = false;
      this.exceptionToast=true;
    });
  }

}

  ngOnInit(): void {
  }

}
