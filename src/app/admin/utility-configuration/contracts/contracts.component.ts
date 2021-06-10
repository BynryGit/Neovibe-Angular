import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.scss']
})
export class ContractsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#contract_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#contract_type').show();
      $('#contract_subtype').hide();
      $('#contract_period').hide();
      $('#contract_documents').hide();
      $('#contract_terms').hide();
    });
    $('#contract_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#contract_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#contract_type').hide();
      $('#contract_subtype').show();
      $('#contract_period').hide();
      $('#contract_documents').hide();
      $('#contract_terms').hide();
     

    });
    $('#contract_period_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#contract_type_tab').removeClass("active").addClass("finished");    
      $('#contract_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#contract_type').hide();
      $('#contract_subtype').hide();
      $('#contract_period').show();
      $('#contract_documents').hide();
      $('#contract_terms').hide();
      

    });
    $('#contract_documents_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#contract_type_tab').removeClass("active").addClass("finished");    
      $('#contract_subtype_tab').removeClass("active").addClass("finished");  
      $('#contract_period_tab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#contract_type').hide();
      $('#contract_subtype').hide();
      $('#contract_period').hide();
      $('#contract_documents').show();
      $('#contract_terms').hide();
     
    });
    $('#contract_terms_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#contract_type_tab').removeClass("active").addClass("finished");    
      $('#contract_subtype_tab').removeClass("active").addClass("finished");  
      $('#contract_period_tab').removeClass("active").addClass("finished");
      $('#contract_documents_tab').removeClass("active").addClass("finished");

      $(this).addClass("active");
      $('#contract_type').hide();
      $('#contract_subtype').hide();
      $('#contract_period').hide();
      $('#contract_documents').hide();
      $('#contract_terms').show();
     
     
    });

   
   
}

}
