import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tenders',
  templateUrl: './tenders.component.html',
  styleUrls: ['./tenders.component.scss']
})
export class TendersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#tenders_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#tender_type').show();
      $('#tender_subtype').hide();
      $('#tender_terms').hide();
      $('#tender_quote').hide();
    });
    $('#tenders_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#tenders_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#tender_type').hide();
      $('#tender_subtype').show();
      $('#tender_terms').hide();
      $('#tender_quote').hide();

    });
    $('#tenders_terms_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#tenders_type_tab').removeClass("active").addClass("finished");   
      $('#tenders_subtype_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#tender_type').hide();
      $('#tender_subtype').hide();
      $('#tender_terms').show();
      $('#tender_quote').hide();

    });
    $('#tenders_quote_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#tenders_type_tab').removeClass("active").addClass("finished");   
      $('#tenders_subtype_tab').removeClass("active").addClass("finished"); 
      $('#tenders_terms_tab').removeClass("active").addClass("finished");  
      $(this).addClass("active");
      $('#tender_type').hide();
      $('#tender_subtype').hide();
      $('#tender_terms').hide();
      $('#tender_quote').show();
    });
  }

}
