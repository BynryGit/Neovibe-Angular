import { Component, OnInit, Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../common-services/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { SessionService } from '../../../common-services/session-service/session.service';
import { Alert } from 'bootstrap';
declare var $: any;

@Component({
  selector: 'app-update-billpay',
  templateUrl: './update-billpay.component.html',
  styleUrls: ['./update-billpay.component.scss']
})
export class UpdateBillPayComponent implements OnInit  {
	@Input() trigger
  	@Input() consumerId
	faCalendarAlt = faCalendarAlt
	channel_list = []
	mode_list = []
	approveForm : FormGroup;
	approveFormSubmitted: boolean = false
	utilityIdString = this.sessionService.getter('utility_id_string')
	scrollOptions = {
	    autoHide: true,
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };
	// meter list
	meter_list = []
	showtoast : boolean;
	showexceptiontoast : boolean;
	exception_message :string;
	selected_meter_no: string = '---'
	constructor(private apiService : ApiService, private sessionService : SessionService, private router : Router, private formBuilder: FormBuilder ){
	// Consumer payment form code start
	this.approveForm = this.formBuilder.group({
	channel : [null, [Validators.required]],
	mode : [null, [Validators.required]],
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
	})
// Consumer payment form code end
	}
	
	ngOnInit(): void {
	// Api call for meter list
	this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerId).subscribe(data=>{
		for(let item of data['results']){
			this.meter_list.push({"id_string": item.id_string, "meter_no": item.meter_id.meter_no})
		}
	},error=>{
		console.log(error.error)
	})
	// Api call for meter list

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
	}
	change_meter_no() {
		console.log("###########", this.approveForm.controls.meter.value)
	}
	get af() { return this.approveForm.controls;}
	// form submit
	onApproveFormSubmit(){
		this.approveFormSubmitted = true;
		let date_obj = this.approveForm.value.date
		let str_date = date_obj.year + "-"+ date_obj.month + "-"+ date_obj.day
    	if(this.approveForm.invalid){
    		return
    	}else{
    		let data = {

    		}
    		this.apiService.post('consumer/billpayment', data).subscribe(data=>{
    			console.log(data)
				this.showtoast = true;
				$('#connectModal').modal('hide');
    		},error=>{
    			this.exception_message = error.error.result;
				this.showexceptiontoast = true;
    		})
    	}
	}
}
