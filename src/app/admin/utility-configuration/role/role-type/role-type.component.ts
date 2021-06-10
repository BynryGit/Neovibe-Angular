import { Component, OnInit } from '@angular/core';
import { UtilityConfigurationService } from '../../utility-configuration.service';
import {faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-role-type',
  templateUrl: './role-type.component.html',
  styleUrls: ['./role-type.component.scss']
})
export class RoleTypeComponent implements OnInit {

  constructor(private utilityConfigService:UtilityConfigurationService) { }
  roleTypes;
  selectFilterStatus: any
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faPrint = faPrint;
  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;
  searchText;
  filterStatus = [
    { id: 1, name: 'status 1' },
    { id: 2, name: 'status 2' },
    { id: 3, name: 'status 3' }

  ]

  selectFilterDepartment: any
  filterDepartment = [
    { id: 1, name: 'Finance' },
    { id: 2, name: 'Marketing' },
    { id: 3, name: 'Billing' }

  ]
  ngOnInit(): void {
    this.utilityConfigService.getRoleTypeListByUtility().subscribe(roleType => {      
        this.roleTypes = roleType.results      
    })
  }

}
