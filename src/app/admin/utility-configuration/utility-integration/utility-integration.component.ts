import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-utility-integration',
  templateUrl: './utility-integration.component.html',
  styleUrls: ['./utility-integration.component.scss']
})
export class UtilityIntegrationComponent implements OnInit {

  constructor() { }

  tabSet = [
    {class:"nav-item nav-link st active" , id: "integration-tab", name: 'Integration Details', href:"#integration_details","area-controls":"integration"},
  ]

  testing(){
    $('#integration-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#integration_details').hide();
    });
  }

  ngOnInit(): void {
  }

}
