import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-campaign-subtype',
  templateUrl: './campaign-subtype.component.html',
  styleUrls: ['./campaign-subtype.component.scss']
})
export class CampaignSubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_subtype/list').subscribe(data=>{
      this.campaign_subtypeList = data;
    })
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_type/list').subscribe(data=>{
      this.campaign_typeList = data;
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
  campaign_subtype_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  campaign_subtype;
  campaign_subtypeList:any={};
  campaign_typeList:any={};
  searchText;
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addCampaignSubTypeData;
  editCampaignSubTypeData;

  onAddCampaignSubTypedata(){
    this.addCampaignSubTypeData ={
      name:this.campaign_subtype_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      campaign_type_id:this.campaign_subtype_Obj.bindvalue.id_string
      
    }
  
    this.apiService.post('campaign/campaign_subtype',this.addCampaignSubTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_subtype/list').subscribe(data=>{
        this.campaign_subtypeList = data;
      })
  
    })
  }

  onEditCampaignSubTypedata(){
    this.editCampaignSubTypeData={
    name:this.campaign_subtype_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    campaign_type_id:this.campaign_subtype_Obj.bindvalue.id_string
    }
    this.apiService.put('campaign/campaign_subtype/'+this.id_string,this.editCampaignSubTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_subtype/list').subscribe(data=>{
        this.campaign_subtypeList = data;
      })
    })
    console.log('result:',this.editCampaignSubTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_subtype/list').subscribe(data=>{
      this.campaign_subtypeList = data;
    }) 
  }


  ngOnInit(): void {
  }

}
