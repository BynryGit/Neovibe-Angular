import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  constructor() { }

  tabSet = [
    {class:"nav-item nav-link st active" , id: "offer_type_tab", name: 'Type', href:"#offer_type","area-controls":"type"},
    {class:"nav-item nav-link", id: "offer_subtype_tab", name: 'SubType', href:"#offer_subtype", "area-controls":"subtype"},
    {class:"nav-item nav-link", id: "offer_details_tab", name: 'Offer Details', href:"#offer_details", "area-controls":"details"},
  ]

  

  ngOnInit(): void {
  }



  testing(){
    $('#offer_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#offer_type').show();
      $('#offer_subtype').hide();
      $('#offer_details').hide();
    });
    $('#offer_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#offer_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#offer_type').hide();
      $('#offer_subtype').show();
      $('#offer_details').hide();
  
    });
    $('#offer_details_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#offer_type_tab').removeClass("active").addClass("finished");    
      $('#offer_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#offer_type').hide();
      $('#offer_subtype').hide();
      $('#offer_details').show();
      
    });

  }

}
