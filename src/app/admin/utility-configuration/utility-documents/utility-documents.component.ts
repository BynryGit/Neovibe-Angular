import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-utility-documents',
  templateUrl: './utility-documents.component.html',
  styleUrls: ['./utility-documents.component.scss']
})
export class UtilityDocumentsComponent implements OnInit {

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
    $('#document-type-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#document_type').show();
      $('#document_subtype').hide();
      
    });
    $('#document-subtype-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#document-type-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#document_type').hide();
      $('#document_subtype').show();
      

    });
}

  ngOnInit(): void {
  }

}
