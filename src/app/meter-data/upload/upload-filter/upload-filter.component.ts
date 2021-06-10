import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';

@Component({
  selector: 'app-upload-filter',
  templateUrl: './upload-filter.component.html',
  styleUrls: ['./upload-filter.component.scss']
})

export class UploadFilterComponent implements OnInit {

  utilityIdString = this.sessionService.getter("utility_id_string");

  button = {
    name : '',
  }

  filters = [
    {
      name : 'Read Cycle',
      placeholder : 'Select Read Cycle',
      selectedValue : '',
      options : []
    },
  ]

  constructor(private apiService : ApiService, private sessionService : SessionService) { 
    // Dropdown API Start
    this.getReadCycle();
    // Dropdown API End
  }

  ngOnInit(): void {
  }

  // Read Cycle Dropdown API Start
  getReadCycle = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/read_cycle/list').subscribe(
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
        if (error.error.state == "error") {
          console.log("Read Cycle", error.error.results)
        }else{
          console.log("Read Cycle", error)
        }
      }
    )
  }
  // Read Cycle Dropdown API End
}
