import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-transfer-processing',
  templateUrl: './transfer-processing.component.html',
  styleUrls: ['./transfer-processing.component.scss']
})
export class TransferProcessingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  consumerList:any =[];
  consumerListHistory:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  consumerdata;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  searchText;
  trigger: any;

  blocks = [
    {
        name:       "Request no.",
    },
    {
        name:       "Consumer no.",
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
        name:       "Product",
    },
    {
        name:       "Request Type",
    },
    // {
    //     name:       "Description",
    // },
    // {
    //     name:       "Source",
    // },
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

    // this.filterService.getSearchText().subscribe(data=>{
    //   $('#table1').DataTable().search(data.text).draw()
    // })
    this.filterService.getSearchText().subscribe(data=>{
      console.log("UTILINMMM",data.text);
      this.searchText = data.text;
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
        
        that.apiService.get(`work-order/service-appointment/list?utility_id_string=`+this.utilityIdString+`&Transfer_processing=True&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
          that.consumerList = data.results;
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

        // API For Getting Consumer service contract details List Start
        this.dtOptions1 = {
          pagingType: 'full_numbers',
          pageLength: 100,
          serverSide: true,
          
          ajax: (dataTablesParameters: any, callback) => {
            that.processing = true
            const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
            
            that.apiService.get(`work-order/service-appointment/list?utility_id_string=`+this.utilityIdString+`&Transfer_processing_history=True&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
              that.consumerListHistory = data.results;
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

  id_string;
  onViewclick(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    // this.trigger = $('#complaintApproveModal').modal('show');
    this.filterService.sendButtonEventByIdString(0, this.id_string, 0)
  }

}
