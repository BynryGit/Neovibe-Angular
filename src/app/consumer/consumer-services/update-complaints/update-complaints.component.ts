import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../../../common-services/api-service/api.service';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ErrorMessage } from '../../../error-messages/error-messages';
import { SessionService } from '../../../common-services/session-service/session.service';
declare var $: any; 

@Component({
  selector: 'app-update-complaints',
  templateUrl: './update-complaints.component.html',
  styleUrls: ['./update-complaints.component.scss']
})
export class UpdateComplaintsComponent implements OnInit {

	faPlus = faPlus;
    faStar = faStar;
    consumerIdString : String
    utilityIdString = this.sessionService.getter('utility_id_string')
    complaintForm : FormGroup;
	addMeterForm: FormGroup;
    complaintFormSubmitted = false;
	consumer_service_contract_detail_id_string : string;
    profile = []
    summery = []
    types = []
    subTypes = []
    complaints = []
    complaintsList = []
    consumer : any;
	showtoast : boolean;
    selectedComplaint : any;
	meter_list = []
	exception_message : string;
	showexceptiontoast : boolean;
	isDisabled:boolean=false;
	storeComplaintId;
	storeComplaintNumber;
    message = new ErrorMessage()
    scrollOptions = { 
	    autoHide: true, 
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };

    constructor(private apiService : ApiService, private sessionService : SessionService,private router : Router, private route : ActivatedRoute,  private formBuilder: FormBuilder) {
    	
    	// Code for receiving URL parameters start
	  	this.route.params.subscribe(params => {
	        this.consumerIdString = params.id
	    });
	    // Code for receiving URL parameters end

	    // Update add complaint form code start
	    	this.complaintForm = this.formBuilder.group({
	    		complaint : [null, [Validators.required]],
	    		desc : [null, [Validators.required]],
	    		type : [null, [Validators.required]],
	    		subType : [null, [Validators.required]],
	    	})
		// meter drop down 
		this.addMeterForm = this.formBuilder.group({
			meter: [null,]
		}
		)

	    // Api call for consumer start
	  	this.apiService.get("consumer/"+this.consumerIdString).subscribe(data=>{
	  		this.consumer = data['result']
	  		// this.utilityIdString = data['result']['utility_id_string']

			// Api call for meter list 
			this.apiService.get("consumer/"+this.utilityIdString+"/service-contract-detail/list?consumer_id="+this.consumerIdString).subscribe(data=>{
				for(let item of data['results']){
					this.meter_list.push({"id_string": item.id_string, "meter_no": item.meter_id.meter_no, "product_name": item.meter_id.utility_product_id.name})
				}
			},error=>{
				console.log(error.error)
			})
			// Api call for meter list 

	  		// Api call for complaints type start
		  	this.apiService.get("complaint/utility/"+this.utilityIdString+"/type/list").subscribe(data=>{
		  		for(let item of data['results']){
		  			this.types.push({
		  				name : item.name,
		  				id_string : item.id_string
		  			})
		  		}
		  	})
		  	// Api call for consumer complaints type end

		  	// Api call for complaints sub type start
		  	this.apiService.get("complaint/utility/"+this.utilityIdString+"/subtype/list").subscribe(data=>{
		  		for(let item of data['results']){
		  			this.subTypes.push({
		  				name : item.name,
		  				id_string : item.id_string
		  			})
		  		}
		  	})
		  	// Api call for consumer complaints sub type end

	  		this.profile.push({
		  		name : "Utility",
		  		value : this.consumer.utility
		  	})
		  	this.profile.push({
		  		name : "Mobile",
		  		value : this.consumer.phone_mobile
		  	})
		})
	  	// Api call for consumer end

	  	// Api call for consumer contract details start
	  	// this.apiService.get("consumer/"+this.consumerIdString+"/service-contract-detail/list").subscribe(data=>{
	  	// 	for(let item of data['results']){
	  	// 		this.profile.push({
		// 	  		name : "Service",
		// 	  		value : item?.contract.utility_service.service.service_name
		// 	  	})
		// 	  	this.profile.push({
		// 	  		name : "Contract",
		// 	  		value : item.contract.name
		// 	  	})
	  	// 	}
	  	// })
	  	// Api call for consumer contract details end
    }

    ngOnInit(): void {
    	this.showexceptiontoast = false;
		this.showtoast = false;
    }

    // add complaint details form control start
    get cd() { return this.complaintForm.controls; }
    // add complaint details form control end

    complaintClicked(item){
    	this.selectedComplaint = item  	
    	this.complaintForm.patchValue({
    		complaint : item,
    		name : item?.name,
			type : item?.complaint_sub_type.complaint_type,
			subType : item?.complaint_sub_type
		})
		$('#addComplaintModal').modal('show');
    }

    onSearch(e){
    	this.complaints = this.complaintsList.filter(item => item.name.toLowerCase().includes(e.toLowerCase()))
    }

    onCancelClick(){
    	this.complaintFormSubmitted = false;
    	this.complaints = []
	 	this.complaintForm.controls['desc'].reset();
	 	this.addMeterForm.reset();
	 }

	fetch_complaints_by_id() {
		this.complaints = []
		this.complaintsList = []
	// Api call for complaints master start
		this.apiService.get("complaint/"+this.utilityIdString+"/list?consumer_service_contract_detail_id_string="+this.addMeterForm.value.meter.id_string).subscribe(data=>{
		for(let item of data['results']){
			this.complaints.push(item)
			this.complaintsList.push(item)
		}
	})
	// Api call for consumer complaints master end
}
    onAddComplaintFormSubmit(){
    	this.isDisabled = true;
    	this.complaintFormSubmitted = true;
    	if(this.complaintForm.invalid){
    		this.isDisabled = false;
    		return
    	}else{
    		let data = {
				consumer_service_contract_detail_id: this.addMeterForm.value.meter.id_string,
    			consumer_id_string : this.consumerIdString,
    			consumer_complaint_master_id : this.complaintForm.value.complaint.id_string,
    			description : this.complaintForm.value.desc,
    			complaint_type_id : this.complaintForm.value.complaint.complaint_sub_type.complaint_type.id_string,
    			complaint_sub_type_id : this.complaintForm.value.complaint.complaint_sub_type.id_string
    		}
    		this.apiService.post("consumer/complaint-detail", data).subscribe(data=>{
    			if(data.state == "success"){
    				console.log("dats===",data)
					this.showtoast = true;
					this.storeComplaintId = data.result.id_string
	    			this.apiService.get('complaint/'+this.storeComplaintId).subscribe(ress=>{
	    				console.log("resilllll",ress)
			          this.storeComplaintNumber=ress.result.complaint_no;
			        })
    				// window.location.reload()
	    			this.complaints = []
					this.complaintFormSubmitted = false;
					this.isDisabled = false;
					this.complaintForm.controls['desc'].reset();
		 			this.addMeterForm.reset();
					$('#addComplaintModal').modal('hide');
    			}
    		},error=>{
				this.exception_message = error.error.result;
				this.showexceptiontoast = true;
				this.complaints = []
				this.complaintFormSubmitted = false;
				this.isDisabled = false;
				this.complaintForm.controls['desc'].reset();
	 			this.addMeterForm.reset();
				$('#addComplaintModal').modal('hide');
    		})
    	}
    }

}

