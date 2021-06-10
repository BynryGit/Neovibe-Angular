import { Component, OnInit } from '@angular/core';
import { faChevronLeft,faCalendarAlt, faChevronRight,faEye , faPen,faFileCsv, faMapMarkerAlt, faFileExcel, faPrint, faFilePdf, faPlus,faTrash } from '@fortawesome/free-solid-svg-icons'; 
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { data, event } from 'jquery';
import { Subject } from 'rxjs';
import { ComplaintListService } from '../../complaint/complaint-list/complaint-list.service';
import { ComplaintService } from '../../complaint/complaint.service';
import { Router, ActivatedRoute } from '@angular/router';


declare var $: any;



@Component({
  selector: 'app-complaint-view',
  templateUrl: './complaint-view.component.html',
  styleUrls: ['./complaint-view.component.scss'],
  
})
export class ComplaintViewComponent implements OnInit {
  complaint: any =[];
  dtTrigger: Subject<any> = new Subject();

  dtOptions: DataTables.Settings = {};

  idString : any;

  complaintDetails = {
    static : {},
    type : [],
    profile : []
  }

  constructor(private complaintListService: ComplaintListService,private router : Router, private route : ActivatedRoute,private complaintService:ComplaintService) { 
    this.route.params.subscribe(params => {
      this.idString = params.id
     
    });

    
  }

  ngOnInit(): void {
    this.complaintListService.getButtonEvent().subscribe(data=>{
      console.log(data.event.type);
     

      $('#complaindetails').modal('show');
     
     
    });
   

    
  }

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  

  

}
