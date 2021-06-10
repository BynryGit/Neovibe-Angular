import { Component, OnInit,Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {UtilityConfigurationComponent} from 'src/app/admin/utility-configuration/utility-configuration.component';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { event } from 'jquery';
import { ErrorMessage } from '../../../../error-messages/error-messages';
declare var $:any;

@Component({
  selector: 'app-territory-country',
  templateUrl: './territory-country.component.html',
  styleUrls: ['./territory-country.component.scss'],
  providers: [ErrorMessage]

})
export class TerritoryCountryComponent implements OnInit {

  constructor(private apiService : ApiService,private formBuilder: FormBuilder,private sessionService : SessionService) {
    this.apiService.get('utility/'+this.utilityIdString+'/region/list').subscribe(data => {
      this.regionList = data;
    }) 
    this.apiService.get('utility/'+this.utilityIdString+'/country/list').subscribe(data => {
      this.countryList = data;
    }) 

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      regionNameControl: [null, [Validators.required]],
      countryControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      regionNameControlEdit: [null, [Validators.required]],
      regionNameControlEditHidden:[null,],
      countryControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

    // console.log("CONTRUCTOR VALUE",this.applicantDetailsFormEdit.value.regionNameControlEditHidden)

  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
  regionList:any;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  countryObj: any = {};
  bindvalue:string;
  countryList:any=[];
  searchText;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  disableAdd:boolean = false;

  // Object for error messages start
  message = new ErrorMessage() 
  // Object for error messages start

  // Applicant details form control start
  get ad() { return this.applicantDetailsForm.controls; }
  // Applicant details form control end

  // Applicant details form control start
  get ade() { return this.applicantDetailsFormEdit.controls; }
  // Applicant details form control end

  onCancelClick(){
    this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
  }

  onCloseClick(){
    this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false;
     this.disableAdd = false;
  }

 
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedRegion = '';
  region1 = [
  {id: 1, name: 'America'},
  {id: 2, name: 'Asia'},
  {id: 3, name: 'Africa'},  
  ];

  addCountryData;
  editCountryData;
  count_number;

  onAddCountrydata(){
    this.applicantDetailsFormSubmitted = true;

    let data ={
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      name:this.applicantDetailsForm.value.countryControl,
      region_id:this.applicantDetailsForm.value.regionNameControl.id_string
      
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/country',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/country/list').subscribe(data=>{
            this.countryList = data;
            console.log('List: ', this.countryList);
            this.addedSuccessfullyToast=true;
            $('#addCountryModal').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;

      });
    }
  }

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    // this.apiService.get('utility/country/'+this.id_string).subscribe(result=>{
    //   if(result.state == 'success'){
    //     console.log("RESULT",result)
    //     this.applicantDetailsFormEdit.controls.countryControlEdit.setValue(result.results.name)
    //     this.applicantDetailsFormEdit.controls.regionNameControlEditHidden.setValue(result.results.region.id_string)
    //     this.applicantDetailsFormEdit.controls.regionNameControlEdit.setValue(result.results.region.name)
        
    //   }
    // },(err) => {
    //   this.exceptionToast=true;
    // });
  }
  
  // onRegionEditChange(){
  //   this.count_number = this.count_number + 1; 
  //   console.log("CHANGE",this.applicantDetailsFormEdit.value.regionNameControlEdit.id_string)
  //   this.applicantDetailsFormEdit.value.regionNameControlEditHidden = this.applicantDetailsFormEdit.value.regionNameControlEdit.id_string
  //   console.log("HIDDEN",this.applicantDetailsFormEdit.value.regionNameControlEditHidden)
  // }


  onEditCountrydata(){
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      name:this.applicantDetailsFormEdit.value.countryControlEdit,
      region_id:this.applicantDetailsFormEdit.value.regionNameControlEdit.id_string
      
      
    }
    this.disableAdd = true;

    // if(this.count_number != 0){
    //   console.log("IF")
    //   data['region_id'] = this.applicantDetailsFormEdit.value.regionNameControlEditHidden
    // }
    // else{
    //   console.log("ELSE")
    //   data['region_id'] = this.applicantDetailsFormEdit.value.regionNameControlEdit.id_string
    // }

    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('utility/country/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/country/list').subscribe(data=>{
            this.countryList = data;
            console.log('List: ', this.countryList);
            this.editedSuccessfullyToast=true;
            $('#editCountryModal').modal('hide');
            // this.applicantDetailsFormEdit.value.regionNameControlEditHidden = null;
            // this.applicantDetailsFormEdit.value.regionNameControlEdit.id_string = null;
            // this.count_number = 0;
            this.disableAdd = false;
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
          })
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;

      });
    }
  

  }

  

  

  onAddClick(){
    this.apiService.get('utility/'+this.utilityIdString+'/region/list').subscribe(data => {
      this.regionList = data;
    }) 
  }

  ngOnInit(): void {
  
   
  }
  
    
    
  }

  