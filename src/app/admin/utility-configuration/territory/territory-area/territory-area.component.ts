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
  selector: 'app-territory-area',
  templateUrl: './territory-area.component.html',
  styleUrls: ['./territory-area.component.scss'],
  providers: [ErrorMessage]
})
export class TerritoryAreaComponent implements OnInit {

  area: any =[];
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
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  zoneList:any =[];
  areaObj: any = {};
  areaList: any =[];
  countryList:any=[];
  stateList:any=[];
  divisionList:any=[];
  cityList:any=[];
  regionList:any=[];
  searchText;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  showTable: boolean = true;
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


  

constructor(private filterService : FilterService, private apiService : ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
  this.filterService.getPagination().subscribe(data=>{
    // $('#table1').DataTable().page.len(data.number).draw()
  })

  this.filterService.getSearchText().subscribe(data=>{
    // $('#table1').DataTable().search(data.text).draw()
  })

  // $('#table1').DataTable().order([ 1, 'asc' ]).draw()

  
  this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data=>{
    this.divisionList = data;
  })
  this.apiService.get('utility/'+this.utilityIdString+'/country/list').subscribe(data=>{
    this.countryList = data;
  })
  this.apiService.get('utility/'+this.utilityIdString+'/state/list').subscribe(data=>{
    this.stateList = data;
    
  })
  this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
    this.cityList = data;
    
  })
  this.apiService.get('utility/'+this.utilityIdString+'/region/list').subscribe(data=>{
    this.regionList = data;
    
  })

  // Applicant details form code start
  this.applicantDetailsForm = this.formBuilder.group({
    divisionNameControl: [null, [Validators.required]],
    areaNameControl: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
  });

   // Applicant details form code start
   this.applicantDetailsFormEdit = this.formBuilder.group({
    divisionNameControlEdit: [null, [Validators.required]],
    areaNameControlEdit: [null, [Validators.required,Validators.maxLength(20),this.noWhitespaceValidator,Validators.pattern("[a-zA-Z ]*$")]]
  });

}



noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
  const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
  const isValid = !isWhitespace;
  return isValid ? null : { 'whitespace': true };
}

addAreaData;
  editAreaData;

  onAddAreadata(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.areaNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      division_id:this.applicantDetailsForm.value.divisionNameControl.id_string
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      
      this.apiService.post('utility/area',data).subscribe(result=>{
        if(result.state == 'success'){
        this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#addAreaModal').modal('hide');
        this.applicantDetailsForm.reset();
        this.disableAdd = false;
        this.applicantDetailsFormSubmitted = false;
          // this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data=>{
          //   this.areaList = data;
          //   console.log('List: ', this.areaList);
          //   this.addedSuccessfullyToast=true;
          //   $('#addAreaModal').modal('hide');
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

onEditAreadata(){
  this.applicantDetailsFormEditSubmitted = true;
  let data ={
    name:this.applicantDetailsFormEdit.value.areaNameControlEdit,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string_admin"),
    division_id:this.applicantDetailsFormEdit.value.divisionNameControlEdit.id_string
  }
  this.disableAdd = true;

  if (this.applicantDetailsFormEdit.invalid) {
    this.disableAdd = false;
    return;
  }else{

    this.apiService.put('utility/area/'+this.id_string,data).subscribe(result=>{
      
      if(result.state == 'success'){
        this.apiService.get('utility/'+this.utilityIdString+'/area/list').subscribe(data=>{
          this.areaList = data;
         
          this.editedSuccessfullyToast=true;
          $('#editAreaModal').modal('hide');
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
  this.id_string = item.id_string
}
onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/division/list').subscribe(data => {
    this.divisionList = data;
  }) 
}


  dataSet = [
]



  blocks = [
    {
        name:       "Area",
    },
    {
       name:       "Division",
    },
    {
      name:       "Zone",
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
      name:       "Region",
    },
    {
      name:       "Created Date",
    },
    {
       name:       "Action",
    }
]

  ngOnInit(): void {
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
          
          that.apiService.get(`utility/${that.utilityIdString}/area/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
}
