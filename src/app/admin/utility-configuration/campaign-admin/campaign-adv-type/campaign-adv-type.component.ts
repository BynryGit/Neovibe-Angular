import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-campaign-adv-type',
  templateUrl: './campaign-adv-type.component.html',
  styleUrls: ['./campaign-adv-type.component.scss']
})
export class CampaignAdvTypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_type/list').subscribe(data=>{
      this.adv_typeList = data;
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
  adv_type_Obj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  adv_type;
  adv_typeList:any={};
  searchText;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addAdvTypeData;
  editAdvTypeData;

  onAddAdvTypedata(){
    this.addAdvTypeData ={
      name:this.adv_type_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      
    }
  
    this.apiService.post('campaign/advert_type',this.addAdvTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_type/list').subscribe(data=>{
        this.adv_typeList = data;
      })
  
    })
  }

  onEditAdvTypedata(){
    this.editAdvTypeData={
    name:this.adv_type_Obj.name,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    }
    this.apiService.put('campaign/advert_type/'+this.id_string,this.editAdvTypeData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_type/list').subscribe(data=>{
        this.adv_typeList = data;
      })
    })
    console.log('result:',this.editAdvTypeData);
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.apiService.get('campaign/utility/'+this.utilityIdString+'/advert_type/list').subscribe(data=>{
      this.adv_typeList = data;
    }) 
  }


  ngOnInit(): void {
  }

}
