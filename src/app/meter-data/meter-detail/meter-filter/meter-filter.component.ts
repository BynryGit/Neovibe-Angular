import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../common-services/api-service/api.service';
import { SessionService } from './../../../common-services/session-service/session.service';

@Component({
  selector: 'app-meter-filter',
  templateUrl: './meter-filter.component.html',
  styleUrls: ['./meter-filter.component.scss']
})

export class MeterFilterComponent implements OnInit {

  utilityIdString = this.sessionService.getter("utility_id_string");

  button = {
    name : 'ADD METERS',
  }

  filters = [
    {
      name : 'Route',
      placeholder : 'Select Route',
      selectedValue : '',
      options : []
    },
    {
      name : 'Premise',
      placeholder : 'Select Premise',
      selectedValue : '',
      options : []
    },
    {
      name : 'Product',
      placeholder : 'Select Product',
      selectedValue : '',
      options : []
    },
    {
      name : 'Meter Type',
      placeholder : 'Select Meter Type',
      selectedValue : '',
      options : []
    },
    {
      name : 'Meter Make',
      placeholder : 'Select Meter Make',
      selectedValue : '',
      options : []
    },
  ]

  constructor(private apiService : ApiService, private sessionService : SessionService) {
    // Dropdown API Start
    this.getRoute();
    this.getPremise();
    this.getUtilityProduct();
    this.getMeterType();
    this.getMeterMake();
    // Dropdown API End
  }

  ngOnInit(): void {
  }

  // Route Dropdown API Start
  getRoute = () => {
    this.apiService.get('meter-data/utility/' + this.utilityIdString + '/route/list').subscribe(
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
  // Route Dropdown API End

  // Premise Dropdown API Start
  getPremise = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/premise/list').subscribe(
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
  // Premise Dropdown API End

  // Utility Product Dropdown API Start
  getUtilityProduct = () => {
    this.apiService.get('utility/' + this.utilityIdString + '/product/list').subscribe(
      data => {
        for (let value of data.results) {
          this.filters[2].options.push(
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
  // Utility Product Dropdown API End

  // Meter Type Dropdown API Start
  getMeterType = () => {
    this.apiService.get('global-lookup/list?category=Meter_Type').subscribe(
      data => {
        for (let value of data.results) {
          this.filters[3].options.push(
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
  // Meter Type Dropdown API End

  // Meter Make Dropdown API Start
  getMeterMake = () => {
    this.apiService.get('meter-data/meter-make/list?utility__id_string=' + this.utilityIdString).subscribe(
      data => {
        for (let value of data.results) {
          this.filters[4].options.push(
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
  // Meter Make Dropdown API End
}
