import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-services-admin',
  templateUrl: './services-admin.component.html',
  styleUrls: ['./services-admin.component.scss']
})
export class ServicesAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#service_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#service_type').show();
      $('#service_subtype').hide();
      $('#service_status').hide();
    });
    $('#service_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#service_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#service_type').hide();
      $('#service_subtype').show();
      $('#service_status').hide();
     

    });
    $('#service_status_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#service_type_tab').removeClass("active").addClass("finished");    
      $('#service_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#service_type').hide();
      $('#service_subtype').hide();
      $('#service_status').show();
      

    });
  }


}
