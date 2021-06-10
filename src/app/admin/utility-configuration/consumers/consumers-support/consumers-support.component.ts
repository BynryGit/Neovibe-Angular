import { FilterService } from '../../../../common/filter/filter.service';
import { Subject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup,FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
declare var $:any;

@Component({
  selector: 'app-consumers-support',
  templateUrl: './consumers-support.component.html',
  styleUrls: ['./consumers-support.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumersSupportComponent implements OnInit {

  constructor(private filterService : FilterService, private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    
    this.apiService.get('utility/'+this.utilityIdString+'/city/list').subscribe(data=>{
      this.cityList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      cityNameControl: [null, [Validators.required]],
      supportNameControl: [null, [Validators.required,this.noWhitespaceValidator]],
      emailNameControl:[null,[Validators.required,Validators.email]],
      phoneNameControl:[null,[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]],
      descriptionNameControl:[null,[Validators.required,this.noWhitespaceValidator]]

    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      cityNameControlEdit: [null, [Validators.required]],
      supportNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      emailNameControlEdit:[null,[Validators.required,Validators.email]],
      phoneNameControlEdit:[null,[Validators.required,Validators.pattern('^[0-9]+$'),Validators.maxLength(10)]],
      descriptionNameControlEdit:[null,[Validators.required,this.noWhitespaceValidator]],
      cityNameControlEditHidden:[null,]
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
   support_Obj: any = {};
   support_Obj1: any = {};
   support_Obj2: any = {};
   support_Obj3: any = {};
   utilityIdString = this.sessionService.getter("utility_id_string_admin");
   consumer_category;
   supportList:any={};
   cityList:any={};
   disableAdd:boolean = false;
   showTable: boolean = true;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  blocks = [
    {
        name:       "Name",
    },
    {
       name:       "City",
    },
    {
       name:       "Email ID",
    },
    {
       name:       "Phone No.",
    },
    {
      name:       "Description",
   },
    {
      name:       "Action",
   },
]

  addSupportData;
  editSupportData;
  searchText;

  dataSet = [

  ]

  id_string;
  onCardClickEvent(item:any){
    this.id_string = item.id_string;
    this.apiService.get('consumer/support/'+this.id_string).subscribe(result=>{
      if(result.state == 'success'){
        console.log("RESULT",result)
        this.applicantDetailsFormEdit.controls.emailNameControlEdit.setValue(result.results.email_id)
        this.applicantDetailsFormEdit.controls.phoneNameControlEdit.setValue(result.results.phone_no)
        this.applicantDetailsFormEdit.controls.supportNameControlEdit.setValue(result.results.name)
        this.applicantDetailsFormEdit.controls.descriptionNameControlEdit.setValue(result.results.description)
        this.applicantDetailsFormEdit.controls.cityNameControlEditHidden.setValue(result.results.city.id_string)
        this.applicantDetailsFormEdit.controls.cityNameControlEdit.setValue(result.results.city.name)
        
      }
    },(err) => {
      this.exceptionToast=true;
    });
  }

  onCityEditChange(){
    console.log("HUJ")
    this.applicantDetailsFormEdit.value.cityNameControlEditHidden = this.applicantDetailsFormEdit.value.cityNameControlEdit.id_string;
  }

  onAddSupport(){
    this.applicantDetailsFormSubmitted = true;
    let data ={
      name:this.applicantDetailsForm.value.supportNameControl,
      city_id:this.applicantDetailsForm.value.cityNameControl.id_string,
      email_id:this.applicantDetailsForm.value.emailNameControl,
      phone_no:this.applicantDetailsForm.value.phoneNameControl,
      description:this.applicantDetailsForm.value.descriptionNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      console.log(this.ad)
      this.disableAdd = false;
      return;
    }else{
      console.log("Data",data);
      this.apiService.post('consumer/support',data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
            $('#addConsumerSupportModal').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsForm.reset();
            this.applicantDetailsFormSubmitted = false;
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;
      });
    }
  }

  onEditSupport(){
    
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      name:this.applicantDetailsFormEdit.value.supportNameControlEdit,
      city_id:this.applicantDetailsFormEdit.value.cityNameControlEditHidden,
      email_id:this.applicantDetailsFormEdit.value.emailNameControlEdit,
      phone_no:this.applicantDetailsFormEdit.value.phoneNameControlEdit,
      description:this.applicantDetailsFormEdit.value.descriptionNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      console.log(this.ade)
      return;
    }else{
      console.log("Data",data);
      this.apiService.put('consumer/support/'+this.id_string,data).subscribe(result=>{
        console.log('REEEEEEEE: ', result);
        if(result.state == 'success'){
          this.showTable = false;
          setTimeout(()=>{
            this.showTable = true;
          }, 0);
          this.editedSuccessfullyToast=true;
            $('#editConsumerSupportModal').modal('hide');
            this.disableAdd = false;
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
        }
      },(err) => {
        this.exceptionToast=true;
        this.disableAdd = false;
  
      });
    }
  
  }

 

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
        
        that.apiService.get(`consumer/utility/${that.utilityIdString}/support/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
