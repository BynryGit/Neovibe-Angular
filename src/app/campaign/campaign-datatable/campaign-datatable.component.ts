import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { faTrash, faCalendarAlt, faPrint,faPen, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-campaign-datatable',
  templateUrl: './campaign-datatable.component.html',
  styleUrls: ['./campaign-datatable.component.scss']
})
export class CampaignDatatableComponent implements OnInit {
  faPen = faPen;
  dtOptions: DataTables.Settings = {};

  blocks = [
    {
      name :  "Name",
    },
    {
      name :  "Tenant No",
    },
    {
      name :  "Subscription",
    },
    {
      name :  "Utility",
    },
    {
      name :  "Consumers",
    },
    {
      name :  "Type",
    },
    {
      name :  "Country",
    },
    {
      name :  "Status",
    },
    {
      name :  "Created on",
    },
    {
      name :  "Action"
    }   
]

  dataSet = [
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Akshay",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Kumar",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Priyanka",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Arpita",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    {
      id: "ajkdaks-saidja-3242-sada",
      tenant_name: "Rohan",
      tenant_no: "NSC1992425",
      subscription: "201-285-6456",
      utility: "Area 1",
      consumer: "Branch",
      type: "19-Sep-2020",
      country:"PNG",
      status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
      createdOn: "19-Sep-2020",
    },
    
    
]
privilegeList = []
  constructor(private filterService : FilterService,private commonServices:CommonService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
  }
  EditViewPrivilege = false
  onlyViewPrivilege = false
  onlyEditPrivilege = false
  ngOnInit(): void {
    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
      }

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
      })
  }

  view_tenant(id){
		console.log(id)
	}


}
