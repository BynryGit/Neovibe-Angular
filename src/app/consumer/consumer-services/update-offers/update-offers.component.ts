import { Component, OnInit, Input } from '@angular/core'; 
import { faChevronLeft, faChevronRight, faPen, faCalendarAlt,faFilePdf,faMapMarkerAlt, faPrint ,faTimesCircle, faEye, faPlus, faFileCsv, faStar, faFileExcel } from '@fortawesome/free-solid-svg-icons';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';
declare var $: any;

@Component({
  selector: 'app-update-offers',
  templateUrl: './update-offers.component.html',
  styleUrls: ['./update-offers.component.scss']
})
export class UpdateOffersComponent implements OnInit {

	@Input() trigger
    @Input() consumerId
	faPlus = faPlus;
    faStar = faStar;
    faCalendarAlt = faCalendarAlt;
    consumerIdString : String
    addOfferForm : FormGroup;
	addMeterForm : FormGroup;
    addOfferFormSubmitted = false;
    consumer : any
    selectedOffer : any
	showtoast : boolean;
	utilityIdString = this.sessionService.getter('utility_id_string')
	showexceptiontoast : boolean;
	exception_message : string;
    offers = []
    types = []
    subTypes = []
    meter_list = []
    scrollOptions = { 
	    autoHide: true, 
	    scrollbarMinSize: 67,
	    scrollbarMaxSize: 180,
    };

    constructor(private apiService : ApiService, private sessionService : SessionService, private formBuilder: FormBuilder) {
    	//  add offer form code start
	    	this.addOfferForm = this.formBuilder.group({
	    		name : [null, ],
	    		code : [null, ],
	    		type : [null, ],
	    		subType : [null, ],
	    	})
	    //  add offer form code end
			this.addMeterForm = this.formBuilder.group({
				meter: [null,]
			}
			)
	    
    }

    ngOnInit(): void {
    	this.trigger
        this.consumerIdString = this.consumerId
		this.showexceptiontoast = false;
		this.showtoast = false;

        // Api call for consumer start
	  	this.apiService.get("consumer/"+this.consumerIdString).subscribe(data=>{
	  		this.consumer = data['result']
	  	// this.utilityIdString = this.consumer.utility_id_string

		// Api call for meter list 
		this.apiService.get("consumer/"+ this.consumer.utility_id_string +"/service-contract-detail/list?consumer_id="+this.consumerIdString).subscribe(data=>{
			for(let item of data.results){
				this.meter_list.push({"id_string": item.id_string, "meter_no": item.meter_id.meter_no, "product_name": item.meter_id.utility_product_id.name})
			}
		},error=>{
			console.log(error.error)
		})
		// Api call for meter list end 
		})
	  	// Api call for consumer end
    }

	fetch_offers_by_id() {
		this.offers = []
		// Consumer offers dropdown api call start
		this.apiService.get('consumer/'+this.utilityIdString+'/offer/list?consumer_service_contract_id_string='+this.addMeterForm.value.meter.id_string).subscribe(data=>{
			for(let item of data['results']){
				this.offers.push(item)
			}
		})
		// Consumer offers dropdown api call end
	}
    // offer details form control start
    get od() { return this.addOfferForm.controls; }
    // offer details form control end

    offerClicked(item){
    	this.selectedOffer = item
    	this.addOfferForm.patchValue({
    		name : item.offer_name,
    		code : item.offer_code,
    		type : item.offer_sub_type.offer_type,
    		subType : item.offer_sub_type
    	})
    	$('#offerChangeModal').modal('show');
    }

	printDiv() {
			// var printContents = document.getElementById("printableArea").innerHTML;
			// var originalContents = document.body.innerHTML;
	
			// document.body.innerHTML = printContents;
	
			// window.print();
	
			// document.body.innerHTML = originalContents;
			console.log("Print request")
   }

   formReset(){
        this.addOfferFormSubmitted = false
        this.offers = []
        // this.typeForm.reset();
        this.addOfferForm.reset();
        this.addMeterForm.reset();
    }

    hideButton:boolean = false
    onAddOfferFormSubmit(){
    	this.hideButton = true
    	this.addOfferFormSubmitted = true;
    	if(this.addOfferForm.invalid){
    		return
    	}else{
    		let data = {
    			offer_id : this.selectedOffer.id_string,
				consumer_service_contract_id_string : this.addMeterForm.value.meter.id_string
    		}
    		this.apiService.post('consumer/'+this.consumerIdString+'/offer-detail', data).subscribe(data=>{
    			if(data.state == "success"){
					this.showtoast = true;
					this.hideButton = false
					$('#offerChangeModal').modal('hide')
    				$('#offersReceiptModal').modal('show')
    			}
    		},error=>{
    			this.hideButton = false
				this.exception_message = error.error.result;
				this.showexceptiontoast = true;
				$('#offerChangeModal').modal('hide');
    		})
    	}
    }

}
