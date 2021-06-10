import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Subject } from 'rxjs';
declare var $: any;

@Component({
  selector: 'app-offer-processing',
  templateUrl: './offer-processing.component.html',
  styleUrls: ['./offer-processing.component.scss']
})
export class OfferProcessingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  offerList:any =[];
  offerListHistory:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  searchText;
  trigger: any;
  privilegeList = []
  EditViewPrivilege = false
  onlyViewPrivilege = false
  onlyEditPrivilege = false

  blocks = [
    {
        name:       "Consumer no.",
    },
    {
        name:       "Email",
    },
    {
        name:       "Mobile no.",
    },
    {
        name:       "Product",
    },
    {
        name:       "Offer",
    },
    {
        name:       "Offer Type",
    },
    {
        name:       "Offer Subtype",
    },
    {
        name:       "Start Date",
    },
    {
        name:       "End Date",
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
      console.log("UTILINMMM",data.text);
      this.searchText = data.text;
    })

  }

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
        
        that.apiService.get(`consumer/`+`offer/list?utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
          that.offerList = data.results;
          console.log('that.dataSet: ', that.offerList);
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
        
        that.apiService.get(`consumer/`+`offer/list?utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
          that.offerListHistory = data.results;
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
