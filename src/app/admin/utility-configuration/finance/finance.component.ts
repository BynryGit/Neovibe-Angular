import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-finance',
  templateUrl: './finance.component.html',
  styleUrls: ['./finance.component.scss']
})
export class FinanceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#finance_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#finance_type').show();
      $('#finance_subtype').hide();
    });
    $('#finance_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#finance_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#finance_type').hide();
      $('#finance_subtype').show();
     
  
  });

  }
}
