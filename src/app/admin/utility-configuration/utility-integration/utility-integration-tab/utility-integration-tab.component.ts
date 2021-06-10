import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus,faAd } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { FilterService } from '../../../../common/filter/filter.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../../common-services/session-service/session.service';
import {NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';
declare var $ : any;

@Component({
  selector: 'app-utility-integration-tab',
  templateUrl: './utility-integration-tab.component.html',
  styleUrls: ['./utility-integration-tab.component.scss']
})
export class UtilityIntegrationTabComponent implements OnInit {

  constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService) {
  
    this.apiService.get('utility/'+this.utilityIdString+'/integration-master/list').subscribe(data=>{
      this.integration_masterList = data;
    })
    this.apiService.get('integration-type/list').subscribe(data => {
      this.integration_typeList = data;
    }) 
    this.apiService.get('integration-subtype/list').subscribe(data=>{
      this.integration_subtypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/module/list').subscribe(data=>{
      this.utility_moduleList = data;
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
  utilityIdString = this.sessionService.getter("utility_id_string");
  integration_typeList: any=[];
  integration_subtypeList:any=[];
  integration_masterList:any=[];
  utility_moduleList:any=[];
  integration_Obj: any = {};
  integration_Obj_edit:any ={};
  addIntegrationData;
  editIntegrationData;
  searchText;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
}

  onAddIntegrationData(){
    this.addIntegrationData ={
      name:this.integration_Obj.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      module_id:this.integration_Obj.module.id_string,
      description:this.integration_Obj.description,
      development_url:this.integration_Obj.develop_url,
      testing_url:this.integration_Obj.test_url,
      auth_key:this.integration_Obj.auth_key,
      integration_type_id:this.integration_Obj.integration_type.id_string,
      integration_sub_type_id:this.integration_Obj.integration_sub_type.id_string,
      is_active:true
    }
    
    
    this.apiService.post('utility/integration-master',this.addIntegrationData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('utility/'+this.utilityIdString+'/integration-master/list').subscribe(data=>{
        this.integration_masterList = data;
      })
    })
    console.log('result:',this.integration_masterList);

  }


  onEditIntegrationData(){
    this.editIntegrationData ={
      name:this.integration_Obj_edit.name,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string"),
      module_id:this.integration_Obj_edit.module.id_string,
      description:this.integration_Obj_edit.description,
      development_url:this.integration_Obj_edit.develop_url,
      testing_url:this.integration_Obj_edit.test_url,
      auth_key:this.integration_Obj_edit.auth_key,
      integration_type_id:this.integration_Obj_edit.integration_type.id_string,
      integration_sub_type_id:this.integration_Obj_edit.integration_sub_type.id_string,
      is_active:true
    }
    
    
    this.apiService.put('utility/integration-master/'+this.id_string,this.editIntegrationData).subscribe(result=>{
      console.log('result:',result);
      this.apiService.get('utility/'+this.utilityIdString+'/integration-master/list').subscribe(data=>{
        this.integration_masterList = data;
      })
    })
    console.log('result:',this.integration_masterList);

  }

  ngOnInit(): void {
  }

}
