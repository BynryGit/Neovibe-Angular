import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-territory-division',
  templateUrl: './territory-division.component.html',
  styleUrls: ['./territory-division.component.scss'],
  providers: [ErrorMessage]
})
export class TerritoryDivisionComponent implements OnInit {

  area: any =[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  zoneList:any =[];
  divisionObj: any = {};
  divisionList: any =[];
  searchText;
  disableAdd:boolean = false;


  constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 
    this.apiService.get('utility/'+this.utilityIdString+'/zone/list').subscribe(data=>{
      this.zoneList = data;
      console.log(this.zoneList.results)
    })

    this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data=>{
      this.divisionList = data;
      console.log(this.divisionList.results)
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      zoneNameControl: [null, [Validators.required]],
      divisionNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator, Validators.pattern("[a-zA-Z ]*$")]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      zoneNameControlEdit: [null, [Validators.required]],
      divisionNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator, Validators.pattern("[a-zA-Z ]*$")]]
    });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;

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


  addDivisionData;
  editDivisionData;

  onAddDivisiondata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.divisionNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      zone_id:this.applicantDetailsForm.value.zoneNameControl.id_string
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('utility/division',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data=>{
            this.divisionList = data;
            console.log('List: ', this.divisionList);
            this.addedSuccessfullyToast=true;
            $('#add_division').modal('hide');
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
id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data => {
    this.divisionList = data;
  }) 
}
onEditDivisiondata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    name:this.applicantDetailsFormEdit.value.divisionNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    zone_id:this.applicantDetailsFormEdit.value.zoneNameControlEdit.id_string
  }
  this.disableAdd = true;

  

  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/division/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data=>{
          this.divisionList = data;
          console.log('List: ', this.divisionList);
          this.editedSuccessfullyToast=true;
          $('#edit_division').modal('hide');
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


onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/zone/list').subscribe(data => {
    this.zoneList = data;
  }) 
}

  ngOnInit(): void {
  }

}
