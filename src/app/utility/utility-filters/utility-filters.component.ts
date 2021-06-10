import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../common/filter/filter.service';

@Component({
  selector: 'app-utility-filters',
  templateUrl: './utility-filters.component.html',
  styleUrls: ['./utility-filters.component.scss']
})
export class UtilityFiltersComponent implements OnInit {

  constructor(private filterService: FilterService, private router: Router) { }

  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      if(data.event.type == 'click'){
        console.log("Utility Data",data)
      }
    })
  }
 
  

  button = {
    name : 'ADD',
    id : '#addAdvertisementModal',
    
  }

  filters = [
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
      name : 'Department',
      placeholder : 'Select Department',
      selectedValue : '',
      options : [
        {id: 1, name: 'Department 1'},
        {id: 2, name: 'Department 2'},
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
    
  ]

}
