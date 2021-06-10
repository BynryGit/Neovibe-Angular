import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../common/filter/filter.service';

@Component({ 
  selector: 'app-tenant-filter',
  templateUrl: './tenant-filter.component.html',
  styleUrls: ['./tenant-filter.component.scss']
})

export class TenantFilterComponent implements OnInit {

  constructor(private filterService : FilterService) { }

  ngOnInit(): void {
  	
  }

  sendFiltersData(){
    // this.filterService.filterEvent.emit(this.filters);
  }

  filters = [
    
    {
      name : 'Region',
      placeholder : 'Select Region',
      selectedValue : '',
      options : [
        {id: 1, name: 'Region 1'},
        {id: 2, name: 'Region 2'},
        {id: 2, name: 'Region 3'},
      ]
    },

    {
      name : 'Country',
      placeholder : 'Select Country',
      selectedValue : '',
      options : [
        {id: 1, name: 'Country 1'},
        {id: 2, name: 'Country 2'},
        {id: 2, name: 'Country 3'},
      ]
    },

    {
      name : 'Subscription',
      placeholder : 'Select Subscription',
      selectedValue : '',
      options : [
        {id: 1, name: 'subscription 1'},
        {id: 2, name: 'subscription 2'},
        {id: 2, name: 'subscription 3'},
      ]
    },

    {
      name : 'Status',
      placeholder : 'Select Status',
      selectedValue : '',
      options : [
        {id: 1, name: 'Status 1'},
        {id: 2, name: 'Status 2'},
        {id: 2, name: 'Status 3'},
      ]
    },
  ]

}