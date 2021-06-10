import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sevice-requests',
  templateUrl: './sevice-requests.component.html',
  styleUrls: ['./sevice-requests.component.scss']
})
export class SeviceRequestsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
      $('#service_type_tab').on('shown.bs.tab', function(e) {
        e.target // newly activated tab    
        $(this).addClass("active").addClass("finished"); 
        $('#service_type').show();
        $('#service_subtype').hide();
        $('#service_service').hide();
      });
      $('#service_subtype_tab').on('shown.bs.tab', function(e) {
        e.target // newly activated tab
        // alert('working2'); 
        $('#service_type_tab').removeClass("active").addClass("finished"); 
        $(this).addClass("active");       
        $('#service_type').hide();
        $('#service_subtype').show();
        $('#service_service').hide();
  
      });
      $('#service_service_tab').on('shown.bs.tab', function(e) {
        e.target // newly activated tab
        // alert('working3');
        $('#service_type_tab').removeClass("active").addClass("finished");   
        $('#service_subtype_tab').removeClass("active").addClass("finished"); 
        $('#service_type').hide();
        $('#service_subtype').hide();
        $('#service_service').show();
  
      });
     
  }

}
