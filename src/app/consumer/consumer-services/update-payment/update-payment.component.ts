import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';
import { FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { faChevronLeft, faTrash , faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
declare var $: any;
@Component({
  selector: 'app-update-payment',
  templateUrl: './update-payment.component.html',
  styleUrls: ['./update-payment.component.scss']
})
export class UpdatePaymentComponent implements OnInit {
  @Input() trigger;
  @Input() consumerId
  consumerIdString
  consumer
  meter_list = []
  faCalendarAlt = faCalendarAlt;
  faPlus = faPlus
  faTrash = faTrash
  approveForm : FormGroup;
  transaction: FormArray;
  channel_list = [];
  payment_type_list = [];
  payment_sub_type_list = [];
  mode_list =[];
  approveFormSubmitted = false;
  exception_message
  showexceptiontoast = false
  showtoast = false
  utilityIdString = this.sessionService.getter('utility_id_string')
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  createItem(): FormGroup {
    return this.formBuilder.group({
      payment_type : [null, [Validators.required]],
      payment_sub_type : [null, [Validators.required]],
    });
  }

  constructor(private apiService : ApiService,
    private sessionService : SessionService,
    private router : Router,
    private formBuilder: FormBuilder ) {

      // Consumer payment form code start
          this.approveForm = this.formBuilder.group({
          channel : [null, [Validators.required]],
          mode : [null, [Validators.required]],
          payment_type : [null, [Validators.required]],
          payment_sub_type : [null, [Validators.required]],
          amount: [null, [Validators.required]],
          tax: [null, [Validators.required]],
          date: [null, [Validators.required]],
          account: [null, ],
          bank: [null,],
          ifsc: [null,],
          cheque_dd_no: [null,],
          cheque_dd_date: [null,],
          transaction_id: [null, ],
          payment_amount: [null, ],
          meter:[null, [Validators.required]],
          transaction : this.formBuilder.array([])
          })
     // Consumer payment form code end
  }
  ngOnInit(): void {
    this.consumerIdString = this.consumerId;

    this.apiService.get("consumer/"+this.consumerId).subscribe(data=>{
	  	this.consumer = data['result']
			// Api call for meter list
			this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerIdString).subscribe(data=>{
				for(let item of data['results']){
					this.meter_list.push({"name": item.meter_id.utility_product_id.name, "utility_product_id": item.meter_id.utility_product_id.id_string})
				}
			},error=>{
				console.log(error.error)
			})
			// Api call for meter list
    	})

    // api to fetch the payment channel
    this.apiService.get('utility/'+this.utilityIdString+'/payment/channel/list').subscribe(data=>{
      for(let item of data['results']){
        this.channel_list.push({"id_string": item.id_string, "name": item.name})
      }
    },error=>{
      console.log(error.error)
    })
    // api to fetch the payment channel end

    // api to fetch the payment mode
    this.apiService.get('utility/'+this.utilityIdString+'/payment/mode/list').subscribe(data=>{
      for(let item of data['results']){
        this.mode_list.push({"id_string": item.id_string, "name": item.name})
      }
    },error=>{
      console.log(error.error)
    })
    // api to fetch the payment mode end

    // api to fetch the payment type
    this.apiService.get('utility/'+this.utilityIdString+'/payment/type/list').subscribe(data=>{
      for(let item of data['results']){
        this.payment_type_list.push({"id_string": item.id_string, "name": item.name})
      }
    },error=>{
      console.log(error.error)
    })
    // api to fetch the payment  type

    // api to fetch the payment subtype
    this.apiService.get('utility/'+this.utilityIdString+'/payment/subtype/list').subscribe(data=>{
      for(let item of data['results']){
        this.payment_sub_type_list.push({"id_string": item.id_string, "name": item.name})
      }
    },error=>{
      console.log(error.error)
    })
    // api to fetch the payment subtype

  }
  add_payment_type_subtype() {
    
    this.transaction = this.approveForm.get('transaction') as FormArray
    this.transaction.push(this.createItem())
    console.log("##########################", this.approveForm.get('transaction'))
  }

  remove_payment_type_subtype(i) {
    this.transaction = this.approveForm.get('transaction') as FormArray;
    this.transaction.removeAt(i);
  }
  get af() { return this.approveForm.controls; }
  onApproveFormSubmit(){
    this.approveFormSubmitted = true;
		let date_obj = this.approveForm.value.date
		let str_date = date_obj.year + "-"+ date_obj.month + "-"+ date_obj.day
    	if(this.approveForm.invalid){
    		return
    	}else{
    		let data = {
				  utility: this.consumer.utility_id_string,
          payment_type_id : this.af.payment_type.value.id_string,
          transaction_amount : this.af.amount.value,
          // transaction_date : str_date,
          payment_mode_id : this.af.mode.value.id_string,
          payment_channel_id : this.af.channel.value.id_string,
          utility_product_id_string : this.af.meter.value.utility_product_id,
          bank_name : this.af.bank.value,
          account_no : this.af.account.value,
          // cheque_dd_no : this.af.cheque_dd_no.value,
          // cheque_dd_date : this.af.cheque_dd_date.value,
          ifsc_code : this.af.ifsc.value
    		}
        console.log("This is the data", data)
    		this.apiService.post('consumer/'+ this.consumerIdString +'/payment', data).subscribe(data=>{
				this.showtoast = true;
				$('#paymentModal').modal('hide');
    		},error=>{
        console.log("This is the error msg:", error);
    		this.exception_message = error.error.result;
				this.showexceptiontoast = true;
    		})
    	}
  }
}
