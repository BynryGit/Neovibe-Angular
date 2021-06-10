import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
   
  testing(){
    $('#order_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#order_type').show();
      $('#order_subtype').hide();
      $('#order_status').hide();
    });
    $('#order_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#order_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#order_type').hide();
      $('#order_subtype').show();
      $('#order_status').hide();
  
    });
    $('#order_status_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#order_type_tab').removeClass("active").addClass("finished");    
      $('#order_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#order_type').hide();
      $('#order_subtype').hide();
      $('#order_status').show();
      
    });

  }
  
}

