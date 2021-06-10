import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';


@Component({
  selector: 'app-campaign-type',
  templateUrl: './campaign-type.component.html',
  styleUrls: ['./campaign-type.component.scss']
})
export class CampaignTypeComponent implements OnInit {

  constructor( private apiService:ApiService,private sessionService : SessionService) {

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
  campaign_type_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  campaign_type;
  campaign_typeList:any={};
  searchText;
  

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addCampaignTypeData;
  editCampaignTypeData;

  onAddCampaignTypedata(){
    this.addCampaignTypeData ={
      name:this.campaign_type_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      
    }
  
    this.apiService.post('campaign/campaign_type',this.addCampaignTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_type/list').subscribe(data=>{
        this.campaign_typeList = data;
      })
  
    })
  }

  onEditCampaignTypedata(){
    this.editCampaignTypeData={
    name:this.campaign_type_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    }
    this.apiService.put('campaign/campaign_type/'+this.id_string,this.editCampaignTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_type/list').subscribe(data=>{
        this.campaign_typeList = data;
      })
    })
    console.log('result:',this.editCampaignTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_type/list').subscribe(data=>{
      this.campaign_typeList = data;
    }) 
  }


  ngOnInit(): void {
  }

}
