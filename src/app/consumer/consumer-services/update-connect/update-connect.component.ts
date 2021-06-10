import { Component, OnInit, Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../common-services/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../../error-messages/error-messages';
import { SessionService } from '../../../common-services/session-service/session.service';
import { Alert } from 'bootstrap';
declare var $: any;

@Component({
  selector: 'app-update-connect',
  templateUrl: './update-connect.component.html',
  styleUrls: ['./update-connect.component.scss']
})
export class UpdateConnectComponent implements OnInit {
  faCalendarAlt = faCalendarAlt
  approveForm : FormGroup;
  approveFormSubmitted = false;
  workOrders = []
  @Input() trigger
  @Input() consumerId
  consumerIdString : String
  utilityIdString = this.sessionService.getter('utility_id_string')
  consumer : any;
	message = new ErrorMessage()
	user_remark :string = "";
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
  	constructor(private apiService : ApiService, private sessionService : SessionService, private router : Router, private formBuilder: FormBuilder ) {
		// Consumer connect form code start
	    	this.approveForm = this.formBuilder.group({
				meter : [null, [Validators.required]],
	    	date : [null, [Validators.required]],
				user_remark: [null, [Validators.required]],
	    	})
	    // Consumer connect form code end

	}

  	ngOnInit(): void {
		this.trigger
    	this.consumerIdString = this.consumerId
		this.showtoast = false;
		this.showexceptiontoast = false;
		this.apiService.get("consumer/"+this.consumerId).subscribe(data=>{
	  	this.consumer = data['result']
			// Api call for meter list
			this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerIdString+"&temporary_disconnected_meter=true").subscribe(data=>{
				for(let item of data['results']){
					this.meter_list.push({"id_string": item.id_string, "meter_no": item.meter_id.meter_no})
				}
			},error=>{
				console.log(error.error)
			})
			// Api call for meter list
    	})
    }

    // consumer disconnect form control start
    get af() { return this.approveForm.controls; }
    // consumer disconnect form control end

    onCancelClick(){
     this.approveFormSubmitted = false;
     this.approveForm.reset();
   }

	onApproveFormSubmit(){
		this.approveFormSubmitted = true;
		let date_obj = this.approveForm.value.date
		let str_date = date_obj.year + "-"+ date_obj.month + "-"+ date_obj.day
    	if(this.approveForm.invalid){
    		return
    	}else{
    		let data = {
				consumer_service_contract_detail_id : this.approveForm.value.meter.id_string,
    			consumer_id : this.consumer.id_string,
				sa_date: str_date,
    			address_line_1 : this.consumer.billing_address_line_1,
			    street : this.consumer.billing_street,
			    zipcode : this.consumer.billing_zipcode,
			    state_id : this.consumer.billing_state.id_string,
			    city_id : this.consumer.billing_city.id_string,
			    area_id : this.consumer.billing_area.id_string,
			    sub_area_id : this.consumer.billing_sub_area.id_string,
			    premise_id : this.consumer.premise.id_string,
				utility_id: this.consumer.utility_id_string,
				sa_user_remark: this.user_remark
    		}
    		this.apiService.post('consumer/connect', data).subscribe(data=>{
    			console.log(data)
				this.showtoast = true;
				$('#connectModal').modal('hide');
				this.approveFormSubmitted = false;
				this.approveForm.reset();
    		},error=>{
    			this.exception_message = error.error.result;
				this.showexceptiontoast = true;
    		})
    	}
	}

}
