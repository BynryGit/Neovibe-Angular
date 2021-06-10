import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';


@Component({
  selector: 'app-payments-type',
  templateUrl: './payments-type.component.html',
  styleUrls: ['./payments-type.component.scss']
})
export class PaymentsTypeComponent implements OnInit {

  constructor(private apiService:ApiService,private sessionService : SessionService) {

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
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
  payment_typeList:any={};
  payment_typeObj: any = {};
  searchText;
  utilityIdString = this.sessionService.getter("utility_id_string");

  addPaymentTypeData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 

  onAddPaymentTypedata(){
    this.addPaymentTypeData ={
      name:this.payment_typeObj.bindvalue.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      payment_type_id:this.payment_typeObj.bindvalue.id_string,
      
    }
  
    this.apiService.post('payment/type',this.addPaymentTypeData).subscribe(result=>{
      console.log('result: ', result);
      this.apiService.get('utility/247c434f-4582-4414-843c-5c4c79b95f54/payment/type/list').subscribe(data=>{
        this.payment_typeList = data;
      })
  
    })
    

    console.log('Channel: ', this.addPaymentTypeData);

  }

  ngOnInit(): void {
  }

}
