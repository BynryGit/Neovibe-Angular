import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';


@Component({
  selector: 'app-campaign-channel',
  templateUrl: './campaign-channel.component.html',
  styleUrls: ['./campaign-channel.component.scss']
})
export class CampaignChannelComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('channel/list').subscribe(data=>{
      this.channel = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
      this.channelList = data;
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
  channel:any={};
  channelList:any={};
  channelObj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  searchText;
  channel_list=[];

  addChannelData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 

  onAddChanneldata(){
    for(let channel of this.channelObj.bindvalue){
      this.channel_list.push(
        {
          id_string: channel.id_string,
          value: channel.name
        }
      );
    }
    this.addChannelData ={
      name:this.channelObj.bindvalue.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      channel_id:this.channelObj.bindvalue.id_string,
      channel_details:this.channel_list,
      
    }
  
    this.apiService.post('utility/channel',this.addChannelData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
        this.channelList = data;
      })
  
    })
    

    console.log('Channel: ', this.addChannelData);

  }

  ngOnInit(): void {
  }

}
