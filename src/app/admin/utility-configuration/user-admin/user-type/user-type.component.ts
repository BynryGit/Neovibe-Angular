import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../../../../common/filter/filter.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { Subject } from 'rxjs';
import { data } from 'jquery';
@Component({
  selector: 'app-user-type',
  templateUrl: './user-type.component.html',
  styleUrls: ['./user-type.component.scss']
})
export class UserTypeComponent implements OnInit {

  constructor(private filterService : FilterService,private sessionService : SessionService, private apiService : ApiService) { 
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
   this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
    this.apiService.get('user/list').subscribe(data => {
      this.userList = data.results;
      console.log(this.userList)
    })
  
    
  }
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  processing;
  loginUser;
  tenant_id_string = this.sessionService.getter("tenant_id_string")
  utility_id_string = this.sessionService.getter("utility_id_string")
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
  userList: any =[];
  searchText;

  selectedsubtype:any
  subtype = [
  {id: 1, name: 'SubType 1'},
  {id: 2, name: 'SubType 2'},
  ];

  selectedtype:any
  type = [
  {id: 1, name: 'Type 1'},
  {id: 2, name: 'Type 2'},
  ];

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  blocks = [
    {
      name:       "User ID",
    },
    {
        name:       "First Name",
    },
    {
        name:       "Last Name",
    },
    {
        name:       "Email",
    },
    {
      name:       "Phone",
    },
    {
      name:       "Status",
    },
    // {
    //   name:       "Department",
    // },
    {
        name:       "Created date",
    },
   

    
]
dataSet = []



  ngOnInit(): void {
    this.loginUser = this.sessionService.getter("loginUser")
      const that = this;
      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 10,
        serverSide: true,
        
        ajax: (dataTablesParameters: any, callback) => {
          that.processing = true
          const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
          if(this.loginUser == 'Tenant'){
            console.log("IF")
            that.apiService.get(`user/list?tenant_id_string=${that.tenant_id_string}&page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.dataSet = resp.results;
              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
          }
          else{
            console.log("ElSE")
            that.apiService.get(`user/list?utility_id_string=${that.utility_id_string}&page=${page}&page_size=${that.dtOptions.pageLength}`).subscribe(resp => {
              that.dataSet = resp.results;
              that.dtTrigger.next();
              that.processing = false
              callback({
                recordsTotal: resp.count,
                recordsFiltered: resp.count,
                data: []
              });
            });
          }
        },
      };
   
    
    	
  }


}
