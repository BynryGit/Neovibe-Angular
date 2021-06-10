import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#store_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#store_type').show();
      $('#store_receipt').hide();
      $('#store_location').hide();
     
    });
    $('#store_location_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#store_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#store_type').hide();
      $('#store_receipt').hide();
      $('#store_location').show();
     

    });
    $('#store_receipt_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#store_type_tab').removeClass("active").addClass("finished");   
      $('#store_location_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#store_type').hide();
      $('#store_receipt').show();
      $('#store_location').hide();
      

    });
   
   
}

}
