import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#billingtypetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#billingtype').show();
      $('#billinginstructions').hide();
      $('#billingtemplate').hide();
      $('#billingadvertisement').hide();
    });
    $('#billinginstructionstab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#billingtypetab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#billingtype').hide();
      $('#billinginstructions').show();
      $('#billingtemplate').hide();
      $('#billingadvertisement').hide(); 
     

    });
    $('#billingtemplatetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#billingtypetab').removeClass("active").addClass("finished");   
      $('#billinginstructionstab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#billingtype').hide();
      $('#billinginstructions').hide();
      $('#billingtemplate').show();
      $('#billingadvertisement').hide();
      

    });
    $('#billingadvertisementtab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#billingtypetab').removeClass("active").addClass("finished");   
      $('#billinginstructionstab').removeClass("active").addClass("finished"); 
      $('#billingtemplatetab').removeClass("active").addClass("finished");   
      $(this).addClass("active");
      $('#billingtype').hide();
      $('#billinginstructions').hide();
      $('#billingtemplate').hide();
      $('#billingadvertisement').show();
     
    });
   
}

}
