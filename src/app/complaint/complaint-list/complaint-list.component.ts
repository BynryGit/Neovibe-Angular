import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FilterService } from '../../common/filter/filter.service';
import { ComplaintListService } from '../../complaint/complaint-list/complaint-list.service';
import { faChevronLeft,faCalendarAlt, faChevronRight,faEye , faPen,faFileCsv, faMapMarkerAlt, faFileExcel, faPrint, faFilePdf, faPlus,faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http' ;
import { Subject } from 'rxjs';
import { ComplaintService } from '../complaint.service';
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-complaint-list',
  templateUrl: './complaint-list.component.html',
  styleUrls: ['./complaint-list.component.scss']
  
})
export class ComplaintListComponent implements OnInit {

complaint: any =[];
dtTrigger: Subject<any> = new Subject();
utilityIdString = '77de201c-04b5-45b2-8dc8-c8c826b1f268'

dtOptions: DataTables.Settings = {};

    dataSet = [
     
    ]

    blocks = [
        {
            name:       "ID.",
        },
        {
            name:       "Complaint Name",
        },
        {
            name:       "Complaint Type",
        },
        {
          name:       "Complaint Sub Type",
        },
        {
            name:       "Description",
        },
        {
            name:       "Complaint date",
        },
        {
            name:       "Complaint No.",
        },
        {
            name:       "Created on",
        },
        {
            name:       "Action"
        }   
    ]

    
    constructor(private filterService : FilterService, private api:ComplaintService, private complaintListService : ComplaintListService,private apiService : ApiService) {
      this.filterService.getPagination().subscribe(data=>{
        $('#table1').DataTable().page.len(data.number).draw()
      })

      this.filterService.getSearchText().subscribe(data=>{
        $('#table1').DataTable().search(data.text).draw()
      })

      this.apiService.get('complaint/'+this.utilityIdString+'/list').subscribe(data=>{
        this.complaint = data;
      })
    }
     
    

  

  ngOnInit(): void {
    this.dtOptions = {
      ordering:true,
      pagingType:'full_numbers',
    }
   
  }

  buttonClicked(event,id){
    event = event || window.event; // IE
    var target = event.target || event.srcElement; // IE
    var id = target.id;
    this.complaintListService.sendButtonEvent(event,id)
  }

  

 
  // getComplaint = () => {
  //   this.api.getComplaintList().subscribe(
  //     data => { 
  //       this.complaint = data;
  //       // this.dtTrigger.next();
  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   );

  // }

}
