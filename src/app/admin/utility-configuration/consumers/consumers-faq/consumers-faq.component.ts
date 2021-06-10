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
  selector: 'app-consumers-faq',
  templateUrl: './consumers-faq.component.html',
  styleUrls: ['./consumers-faq.component.scss'],
  providers: [ErrorMessage]
})
export class ConsumersFaqComponent implements OnInit {

  constructor(private filterService : FilterService, private apiService:ApiService,private sessionService : SessionService,private formBuilder: FormBuilder) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.serviceList = data;
    })

    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      questionNameControl: [null, [Validators.required,this.noWhitespaceValidator]],
      answerNameControl: [null, [Validators.required,this.noWhitespaceValidator]]
    });

     // Applicant details form code start
     this.applicantDetailsFormEdit = this.formBuilder.group({
      questionNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator]],
      answerNameControlEdit: [null, [Validators.required,this.noWhitespaceValidator]]
    });

   }

   noWhitespaceValidator(control: AbstractControl):{ [key:string] :any } | null{
    const isWhitespace = (control && control.value && control.value.toString() || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
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
  serviceList:any={};
  serviceDetailsForm: FormGroup
  faEye = faEye;
  faPlus = faPlus;
  faq_Obj: any = {};
  faq_Obj1: any = {};
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  consumer_category;
  faqList:any={};
  service_details_list = [];
  disableAdd:boolean = false;
  applicantDetailsForm: FormGroup;
  applicantDetailsFormSubmitted = false;
  applicantDetailsFormEdit: FormGroup;
  applicantDetailsFormEditSubmitted = false;
  addedSuccessfullyToast = false;
  editedSuccessfullyToast = false;
  exceptionToast = false;
  showTable: boolean = true;

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
     this.applicantDetailsFormSubmitted = false
     this.disableAdd = false;
   }
 
   onCloseClick(){
     this.applicantDetailsForm.reset();
     this.applicantDetailsFormEdit.reset();
     this.applicantDetailsFormEditSubmitted = false;
     this.applicantDetailsFormSubmitted = false
     this.disableAdd = false;
   }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  blocks = [
    {
        name:       "Question",
    },
    {
       name:       "Answer",
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

dataSet = [
]

  addFaqData;
  editFaqData;
  searchText;

  // get ServiceDetails() {
  //   return this.serviceDetailsForm.get('serviceControl') as FormArray;
  // }

  // addServiceDetailsRow(){
  //   this.ServiceDetails.push(this.formBuilder.group({service_details:[null]}));
  // }

  onAddFaq(){
    this.applicantDetailsFormSubmitted = true;
    // for(let services of this.serviceDetailsForm.value.serviceControl){
    //   this.service_details_list.push(
    //     {
    //       id_string:services.service_details.id_string,
    //       value: services.service_details.name
    //     }
    //   );
    // }
    let data ={
      question:this.applicantDetailsForm.value.questionNameControl,
      answer:this.applicantDetailsForm.value.answerNameControl,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      is_active:true
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.post('consumer/faq',data).subscribe(result=>{
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#addConsumerFAQModal').modal('hide');
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

  onEditFaq(){
    this.applicantDetailsFormEditSubmitted = true;
    let data ={
      question:this.applicantDetailsFormEdit.value.questionNameControlEdit,
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      answer:this.applicantDetailsFormEdit.value.answerNameControlEdit
    }
    this.disableAdd = true;
    if (this.applicantDetailsFormEdit.invalid) {
      this.disableAdd = false;
      return;
    }else{
      this.apiService.put('consumer/faq/'+this.id_string,data).subscribe(result=>{
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
            this.editedSuccessfullyToast=true;
            $('#editConsumerFAQModal').modal('hide');
            this.disableAdd = true;
            this.applicantDetailsFormEdit.reset();
            this.applicantDetailsFormEditSubmitted = false;
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
  this.apiService.get('consumer/faq/'+this.id_string).subscribe(result=>{
    if(result.state == 'success'){
      console.log("RESULT",result)
      this.applicantDetailsFormEdit.controls.questionNameControlEdit.setValue(result.results.question)
      this.applicantDetailsFormEdit.controls.answerNameControlEdit.setValue(result.results.answer)
      
    }
  },(err) => {
  });
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
        
        that.apiService.get(`consumer/utility/${that.utilityIdString}/faq/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
