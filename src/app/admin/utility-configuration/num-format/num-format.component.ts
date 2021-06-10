import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-num-format',
  templateUrl: './num-format.component.html',
  styleUrls: ['./num-format.component.scss']
})
export class NumFormatComponent implements OnInit {

  constructor() { }

  model1: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;
  date: { year: number, month: number};

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
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
  paymode: FormGroup;
  selectedYesNo = true;
  adjustbilltype: FormGroup;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedStatus: any = "";
  status = [
    {id: 1, name: 'Basic'},
    {id: 2, name: 'Advance'},
    {id: 3, name: 'Enterprise'}
  ];

  selectedDepartment: any = "";
  department = [
    {id: 1, name: 'Territory'},
    {id: 2, name: 'Num Format'},
    {id: 3, name: 'Role'},
    {id: 4, name: 'User'},
    {id: 5, name: 'Campaign'},
    {id: 6, name: 'Survey'},
    {id: 7, name: 'Registration'},
    {id: 8, name: 'Consumers'},
    {id: 9, name: 'Meter Data'},
    {id: 10, name: 'Billing'},
    {id: 11, name: 'Payments'},
    {id: 12, name: 'Service Requests'},
    {id: 13, name: 'Complaints'}
  ];

  selectedDepartment1: any = "";
  department1 = [
    {id: 1, name1: 'Work Orders'},
    {id: 2, name1: 'Contracts'},
    {id: 3, name1: 'Suppliers'},
    {id: 4, name1: 'Store'},
    {id: 5, name1: 'Asset'},
  ];

  selectedDepartment2: any = "";
  department2 = [
    {id: 1, name2: 'Products'},
    {id: 2, name2: 'Services'},
    {id: 3, name2: 'Tenders'},
    {id: 4, name2: 'Orders'},
    {id: 5, name2: 'HCM'},
    {id: 6, name2: 'Finance'},
  ];

  selectedCompany: any
  company = [
    {id: 1, name: 'Company 1'},
    {id: 2, name: 'Company 2'},
    {id: 3, name: 'Company 3'}
  ]

  selectFilterStatus: any
  filterStatus = [
    {id: 1, name: 'status 1'},
    {id: 2, name: 'status 2'},
    {id: 3, name: 'status 3'}

  ]

  selectFilterDepartment: any
  filterDepartment = [
    {id: 1, name: 'Finance'},
    {id: 2, name: 'Marketing'},
    {id: 3, name: 'Billing'}

  ]

  selectedsubtype:any
  subtype = [
  {id: 1, name: 'Type 1'},
  {id: 2, name: 'Type 2'},
  ];

  activated=""
  isactive = [
  {id: 1, name: 'Yes'},
  {id: 2, name: 'No'},  
  ];

  ngOnInit(): void {
  }

}
