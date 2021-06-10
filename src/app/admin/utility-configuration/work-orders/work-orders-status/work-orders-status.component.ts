import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-work-orders-status',
  templateUrl: './work-orders-status.component.html',
  styleUrls: ['./work-orders-status.component.scss'],
  providers: [ErrorMessage]
})
export class WorkOrdersStatusComponent implements OnInit {

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  
  constructor(private formBuilder: FormBuilder,private apiService : ApiService,private sessionService : SessionService) {
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      workOrderTypeControl: [null, [Validators.required]]
    });


    this.apiService.get('work-order-type/list').subscribe(data => {
      this.work_order_typeList = data;
    }) 
    this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data => {
      this.utility_work_order_typeList = data;
    }) 

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
  work_order_typeList:any=[];
  utility_work_order_typeList:any=[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  searchText;
  disableAdd:boolean = false;
  // Forms build start
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

 
   // Applicant details form control start
   get ad() { return this.applicantDetailsForm.controls; }
   // Applicant details form control end
 
   // Applicant details form control start
   get ade() { return this.applicantDetailsFormEdit.controls; }
   // Applicant details form control end
 
   onCancelClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
   }



  editServiceSubtypeData;
  addServiceSubTypeData;
  onAddWorkOrderType(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.workOrderTypeControl.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      work_order_type_id:this.applicantDetailsForm.value.workOrderTypeControl.id_string,
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/work-order-type',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/work-order-type/list').subscribe(data=>{
            this.utility_work_order_typeList = data;
            console.log('List: ', this.utility_work_order_typeList);
            this.addedSuccessfullyToast=true;
            $('#add_work_order_type').modal('hide');
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
  
  
  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
  }

  ngOnInit(): void {
  }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedsubtype:any
  subtype = [
  {id: 1, name: 'SubType 1'},
  {id: 2, name: 'SubType 2'},
  ];

  selectedtype:any
  type = [
  {id: 1, name: 'Type 1'},
  {id: 2, name: 'Type 2'},
  ];

}
