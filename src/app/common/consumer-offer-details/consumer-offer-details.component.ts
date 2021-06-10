import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-consumer-offer-details',
  templateUrl: './consumer-offer-details.component.html',
  styleUrls: ['./consumer-offer-details.component.scss']
})
export class ConsumerOfferDetailsComponent implements OnInit {

  @Input() data;
   	offers = [];
   	utility_id_string = null
	storeMeterNo;

   	constructor(private apiService : ApiService) {
   	}

   	ngOnInit(): void {

   		this.apiService.get("consumer/service-contract-detail/list?consumer_id="+this.data).subscribe(data=>{
  	  		const utility = data['results'][0].utility_id_string
  	  		this.apiService.get("consumer/offer/list?consumer_id="+this.data+"&utility_id_string="+utility).subscribe(data=>{
				console.log("offfffffffffffffffffffffffffffff",data)
  	  			for(let item of data['results']){
					if(item.consumer_service_contract_detail.meter_id == null){
						this.storeMeterNo="---"
					}
					else{
						this.storeMeterNo=item.consumer_service_contract_detail.meter_id.meter_no
					}
  	  				this.offers.push({
  	  					// product : item.consumer_service_contract_detail.meter_id.utility_product_id.name,
						product : item.consumer_service_contract_detail.contract.category.utility_product.name,
  	  					meter :this.storeMeterNo,
  	  					contract : item.consumer_service_contract_detail.contract.name,
  	  					offer : item.offer.offer_name
  	  				})
  	  			}
    		},error=>{
      			console.log(error.error)
    		})
    	},error=>{
      		console.log(error.error)
    	})
    	
  	}

}
