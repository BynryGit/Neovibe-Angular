import { Component, OnInit } from '@angular/core';
import { UtilityConfigurationService } from '../../utility-configuration.service';
import {faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-role-subtype',
  templateUrl: './role-subtype.component.html',
  styleUrls: ['./role-subtype.component.scss']
})
export class RoleSubtypeComponent implements OnInit {

  constructor(private utilityConfigService:UtilityConfigurationService) { }
  roleSubTypes;
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
    // Taking the Role list view data
    this.utilityConfigService.getRoleSubTypeListByUtility().subscribe(roleSubType => {
        this.roleSubTypes = roleSubType.results
    })
  }

}
