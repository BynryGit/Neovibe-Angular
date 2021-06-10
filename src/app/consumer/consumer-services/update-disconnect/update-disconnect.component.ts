import { Component, OnInit, Input } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../common-services/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../../error-messages/error-messages';
import { SessionService } from '../../../common-services/session-service/session.service';
// import { DatePipe } from '@angular/common';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap'
declare var $: any;

@Component({
  selector: 'app-update-disconnect',
  templateUrl: './update-disconnect.component.html',
  styleUrls: ['./update-disconnect.component.scss']
})
export class UpdateDisconnectComponent implements OnInit {

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
	exception_message: string;
    scrollOptions = {
	    autoHide: true,
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };
	user_remark :string = "";
	showModal: Boolean = false;
	showtoast: Boolean = false 
    // meter list
    meter_list = []
	consumer_service_contract_details: String
	selected_consumer_no :string;
	selected_meter_no: string;
	selected_disconnection_type: string;
	outstanding_amount : number;
	request_created_date : String;
	service_appointment_no : String;
	servive_appointment_id_string : String;
	work_order_type_selected : String;
	showexceptiontoast : boolean;
	isSubmitDisabled : boolean = true
	showOutstandingAmount : boolean = false
	showApprovementModel : boolean = false
	isDisabled:boolean=false;
	applicantDetailToast = false;
	storeDisconnectid;
	storeServicenumber;
	// todayDate=this.datePipe.transform(new Date(), 'yyyy-MM-dd')
	// Disconnect Type parameters
	disconnect_types = [
		{id: 'TEMPORARY', name: 'Temporary'},
		{id: 'PERMANENT', name: 'Permanent'},
	];

	constructor(private apiService : ApiService,private sessionService : SessionService, private router : Router, private formBuilder: FormBuilder, private config: NgbDatepickerConfig) {
		// Consumer disconnect form code start
	    	this.approveForm = this.formBuilder.group({
	    		meter : [null, [Validators.required]],
	    		disconnect_type : [null, [Validators.required]],
	    		date : [null, [Validators.required]],
				user_remark: [null,],
	    	})
	    // Consumer disconnect form code end
	    const current = new Date();
	    config.minDate = {year: current.getFullYear(), month:
	    	current.getMonth() + 1, day: current.getDate() };
	    config.outsideDays = 'hidden';

		this.showtoast = false;
	}

	ngOnInit(): void {
		console.log("inside ngggggggg")
		this.trigger
        this.consumerIdString = this.consumerId
		this.outstanding_amount = 12
		this.apiService.get("consumer/"+this.consumerId).subscribe(data=>{
	  	this.consumer = data['result']
		this.showexceptiontoast = false
		    // Api call for meter list
		      this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerIdString).subscribe(data=>{
		    	  for(let item of data['results']){
		    		this.meter_list.push({"id_string": item.id_string, "meter_no": item.meter_id.meter_no})
		    	}
		    },error=>{
		    	console.log(error.error)
		    })
			// Api call for meter list
    	})

    }

	// function to print the invoice 
// 	printComponent(cmpName) {
// 		let printContents = document.getElementById(cmpName).innerHTML;
// 		let originalContents = document.body.innerHTML;
// 		document.body.innerHTML = printContents;
// 		window.print();
// 		document.body.innerHTML = originalContents;
// 		window.location.reload()
//    }

	//function to print the invoice end    

    // consumer disconnect form control start
    get af() { return this.approveForm.controls; }
    // consumer disconnect form control end


	 //Bootstrap Modal Close event
	 hide_disconnect_success_modal()
	 {
	   this.showModal = false;
	 }

	 onCancelClick(){
	 	this.approveFormSubmitted = false;
	 	this.approveForm.reset();
	 }

	onApproveFormSubmit(){
		this.isDisabled = true;
		this.approveFormSubmitted = true;
		let date_obj = this.approveForm.value.date

		if (this.approveForm.value.user_remark) {
			this.user_remark = this.approveForm.value.user_remark;
		}
    	if(this.approveForm.invalid){
    		this.applicantDetailToast = true;
    		this.isDisabled = false;
    		console.log("invalidddddddddd")
    		// return
    	}else{
    		let str_date = date_obj.year + "-"+ date_obj.month + "-"+ date_obj.day
    		let data = {
				disconnect_type : this.approveForm.value.disconnect_type.id,
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
				utility_id : this.utilityIdString,
				sa_description: this.user_remark
    		}
    		this.apiService.post('consumer/disconnect', data).subscribe(data=>{
    			console.log("successs",data)
    			this.storeDisconnectid = data.result.id_string
    			console.log("id=====",this.storeDisconnectid )
    			this.apiService.get('work-order/service-appointment/'+this.storeDisconnectid).subscribe(ress=>{
    				console.log("resilllll",ress)
		          this.storeServicenumber=ress.results.sa_number;
		          console.log("number==",this.storeServicenumber)
		        })
				//   this.selected_disconnection_type = this.approveForm.value.disconnect_type.name
				//   this.selected_consumer_no = this.consumer.consumer_no
				//   this.selected_meter_no = this.approveForm.value.meter.meter_no
          		//   this.request_created_date = data['result'].sa_date.split("T")[0]
          		//   this.service_appointment_no  = data['result'].sa_number
                //   this.servive_appointment_id_string = data['result'].id_string
                //   this.work_order_type_selected = data['result'].work_order_master_id.name
				//   this.showModal = true;
				this.showtoast = true
				$('#disconnectModal').modal('hide');
				this.approveForm.reset();
				this.isDisabled = false;
				this.approveFormSubmitted = false;
    		},error=>{

    			this.exception_message = error.error.result;
				this.showexceptiontoast = true;
				this.isDisabled = false;
				$('#disconnectModal').modal('hide');
				this.approveForm.reset();
    		})
    	}
	}

}
