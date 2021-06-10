import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-utility-setup',
  templateUrl: './utility-setup.component.html',
  styleUrls: ['./utility-setup.component.scss']
})
export class UtilitySetupComponent implements OnInit {

  model1: NgbDateStruct;
  model2: NgbDateStruct;
  model3: NgbDateStruct;
  model4: NgbDateStruct;
  date: { year: number, month: number};

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
  paymode: FormGroup;
  selectedYesNo = true;
  adjustbilltype: FormGroup;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  


  constructor() { }

  ngOnInit(): void {
  }

  testing(){
    $('#module-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#utility_modules').show();
      $('#utility_product').hide();
      $('#utility_department').hide();
    });
    $('#product-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#module-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active"); 
      $('#utility_product').show();      
      $('#utility_modules').hide();
      $('#utility_department').hide();
    });
    $('#department-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#module-tab').removeClass("active").addClass("finished"); 
      $('#product-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active"); 
      $('#utility_product').hide();      
      $('#utility_modules').hide();
      $('#utility_department').show();
    });
  }

}
