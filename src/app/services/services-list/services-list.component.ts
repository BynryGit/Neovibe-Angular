import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../common/filter/filter.service';
import { faChevronLeft,faCalendarAlt, faChevronRight,faEye , faPen,faFileCsv, faMapMarkerAlt, faFileExcel, faPrint, faFilePdf, faPlus,faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { Subject } from 'rxjs';
import { ServicesService } from '../services.service';
import { ApiService } from '../../common-services/api-service/api.service';


@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  services: any =[];
  dtTrigger: Subject<any> = new Subject();
  dtOptions: DataTables.Settings = {};
  utilityIdString = '145488b2-6edf-48cb-bcc4-fa597765b51f';

  dataSet = [
    
  ]

  blocks = [
      {
          name:       "Service Req No.",
      },
      {
          name:       "Consumer No.",
      },
      {
          name:       "Consumer Remark",
      },
      {
          name:       "Admin Remark",
      },
      {
          name:       "Request Date",
      },
      {
          name:       "Request Due Date",
      },
      {
          name:       "Action"
      }   
  ]

  


  constructor(private filterService : FilterService, private api:ServicesService,private apiService : ApiService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      $('#table1').DataTable().search(data.text).draw()
    })
    this.apiService.get('service/'+this.utilityIdString+'/list').subscribe(data=>{
      this.services = data;
    })
  }

  ngOnInit(): void {

    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
      // rowCallback: (row: Node, data: any[] | Object, index: number) => {
      // 	$('.action', row).unbind('click');
      //     $('.action', row).bind('click', () => {
      //     	console.log()
      //     });
          
      //     return row;
      // }
    
    }
}
}


