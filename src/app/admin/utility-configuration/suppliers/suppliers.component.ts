import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#supplier_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#supplier_type').show();
      $('#supplier_subtype').hide();
      $('#supplier_category').hide();
      $('#supplier_subcategory').hide();
      $('#supplier_template').hide();
    });
    $('#supplier_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('supplier_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#supplier_type').hide();
      $('#supplier_subtype').show();
      $('#supplier_category').hide();
      $('#supplier_subcategory').hide();
      $('#supplier_template').hide(); 
     

    });
    $('#supplier_category_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('supplier_type_tab').removeClass("active").addClass("finished");
      $('#supplier_subtype_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#supplier_type').hide();
      $('#supplier_subtype').hide();
      $('#supplier_category').show();
      $('#supplier_subcategory').hide();
      $('#supplier_template').hide();
      

    });
    $('#supplier_subcategory_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('supplier_type_tab').removeClass("active").addClass("finished");
      $('#supplier_subtype_tab').removeClass("active").addClass("finished");
      $('#supplier_category_tab').removeClass("active").addClass("finished");   
      $(this).addClass("active");
      $('#supplier_type').hide();
      $('#supplier_subtype').hide();
      $('#supplier_category').hide();
      $('#supplier_subcategory').show();
      $('#supplier_template').hide();
     
    });
    $('#supplier_template_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('supplier_type_tab').removeClass("active").addClass("finished");
      $('#supplier_subtype_tab').removeClass("active").addClass("finished");
      $('#supplier_category_tab').removeClass("active").addClass("finished"); 
      $('#supplier_subcategory_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#supplier_type').hide();
      $('#supplier_subtype').hide();
      $('#supplier_category').hide();
      $('#supplier_subcategory').hide();
      $('#supplier_template').show();
     
    });

    
   
}

}
