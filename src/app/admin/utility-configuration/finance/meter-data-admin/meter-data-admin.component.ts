import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-meter-data-admin',
  templateUrl: './meter-data-admin.component.html',
  styleUrls: ['./meter-data-admin.component.scss']
})
export class MeterDataAdminComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#meter-type-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#meter_type').show();
      $('#meter_activity').hide();
      $('#meter_route').hide();
      $('#meter_bill').hide();
      $('#meter_assignments').hide();
      $('#meter_validation').hide();
    });
    $('#meter-activity-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#meter-type-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#meter_type').hide();
      $('#meter_activity').show();
      $('#meter_route').hide();
      $('#meter_bill').hide();
      $('#meter_assignments').hide();
      $('#meter_validation').hide();
     

    });
    $('#meter-route-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#meter-type-tab').removeClass("active").addClass("finished");    
      $('#meter-activity-tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#meter_type').hide();
      $('#meter_activity').hide();
      $('#meter_route').show();
      $('#meter_bill').hide();
      $('#meter_assignments').hide();
      $('#meter_validation').hide();
      

    });
    $('#meter-bill-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#meter-type-tab').removeClass("active").addClass("finished");    
      $('#meter-activity-tab').removeClass("active").addClass("finished");   
      $('#meter-route-tab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#meter_type').hide();
      $('#meter_activity').hide();
      $('#meter_route').hide();
      $('#meter_bill').show();
      $('#meter_assignments').hide();
      $('#meter_validation').hide();
     
    });
    $('#meter-read-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#meter-type-tab').removeClass("active").addClass("finished");    
      $('#meter-activity-tab').removeClass("active").addClass("finished");   
      $('#meter-route-tab').removeClass("active").addClass("finished");
      $('#meter-bill-tab').removeClass("active").addClass("finished");

      $(this).addClass("active");
      $('#meter_type').hide();
      $('#meter_activity').hide();
      $('#meter_route').hide();
      $('#meter_bill').hide();
      $('#meter_assignments').show();
      $('#meter_validation').hide();
     
    });

    $('#meter-validate-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#meter-type-tab').removeClass("active").addClass("finished");    
      $('#meter-activity-tab').removeClass("active").addClass("finished");   
      $('#meter-route-tab').removeClass("active").addClass("finished");
      $('#meter-bill-tab').removeClass("active").addClass("finished");
      $('#meter-read-tab').removeClass("active").addClass("finished");

      $(this).addClass("active");
      $('#meter_type').hide();
      $('#meter_activity').hide();
      $('#meter_route').hide();
      $('#meter_bill').hide();
      $('#meter_assignments').hide();
      $('#meter_validation').show();
    });
    
   
}


}
