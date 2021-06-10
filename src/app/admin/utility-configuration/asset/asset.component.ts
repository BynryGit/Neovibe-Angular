import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  testing(){
    $('#asset_category_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#asset_category').show();
      $('#asset_subcategory').hide();
      $('#asset_insurance').hide();
      $('#asset_contract').hide();
    });
    $('#asset_subcategory_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#asset_category_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#asset_category').hide();
      $('#asset_subcategory').show();
      $('#asset_insurance').hide();
      $('#asset_contract').hide(); 
     

    });
    $('#asset_insurance_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#asset_category_tab').removeClass("active").addClass("finished");   
      $('#asset_subcategory_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#asset_category').hide();
      $('#asset_subcategory').hide();
      $('#asset_insurance').show();
      $('#asset_contract').hide();
      

    });
    $('#asset_contract_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#asset_category_tab').removeClass("active").addClass("finished");   
      $('#asset_subcategory_tab').removeClass("active").addClass("finished"); 
      $('#asset_insurance_tab').removeClass("active").addClass("finished");   
      $(this).addClass("active");
      $('#asset_category').hide();
      $('#asset_subcategory').hide();
      $('#asset_insurance').hide();
      $('#asset_contract').show();
     
    });
   
}


}
