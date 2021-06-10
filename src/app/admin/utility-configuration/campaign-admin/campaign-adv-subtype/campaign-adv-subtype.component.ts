import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-campaign-adv-subtype',
  templateUrl: './campaign-adv-subtype.component.html',
  styleUrls: ['./campaign-adv-subtype.component.scss']
})
export class CampaignAdvSubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_type/list').subscribe(data=>{
      this.adv_typeList = data;
    })
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_subtype/list').subscribe(data=>{
      this.adv_subtypeList = data;
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
  adv_typeList:any={};
  adv_subtypeList:any={};
  adv_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  adv_subtype;
  searchText;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addAdvSubTypeData;
  editAdvSubTypeData;

  onAddAdvSubTypedata(){
    this.addAdvSubTypeData ={
      name:this.adv_subtype_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      adv_type_id:this.adv_subtype_Obj.bindvalue.id_string

      
    }
  
    this.apiService.post('campaign/advert_subtype',this.addAdvSubTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_subtype/list').subscribe(data=>{
        this.adv_subtypeList = data;
      })
  
    })
  }

  onEditAdvSubTypedata(){
    this.editAdvSubTypeData={
    name:this.adv_subtype_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    adv_type_id:this.adv_subtype_Obj.bindvalue.id_string
    }
    this.apiService.put('campaign/advert_subtype/'+this.id_string,this.editAdvSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_subtype/list').subscribe(data=>{
        this.adv_subtypeList = data;
      })
    })
    console.log('result:',this.editAdvSubTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_subtype/list').subscribe(data=>{
      this.adv_subtypeList = data;
    }) 
  }

  ngOnInit(): void {
  }

}
