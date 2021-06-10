import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-new-consumer-validation',
  templateUrl: './new-consumer-validation.component.html',
  styleUrls: ['./new-consumer-validation.component.scss']
})
export class NewConsumerValidationComponent implements OnInit {

  new_consumer_details;
  new_consumer_id_String;
  user_summary = []; mr_summary = [];
  
  ngOnInit(): void {
  }

  constructor(private apiService: ApiService, private route : ActivatedRoute) { 
    // Get Id_String From URL Start
    this.route.params.subscribe(params => {
      this.new_consumer_id_String = params.id_string
    });
    // Get Id_String From URL End

    // New Consumer Detail API Start
    this.apiService.get(`meter-data/new-consumer/`+ this.new_consumer_id_String).subscribe(
      data=>{
        this.new_consumer_details = data.result
        // Set Data For Consumer Start
        this.user_summary.push(
          {
            name : "Tenant",
            value : this.new_consumer_details.tenant.short_name
          },
          {
            name : "Utility",
            value : this.new_consumer_details.utility.name
          },
          {
            name : "Read Cycle",
            value : this.new_consumer_details.read_cycle_id.name
          },
          {
            name : "Route",
            value : this.new_consumer_details.route_id.name
          }
        )
        // Set Data For Consumer End

        // Set Data For MR Start
        this.mr_summary.push(
          {
            name : "Name",
            value : this.new_consumer_details.meter_reader_id.first_name + this.new_consumer_details.meter_reader_id.last_name
          },
          {
            name : "Email",
            value : this.new_consumer_details.meter_reader_id.email
          }
        )
        // Set Data For MR End
      },
      error => {
        if (error.error.state == "error") {
          console.log("New Consumer Detail", error.error.results)
        }else{
          console.log("New Consumer Detail", error)
        }
      }
    )
    // New Consumer Detail List API End
  }

  // Discard Consumer Start
  DiscardConsumer(id_string, utility, schedule_log, read_cycle, route, consumer_no, meter_no) {
    let data = {
      utility_id: utility,
      schedule_log_id: schedule_log,
      read_cycle_id : read_cycle,
      route_id : route,
      consumer_no: consumer_no,
      meter_no: meter_no,
      is_discard: true
    }
    
    this.apiService.put('meter-data/new-consumer/' + id_string, data).subscribe(
      data=>{
        if (data.state == "success") {
          alert('Consumer Discard Succesfully..')
          location.href = ('/meter-data/validation');
        }
      },
      error => {
        if (error.error.state == "exception") {
          console.log("Discard Consumer", error)
        }else{
          console.log("Discard Consumer", error)
        }
      }
    )
  }
  // Discard Consumer End
}
