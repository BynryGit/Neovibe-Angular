import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { FilterService } from '../../../../common/filter/filter.service';
import { SessionService } from '../../../../common-services/session-service/session.service';
@Component({
  selector: 'app-num-format-tab',
  templateUrl: './num-format-tab.component.html',
  styleUrls: ['./num-format-tab.component.scss']
})
export class NumFormatTabComponent implements OnInit {
  

  constructor(private fb: FormBuilder,private apiService : ApiService,private filterService : FilterService,private sessionService : SessionService ) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })
  
    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
    this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data=>{
      this.numformatList = data;
    })
    // this.apiService.get('utility/'+this.utilityIdString+'/sub_module/list').subscribe(data1=>{
    //   this.submoduleList = data1.results;
      
    // })
    this.apiService.get('submodule/list').subscribe(data1=>{
      this.submoduleList = data1.results;
      
    })
  }
  dtOptions:DataTables.Settings = {};
    
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  selectedPagination:any;
  pagination = [
  {id: 1, name: '10'},
  {id: 2, name: '20'},
  ];

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
  paymode: FormGroup;
  selectedYesNo = true;
  adjustbilltype: FormGroup;
  utilityIdString = this.sessionService.getter("utility_id_string");
  numformatList: any =[];
  submoduleList: any =[];
  numformatObj: any = {};
  searchText;

  dataSet = [
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1000,
    //   current: 1020
      
      
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1001,
    //   current: 1020,
     
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1002,
    //   current: 1020,
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1003,
    //   current: 1020,
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1004,
    //   current: 1020,
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1000,
    //   current: 1020,
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1000,
    //   current: 1020
    // },
    // {
    //   module:['Registration'],
    //   prefix:['Yes'].sort((a, b) => .5 - Math.random())[0],
    //   prefix_format: ['Infra','Beech'].sort((a, b) => .5 - Math.random())[0],
    //   start: 1000,
    //   current: 1020
    // }
    
    
]

blocks = [
  {
      name:       "Sub Module",
  },
  {
      name:       "Prefix",
  },
  {
      name:       "Prefix Format",
  },
  {
      name:       "Starting",
  },
  {
    name:       "Current",
  },
  {
    name:       "Action",
  },
]
addnumformatData;
editnumformatData;
onAddNumformatdata(){
  this.addnumformatData ={
    sub_module_id:this.numformatObj.bindvalue.id_string,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    prefix:this.numformatObj.prefix,
    startingno:this.numformatObj.startingno,
    currentno:this.numformatObj.currentno
  }

  this.apiService.post('utility/numformat',this.addnumformatData).subscribe(result=>{
     console.log('result: ', result);
     this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data => {
      this.numformatList = data;
      this.filterService.getPagination().subscribe(data=>{
        $('#table1').DataTable().page.len(data.number).draw()
      }) 
    }) 
    // this.apiService.delete('utility/'+this.numformatObj.bindvalue.id_string+'/sub_module/delete').subscribe(data => {
    //   this.submoduleList = data;
    // })
    
   
  })
  console.log('Numformat: ', this.addnumformatData);
  console.log('Value:',this.numformatObj.bindvalue.label)
}

onEditNumformatdata(){
  this.editnumformatData ={
    sub_module_id:this.numformatObj.bindvalue.id_string,
    tenant_id:this.sessionService.getter("tenant_id_string"),
    utility_id:this.sessionService.getter("utility_id_string"),
    prefix:this.numformatObj.prefix,
    startingno:this.numformatObj.startingno,
    currentno:this.numformatObj.currentno
  }

  this.apiService.put('utility/'+this.id_string+'/numformat',this.editnumformatData).subscribe(result=>{
     console.log('result: ', result);
     this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data => {
      this.numformatList = data;
    }) 
   
  })
 
}

id_string;
onCardClickEvent(item:any){
  this.id_string = item.id_string;
  console.log(this.id_string);
  this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data => {
    this.numformatList = data;
  }) 
}
onAddClick(){
  this.apiService.get('utility/'+this.utilityIdString+'/numformat/list').subscribe(data => {
    this.numformatList = data;
  }) 

}
remove_dropdowndata;
removeOption() { 
  
} 

  ngOnInit(): void {
    this.adjustbilltype = this.fb.group({            
      billtype: '',
    });
  }

}
