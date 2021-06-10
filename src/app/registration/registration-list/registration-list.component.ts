import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { Subject } from 'rxjs';
import { SessionService } from '../../common-services/session-service/session.service';

@Component({
  selector: 'app-registration-list',
  templateUrl: './registration-list.component.html',
  styleUrls: ['./registration-list.component.scss']
})
export class RegistrationListComponent implements OnInit {


  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  registrationList:any =[];
  registrationListHistory:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  searchText;

    dataSet = [
        {
          id: "ajkdaks-saidja-3242-sada",
          name: "Akshay Kumar",
          registrationNo: "NSC1992425",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "201-285-6456",
          area: "Kothrud",
          source: "Branch",
          createdOn: "19-Sep-2020",
          category:"PNG",
          subCategory:"Domestic",
        },
        {
          id: "6544-tres-3242-sada",
          name: "Chinmay Kumar",
          registrationNo: "NSC1992430",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "596-285-3781",
          area: "Warje",
          source: "Branch",
          createdOn: "21-Sep-2020",
          category:"PNG",
          subCategory:"Domestic", 
        },
        {
          id: "weq4-trtes-36362-78ad",
          name: "Kangana ranaut",
          registrationNo: "NSC1992431",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "89-255-9846",
          area: "Pashan",
          source: "Mobile app",
          createdOn: "21-Sep-2020",
          category:"PNG",
          subCategory:"Individual", 
        },
        {
          id: "23er-treh-5211-34yt",
          name: "Virat Kohli",
          registrationNo: "NSC1992432",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "82-255-9846",
          area: "Shivajinagar",
          source: "Mobile app",
          createdOn: "22-Sep-2020",
          category:"PNG",
          subCategory:"Individual", 
        },
        {
          id: "jkgh-ewrwr-8733-sada",
          name: "Tiger Kumar",
          registrationNo: "NSC1992419",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "88-285-7666",
          area: "Katraj",
          source: "Branch",
          createdOn: "19-Sep-2020",
          category:"PNG",
          subCategory:"Domestic",
        },
        {
          id: "fsfs-tres-3242-7567",
          name: "Chinmay Pant",
          registrationNo: "NSC1992488",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "87-853-2555",
          area: "Kothrud",
          source: "Branch",
          createdOn: "21-Sep-2020",
          category:"PNG",
          subCategory:"Domestic", 
        },
        {
          id: "3455-trtes-36362-yuyu",
          name: "Kangana Patil",
          registrationNo: "NSC1992487",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "892-255-4545",
          area: "Warje",
          source: "Mobile app",
          createdOn: "21-Sep-2020",
          category:"PNG",
          subCategory:"Individual", 
        },
        {
          id: "23er-treh-5211-34yt",
          name: "Hemant Kohli",
          registrationNo: "NSC1992433",
          status: ['Approved', 'Pending', 'Rejected'].sort((a, b) => .5 - Math.random())[0],
          mobileNo: "77-255-3431",
          area: "Baner",
          source: "Mobile app",
          createdOn: "22-Sep-2020",
          category:"PNG",
          subCategory:"Individual", 
        },
        
        
    ]

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
        // {
        //     name:       "Category",
        // },
        // {
        //     name:       "Sub category",
        // },
        {
            name:       "Area",
        },
        {
            name:       "State",
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

      // this.filterService.getSearchText().subscribe(data=>{
      //   $('#table1').DataTable().search(data.text).draw()
      // })

      this.filterService.getSearchText().subscribe(data=>{
        console.log("UTILINMMM",data.text);
        this.searchText = data.text;
      })

      // this.apiService.get('registration/list').subscribe(data => {
      //   this.registrationList = data;
      // }) 
    }

    privilegeList = []
    EditViewPrivilege = false
    onlyViewPrivilege = false
    onlyEditPrivilege = false
    
    ngOnInit(): void {

         // API For Getting Registration List Start
        const that = this;
        this.dtOptions = {
          pagingType: 'full_numbers',
          pageLength: 20,
          serverSide: true,
          
          ajax: (dataTablesParameters: any, callback) => {
            that.processing = true
            const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
            
            that.apiService.get(`registration/list?Registration_processing=True&utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
                that.registrationList = data.results;
                that.dataSet = data.results;
                console.log('that.dataSet: ', that.dataSet);
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
        // API For Registration List End

         // API For Getting Registration List Start
         this.dtOptions1 = {
           pagingType: 'full_numbers',
           pageLength: 20,
           serverSide: true,
           
           ajax: (dataTablesParameters: any, callback) => {
             that.processing = true
             const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
             
             that.apiService.get(`registration/list?Registration_history=True&utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions1.pageLength}`).subscribe(data => {
                that.registrationListHistory = data.results;
                 that.dataSet = data.results;
                 console.log('that.dataSet: ', that.dataSet);
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
         // API For Registration List End


    	// this.dtOptions = {
    	// 	ordering:true,
    	// 	pagingType:'full_numbers',
    	// 	// rowCallback: (row: Node, data: any[] | Object, index: number) => {
    	// 	// 	$('.action', row).unbind('click');
		  //   //     $('.action', row).bind('click', () => {
		  //   //     	console.log()
		  //   //     });
		        
		  //   //     return row;
		  //   // }
    	// }

    	// $('#table1').DataTable( {
    		
		   //    pagingType: 'full_numbers',
		   //    paging: true,
		   //    ordering: true,
		   //    data: this.dataSet,
		   //    // columns: [
		   //    //   { "title": "Registration no.", "data":"registrationNo", "className":"foo"},
		   //    //   { "title": "Name", "data":"name"},
		   //    //   { "title": "Status", "data":"status"},
		   //    //   { "title": "Mobile no.", "data":"mobileNo"},
		   //    //   { "title": "Category", "data":"category"},
		   //    //   { "title": "Sub Category", "data":"subCategory"},
		   //    //   { "title": "Area", "data":"area"},
		   //    //   { "title": "Source", "data":"source"},
		   //    //   { "title": "Created on", "data":"createdOn"},
		   //    // ],
		   //    lengthMenu: [ 10, 12, 25, 50, 75, 100 ],
		   //    pageLength: 12,
		   //  });

		    // var table = $('#table1').DataTable();

		    
		 //    $('#table1').on('click', 'tbody td', function (e) {
		 //    	var el = document.getElementById("rock");
		 //    	var row = $('#table1').DataTable().row(this)
		    	
		 //    	console.log(e)     

      // } );
      
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

	// testing(id){
	// 	console.log(id)
  //   this.router.navigateByUrl("registration/"+"77d37a7e-0c56-4bfb-9543-858cc4b2d862");
  // }
  
  id_string;
  testing(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    this.router.navigateByUrl("registration/"+this.id_string);
  }

}
