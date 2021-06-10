import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-consumers-category',
  templateUrl: './consumers-category.component.html',
  styleUrls: ['./consumers-category.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumersCategoryComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    })

    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      utilityProductControl: [null, [Validators.required]],
      categoryNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      utilityProductControlEdit: [null, [Validators.required]],
      categoryNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
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
  consumer_category_Obj: any = {};
  consumer_category_Obj_edit:any={};
  service_type_Obj:any={};
  service_type_Obj_edit:any={};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  consumer_category;
  consumer_categoryList:any={};
  service_List:any={};
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
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
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  addConsumerCategoryData;
  editConsumerCategoryData;
  searchText;

  onAddConsumerCategorydata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.categoryNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      utility_product_id:this.applicantDetailsForm.value.utilityProductControl.id_string,
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('consumer/category',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
            this.consumer_categoryList = data;
            console.log('List: ', this.consumer_categoryList);
            this.addedSuccessfullyToast=true;
            $('#add_consumer_category').modal('hide');
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

  onEditConsumerCategorydata(){
    this.applicantDetailsFormEditSubmitted = true;
    let data={
    name:this.applicantDetailsFormEdit.value.categoryNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    utility_product_id:this.applicantDetailsFormEdit.value.utilityProductControlEdit.id_string,
    is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.invalid) {
      console.log(this.ad)
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('consumer/category/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
            this.consumer_categoryList = data;
            console.log('List: ', this.consumer_categoryList);
            this.editedSuccessfullyToast=true;
            $('#edit_consumer_category').modal('hide');
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
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    
  }

  ngOnInit(): void {
  }

}
