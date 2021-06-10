import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, FormArray,Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-complaints-complaints',
  templateUrl: './complaints-complaints.component.html',
  styleUrls: ['./complaints-complaints.component.scss'],
  providers: [ErrorMessage]
})
export class ComplaintsComplaintsComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {

    this.apiService.get('complaint/'+this.utilityIdString+'/list').subscribe(data=>{
      this.complaint_complaintList = data;
    })

    this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.complaint_typeList = data;
    })

    // this.apiService.get('complaint/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
    //   this.complaint_subtypeList = data;
    // })

    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.utility_productList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      complaintSubTypeControl: [null, [Validators.required]],
      complaintTypeControl: [null, [Validators.required]],
      productControl:[null,[Validators.required]],
      complaintNameControl:[null, [Validators.required,,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      complaintSubTypeControlEdit: [null, [Validators.required]],
      complaintTypeControlEdit: [null, [Validators.required]],
      complaintTypeControlEditHidden:[null,],
      complaintSubTypeControlEditHidden:[null,],
      productControlEdit:[null,[Validators.required]],
      complaintNameControlEdit:[null, [Validators.required,,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

    // service Details form code start
    this.serviceDetailsForm = this.formBuilder.group({
      serviceControl: this.formBuilder.array(
        [this.formBuilder.group({service_details:[null,[Validators.required]]})]
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  complaint_complaintList:any={};
  service_details_list = [];
  service_details_list_edit =[];
  complaint_typeList:any={};
  complaint_subtypeList:any={};
  utility_productList:any={};
  serviceDetailsForm: FormGroup;
  serviceDetailsFormSubmitted = false;
  serviceDetailsFormEdit: FormGroup;
  serviceDetailsFormEditSubmitted = false;
  addComplaintData;
  editComplaintData;
  complaint_Obj: any = {};
  complaint_Obj_edit: any = {};
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

  // Service details form control start
  get sd() { return this.serviceDetailsForm.controls; }
  // Service details form control end

  // Service details form control start
  get sde() { return this.serviceDetailsFormEdit.controls; }
  // Service details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  onCancelClick(){
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

  onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
  }

  
    typeChange(){
      let complaint_type_id_string = this.applicantDetailsForm.value.complaintTypeControl.id_string
      // Zones dropdown api call start
      
      this.apiService.get('complaint/utility/'+this.utilityIdString+'/subtype/list?complaint_type_id='+complaint_type_id_string).subscribe(data=>{
        this.complaint_subtypeList = data;
      },(err) => {
        this.complaint_subtypeList = '';
        alert("Sub Type not avialable for Selected Type.")
      })
      // Zone categories dropdown api call end
    }
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

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

  onAddClick(){
    this.apiService.get('complaint/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.complaint_typeList = data;
    })
   }


  onAddComplaint(){
    this.serviceDetailsFormSubmitted = true;
    this.applicantDetailsFormSubmitted = true;
    for(let services of this.applicantDetailsForm.value.productControl){
      this.service_details_list.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    let data ={
      name:this.applicantDetailsForm.value.complaintNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      service_obj:this.service_details_list,
      complaint_type_id:this.applicantDetailsForm.value.complaintTypeControl.id_string,
      complaint_sub_type_id:this.applicantDetailsForm.value.complaintSubTypeControl.id_string,
      utility_product_id:1
    }

    if (this.applicantDetailsForm.invalid) {
      return;
    }else{
      this.apiService.post('complaint/complaint-master',data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('complaint/'+this.utilityIdString+'/list').subscribe(data=>{
            this.complaint_complaintList = data;
            this.addedSuccessfullyToast=true;
            $('#add_complaint').modal('hide');
            this.service_details_list = [];
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }else if(result.state == "exception"){
          this.exceptionToast=true;

        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
}

  onEditComplaint(){
    this.serviceDetailsFormEditSubmitted = true;
    this.applicantDetailsFormEditSubmitted = true;
    for(let services of this.applicantDetailsFormEdit.value.productControlEdit){
      this.service_details_list_edit.push(
        {
          id_string:services.id_string,
          value: services.name
        }
      );
    }
    let data ={
      name:this.applicantDetailsFormEdit.value.complaintNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      service_obj:this.service_details_list_edit,
      complaint_type_id:this.applicantDetailsFormEdit.value.complaintTypeControlEdit.id_string,
      complaint_sub_type_id:this.applicantDetailsFormEdit.value.complaintSubTypeControlEdit.id_string,
      utility_product_id:1
      
    }

    if (this.applicantDetailsFormEdit.invalid) {
      return;
    }else{
      this.apiService.put('complaint/complaint-master/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.apiService.get('complaint/'+this.utilityIdString+'/list').subscribe(data=>{
            this.complaint_complaintList = data;
            this.editedSuccessfullyToast=true;
            $('#edit_complaint').modal('hide');
            this.service_details_list_edit = [];
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
          })
        }else if(result.state == "exception"){
          this.exceptionToast=true;
        }
      },(err) => {
        this.exceptionToast=true;
      });
    }
  }
  

  ngOnInit(): void {
  }

}
