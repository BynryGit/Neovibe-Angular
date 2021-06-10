import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-consumers-subcategory',
  templateUrl: './consumers-subcategory.component.html',
  styleUrls: ['./consumers-subcategory.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumersSubcategoryComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    })
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list').subscribe(data=>{
      this.consumer_subcategoryList = data;
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      subCategoryNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      categoryNameControl: [null, [Validators.required]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      subCategoryNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]],
      categoryNameControlEdit: [null, [Validators.required]]
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
  consumer_categoryList:any={};
  consumer_subcategoryList:any={};
  consumer_subcategory_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  consumer_subcategory;
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
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false
   }
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  }

  addConsumerSubCategorydata;
  editConsumerSubCategorydata;

  onAddConsumerSubCategorydata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.subCategoryNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      category_id:this.applicantDetailsForm.value.categoryNameControl.id_string,
      is_active:true

      
    }

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('consumer/subcategory',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list').subscribe(data=>{
            this.consumer_subcategoryList = data;
            console.log('List: ', this.consumer_subcategoryList);
            this.addedSuccessfullyToast=true;
            $('#add_consumer_subcategory').modal('hide');
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }

  onEditConsumerSubCategorydata(){
    this.applicantDetailsFormEditSubmitted = true;
    let data={
    name:this.applicantDetailsFormEdit.value.subCategoryNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    category_id:this.applicantDetailsFormEdit.value.categoryNameControlEdit.id_string,
    is_active:true
    }

    if (this.applicantDetailsFormEdit.invalid) {
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('consumer/subcategory/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('consumer/utility/'+this.utilityIdString+'/subcategory/list').subscribe(data=>{
            this.consumer_subcategoryList = data;
            console.log('List: ', this.consumer_subcategoryList);
            this.editedSuccessfullyToast=true;
            $('#edit_consumer_subcategory').modal('hide');
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
    
  }

  onAddClick(){
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/category/list').subscribe(data=>{
      this.consumer_categoryList = data;
    }) 

  }

  ngOnInit(): void {
  }

}
