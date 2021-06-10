import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
declare var $ : any;
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-sevice-requests-subtype',
  templateUrl: './sevice-requests-subtype.component.html',
  styleUrls: ['./sevice-requests-subtype.component.scss']
})
export class SeviceRequestsSubtypeComponent implements OnInit {
 // Object for error messages start
 message = new ErrorMessage() 
 // Object for error messages start


 applicantDetailsForm: FormGroup;
 applicantDetailsFormSubmitted = false;

  constructor(private apiService:ApiService,private formBuilder: FormBuilder,private sessionService : SessionService) {

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
      this.service_subtypeList = data;
    })
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    })

    this.applicantDetailsForm = this.formBuilder.group({
      firstNameControl: ['', [Validators.required]],
      utilityControl: [null, [Validators.required]]
    });
    
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
  
  service_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  service_subtype;
  searchText;
  service_subtypeList:any={};
  service_typeList:any={};

  onAddClick(){
   
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    })
  }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form submit start
  onApplicantDetailsFormSubmit() {
    
}
// Applicant details form submit end

  
  addserviceSubTypeData;
  editserviceSubTypeData;

  onAddServiceSubTypedata(){
    this.applicantDetailsFormSubmitted = true;

    if (this.applicantDetailsForm.invalid) {
      
        return;
        
    }
    else{
      this.addserviceSubTypeData ={
      
        name:this.applicantDetailsForm.value.firstNameControl,
        tenant_id:this.sessionService.getter("tenant_id_string"),
        utility_id:this.sessionService.getter("utility_id_string"),
        service_type_id:this.applicantDetailsForm.value.utilityControl.id_string,
        is_active:true
        
      }

      this.apiService.post('consumer/service/subtype',this.addserviceSubTypeData).subscribe(result=>{
        console.log('result: ', result);
        this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
          this.service_subtypeList = data;
        })
    
      })
      $('#add_service_subtype').modal('hide')
      

    }
   
  
    
  }

  onEditServiceSubTypedata(){
    this.editserviceSubTypeData={
    name:this.service_subtype_Obj.name,
    tenant_id:"905ea655-aa91-49ba-96d2-f3402e999923",
    utility_id:"247c434f-4582-4414-843c-5c4c79b95f54",
    service_type_id:this.service_subtype_Obj.bindvalue.id_string,
    is_active:true
    }
    this.apiService.put('consumer/service/subtype/'+this.id_string,this.editserviceSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
        this.service_subtypeList = data;
      })
    })
    console.log('result:',this.editserviceSubTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
      this.service_subtypeList = data;
    }) 
  }

  ngOnInit(): void {
  }

}
