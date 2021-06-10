import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { event } from 'jquery';
import { FilterService } from '../../common/filter/filter.service';
@Component({
  selector: 'app-complaint-filters',
  templateUrl: './complaint-filters.component.html',
  
  
  styleUrls: ['./complaint-filters.component.scss']
})
export class ComplaintFiltersComponent implements OnInit {

  constructor(private filterService : FilterService) { }

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      console.log(data.event.type)
    })
   
  }
 
    

  button = {
    name : 'Add',
    id : '#addAdvertisementModal',
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
