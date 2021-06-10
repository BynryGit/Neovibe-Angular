import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $('#role_type').hide();
    $('#role_subtype').hide();
  }
  testing(){
    $('#role_role_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#role_role').show();
      $('#role_type').hide();
      $('#role_subtype').hide();
    });
    $('#role_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#role_role_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active"); 
      $('#role_role').hide();
      $('#role_type').show();
      $('#role_subtype').hide();     
    });
    $('#role_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#role_role_tab').removeClass("active").addClass("finished");    
      $('#role_type_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#role_role').hide();
      $('#role_type').hide();
      $('#role_subtype').show(); 

    });
  }
}
