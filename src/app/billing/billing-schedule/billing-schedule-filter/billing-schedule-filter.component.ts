import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing-schedule-filter',
  templateUrl: './billing-schedule-filter.component.html',
  styleUrls: ['./billing-schedule-filter.component.scss']
})
export class BillingScheduleFilterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  button = {
    name : 'Add',
    routerLink : '',
  }

  filters = [
    {
      name : 'Utility',
      placeholder : 'Select Utility',
      selectedValue : '',
      options : [
        {id: 1, name: 'Utility 1'},
        {id: 2, name: 'Utility 2'},
      ]
    },
    {
      name : 'Type',
      placeholder : 'Select type',
      selectedValue : '',
      options : [
        {id: 1, name: 'Type 1'},
        {id: 2, name: 'Type 2'},
      ]
    },
    {
      name : 'Sub Type',
      placeholder : 'Select Sub Type',
      selectedValue : '',
      options : [
        {id: 1, name: 'Sub Type 1'},
        {id: 2, name: 'Sub Type 2'},
      ]
    },
    {
      name : 'Department',
      placeholder : 'Select Department',
      selectedValue : '',
      options : [
        {id: 1, name: 'Department 1'},
        {id: 2, name: 'Department 2'},
      ]
    },
    {
      name : 'Form Factor',
      placeholder : 'Select Form Factor',
      selectedValue : '',
      options : [
        {id: 1, name: 'Form Factor 1'},
        {id: 2, name: 'Form Factor 2'},
      ]
    },
    {
      name : 'Role',
      placeholder : 'Select Role',
      selectedValue : '',
      options : [
        {id: 1, name: 'Role 1'},
        {id: 2, name: 'Role 2'},
      ]
    },
    {
      name : 'City',
      placeholder : 'Select city',
      selectedValue : '',
      options : [
        {id: 1, name: 'City 1'},
        {id: 2, name: 'City 2'},
      ]
    },
    
    {
      name : 'Sub area',
      placeholder : 'Select sub area',
      selectedValue : '',
      options : [
        {id: 1, name: 'Sub area 1'},
        {id: 2, name: 'Sub area 2'},
      ]
    },
    
    {
      name : 'Status',
      placeholder : 'Select status',
      selectedValue : '',
      options : [
        {id: 1, name: 'Status 1'},
        {id: 2, name: 'Status 2'},
      ]
    },
    
  ]

}
