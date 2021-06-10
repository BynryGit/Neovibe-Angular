import { Component, OnInit,Input } from '@angular/core';
import { FilterService } from '../../common/filter/filter.service';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faStarHalf,faStar,faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { WorkOrderService } from '../work-order.service';
declare var $: any;
import * as lodash from 'lodash';
import { Router } from '@angular/router';



@Component({
  selector: 'app-work-order-add',
  templateUrl: './work-order-add.component.html',
  styleUrls: ['./work-order-add.component.scss']
})
export class WorkOrderAddComponent implements OnInit {

  faPlus = faPlus;
  faCalendarAlt = faCalendarAlt;
  faStar = faStar;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  @Input() triger;

  utilityIdString = this.sessionService.getter('utility_id_string')

  serviceAppointments;
  userData;workOrderTemplateList;workOrderTemplates;
  constructor (private apiService:ApiService, private sessionService:SessionService,
                private workOrderService : WorkOrderService, private router:Router) {  

    this.apiService.get('work-order/utility/'+this.utilityIdString+'/list').subscribe(workOrderTemplateLists=>{
      this.workOrderTemplateList = workOrderTemplateLists.results
      this.workOrderTemplates = workOrderTemplateLists.results
    });
  };
  test = [new Date(), new Date()];

  ngOnInit(): void {
    this.triger   
  }

  // After click on service display second popup for add appointment start
  consumerList;consumerLists;assetData;ruleList;
  detailViewServiceAdd;
  addWorkOrderModule(service){
    $('#service_obj').val(JSON.stringify(service)); //store array

    this.detailViewServiceAdd = service
    this.apiService.get('consumer/'+this.utilityIdString+'/service-contract-detail/list').subscribe(consumerLists=>{
      this.consumerList = consumerLists.results
      this.consumerLists = consumerLists.results
    },(err) => {
      console.log('alert(err.error.result): ');
    });

    this.workOrderService.getAssetListData().subscribe(assetList=>{
      this.assetData = assetList.results
    },(err) => {
      console.log('alert(err.error.result): ');
    });

    this.workOrderService.getRuleList().subscribe(ruleLists=>{
      this.ruleList = ruleLists.results
    },(err) => {
      console.log('alert(err.error.result): ');
    });
  }
  // After click on service display second popup for add appointment end


   // Create/ Add Service Appointment start
   serviceAppointmentObj: any = {};
   dateVal;service_obj;service_rules;rules;concatRule;uniqueRule
   showtoast;showexceptiontoast;
   asset_id_string;
   consumerInvalid = false
   rulesInvalid = false
   dateInvalid = false
   proceedreqsrvc() {

    if(!this.serviceAppointmentObj.consumer){
      this.consumerInvalid = true
      return
    }else{
      this.consumerInvalid = false
    }
    if(!this.serviceAppointmentObj.rule){
      this.rulesInvalid = true
      return
    }else{
      this.rulesInvalid = false
    }
    if(!this.serviceAppointmentObj.appointmentDate){
      this.dateInvalid = true
      return
    }else{
      this.dateInvalid = false
    }

     this.service_obj = $('#service_obj').val(); //retrieve array
     this.service_rules = JSON.parse(this.service_obj)
     if(this.serviceAppointmentObj.rule){
       this.rules = this.serviceAppointmentObj.rule
       this.concatRule = [...this.rules, ...this.service_rules.json_obj.rule];
       this.uniqueRule = lodash.uniqBy(this.concatRule, function (e) {              
         return e.rule;
       });
     }else{
       this.uniqueRule = this.service_rules.json_obj.rule
     }
 
     this.dateVal =
      this.serviceAppointmentObj.appointmentDate.getFullYear() +
      '-' +
      String(Number(this.serviceAppointmentObj.appointmentDate.getMonth()) + 1) +
      '-' +
      this.serviceAppointmentObj.appointmentDate.getDate() +
      ' ' +
      this.serviceAppointmentObj.appointmentDate.getHours() +
      ':' +
      this.serviceAppointmentObj.appointmentDate.getMinutes() +
      ':' +
      this.serviceAppointmentObj.appointmentDate.getSeconds();

    //  this.dateVal = this.serviceAppointmentObj.appointmentDate.year+'-'+this.serviceAppointmentObj.appointmentDate.month+'-'+this.serviceAppointmentObj.appointmentDate.day
     if(this.serviceAppointmentObj.asset){
      this.asset_id_string = this.serviceAppointmentObj.asset.id_string
     }
     let appointmentDetails = {
       utility_id: this.sessionService.getter('utility_id_string'),
       consumer_service_contract_detail_id : this.serviceAppointmentObj.consumer.id_string,
       asset_id: this.asset_id_string,
       work_order_master_id:this.service_rules.id_string,
       sa_date: this.dateVal,
       sa_name:this.service_rules.name,
       sa_rule:{
         rule:this.uniqueRule,
       }
     }
 
     this.apiService.post("work-order/service-appointment",appointmentDetails).subscribe(serviceAppointment=>{
         if (serviceAppointment.state == "success") {
           this.showtoast = true;
           setTimeout(() => {             
             this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/work-order']);
            });
           }, 500);
         }else if (serviceAppointment.state == "exception") {
           this.showexceptiontoast = true;
         }
         
       },(err) => {
         this.showexceptiontoast = true;
       });
   }

   // Create/ Add Service Appointment end

   onSearch(e) {
    this.workOrderTemplates = this.workOrderTemplateList.filter(item => item.name.toLowerCase().includes(e.toLowerCase()))
  }

   customSearchFn(term: string, item: any) {
    return item.consumer_id.email.toLocaleLowerCase().indexOf(term) > -1 || item.consumer_id.consumer_no.toLocaleLowerCase().indexOf(term) > -1 || item.consumer_id.phone_mobile.toLocaleLowerCase().indexOf(term) > -1
 }
  
}
