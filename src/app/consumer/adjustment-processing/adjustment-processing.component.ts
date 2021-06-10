import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-adjustment-processing',
  templateUrl: './adjustment-processing.component.html',
  styleUrls: ['./adjustment-processing.component.scss']
})
export class AdjustmentProcessingComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  consumerList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  consumerdata;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();

  blocks = [
    {
        name:       "Registration no.",
    },
    {
        name:       "Name",
    },
    {
        name:       "Status",
    },
    {
        name:       "Mobile no.",
    },
    {
        name:       "Category",
    },
    {
        name:       "Sub category",
    },
    {
        name:       "Area",
    },
    {
        name:       "Source",
    },
    {
        name:       "Created on",
    },
    {
        name:       "Action"
    }   
]


    constructor(private filterService : FilterService, private router : Router,private commonServices:CommonService,private apiService : ApiService, private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
  }

  privilegeList = []
  EditViewPrivilege = false
  onlyViewPrivilege = false
  onlyEditPrivilege = false

  ngOnInit(): void {
    // API For Getting Consumer service contract details List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 100,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing=True&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
            this.consumerList = data;
            console.log('that.dataSet: ', that.consumerList);
            this.dtTrigger.next();
            that.processing = false
            callback({
              recordsTotal: data.count,
              recordsFiltered: data.count,
              data: []
            });
        });
      },
    };
    // API For Consumer service contract details List End

  
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

}
