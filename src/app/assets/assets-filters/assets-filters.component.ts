import { Component, OnInit } from '@angular/core';
import { faTrash, faCalendarAlt, faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-assets-filters',
  templateUrl: './assets-filters.component.html',
  styleUrls: ['./assets-filters.component.scss']
})
export class AssetsFiltersComponent implements OnInit {

  faCalendarAlt = faCalendarAlt;
  constructor() { }

  ngOnInit(): void {
  }

  button = {
    name : 'Asset',
    routerLink : 'asset/add',
  }

  selectedPagination:any;
  pagination = [
    {id: 1, name: '50'},
    {id: 2, name: '100'},
    {id: 3, name: '200'},
  ];

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
      name : 'Category',
      placeholder : 'Select category',
      selectedValue : '',
      options : [
        {id: 1, name: 'Category 1'},
        {id: 2, name: 'Category 2'},
      ]
    },
    {
      name : 'Sub Category',
      placeholder : 'Select sub category',
      selectedValue : '',
      options : [
        {id: 1, name: 'Sub category 1'},
        {id: 2, name: 'Sub category 2'},
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
      name : 'Area',
      placeholder : 'Select area',
      selectedValue : '',
      options : [
        {id: 1, name: 'Area 1'},
        {id: 2, name: 'Area 2'},
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
      name : 'Type',
      placeholder : 'Select type',
      selectedValue : '',
      options : [
        {id: 1, name: 'Type 1'},
        {id: 2, name: 'Type 2'},
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
    {
      name : 'Vendor',
      placeholder : 'Select vendor',
      selectedValue : '',
      options : [
        {id: 1, name: 'Vendor 1'},
        {id: 2, name: 'Vendor 2'},
      ]
    },
  ]

}
