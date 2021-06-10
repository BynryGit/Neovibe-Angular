import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-log',
  templateUrl: './activity-log.component.html',
  styleUrls: ['./activity-log.component.scss']
})
export class ActivityLogComponent implements OnInit {

  constructor() { }

  testing(){
    $('#activity-log-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#activity-log').show();
    });
  }

  ngOnInit(): void {
  }

}
