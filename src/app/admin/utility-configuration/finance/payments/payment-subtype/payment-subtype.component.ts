import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-payment-subtype',
  templateUrl: './payment-subtype.component.html',
  styleUrls: ['./payment-subtype.component.scss']
})
export class PaymentSubtypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('payment/subtype/list').subscribe(data=>{
      this.payment_subtype = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
      this.payment_subtypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
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
  payment_subtypeList:any={};
  payment_typeList:any={};
  payment_subtypeObj: any = {};
  payment_subtypeObj1: any = {};
  payment_subtypeObj3: any = {};
  payment_subtypeObj4: any = {};
  searchText;
  utilityIdString = this.sessionService.getter("utility_id_string");

  addPaymentSubTypeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 

  onAddPaymentSubTypedata(){
    this.addPaymentSubTypeData ={
      name:this.payment_subtypeObj.bindvalue.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      payment_subtype_id:this.payment_subtypeObj.bindvalue.id_string,
      payment_type_id:this.payment_subtypeObj1.bindvalue.id_string,
      gl_code:this.payment_subtypeObj.gl_code,
      tax:this.payment_subtypeObj.tax,
      is_active:true
      
    }
  
    this.apiService.post('payment/subtype',this.addPaymentSubTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
        this.payment_subtypeList = data;
      })
  
    })
    

    console.log('Subtype: ', this.addPaymentSubTypeData);

  }

  ngOnInit(): void {
  }

}
