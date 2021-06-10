import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#paymenttypetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#paymenttype').show();
      $('#paymentsubtype').hide();
      $('#paymentmode').hide();
      $('#paymentchannel').hide();
    });
    $('#paymentsubtypetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $('#paymenttypetab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#paymenttype').hide();
      $('#paymentsubtype').show();
      $('#paymentmode').hide();
      $('#paymentchannel').hide();
    });
    $('#paymentmodetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#paymenttypetab').removeClass("active").addClass("finished"); 
      $('#paymentsubtypetab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#paymenttype').hide();
      $('#paymentsubtype').hide();
      $('#paymentmode').show();
      $('#paymentchannel').hide();
     

    });
    $('#paymentchanneltab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#paymenttypetab').removeClass("active").addClass("finished"); 
      $('#paymentsubtypetab').removeClass("active").addClass("finished");   
      $('#paymentmodetab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#paymenttype').hide();
      $('#paymentsubtype').hide();
      $('#paymentmode').hide();
      $('#paymentchannel').show();

    });
   
  }

}
