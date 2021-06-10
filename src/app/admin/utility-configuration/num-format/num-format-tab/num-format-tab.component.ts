import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { FilterService } from '../../../../common/filter/filter.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl ,ValidatorFn, ValidationErrors} from '@angular/forms';
declare var $:any;
import { Subject } from 'rxjs';

@Component({
  selector: 'app-num-format-tab',
  templateUrl: './num-format-tab.component.html',
  styleUrls: ['./num-format-tab.component.scss'],
  providers:[ErrorMessage]
})

export class NumFormatTabComponent implements OnInit {
  

  constructor(private fb: FormBuilder,private apiService : ApiService,private filterService : FilterService,private formBuilder: FormBuilder,private sessionService : SessionService ) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    $('#table1').DataTable().order([ 1, 'asc' ]).draw()

    this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data=>{
      this.numformatList = data;
    })
    // this.apiService.get('utility/'+this.utilityIdString+'/sub_module/list').subscribe(data1=>{
    //   this.submoduleList = data1.results;
      
    // })
    this.apiService.get('submodule/list').subscribe(data1=>{
      this.submoduleList = data1.results;
      
    })

    this.apiService.get('module/list').subscribe(data1=>{
      this.moduleList = data1.results;
      
    })

    // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    moduleNameControl:[null, [Validators.required]],
    subModuleNameControl: [null, [Validators.required]],
    prefixNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator, Validators.pattern("[a-zA-Z#_/.@+* ]*$")]],
    startingNoNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    currentNoNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]

  },{ validator: this.validate });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({
    // moduleNameControlEdit:[null, [Validators.required]], 
    // subModuleNameControlEdit: [null, [Validators.required]],
    prefixNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator, Validators.pattern("[a-zA-Z#_/.@+* ]*$")]],
    // startingNoNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]],
    // currentNoNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
  });
  }

  

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  
  validate(control: AbstractControl): ValidationErrors | null {
    if (control &&  control.get("startingNoNameControl") && control.get("currentNoNameControl")) {

      // the form controls and their value
      const highscore =  control.get("startingNoNameControl").value;
      const lowscore = control.get("currentNoNameControl").value;

      

      console.log(highscore,lowscore)

      // not valid, return an error
      if (lowscore > highscore) {
        console.log("SUUUUCCCESSS!!!")
        return { scoreError: true };
      }
      // valid
      return null;
    }
    // form controls do not exist yet, return null
    return null;
  }

  character_list:any=[];
  
    
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
 
  onKeyPress(event:any){
    console.log("NUMBER",event.target.value)
    this.applicantDetailsForm.controls.currentNoNameControl.setValue(event.target.value)
    
  }

  onPrefixPress(event:any){
    console.log("NUMBER",event.target.value)
    this.character_list.push(event.target.value)
    console.log(this.character_list)

    
  }
  
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  dtOptions: any = {};
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  numformatList: any =[];
  submoduleList: any =[];
  moduleList:any=[];
  numformatObj: any = {};
  numformatObj_edit: any = {};
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  showTable: boolean = true;
  showError: boolean = false;
  starting_value : number;

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
   }
 
   onCloseClick(){
    this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsFormEditSubmitted = false;
   }

  dataSet = [
 
]

blocks = [
  {
    name:       "Module",
  },

  {
      name:       "Sub Module",
  },
 
  {
      name:       "Prefix Format",
  },
  {
      name:       "Starting",
  },
  {
    name:       "Current",
  },
  {
    name:       "Action",
  },
]

moduleChange(){
  let module_id_string = this.applicantDetailsForm.value.moduleNameControl.id_string;
  console.log(module_id_string)
  // Submodule dropdown api call start
  this.apiService.get('submodule/list?module_id='+module_id_string).subscribe(data=>{
    this.submoduleList = data.results;
  })
  // Submodule dropdown api call end
}

onAddNumformatdata(){
  this.applicantDetailsFormSubmitted = true;
  let data ={
    sub_module_id:this.applicantDetailsForm.value.subModuleNameControl.id_string,
    module_id:this.applicantDetailsForm.value.moduleNameControl.id_string,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    prefix:this.applicantDetailsForm.value.prefixNameControl,
    startingno:this.applicantDetailsForm.value.startingNoNameControl,
    currentno:this.applicantDetailsForm.value.currentNoNameControl
  }

  if (this.applicantDetailsForm.invalid) {
    console.log(this.ad)
    // console.log("THIS",this.ad.currentNoNameControl._parent.errors)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/numformat',data).subscribe(result=>{
      if(result.state == 'success'){
        this.showTable = false;
      setTimeout(()=>{
        this.showTable = true;
      }, 0);
        this.addedSuccessfullyToast=true;
          $('#add_numformat').modal('hide');
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }
}

onEditNumformatdata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    // sub_module_id:this.applicantDetailsFormEdit.value.subModuleNameControlEdit.id_string,
    // module_id:this.applicantDetailsFormEdit.value.moduleNameControlEdit.id_string,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    prefix:this.applicantDetailsFormEdit.value.prefixNameControlEdit,
    // startingno:this.applicantDetailsFormEdit.value.startingNoNameControlEdit,
    // currentno:this.applicantDetailsFormEdit.value.currentNoNameControlEdit
  }

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    this.apiService.put('utility/numformat/'+this.id_string,data).subscribe(result=>{
      if(result.state == 'success'){
        this.showTable = false;
      setTimeout(()=>{
        this.showTable = true;
      }, 0);
      this.editedSuccessfullyToast=true;
      $('#edit_numformat').modal('hide');
      this.applicantDetailsFormEdit.reset();
      this.applicantDetailsFormEditSubmitted = false;
      }
    },(err) => {
      this.exceptionToast=true;

    });
  }
}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('utility/numformat/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      console.log("RESULT",result)
      this.applicantDetailsFormEdit.controls.emailNameControlEdit.setValue(result.results.email)
      this.applicantDetailsFormEdit.controls.emergencyNoControlEdit.setValue(result.results.emergency_no)
      this.applicantDetailsFormEdit.controls.workingDaysControlEdit.setValue(result.results.working_days)
      this.applicantDetailsFormEdit.controls.siteNameControlEdit.setValue(result.results.portal_site)
    }
  },(err) => {
  });
}
onAddClick(){
  

}

  ngOnInit(): void {
    
    this.adjustbilltype = this.fb.group({            
      billtype: '',
    });
    const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        processing:false,
      //   dom: 'Bfrtip',
      //   buttons: [
      //     'copy', 'csv', 'excel', 'print'
      // ],
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
          
          that.apiService.get(`utility/${that.utilityIdString}/numformat/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.dataSet = resp.results;

              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
        },
      };
  }

}
