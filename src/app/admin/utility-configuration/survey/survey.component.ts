import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

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
  

  ngOnInit(): void {
  }
  testing(){
    $('#surveytypetab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished");
      $('#surveysubtype').hide();
      $('#surveyobj').hide();
      $('#surveytype').show();
      
    });
    $('#surveysubtypetab').on('shown.bs.tab', function(e) {
      e.target 
      $('#surveytypetab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#surveyobj').hide();
      $('#surveytype').hide();
      $('#surveysubtype').show();
     
    });
    $('#surveyobjtab').on('shown.bs.tab', function(e) {
      e.target 
      $('#surveytypetab').removeClass("active").addClass("finished");
      $('#surveysubtypetab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#surveytype').hide();
      $('#surveysubtype').hide();
      $('#surveyobj').show();
    });
    
   
  }
  


}
