import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-reading-filter',
  templateUrl: './reading-filter.component.html',
  styleUrls: ['./reading-filter.component.scss']
})
export class ReadingFilterComponent implements OnInit {

  utilityIdString = this.sessionService.getter("utility_id_string");

  button = {
    name : 'SCHEDULE',
  }

  filters = [
    {
      name : 'Read Cycle',
      placeholder : 'Select Read Cycle',
      selectedValue : '',
      options : []
    },
    {
      name : 'Utility Product',
      placeholder : 'Select Utility Product',
      selectedValue : '',
      options : []
    },
  ]

  constructor(private apiService : ApiService, private sessionService : SessionService) {
        // Dropdown API Start
//         this.getReadCycle();
//         this.getUtilityProduct();
        // Dropdown API End
  }

  ngOnInit(): void {
  }

  // Read Cycle Dropdown API Start
  getReadCycle = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/read_cycle/short_list').subscribe(
      data => {
        for (let value of data.results) {
          this.filters[0].options.push(
            {
              id  : value.id_string,
              name : value.name,
            }
          );
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "error") {
          alert(error.error.results)
        }else{
          console.log(error)
        }
      }
    )
  }
  // Read Cycle Dropdown API End

  // Utility Product Dropdown API Start
  getUtilityProduct = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/product/list').subscribe(
      data => {
        for (let value of data.results) {
          this.filters[1].options.push(
            {
              id  : value.id_string,
              name : value.name,
            }
          );
        }
      },
      error => {
        console.log(error)
        if (error.error.state == "error") {
          alert(error.error.results)
        }else{
          console.log(error)
        }
      }
    )
  }
  // Utility Product Type Dropdown API End

}
