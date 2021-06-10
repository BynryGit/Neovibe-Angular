import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { CommonService } from '../common.service';
import * as _ from 'underscore';
import * as lodash from 'lodash';

@Component({
  selector: 'smart360-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {
  faPlus = faPlus;
  settingSnm;
  utilityConfigurationAdmin;
  showPopUpFlag: boolean = false;
  commonVal;
  finalList;
  utilityId;
  services;
  service;
  user;


  constructor(private getData: CommonService, private router: Router, private activatedRoute: ActivatedRoute,
    private sessionService: SessionService) { 
   
      // load submodule list click after click on module
    this.getData.moduleIdString.subscribe(moduleIdString=>{
      this.user = this.sessionService.getter("loginUser")
      this.showErrorMsg = false
      if((this.user) == 'Utility'){
        let utility_id_string = this.sessionService.getter("utility_id_string")        
        this.submoduleSubscribe =  this.getData.getSubModuleByUserUtility(utility_id_string,moduleIdString).subscribe((result:any)=>{
  
         // Storing id string for Check privileges start
         this.sessionService.setter("module_id_string",result.data[0].module_id_string)
         this.sessionService.setter("sub_module_id_string",result.data[0].id_string)
         // Storing id string for Check privileges end
         
         this.uniqueSubModule = lodash.uniqBy(result.data, function (e) {              
           return e.id_string;
         });
          if(result.state == 'success'){
           this.showErrorMsg = false
            this.finalSubModuleList=[]
   
            this.finalSubModuleList = this.uniqueSubModule.map((a)=>{
             let obj2 = this.subModuleList.find((b)=> (a.name === b.sub_module)&&(b.label == a.module_name));
             if(obj2)
              Object.assign(a,obj2);
             return a;
            });
   
            this.finalSubModuleList = _.sortBy(this.finalSubModuleList, 'no');
   
           if(this.finalSubModuleList && this.finalSubModuleList[0].link){
             this.router.navigate([this.finalSubModuleList[0].link])
           }
          }
          else{
           this.finalSubModuleList=[]
          }
       },
       (err) => {
         if(err?.error?.results){
           this.showErrorMsg = false;
           // sessionStorage.removeItem("token")
         }
         else if(err?.error?.data){
           this.subModuleNotFound = true
           this.finalSubModuleList=[]
         }
       });

      }else{
        let tenant_id_string = this.sessionService.getter("tenant_id_string");
        this.submoduleSubscribe =  this.getData.getSubModuleByUserTenant(tenant_id_string,moduleIdString).subscribe((result:any)=>{

   
          // Storing id string for Check privileges start
          this.sessionService.setter("module_id_string",result.data[0].module_id_string)
          this.sessionService.setter("sub_module_id_string",result.data[0].id_string)
          // Storing id string for Check privileges end
          
          this.uniqueSubModule = lodash.uniqBy(result.data, function (e) {              
            return e.id_string;
          });
           if(result.state == 'success'){
            this.showErrorMsg = false
             this.finalSubModuleList=[]
    
             this.finalSubModuleList = this.uniqueSubModule.map((a)=>{
              let obj2 = this.subModuleList.find((b)=> (a.name === b.sub_module)&&(b.label == a.module_name));
              if(obj2)
               Object.assign(a,obj2);
              return a;
             });
    
             this.finalSubModuleList = _.sortBy(this.finalSubModuleList, 'no');
    
            if(this.finalSubModuleList && this.finalSubModuleList[0].link){
              this.router.navigate([this.finalSubModuleList[0].link])
            }
           }
           else{
            this.finalSubModuleList=[]
           }
        },
        (err) => {
          if(err?.error?.results){
            this.showErrorMsg = false;
            // sessionStorage.removeItem("token")
          }
          else if(err?.error?.data){
            this.subModuleNotFound = true
            this.finalSubModuleList=[]
          }
        });
      }
      
  })

    }

subModuleList = [    
    
      { no: 1, label: 'CX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'CX', sub_module: 'Care', icon: 'icons8 icons8-flow-chart', link: '/consumer/search-consumer', ngbPopover: "Care" },    
      { no: 3, label: 'CX', sub_module: 'Consumer Service', icon: 'icons8 icons8-user', link: '/user', ngbPopover: "Consumer Service" },
      
      { no: 1, label: 'MX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'MX', sub_module: 'Schedule', icon: 'icons8 icons8-document', link: '/meter-data/schedule', ngbPopover: "Schedule" },    
      { no: 3, label: 'MX', sub_module: 'Dispatch', icon: 'icons8 icons8-estimate', link: '/meter-data/dispatch', ngbPopover: "Dispatch" },
      { no: 4, label: 'MX', sub_module: 'Validation', icon: 'icons8 icons8-todo-list', link: '/meter-data/validation', ngbPopover: "Validation" },
      { no: 5, label: 'MX', sub_module: 'Upload', icon: 'icons8 icons8-paycheque', link: '/meter-data/upload', ngbPopover: "Upload" },
      { no: 6, label: 'MX', sub_module: 'Meter Master', icon: 'icons8 icons8-paycheque', link: '/meter-data/meter-detail', ngbPopover: "Meter Master" },
      { no: 7, label: 'MX', sub_module: 'Search Consumer', icon: 'icons8 icons8-search', link: '/meter-data/search-consumer', ngbPopover: "Search Consumer" },

      { no: 1, label: 'BX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'BX', sub_module: 'Billing', icon: 'icons8 icons8-document', link: 'billing', ngbPopover: "Billing" },
      { no: 3, label: 'BX', sub_module: 'Payment', icon: 'icons8 icons8-paycheque', link: '/page-not-found', ngbPopover: "Payment" },

      { no: 1, label: 'WX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'WX', sub_module: 'Dispatcher', icon: 'icons8 icons8-todo-list', link: '/work-order', ngbPopover: "Dispatcher" },
      { no: 3, label: 'WX', sub_module: 'Work Order', icon: 'icons8 icons8-document', link: '/work-order/complete', ngbPopover: "Work Order" },
      
      
      { no: 1, label: 'AX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'AX', sub_module: 'Asset', icon: 'icons8 icons8-estimate', link: '/asset', ngbPopover: "Asset" },
      { no: 3, label: 'AX', sub_module: 'Contract', icon: 'icons8 icons8-todo-list', link: '/page-not-found', ngbPopover: "Contract" },
      { no: 4, label: 'AX', sub_module: 'Supplier', icon: 'icons8 icons8-settings', link: '/page-not-found', ngbPopover: "Supplier" },

      { no: 1, label: 'SX', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'SX', sub_module: 'Request', icon:'icons8 icons8-estimate', link: '/page-not-found', ngbPopover: "Request" },
      { no: 3, label: 'SX', sub_module: 'Store', icon: 'icons8 icons8-todo-list', link: '/page-not-found', ngbPopover: "Store" },
      { no: 4, label: 'SX', sub_module: 'Tender', icon: 'icons8 icons8-news', link: '/page-not-found', ngbPopover: "Tenders" },
      { no: 5, label: 'SX', sub_module: 'Product', icon: 'icons8 icons8-document', link: '/page-not-found', ngbPopover: "Product" },
      { no: 6, label: 'SX', sub_module: 'Vendor Service', icon: 'icons8 icons8-document', link: '/page-not-found', ngbPopover: "Vendor Services" },
      { no: 7, label: 'SX', sub_module: 'Order', icon: 'icons8 icons8-document', link: '/page-not-found', ngbPopover: "Order" },
      { no: 8, label: 'SX', sub_module: 'Contract', icon: 'icons8 icons8-document', link: '/page-not-found', ngbPopover: "Contracts" },
      { no: 9, label: 'SX', sub_module: 'Supplier', icon: 'icons8 icons8-cv', link: '/page-not-found', ngbPopover: "Suppliers" },

      { no: 1, label: 'USER', sub_module: 'Dashboard', icon: 'icons8 icons8-speed', link: '/dashboard', ngbPopover: "Dashboard" },
      { no: 2, label: 'USER', sub_module: 'Role Privilege', icon: 'icons8 icons8-document', link: '/page-not-found', ngbPopover: "Role Privilege" },

      { no: 1, label: 'ADMIN', sub_module: 'Utility Master', icon: 'icons8 icons8-document', link: '/utility', ngbPopover: "Utility Master" },
      { no: 2, label: 'ADMIN', sub_module: 'System Configuration', icon: 'icons8 icons8-paycheque', link: '', ngbPopover: "System Configuration" },
    ]


  subModules: any = [];
  utilityMasterAdmin;
  finalSubModuleList=[];
  submoduleSubscribe;
  uniqueSubModule;
  showErrorMsg:boolean=false;
  subModuleNotFound:boolean=false
  ngOnInit(): void { 
         
  $(document).ready(function () {
    $(".menubttn").parents(".pr-side-navbar").removeClass("open-slide");
    // For modal close on cross click
    $('.modal').find('.close').on('click', function (e) {
      $(this).parents('.modal').removeClass('show');
      
    });
   
  });
  this.getSubModule()

  
}

  subModuleVal=[];
  subModuleValList;
  module_id_string;
  
  getSubModule() {
    this.getData.checkRolePrivilege().subscribe((result: any) => {
    })

  }

  meterData = {
    title: 'Meter Data', data: [
      { id: 1, navData: 'Schedule', link: '/meter-data/schedule' }, { id: 2, navData: 'Dispatch', link: '/meter-data/dispatch' }, { navData: 'Validation', link: '/meter-data/validation' },
      { navData: 'Upload', link: '#' }, { navData: 'Meter Master', link: '/meter-data/meter-detail' }
    ]
  };

  // on click of submodule show popup
  showPopup(sub_module, link?,index?,role_id_string?,module_id_string?,sub_module_id_string?) {
    this.sessionService.setter("role_id_string",role_id_string)
    this.sessionService.setter("module_id_string",module_id_string)
    this.sessionService.setter("sub_module_id_string",sub_module_id_string)
    
    this.getData.sideNavId.emit(sub_module)
    console.log("Emit SubModule",sub_module)
    this.meterData = {
      title: 'Meter Data', data: [
        { id: 1, navData: 'Schedule', link: '/meter-data/schedule' }, { id: 2, navData: 'Dispatch', link: '/meter-data/dispatch' }, { navData: 'Validation', link: '/meter-data/validation' },
        { navData: 'Upload', link: '#' }, { navData: 'Meter Master', link: '/meter-data/meter-detail' }
      ]
    };

    this.services = {
      title: 'Consumer Service', data: [
        { id: 1, navData: 'Registrations', link: '/consumerops/registration' },{ id: 2, navData: 'Connections', link: '/consumer/consumer-processing' }, { id: 3, navData: 'Disconnections', link: '/consumer/disconnections-processing' }, {id:4, navData: 'Transfer', link: '/consumer/transfer-processing' },
        {id:5, navData: 'Service', link: '/consumer/service-processing' }, {id:6, navData: 'Complaints', link: '/consumer/complaints-processing' }, {id:7, navData: 'Offers', link: '/consumer/offer-processing' }, {id:8, navData: 'Payments', link: '/consumer/payments-processing' }, {id:9, navData: 'Adjustment', link: '/consumer/adjustment-processing' }, {id:10, navData: 'Outage/Emergency', link: '/consumer/outage-processing' },
        {id:11, navData: 'Outstandings/Notices', link: '#' }, {id:12, navData: 'Campaigns', link: '#' }, {id:13, navData: 'Survey', link: '#' },
        //  {id:12, navData: 'Survey', link: '#' }, {id:13, navData: 'Update Profile', link: '#' },
        // {id:14, navData: 'Outage/Emergency', link: '#' }, {id:15, navData: 'Timeline/Audit Log', link: '#' },
      ]
    }
   

    this.settingSnm = {
      title: 'Settings', data: [
        { id: 1, navData: 'Survey Type', link: '#' }, { id: 2, navData: 'Campaign Type', link: '#' }, { navData: 'Campaign Frequency Type', link: '#' },
      ]
    };

    this.utilityMasterAdmin = {
      title: 'Utility Master', data: [
        { id: 1, navData: 'Utility', link: '/utility' }, { id: 2, navData: 'Plans', link: '#' },
        { id: 3, navData: 'User', link: '/user' }
      ]
    };

    // this.utilityConfigurationAdmin = {
    //   title: 'Utility Configuration', data: [
    //     { id: 1, navData: 'Configuration', link: '/utility/configuration' }
    //   ]
    // };

    if (sub_module === "Meter Data") {
      this.showPopUpFlag = !this.showPopUpFlag
      this.meterData = this.meterData
    }
    else if (sub_module === "Utility Master") {

      this.showPopUpFlag = !this.showPopUpFlag
      this.meterData = this.utilityMasterAdmin
      console.log("Utility Master Admin",this.meterData)
    }
    // else if (sub_module === "Utility Configuration") {

    //   this.showPopUpFlag = !this.showPopUpFlag
    //   this.meterData = this.utilityConfigurationAdmin
    // }   
    else if (sub_module === "Services") {
      this.showPopUpFlag = !this.showPopUpFlag
      this.meterData = this.utilityConfigurationAdmin
    }   
    else if (sub_module === "Consumer Service") {

      this.showPopUpFlag = !this.showPopUpFlag
      this.meterData = this.services
      console.log("Services",this.meterData)
    }
    // else if (sub_module === "Service") {

    //   this.showPopUpFlag = !this.showPopUpFlag
    //   this.meterData = this.service
    // }      
    else if (link) {      
      this.router.navigate([link])
    }    
    else {
      this.showPopUpFlag = false
    }

  
  }

  status: boolean = false;
  bClickEvent() {
    this.status = !this.status;
    $(".menubttn").parents(".pr-side-navbar").toggleClass("open-slide");
    $(".main-container").toggleClass("add-w");
    $("body").toggleClass("hide-popover");
  }
  
  MeterMenuClick() {
    this.showPopUpFlag = false;
  }

}
