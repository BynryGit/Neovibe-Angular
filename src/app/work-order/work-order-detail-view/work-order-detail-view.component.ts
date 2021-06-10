import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { FilterService } from 'src/app/common/filter/filter.service';
import { DomSanitizer, SafeResourceUrl,SafeUrl } from '@angular/platform-browser';
declare var $: any;
import * as lodash from 'lodash';

@Component({
  selector: 'app-work-order-detail-view',
  templateUrl: './work-order-detail-view.component.html',
  styleUrls: ['./work-order-detail-view.component.scss']
})
export class WorkOrderDetailViewComponent implements OnInit {
  faTimesCircle = faTimesCircle;
  faMapMarkerAlt =  faMapMarkerAlt;
  faPrint = faPrint;
  faEye = faEye;
  faChevronRight = faChevronRight;
  faChevronLeft = faChevronLeft;
  faPen = faPen;
  faPlus = faPlus;
  faFileCsv = faFileCsv;
  faFileExcel = faFileExcel;

  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  dtOptions3: DataTables.Settings = {};

  // Data for lifeCycle details start
  timeLine = []
  // Data for lifeCycle details end

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  safeSrc: SafeResourceUrl;

  showDetailModel:boolean=true
  appointmentDetails;resourceDetails;first_name;last_name;
  showContactBlock:boolean=false
  trustedDashboardUrl : SafeUrl;showLifeCycle;first_name_splitted;first_name_c;last_name_c;
  constructor(private filterService:FilterService, private apiService:ApiService, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    
    this.filterService.getdisplayWorkOrderDetailModule().subscribe(detailVal=>{
    const lifeCyclesPromise = this.apiService.get('work-order/service-appointment/'+detailVal.id_string+'/life-cycle').toPromise();
      
      this.apiService.get('work-order/service-appointment/'+detailVal.id_string).subscribe(appointmentDetail=>{
       if(appointmentDetail.state == 'success'){
              this.appointmentDetails = appointmentDetail.results
              $('#resorceDetailViewModal').modal('show');
              
              console.log('this.appointmentDetails : ', this.appointmentDetails );
              this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.appointmentDetails.work_order_master_id.json_obj.url);
              this.trustedDashboardUrl =this.sanitizer.bypassSecurityTrustResourceUrl(this.appointmentDetails.work_order_master_id.json_obj.url);

              this.first_name = appointmentDetail.results.work_order_master_id.expert_name;
              this.first_name_splitted = this.first_name.split(" ");
              this.first_name_c = this.first_name_splitted[0].charAt(0)
              this.last_name_c = this.first_name_splitted[1].charAt(0)
              
              if(this.appointmentDetails.state == "ASSIGNED" || this.appointmentDetails.state == "ACCEPTED" || this.appointmentDetails.state == "COMPLETED"){
                this.showContactBlock = true
                this.apiService.get('work-order/service-assignment/'+this.appointmentDetails.id_string).subscribe(resourceDetail=>{
                  this.resourceDetails = resourceDetail.results.user_id
                  this.first_name = resourceDetail.results.user_id.first_name.charAt(0)
                  this.last_name = resourceDetail.results.user_id.last_name.charAt(0)
                })
              }else{
                this.showContactBlock = false
              }
          }          
      })
      // Service Appointment life-cycles Api start
      lifeCyclesPromise.then(data=>{
        this.showLifeCycle = true
        for(let item of data.results){

        if (!this.timeLine.some((item1) => item1.id_string == item.id_string)) {
            this.timeLine.push({
            id_string : item.id_string,
            date  : item.created_date,
            title : item.title +' '+ item.state.toLowerCase(),
            time  : item.created_date,
            text  : item.lifecycle_text
          })
        }          
        }
      },(err)=>{
          this.showLifeCycle = false
      })

      
      // Service Appointment life-cycles Api end
    })
    
  }


  hideModal:boolean=false
  hideDetailModel(){
    this.hideModal=false
  }

    isDisplay=false;
  isRules = false;
  isSkills = false;
  isTasks = false;
  isMaterials = false;
  isParameters = false;
  isInstructions = false;
  toggleDisplay(){
    this.isDisplay=!this.isDisplay;
  }

  toggleSkills(){
    
    this.isSkills = !this.isSkills;
  }

  toggleRules(){
    this.isRules = !this.isRules;
  }

  toggleTasks(){
    this.isTasks=!this.isTasks;
  }

  toggleMaterial(){
    this.isMaterials=!this.isMaterials;
  }

  toggleParameter(){
    this.isParameters=!this.isParameters;
  }

  toggleInstructions(){
    this.isInstructions = !this.isInstructions;

  }
}
