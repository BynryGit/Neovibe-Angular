import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
declare var $ : any;
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-sevice-requests-services',
  templateUrl: './sevice-requests-services.component.html',
  styleUrls: ['./sevice-requests-services.component.scss']
})
export class SeviceRequestsServicesComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService, private formBuilder: FormBuilder) {

    this.apiService.get('service/'+this.utilityIdString+'/list').subscribe(data=>{
      this.service_serviceList = data;
    })

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
      this.service_subtypeList = data;
    })
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.utility_productList = data;
    })

    // service Details form code start
    this.serviceDetailsForm = this.formBuilder.group({
      serviceControl: this.formBuilder.array(
        [this.formBuilder.group({service_details:[null]})]
        ),
    });
    // service Details form code end
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
  service_typeObj:any={};
  service_subtypeObj:any={};
  service_Obj:any={};
  service_type_editObj:any={};
  service_subtype_editObj:any={};
  service_edit_Obj:any={};
  service_subtypeList:any={};
  service_typeList:any={};
  utility_productList:any={};
  serviceDetailsForm: FormGroup
  utilityIdString = this.sessionService.getter("utility_id_string");
  service_serviceList:any={};
  service_details_list = [];

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onAddClick(){
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/subtype/list').subscribe(data=>{
      this.service_subtypeList = data;
    })
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    })
  }

addServiceData;
editServiceData;

get ServiceDetails() {
  return this.serviceDetailsForm.get('serviceControl') as FormArray;
}

addServiceDetailsRow(){
  this.ServiceDetails.push(this.formBuilder.group({service_details:[null]}));
}

onAddServiceData(){
  for(let services of this.serviceDetailsForm.value.serviceControl){
    this.service_details_list.push(
      {
        id_string:services.service_details.id_string,
        value: services.service_details.name
      }
    );
  }
    this.addServiceData ={
      name:this.service_Obj.name,
      service_obj:this.service_details_list,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      service_sub_type_id:this.service_subtypeObj.bindvalue.id_string,
      is_active:true
      
    }
  
    this.apiService.post('service/',this.addServiceData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('service/'+this.utilityIdString+'/list').subscribe(data=>{
        this.service_serviceList = data;
      })
  
    })
  }

  onEditServiceData(){
    this.editServiceData={
    name:this.service_edit_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    service_sub_type_id:this.service_subtype_editObj.bindvalue.id_string,
    is_active:true
    }
    this.apiService.put('service/'+this.id_string,this.editServiceData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('service/'+this.utilityIdString+'/list').subscribe(data=>{
        this.service_serviceList = data;
      })
    })
    console.log('result:',this.editServiceData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('service/'+this.utilityIdString+'/list').subscribe(data=>{
      this.service_serviceList = data;
    })
  }

  ngOnInit(): void {
  }

}
