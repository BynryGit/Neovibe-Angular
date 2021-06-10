import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;
@Component({
  selector: 'app-territory-section',
  templateUrl: './territory-section.component.html',
  styleUrls: ['./territory-section.component.scss'],
  providers: [ErrorMessage]
})
export class TerritorySectionComponent implements OnInit {

  constructor(private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 
    this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data => {
      this.cityList = data;
    }) 
    this.apiService.get('utility/'+this.utilityIdString+'/zone/list').subscribe(data => {
      this.zoneList = data;
    }) 

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      cityNameControl: [null, [Validators.required]],
      zoneNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      cityNameControlEdit: [null, [Validators.required]],
      zoneNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
    });
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
  cityList:any =[];
  zoneList:any =[];
  zoneObj: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
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
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.disableAdd = false;
   }
 
   onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormEdit.reset();
    this.applicantDetailsFormSubmitted = false;
    this.applicantDetailsFormEditSubmitted = false;
    this.disableAdd = false;
   }


  
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };


  addZoneData;
  editZoneData;

  onAddZonedata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.zoneNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      city_id:this.applicantDetailsForm.value.cityNameControl.id_string
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      console.log(this.ad)
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/zone',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/zone/list').subscribe(data=>{
            this.zoneList = data;
            console.log('List: ', this.zoneList);
            this.addedSuccessfullyToast=true;
            $('#addSectionModal').modal('hide');
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

onEditZonedata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    name:this.applicantDetailsFormEdit.value.zoneNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    city_id:this.applicantDetailsFormEdit.value.cityNameControlEdit.id_string
  }
  this.disableAdd = true;

  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/zone/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/zone/list').subscribe(data=>{
          this.zoneList = data;
          console.log('List: ', this.zoneList);
          this.editedSuccessfullyToast=true;
          $('#editSectionModal').modal('hide');
          this.disableAdd = false;
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
      }
    },(err) => {
      this.disableAdd = false;
      this.exceptionToast=true;

    });
  }

}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data => {
    this.cityList = data;
  }) 
}

onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data => {
    this.cityList = data;
  }) 
}
 


  ngOnInit(): void {
  }

}
