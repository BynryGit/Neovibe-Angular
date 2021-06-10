import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss'],
  providers: [ErrorMessage]
})
export class UserSkillsComponent implements OnInit {

  constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) { 
    this.filterService.getPagination().subscribe(data=>{
      $('#table_skills').DataTable().page.len(data.number).draw()
      console.log(data.number)
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    $('#table1').DataTable().order([ 1, 'asc' ]).draw()

  
    this.apiService.get('utility/'+this.utilityIdString+'/skill/list').subscribe(data=>{
      this.skillList = data;
      console.log(this.skillList.results)
    })

    // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    
    skillNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
  });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({
    
    skillNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator]]
  });
  }

  noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
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
  subareaList: any =[];
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  searchText;
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
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
   }
 
   onCloseClick(){
    this.applicantDetailsFormSubmitted = false;
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  blocks = [
    {
        name:       "Skill",
    },
    {
        name:       "Status",
    },
    {
        name:       "Created by",
    },
    {
        name:       "Created date",
    },
    {
        name:       "Action",
    },

    
]


addSkillData;
editSkillData;
skillObj: any = {};
skillList: any =[];
showTable: boolean = true;
onAddSubAreadata(){
  this.applicantDetailsFormSubmitted = true;
  let data ={
    skill:this.applicantDetailsForm.value.skillNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
  }

  if (this.applicantDetailsForm.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/skill',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/skill/list').subscribe(data=>{
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
          $('#add_user_skill').modal('hide');
          this.applicantDetailsForm.reset();
          this.applicantDetailsFormSubmitted = false;
        })
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }
}

onEditSkilldata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    skill:this.applicantDetailsFormEdit.value.skillNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
  }

  if (this.applicantDetailsFormEdit.invalid) {
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/skill/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/skill/list').subscribe(data=>{
          this.skillList = data;
          console.log('List: ', this.skillList);
          this.editedSuccessfullyToast=true;
          $('#edit_user_skill').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.applicantDetailsFormEditSubmitted = false;
        })
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
}

dataSet = []

files: File[] = []; 
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
  showContent;
  ngOnInit(): void {
    const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
            that.apiService.get(`utility/${that.utilityIdString}/skill/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
