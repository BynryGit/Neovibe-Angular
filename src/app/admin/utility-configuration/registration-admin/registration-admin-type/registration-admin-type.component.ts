import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-registration-admin-type',
  templateUrl: './registration-admin-type.component.html',
  styleUrls: ['./registration-admin-type.component.scss']
})
export class RegistrationAdminTypeComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('registration/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.registration_typeList = data;
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
  registration_type_Obj: any = {};
  registration_type_Obj_edit: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  registration_type;
  registration_typeList:any={};
  service_List:any={};
  searchText;

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
  

  addRegistrationTypeData;
  editRegistrationTypeData;

  onAddRegistrationTypedata(){
    this.addRegistrationTypeData ={
      name:this.registration_type_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      utility_product_id:this.registration_type_Obj.service.id_string,
    }
  
    this.apiService.post('registration/type',this.addRegistrationTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('registration/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
        this.registration_typeList = data;
      })
  
    })
  }

  onEditRegistrationTypedata(){
    this.editRegistrationTypeData={
    name:this.registration_type_Obj_edit.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    utility_product_id:this.registration_type_Obj_edit.service.id_string,
    }
    this.apiService.put('registration/type/'+this.id_string,this.editRegistrationTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('registration/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
        this.registration_typeList = data;
      })
    })
    console.log('result:',this.editRegistrationTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('registration/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.registration_typeList = data;
    }) 
  }
  

  ngOnInit(): void {
  }

}
