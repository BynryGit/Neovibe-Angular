import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  constructor() { }
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  faPen = faPen;
  faMapMarkerAlt = faMapMarkerAlt;
  faPrint = faPrint;
  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faCalendarAlt = faCalendarAlt;
  faFileCsv = faFileCsv;
  faFilePdf = faFilePdf;
  faFileExcel = faFileExcel;
  faEye = faEye;
  faPlus = faPlus;
 

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  ngOnInit(): void {
  }

  testing(){
    $('#product_type_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#product_type').show();
      $('#product_subtype').hide();
      $('#product_product').hide();
    });
    $('#product_subtype_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#product_type_tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");      
      $('#product_type').hide();
      $('#product_subtype').show();
      $('#product_product').hide();
     

    });
    $('#product_status_tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#product_type_tab').removeClass("active").addClass("finished");    
      $('#product_subtype_tab').removeClass("active").addClass("finished"); 
     
      $(this).addClass("active");
      $('#product_type').hide();
      $('#product_subtype').hide();
      $('#product_product').show();
      

    });
  }

}
