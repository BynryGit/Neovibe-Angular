import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#work-status-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#work_status').show();
      $('#work_subtype').hide();
      $('#work_type').hide();
      
    });
    $('#work-subtype-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#work-status-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");     
      $('#work_status').hide();
      $('#work_subtype').show();
      $('#work_type').hide();  
      


    });
    $('#work-type-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#work-status-tab').removeClass("active").addClass("finished");   
      $('#work-subtype-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#work_type').show();
      $('#work_status').hide();
      $('#work_subtype').hide();
    });
}

}
