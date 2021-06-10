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
  selector: 'app-territory-subarea',
  templateUrl: './territory-subarea.component.html',
  styleUrls: ['./territory-subarea.component.scss'],
  providers: [ErrorMessage]
})
export class TerritorySubareaComponent implements OnInit {

  constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.filterService.getPagination().subscribe(data=>{
      // $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      // $('#table1').DataTable().search(data.text).draw()
    })

    // $('#table1').DataTable().order([ 1, 'asc' ]).draw()
  
    // this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
    //   this.subareaList = data;
    //   console.log(this.subareaList.results)
    // })
    this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data => {
      this.areaList = data;
    }) 

    // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    areaNameControl: [null, [Validators.required]],
    subareaNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
  });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({
    areaNameControlEdit: [null, [Validators.required]],
    subareaNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
  });
   }
  
   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }
  dtOptions:any;
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

  searchText;

  dataSet = [
    
    
]
 blocks = [
    {
        name:       "Sub Area",
    },
    {
      name:       "Area",
    },
   {
    name:       "Zone",
   },
   {
    name:       "Division",
   },
  {
      name:       "City",
  },
  {
      name:       "State",
  },
  {
    name:       "Country",
  },
  {
    name:       "Created Date",
  },
  {
        name:       "Action",
  }

    
]


addSubAreaData;
editSubAreaData;
subareaObj: any = {};
areaList: any =[];
showTable: boolean = true;
onAddSubAreadata(){
  this.applicantDetailsFormSubmitted = true;
  let data ={
    name:this.applicantDetailsForm.value.subareaNameControl,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    area_id:this.applicantDetailsForm.value.areaNameControl.id_string
  }
  this.disableAdd = true;

  if (this.applicantDetailsForm.invalid) {
    this.disableAdd = false;
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.post('utility/subarea',data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        console.log("CALLED")
        this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#addSubareaModal').modal('hide');
        this.applicantDetailsForm.reset();
        this.disableAdd = false;
        this.applicantDetailsFormSubmitted = false;
        // this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
        //   this.subareaList = data;
        //   console.log('List: ', this.subareaList);
        //   this.addedSuccessfullyToast=true;
        //   $('#addSubareaModal').modal('hide');
        //   this.applicantDetailsForm.reset();
        //   this.applicantDetailsFormSubmitted = false;
        // })
      }
    },(err) => {
      this.disableAdd = false;
      this.exceptionToast=true;
    });
  }
}

onEditSubAreadata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    name:this.applicantDetailsFormEdit.value.subareaNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    area_id:this.applicantDetailsFormEdit.value.areaNameControlEdit.id_string
  }
  this.disableAdd = true;

  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    console.log(this.ad)
    return;
  }else{
    console.log("Data",data);
    this.apiService.put('utility/subarea/'+this.id_string,data).subscribe(result=>{
      console.log('REEEEEEEE: ', result);
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/subarea/list').subscribe(data=>{
          this.subareaList = data;
          console.log('List: ', this.subareaList);
          this.editedSuccessfullyToast=true;
          $('#editSubareaModal').modal('hide');
          this.applicantDetailsFormEdit.reset();
          this.disableAdd = false;
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
  this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data => {
    this.areaList = data;
  }) 
}

onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data => {
    this.areaList = data;
  }) 
}

ngOnInit(): void {
  const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing:true,
    //   dom: 'Bfrtip',
    //   buttons: [
    //     'copy', 'csv', 'excel', 'print'
    // ],
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`utility/${that.utilityIdString}/subarea/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
            console.log("ININININI")
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
  ngAfterViewInit() {
    this.dtTrigger.next();
}
  }


