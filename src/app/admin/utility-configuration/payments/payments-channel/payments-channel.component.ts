import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { FilterService } from '../../../../common/filter/filter.service';
declare var $:any;
import { Subject } from 'rxjs';
@Component({
  selector: 'app-payments-channel',
  templateUrl: './payments-channel.component.html',
  styleUrls: ['./payments-channel.component.scss'],
  providers: [ErrorMessage]
})
export class PaymentsChannelComponent implements OnInit {

  constructor(private filterService : FilterService,private formBuilder: FormBuilder,private apiService:ApiService,private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })

    this.apiService.get('payment/type/list').subscribe(data=>{
      this.payment_type = data;
    })
    this.apiService.get('payment/subtype/list').subscribe(data=>{
      this.payment_subtype = data;
    })
    this.apiService.get('payment/mode/list').subscribe(data=>{
      this.payment_mode = data;
    })
    this.apiService.get('channel/list').subscribe(data=>{
      this.payment_channel = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      this.payment_typeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
      this.payment_subtypeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
      this.payment_modeList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
      this.payment_channelList = data;
    })
    this.apiService.get('utility/'+this.utilityIdString+'/product/list').subscribe(data=>{
      this.service_List = data;
    })
    // Applicant details form code start
    this.applicantDetailsForm = this.formBuilder.group({
      paymentChannelControl: [null, [Validators.required]],
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
  faEye = faEye;
  faPlus = faPlus;
  service_List:any={};
  payment_type:any={};
  payment_subtype:any={};
  payment_mode:any={};
  payment_channel:any={};
  payment_channelList:any={};
  payment_typeList:any={};
  payment_subtypeList:any={};
  payment_modeList:any={};
  payment_channelObj: any = {};
  payment_channelObj1: any = {};
  payment_channelObj2: any = {};
  payment_channelObj3: any = {};
  payment_channel_list=[];
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
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
   }
 
   onCloseClick(){
    this.applicantDetailsForm.reset();
    this.applicantDetailsFormSubmitted = false;
    this.disableAdd = false;
   }

  addPaymentChannelData;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  dataSet = [
  ]

  onAddPaymentChanneldata(){
    this.applicantDetailsFormSubmitted = true;
    for(let payment_mode of this.applicantDetailsForm.value.paymentChannelControl){
      this.payment_channel_list.push(
        {
          id_string: payment_mode.id_string,
          value: payment_mode.name
        }
      );
    }
    let data ={
      tenant_id:this.sessionService.getter("tenant_id_string"),
      utility_id:this.sessionService.getter("utility_id_string_admin"),
      channel_details:this.payment_channel_list,
      utility_product_id:1
    }
    this.disableAdd = true;

    if (this.applicantDetailsForm.invalid) {
      this.disableAdd = false;
      return;
      
    }else{
      this.apiService.post('utility/channel',data).subscribe(result=>{
        if(result.state == 'success'){
          this.showTable = false;
        setTimeout(()=>{
          this.showTable = true;
        }, 0);
        this.addedSuccessfullyToast=true;
        $('#add_payment_channel').modal('hide');
        this.payment_channel_list = [];
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



  blocks = [
    {
        name:       "Utility",
    },
    {
        name:       "Channel",
    },
    {
        name:       "Created by",
    },
    {
        name:       "Created date",
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
        
        that.apiService.get(`utility/${that.utilityIdString}/payment/channel/list?page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
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
