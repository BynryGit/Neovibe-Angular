import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hcm',
  templateUrl: './hcm.component.html',
  styleUrls: ['./hcm.component.scss']
})
export class HcmComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#hcm_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#hcm_type').show();
      $('#hcm_subtype').hide();
    });
    $('#hcm_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#hcm_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#hcm_type').hide();
      $('#hcm_subtype').show();
     
  
  });

  }

}
