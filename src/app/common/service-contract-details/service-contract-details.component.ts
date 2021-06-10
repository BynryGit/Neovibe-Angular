import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-service-contract-details',
  templateUrl: './service-contract-details.component.html',
  styleUrls: ['./service-contract-details.component.scss']
})
export class ServiceContractDetailsComponent implements OnInit {

  @Input() data;
  contracts = [];
  storeMeter;

  constructor(private apiService : ApiService) {}

  ngOnInit(): void {
  	this.apiService.get("consumer/service-contract-detail/list?consumer_id="+this.data).subscribe(data=>{
      console.log("productssssssssssssssssssssss",data['results'])
      for(let item of data['results']){
        if(item.meter_id == null){
          this.storeMeter="---"
        }else{
          this.storeMeter=item.meter_id.meter_no
        }
        this.contracts.push({
          // product : item.meter_id.utility_product_id.name,
          product : item.contract.category.utility_product.name,
          meter : this.storeMeter,
          contract : item.contract.name,
          category : item.contract.category.name,
          sub_category : item.contract.sub_category.name,
          deposite : item.contract.deposite_amount
        })
      }
    },error=>{
      console.log(error.error)
    })
  }

}
