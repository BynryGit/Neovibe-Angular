import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utility-holiday',
  templateUrl: './utility-holiday.component.html',
  styleUrls: ['./utility-holiday.component.scss']
})
export class UtilityHolidayComponent implements OnInit {

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
  paymode: FormGroup;
  selectedYesNo = true;
  adjustbilltype: FormGroup;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

  testing(){
    $('#leave-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $(this).addClass("active").addClass("finished"); 
      $('#work_leaves').show();  
      $('#work_holiday').hide();  
    });
    $('#holiday-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $('#leave-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active").addClass("finished"); 
      $('#work_holiday').show();
      $('#work_leaves').hide();
    });
  }

  ngOnInit(): void {
  }

}
