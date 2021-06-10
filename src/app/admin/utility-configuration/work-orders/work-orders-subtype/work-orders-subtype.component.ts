import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
declare var $ : any;
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-work-orders-subtype',
  templateUrl: './work-orders-subtype.component.html',
  styleUrls: ['./work-orders-subtype.component.scss'],
  providers: [ErrorMessage]
})
export class WorkOrdersSubtypeComponent implements OnInit {

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

 
  

  

  constructor(private formBuilder: FormBuilder,private apiService : ApiService,private sessionService : SessionService) {
     // Applicant details form code start
     this.applicantDetailsForm = this.formBuilder.group({
      workOrderTypeControl: [null, [Validators.required]],
      workOrderSubTypeControl: [null, [Validators.required]]
    });

    this.apiService.get('work-order-sub-type/list').subscribe(data => {
      this.work_order_subtypeList = data;
    }) 

    this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list').subscribe(data => {
      this.utility_work_order_subtypeList = data;
    }) 

    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data => {
      this.utility_work_order_typeList = data;
    }) 

    
   }
  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  onCancelClick(){
    this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
  }




  addServiceTypeData;
  editServiceTypeData;
  // ServiceType form submit start
  onAddWorkOrderSubType() {
    this.applicantDetailsFormSubmitted = true;
      let data ={
        name:this.applicantDetailsForm.value.workOrderSubTypeControl.name,
        tenant_id:this.sessionService.getter("tenant_id_string"),
        utility_id:this.sessionService.getter("utility_id_string_admin"),
        work_order_sub_type_id:this.applicantDetailsForm.value.workOrderSubTypeControl.id_string,
        utility_work_order_type_id:this.applicantDetailsForm.value.workOrderTypeControl.id_string,
        is_active:true
      }

      if (this.applicantDetailsForm.invalid) {
        console.log(this.ad)
        return;
      }else{
        console.log("Data",data);
        this.apiService.post('utility/work-order-sub-type',data).subscribe(result=>{
          console.log('REEEEEEEE: ', result);
          if(result.state == 'success'){
            this.apiService.get('utility/'+this.utilityIdString+'/work-order-sub-type/list').subscribe(data=>{
              this.utility_work_order_subtypeList = data;
              console.log('List: ', this.utility_work_order_subtypeList);
              this.addedSuccessfullyToast=true;
              $('#add_work_order_sub_type').modal('hide');
              this.applicantDetailsForm.reset();
              this.applicantDetailsFormSubmitted = false;
            })
          }
        },(err) => {
          this.exceptionToast=true;
        });
      }
}
// ServiceType form submit end
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
  utility_work_order_subtypeList:any=[];
  work_order_subtypeList:any=[];
  utility_work_order_typeList:any=[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  searchText;
  // Forms build start
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

  onAddClick(){
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data => {
      this.utility_work_order_typeList = data;
    }) 
  }


 

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  

  


  ngOnInit(): void {
  }

}
