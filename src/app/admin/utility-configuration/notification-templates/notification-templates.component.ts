import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notification-templates',
  templateUrl: './notification-templates.component.html',
  styleUrls: ['./notification-templates.component.scss']
})
export class NotificationTemplatesComponent implements OnInit {

  constructor() { }

  testing(){
    $('#email-template-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#sms_template').hide();
      $('#email_template').show();
      $('#notifications_template').hide();
      

    });
    $('#sms-template-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#email-template-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");     
      $('#email_template').hide(); 
      $('#sms_template').show();
      $('#notifications_template').hide();
      

    });
    $('#notifications-template-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#email-template-tab').removeClass("active").addClass("finished");
      $('#sms-template-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");     
      $('#email_template').hide(); 
      $('#sms_template').hide();
      $('#notifications_template').show();
      

    });
  }

  ngOnInit(): void {
  }

}
