import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../common-services/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../error-messages/error-messages';
declare var $: any;

@Component({
  selector: 'app-consumer-approve',
  templateUrl: './consumer-approve.component.html',
  styleUrls: ['./consumer-approve.component.scss']
})
export class ConsumerApproveComponent implements OnInit {

	faCalendarAlt = faCalendarAlt
	approveForm : FormGroup;
    approveFormSubmitted = false;
    workOrders = []
    utility = '788a55b4-e183-4144-95fc-5e075138d9a6'
    consumerId = '443d641e-5abf-46da-bc3b-14933dfc39ca'
    consumer : any;
	message = new ErrorMessage()
    scrollOptions = { 
	    autoHide: true, 
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };

	constructor(private apiService : ApiService, private router : Router, private formBuilder: FormBuilder) {

		// Consumer approve form code start
	    	this.approveForm = this.formBuilder.group({
	    		workOrder : [null, [Validators.required]],
	    		date : [null, [Validators.required]],
	    	})
	    // Consumer approve form code end

	    // Api call for work orders
	    this.apiService.get('work-order/utility/'+this.utility+"/list").subscribe(data=>{
	    	for(let item of data['results']){
	    		this.workOrders.push(item)
	    	}
	    },error=>{
	    	console.log(error.error)
	    })
	    // Api call for work orders
	}

	ngOnInit(): void {
		this.apiService.get("consumer/"+this.consumerId).subscribe(data=>{
	  		this.consumer = data['result']
    	})
		$('#consumerApproveModal').modal('show');
	}

	// consumer approve form control start
    get af() { return this.approveForm.controls; }
    // consumer approve form control end

	onApproveFormSubmit(){
		this.approveFormSubmitted = true;
    	if(this.approveForm.invalid){
    		return
    	}else{
    		let data = {
    			work_order_master_id : this.approveForm.value.workOrder.id_string,
    			consumer_id : this.consumer.id_string,
    			address_line_1 : this.consumer.billing_address_line_1,
			    street : this.consumer.billing_street,
			    zipcode : this.consumer.billing_zipcode,
			    state_id : this.consumer.billing_state.id_string,
			    city_id : this.consumer.billing_city.id_string,
			    area_id : this.consumer.billing_area.id_string,
			    sub_area_id : this.consumer.billing_sub_area.id_string,
			    premise_id : this.consumer.premise.id_string
    		}
    		this.apiService.post('consumer/approve', data).subscribe(data=>{
    			console.log(data)
    		},error=>{
    			console.log(error.error)
    		})
    	}
	}

}
