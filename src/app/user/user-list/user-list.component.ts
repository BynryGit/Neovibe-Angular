import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { faPen} from '@fortawesome/free-solid-svg-icons';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { UserService } from '../user.service';
import { Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiService } from 'src/app/common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { string2csv } from '@ctrl/ngx-csv';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy{

  faPen = faPen;
  dtOptions: DataTables.Settings = {};
  searchText;

    dataSet;
    dataSetList = []

    blocks = [
        {
            name:       "User ID",
        },
        {
            name:       "Name",
        },
        {
            name:       "Mobile no.",
        },
        
        {
            name:       "Email",
        },
        {
          name:       "Status",
        },
        // {
        //     name:       "Department",
        // },
        {
            name:       "Role",
        },
        {
            name:       "Action"
        }   
    ]
    
    constructor(private filterService : FilterService, private userService:UserService,private router:Router,
      private commonServices:CommonService,private sessionService : SessionService,private http: HttpClient, private apiService:ApiService) {
      this.filterService.getPagination().subscribe(data=>{
        $('#table1').DataTable().page.len(data.number).draw()
      })

      this.filterService.getSearchText().subscribe(data=>{
        $('#table1').DataTable().search(data.text).draw()
      })

      this.filterService.getSearchText().subscribe(data=>{
        console.log("UTILINMMM",data.text);
        this.searchText = data.text;
      })
    }
    privilegeList = []
    EditViewPrivilege = false
    onlyViewPrivilege = false
    onlyEditPrivilege = false
    dtTrigger: Subject<any> = new Subject<any>();
    processing;
    loginUser;
    tenant_id_string = this.sessionService.getter("tenant_id_string")
    utility_id_string = this.sessionService.getter("utility_id_string")

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
      
      // Check Privileges start
      this.commonServices.getPrivileagesList().subscribe(privilegesVal=>{
        for(let privileges of privilegesVal.data ){
          this.privilegeList.push(privileges.privilege.name)
        }  
        if(this.privilegeList.includes('View') && this.privilegeList.includes('Edit')){
          this.EditViewPrivilege = true
        }else if(this.privilegeList.includes('View')){
          this.onlyViewPrivilege = true
        }
        else if(this.privilegeList.includes('Edit')){
          this.onlyEditPrivilege = true
        }
      });
      // Check Privileges end

      // this.userSubscription = this.userService.getUserListData().subscribe(result =>{
      //   this.dataSet = result.results
      //   this.dataSetList.push(result.results)
      // })
      
  }
  
  ngOnDestroy(): void {
    // this.userSubscription.unsubscribe()    
  }

	testing(id){
    this.router.navigate(['/user/user-view',id]);
	}


}
