import { Component, OnInit } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';

@Component({
  selector: 'app-registration-filters',
  templateUrl: './registration-filters.component.html',
  styleUrls: ['./registration-filters.component.scss']
})
export class RegistrationFiltersComponent implements OnInit {

  constructor(private filterService: FilterService, private router: Router,private commonServices:CommonService) { }
  privilegeList=[];
  EditViewPrivilege = false
  onlyViewPrivilege = false
  onlyEditPrivilege = false
  
  ngOnInit(): void {
    this.filterService.getButtonEvent().subscribe(data=>{
      if(data.event.type == 'click'){
        this.router.navigateByUrl('registration/add-registration')
      }
    });

    this.commonServices.getPrivileagesList().subscribe(privilegesVal=>{
      for(let privileges of privilegesVal.data ){
        this.privilegeList.push(privileges.privilege.name)
      }
    })

    if(this.privilegeList.includes('View') && this.privilegeList.includes('Edit')){
      this.EditViewPrivilege = true
    }else if(this.privilegeList.includes('View')){
      this.onlyViewPrivilege = true
    }
    else if(this.privilegeList.includes('Edit')){
      this.onlyEditPrivilege = true
    }
  }
 
  

  button = {
    name : 'Register',
    routerLink : '/registration/add-registration',
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
