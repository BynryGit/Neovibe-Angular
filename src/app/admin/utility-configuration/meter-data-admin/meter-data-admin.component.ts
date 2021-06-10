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
    $('#smart-meter-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#meter_route').hide();
      $('#smart_meter').show();
      $('#read_cycle').hide();
      $('#meter_task').hide();
      $('#meter_validation').hide();
      $('#reader-status').hide()

    });
    $('#meter-task-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#smart-meter-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");     
      $('#meter_route').hide(); 
      $('#smart_meter').hide();
      $('#meter_task').show();
      $('#read_cycle').hide();
      $('#meter_validation').hide();
      $('#reader-status').hide()

    });
    $('#meter-route-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#smart-meter-tab').removeClass("active").addClass("finished");    
      $('#meter-task-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#meter_route').show();
      $('#smart_meter').hide();
      $('#read_cycle').hide();
      $('#meter_task').hide();
      $('#meter_validation').hide();
      $('#reader-status').hide()

    });
    $('#meter-read-cycle-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#smart-meter-tab').removeClass("active").addClass("finished");    
      $('#meter-task-tab').removeClass("active").addClass("finished");
      $('#meter-route-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#meter_route').hide();
      $('#smart_meter').hide();
      $('#read_cycle').show();
      $('#meter_task').hide();
      $('#meter_validation').hide();
      $('#reader-status').hide()

    });
    $('#meter-validation-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#smart-meter-tab').removeClass("active").addClass("finished");    
      $('#meter-task-tab').removeClass("active").addClass("finished");
      $('#meter-route-tab').removeClass("active").addClass("finished"); 
      $('#meter-read-cycle-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#meter_route').hide();
      $('#smart_meter').hide();
      $('#read_cycle').hide();
      $('#meter_task').hide();
      $('#meter_validation').show();
      $('#reader-status').hide()
    });
    $('#reader-status-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#smart-meter-tab').removeClass("active").addClass("finished");    
      $('#meter-task-tab').removeClass("active").addClass("finished");
      $('#meter-route-tab').removeClass("active").addClass("finished"); 
      $('#meter-read-cycle-tab').removeClass("active").addClass("finished"); 
      $('#meter-validation-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#meter_route').hide();
      $('#smart_meter').hide();
      $('#read_cycle').hide();
      $('#meter_task').hide();
      $('#meter_validation').hide();
      $('#reader-status').show()
    });
}


}
