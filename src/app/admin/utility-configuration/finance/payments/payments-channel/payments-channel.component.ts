import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-payments-channel',
  templateUrl: './payments-channel.component.html',
  styleUrls: ['./payments-channel.component.scss']
})
export class PaymentsChannelComponent implements OnInit {

  constructor(private filterService : FilterService,private apiService:ApiService,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('payment/subtype/list').subscribe(data=>{
      this.payment_subtype = data;
    })
    this.apiService.get('payment/mode/list').subscribe(data=>{
      this.payment_mode = data;
    })
    this.apiService.get('channel/list').subscribe(data=>{
      this.payment_channel = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
      this.payment_subtypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
      this.payment_modeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/channel/list').subscribe(data=>{
      this.payment_channelList = data;
    })
   }
  dtOptions:DataTables.Settings = {};
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

  payment_type:any={};
  payment_subtype:any={};
  payment_mode:any={};
  payment_channel:any={};
  payment_channelList:any={};
  payment_typeList:any={};
  payment_subtypeList:any={};
  payment_modeList:any={};
  payment_channelObj: any = {};
  payment_channelObj1: any = {};
  payment_channelObj2: any = {};
  payment_channelObj3: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  searchText;

  addPaymentChannelData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  onAddPaymentChanneldata(){
    this.addPaymentChannelData ={
      name:this.payment_channelObj.bindvalue.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      channel_id:this.payment_channelObj.bindvalue.id_string,
      
    }
  
    this.apiService.post('utility/channel',this.addPaymentChannelData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/'+this.utilityIdString+'/channel/list').subscribe(data=>{
        this.payment_channelList = data;
      })
  
    })
    

    console.log('Channel: ', this.addPaymentChannelData);

  }

  dataSet = [
    
]



  blocks = [
    {
        name:       "Utility",
    },
    {
        name:       "Channel",
    },
    {
        name:       "Created by",
    },
    {
        name:       "Created date",
    }

    
]


  ngOnInit(): void {
  }

}
