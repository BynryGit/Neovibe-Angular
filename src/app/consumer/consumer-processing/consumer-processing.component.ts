import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Subject, Subscription } from 'rxjs';
import * as mapboxgl from 'mapbox-gl';
import * as MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
declare var $: any;

@Component({
  selector: 'app-consumer-processing',
  templateUrl: './consumer-processing.component.html',
  styleUrls: ['./consumer-processing.component.scss']
})
export class ConsumerProcessingComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  dtOptions1: DataTables.Settings = {};
  dtOptions2: DataTables.Settings = {};
  consumerList:any =[];
  consumerListHistory:any =[];
  consumerListApproved:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  consumerdata;
  processing;
  dtTrigger: Subject<any> = new Subject<any>();
  searchText;
  trigger: any;
  subscription: Subscription
  coordinateList: any[] = []

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
          name:       "Category",
      },
      {
          name:       "Sub category",
      },
      {
          name:       "Area",
      },
      {
          name:       "Created on",
      },
      {
          name:       "Action"
      }   
  ]

  id_string;
  OnApproveConsumer(item:any){
    this.consumerdata={
      // consumer_service_contract_detail_id: "5b6403d6-c18f-4889-9b04-00e8af89d2e9",
      consumer_service_contract_detail_id: item.id_string,
      utility_id:this.sessionService.getter("utility_id_string")
    }
    this.apiService.post('consumer/service-contract-detail',this.consumerdata).subscribe(result=>{
      console.log('result: ', result); 
      console.log('=============')
    
   })
   console.log('consumer: ', this.consumerdata);
  }

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

    // this.apiService.get('consumer/'+this.utilityIdString+'/service-contract-detail/list?consumer_processing=True').subscribe(data => {
    //   this.consumerList = data;
    // })
  }

  privilegeList = []
  EditViewPrivilege = false
  onlyViewPrivilege = false
  onlyEditPrivilege = false

  ngOnInit(): void {
    // API For Getting Consumer service contract details List Start
    const that = this;

    // API For Getting Consumer service contract details List Start
     this.dtOptions2 = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing_approved=True&utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions2.pageLength}`).subscribe(data => {
            that.consumerListApproved = data.results;
            console.log('that.dataSet: ', that.consumerListApproved);
            this.dtTrigger.next();
            that.processing = false
            callback({
              recordsTotal: data.count,
              recordsFiltered: data.count,
              data: []
            });
        });
        this.connectedSetCoordinates()
        this.currentDateSetCoordinates()
        this.historySetCoordinates()
      },
    };
    // API For Consumer service contract details List End


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 20,
      serverSide: true,
      
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing=True&utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions.pageLength}`).subscribe(data => {
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
       pageLength: 20,
       serverSide: true,
       
       ajax: (dataTablesParameters: any, callback) => {
         that.processing = true
         const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
         
         that.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing_history=True&utility_id_string=`+this.utilityIdString+`&page=${page}&page_size=${this.dtOptions1.pageLength}`).subscribe(data => {
             that.consumerListHistory = data.results;
             console.log('that.dataSet: ', that.consumerListHistory);
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

  testing(id){
  console.log(id)
  this.router.navigateByUrl("registration/"+"8eea5e41-f6cb-4f8a-acba-17be32d89997");
  }

  currentDateSetCoordinates(){
       
    this.subscription = this.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing=True&utility_id_string=`+this.utilityIdString).subscribe(result=>{
      if(result.results){
        console.log("map successsss")
        this.coordinateList = this.commonServices.setCoordinatesData(result.results)
        this.commonServices.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonServices.loadMap(this.coordinateList)
    })
  }

  connectedSetCoordinates(){
       
    this.subscription = this.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing_approved=True&utility_id_string=`+this.utilityIdString).subscribe(result=>{
      if(result.results){
        console.log("approve successsss")
        this.coordinateList = this.commonServices.setCoordinatesData(result.results)
        this.commonServices.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonServices.loadMap(this.coordinateList)
    })
  }

  historySetCoordinates(){
       
    this.subscription = this.apiService.get(`consumer/`+this.utilityIdString+`/service-contract-detail/list?consumer_processing_history=True&utility_id_string=`+this.utilityIdString).subscribe(result=>{
      if(result.results){
        console.log("history successsss")
        this.coordinateList = this.commonServices.setCoordinatesData(result.results)
        this.commonServices.loadMap(this.coordinateList)
      }
    },(err)=>{
      this.coordinateList = []
      this.commonServices.loadMap(this.coordinateList)
    })
  }


  onViewclick(item:any){
    this.id_string = item.id_string;
    console.log(this.id_string);
    // this.trigger = $('#complaintApproveModal').modal('show');
    this.filterService.sendButtonEventByIdString(0, this.id_string, 0)
  }

  consumerID;
  consumerDetail(item:any){
    this.consumerID = item.consumer_id.id_string;
    console.log(this.consumerID);
    this.router.navigateByUrl("consumer/view-consumer/"+this.consumerID);

  }

}
