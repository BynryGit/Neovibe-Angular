import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-payments-mode',
  templateUrl: './payments-mode.component.html',
  styleUrls: ['./payments-mode.component.scss']
})
export class PaymentsModeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('payment/subtype/list').subscribe(data=>{
      this.payment_subtype = data;
    })
    this.apiService.get('payment/mode/list').subscribe(data=>{
      this.payment_mode = data;
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
  
  payment_type:any={};
  payment_subtype:any={};
  payment_mode:any={};
  payment_modeList:any={};
  payment_typeList:any={};
  payment_subtypeList:any={};
  payment_modeObj: any = {};
  payment_modeObj1: any = {};
  payment_modeObj2: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
  searchText;

  addPaymentModeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 

  onAddPaymentModedata(){
    this.addPaymentModeData ={
      name:this.payment_modeObj.bindvalue.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      payment_mode_id:this.payment_modeObj.bindvalue.id_string,
      
    }
  
    this.apiService.post('payment/mode',this.addPaymentModeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
        this.payment_modeList = data;
      })
  
    })
    

    console.log('Mode: ', this.addPaymentModeData);

  }


  ngOnInit(): void {
  }

}
