import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-registration-admin-subtype',
  templateUrl: './registration-admin-subtype.component.html',
  styleUrls: ['./registration-admin-subtype.component.scss']
})
export class RegistrationAdminSubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('registration/utility/'+this.utilityIdString+'/type/list').subscribe(data=>{
      this.registration_typeList = data;
    })
    this.apiService.get('registration/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.registration_subtypeList = data;
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
  registration_typeList:any={};
  registration_subtypeList:any={};
  registration_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  registration_subtype;
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

  addRegistrationSubTypeData;
  editRegistrationSubTypeData;

  onAddRegistrationSubTypedata(){
    this.addRegistrationSubTypeData ={
      name:this.registration_subtype_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      registration_type_id:this.registration_subtype_Obj.bindvalue.id_string

      
    }
  
    this.apiService.post('registration/subtype',this.addRegistrationSubTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('registration/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
        this.registration_subtypeList = data;
      })
  
    })
  }

  onEditRegistrationSubTypedata(){
    this.editRegistrationSubTypeData={
    name:this.registration_subtype_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    registration_type_id:this.registration_subtype_Obj.bindvalue.id_string
    }
    this.apiService.put('registration/subtype/'+this.id_string,this.editRegistrationSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('registration/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
        this.registration_subtypeList = data;
      })
    })
    console.log('result:',this.editRegistrationSubTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('registration/utility/'+this.utilityIdString+'/subtype/list').subscribe(data=>{
      this.registration_subtypeList = data;
    }) 
  }

  ngOnInit(): void {
  }

}
