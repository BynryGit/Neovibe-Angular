import { Component, OnInit,Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {UtilityConfigurationService} from '../../utility-configuration.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import 'tinymce/icons/default';

declare var $: any;
declare var tinymce: any;


@Component({
  selector: 'app-territory-region',
  templateUrl: './territory-region.component.html',
  styleUrls: ['./territory-region.component.scss'],
  providers: [ErrorMessage]

})
export class TerritoryRegionComponent implements OnInit {

  constructor(private utilityService : UtilityConfigurationService, private apiService:ApiService,private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.apiService.get('region/list').subscribe(data=>{
      this.region = data;
    })

    this.apiService.get('utility/'+this.utilityIdString+'/region/list').subscribe(data=>{
      this.regionList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      utilityNameControl: [null, [Validators.required]],
      
      
});
// Applicant details form code end
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
  paymode: FormGroup;
  selectedYesNo = true;
  adjustbilltype: FormGroup;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  regionObj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  region;
  regionList;
  bindvalue:string;
  searchText;
  addedSuccessfullyToast = false;
  exceptionToast = false
  disableAdd:boolean = false;

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start


  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end
  
  onCancelClick(){
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
    this.disableAdd = false;
  }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  addRegionData;
  editRegionData;

  onAddRoledata(){
    this.applicantDetailsFormSubmitted = true;
    

    let data ={
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      name:this.applicantDetailsForm.value.utilityNameControl.name,
      region_id:this.applicantDetailsForm.value.utilityNameControl.id_string
      
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
      
    }else{
      console.log("Data",data);
      this.apiService.post('utility/region',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/region/list').subscribe(data=>{
            this.regionList = data;
            console.log('List: ', this.regionList);
            this.addedSuccessfullyToast=true;
            $('#addRegionModal').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.disableAdd = false;
        this.exceptionToast=true;

      });
    }

  }

  



  

  

  ngOnInit(): void {
    
  }

  
 
  

}
