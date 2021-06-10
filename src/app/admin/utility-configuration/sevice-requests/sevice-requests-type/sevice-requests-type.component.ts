import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';

@Component({
  selector: 'app-sevice-requests-type',
  templateUrl: './sevice-requests-type.component.html',
  styleUrls: ['./sevice-requests-type.component.scss']
})
export class SeviceRequestsTypeComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
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
  searchText;
  service_List:any={};
  service_type_Obj: any = {};
  service_type_Obj_edit: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  service_type;
  service_typeList:any={};
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addServiceTypeData;
  editServiceTypeData;

  onAddServiceTypedata(){
    this.addServiceTypeData ={
      name:this.service_type_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      utility_product_id:this.service_type_Obj.service.id_string,
      is_active:true
      
    }
  
    this.apiService.post('consumer/service/type',this.addServiceTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
        this.service_typeList = data;
      })
  
    })
  }

  onEditServiceTypedata(){
    this.editServiceTypeData={
    name:this.service_type_Obj_edit.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    utility_product_id:this.service_type_Obj_edit.service.id_string,
    is_active:true
    }
    this.apiService.put('consumer/service/type/'+this.id_string,this.editServiceTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
        this.service_typeList = data;
      })
    })
    console.log('result:',this.editServiceTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('consumer/utility/'+this.utilityIdString+'/service/type/list').subscribe(data=>{
      this.service_typeList = data;
    }) 
  }


  ngOnInit(): void {
  }

}
