import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-complaints',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplaintsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#complaint_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#complaint_type').show();
      $('#complaint_subtype').hide();
      $('#complaint_complaint').hide();
    });
    $('#complaint_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#complaint_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");  
      $('#complaint_type').hide();
      $('#complaint_subtype').show();
      $('#complaint_complaint').hide();    
      

    });
    $('#complaint_complaint_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#complaint_type_tab').removeClass("active").addClass("finished");    
      $('#complaint_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#complaint_type').hide();
      $('#complaint_subtype').hide();
      $('#complaint_complaint').show();
      

    });
  
  }

}
