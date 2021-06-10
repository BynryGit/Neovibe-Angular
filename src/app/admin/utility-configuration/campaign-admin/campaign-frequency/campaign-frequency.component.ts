import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-campaign-frequency',
  templateUrl: './campaign-frequency.component.html',
  styleUrls: ['./campaign-frequency.component.scss']
})
export class CampaignFrequencyComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('campaign/utility/'+this.utilityIdString+'/campaign_type/list').subscribe(data=>{
      this.campaign_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
      this.channelList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/frequency/list').subscribe(data=>{
      this.frequencyList = data;
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
  campaign_typeList:any={};
  channelList:any={};
  frequencyList:any={};
  frequency_Obj: any = {};
  frequency_Obj1: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  searchText;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addfrequencyData;
  editfrequencyData;

  onAddFrequencydata(){
    this.addfrequencyData ={
      name:this.frequency_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      campaign_type_id:this.frequency_Obj.bindvalue.id_string,
      channel_type_id:this.frequency_Obj1.bindvalue.id_string

      
    }
  
    this.apiService.post('utility/frequency',this.addfrequencyData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/'+this.utilityIdString+'/frequency/list').subscribe(data=>{
        this.frequencyList = data;
      })
  
    })
  }

  onEditFrequencydata(){
    this.editfrequencyData={
    name:this.frequency_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    campaign_type_id:this.frequency_Obj.bindvalue.id_string,
      channel_type_id:this.frequency_Obj1.bindvalue.id_string
    }
    this.apiService.put('utility/frequency/'+this.id_string,this.editfrequencyData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('utility/'+this.utilityIdString+'/frequency/list').subscribe(data=>{
        this.frequencyList= data;
      })
    })
    console.log('result:',this.editfrequencyData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('utility/'+this.utilityIdString+'/frequency/list').subscribe(data=>{
      this.frequencyList = data;
    }) 
  }

  onAddClick(){
    this.apiService.get('utility/'+this.utilityIdString+'/channel/list').subscribe(data => {
      this.channelList = data;
    }) 
  }


  ngOnInit(): void {
  }

}
