import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-consumers',
  templateUrl: './consumers.component.html',
  styleUrls: ['./consumers.component.scss']
})
export class ConsumersComponent implements OnInit {

  constructor() { }
  

  ngOnInit(): void {
  }

  testing(){
    $('#consumer_category_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#consumer_category').show();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
    });
    $('#consumer_subcategory_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#consumer_category_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#consumer_category').hide();
      $('#consumer_subcategory').show();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
     

    });
    $('#consumer_kyc_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').show();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
      

    });
    $('#consumer_faq_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished");
      $('#consumer_kyc_tab').removeClass("active").addClass("finished");   
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').show();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
     
    });
    $('#consumer_support_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished");
      $('#consumer_kyc_tab').removeClass("active").addClass("finished"); 
      $('#consumer_faq_tab').removeClass("active").addClass("finished");    
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').show();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
    });
    $('#consumer_service_agreements_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished");
      $('#consumer_kyc_tab').removeClass("active").addClass("finished"); 
      $('#consumer_faq_tab').removeClass("active").addClass("finished");    
      $('#consumer_support_tab').removeClass("active").addClass("finished");    
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').show();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').hide();
    });
    $('#consumer_tips_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished");
      $('#consumer_kyc_tab').removeClass("active").addClass("finished"); 
      $('#consumer_faq_tab').removeClass("active").addClass("finished");    
      $('#consumer_support_tab').removeClass("active").addClass("finished");  
      $('#consumer_service_agreements_tab').removeClass("active").addClass("finished");    
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').show();
      $('#consumer_contactus').hide();
    });
    
    $('#consumer_contactus_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#consumer_category_tab').removeClass("active").addClass("finished");    
      $('#consumer_subcategory_tab').removeClass("active").addClass("finished");
      $('#consumer_kyc_tab').removeClass("active").addClass("finished"); 
      $('#consumer_faq_tab').removeClass("active").addClass("finished");    
      $('#consumer_support_tab').removeClass("active").addClass("finished");   
      $('#consumer_service_agreements_tab').removeClass("active").addClass("finished"); 
      $('#consumer_tips_tab').removeClass("active").addClass("finished");      
      $(this).addClass("active");
      $('#consumer_category').hide();
      $('#consumer_subcategory').hide();
      $('#consumer_kyc').hide();
      $('#consumer_faq').hide();
      $('#consumer_support').hide();
      $('#consumer_service_agreements').hide();
      $('#consumer_offers').hide();
      $('#consumer_tips').hide();
      $('#consumer_contactus').show();

    });
  }

}
