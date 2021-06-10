import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus,faAd } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray} from '@angular/forms';
import { FilterService } from '../../../../common/filter/filter.service';
import { ErrorMessage } from '../../../../error-messages/error-messages';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../../../../common-services/session-service/session.service';
declare var $ : any;
@Component({
  selector: 'app-work-orders-holidays',
  templateUrl: './work-orders-holidays.component.html',
  styleUrls: ['./work-orders-holidays.component.scss']
})
export class WorkOrdersHolidaysComponent implements OnInit {

  constructor(private fb: FormBuilder,private filterService : FilterService,private formBuilder: FormBuilder,private apiService : ApiService,private sessionService : SessionService) { 
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
  }
  dtOptions:DataTables.Settings = {};
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
  faAd = faAd;
  addType: FormGroup;
  addType1: FormGroup;
  searchText;
 
  utilityIdString = this.sessionService.getter("utility_id_string_admin");
  
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  blocks = [
    {
        name:       "Date",
    },
    {
        name:       "Holiday Type",
    },
    {
      name:       "Description",
    },
    {
        name:       "Created By",
    },
    {
        name:       "Created Date",
    },
    {
      name:       "Action",
    },

  ]


  dataSet = [
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
      
      
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
     
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    },
    {
      leave_type:['Paid','Birthday','Restricted Holiday'].sort((a, b) => .5 - Math.random())[0],
      date:['25 December', '1 January','14 January','26 Jauary','15 August'].sort((a, b) => .5 - Math.random())[0],
      reason:['Reason 1','Reason 2','Reason 3'].sort((a, b) => .5 - Math.random())[0],
      created_by: 'Admin',
      created_date:'16 December 20',
    }
  
]

  ngOnInit(): void {
  }

}
