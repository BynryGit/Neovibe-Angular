import { Component, OnInit } from '@angular/core';
import { FilterService } from '../../common/filter/filter.service';

@Component({
  selector: 'app-tenant-datatable',
  templateUrl: './tenant-datatable.component.html',
  styleUrls: ['./tenant-datatable.component.scss']
})
export class TenantDatatableComponent implements OnInit {

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

  constructor(private filterService : FilterService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
  }

  ngOnInit(): void {
    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
      }
  }

  view_tenant(id){
		console.log(id)
	}
}
