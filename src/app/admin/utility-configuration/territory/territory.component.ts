import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';


@Component({
  selector: 'app-territory',
  templateUrl: './territory.component.html',
  styleUrls: ['./territory.component.scss'],
  
})
export class TerritoryComponent implements OnInit {
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

  // tabSet = [
  //   {class:"nav-item nav-link st active" , id: "region-tab", name: 'Region', href:"#region","area-controls":"region"},
  //   {class:"nav-item nav-link st", id: "country-tab", name: 'Country', href:"#country", "area-controls":"country"},
  //   {class:"nav-item nav-link st", id: "state-tab", name: 'State', href:"#state", "area-controls":"state"},
  //   {class:"nav-item nav-link st", id: "city-tab", name: 'City', href:"#city", "area-controls":"city"},
  //   {class:"nav-item nav-link st", id: "section-tab", name: 'Zone', href:"#section", "area-controls":"zone"},
  //   {class:"nav-item nav-link st", id: "division-tab", name: 'Division', href:"#division", "area-controls":"division"},
  //   {class:"nav-item nav-link st", id: "area-tab", name: 'Area', href:"#area", "area-controls":"area"},
  //   {class:"nav-item nav-link st", id: "subarea-tab", name: 'Subarea', href:"#subarea", "area-controls":"subarea"},
  //   {class:"nav-item nav-link st", id: "premises-tab", name: 'Premises', href:"#premises", "area-controls":"premises"},
  // ]

  ngOnInit(): void {
    
  }

  testing(){
    $('#region-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#country').hide();
      $('#region').show();
      $('#city').hide();
      $('#section').hide();
      $('#state').hide();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();
    });
    $('#country-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#region-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#country').show();
      $('#region').hide();
      $('#city').hide();
      $('#section').hide();
      $('#state').hide();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();

    });
    $('#state-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#city').hide();
      $('#section').hide();
      $('#division').hide();
      $('#state').show();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();

    });
    $('#city-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#section').hide();
      $('#division').hide();
      $('#city').show();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();
    });
    $('#section-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      //  alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $('#city-tab').removeClass("active").addClass("finished");  
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#city').hide();
      $('#section').show();
      $('#division').hide();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();
    });
    $('#division-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      //  alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $('#city-tab').removeClass("active").addClass("finished");  
      $('#section-tab').removeClass("active").addClass("finished");  
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#city').hide();
      $('#section').hide();
      $('#division').show();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').hide();
    });
    $('#area-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      //  alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $('#city-tab').removeClass("active").addClass("finished");  
      $('#section-tab').removeClass("active").addClass("finished");  
      $('#division-tab').removeClass("active").addClass("finished");  
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#city').hide();
      $('#section').hide();
      $('#division').hide();
      $('#area').show();
      $('#subarea').hide();
      $('#premises').hide();
    });

    $('#subarea-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      //  alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $('#city-tab').removeClass("active").addClass("finished");  
      $('#section-tab').removeClass("active").addClass("finished");  
      $('#area-tab').removeClass("active").addClass("finished");  
      $('#division-tab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#city').hide();
      $('#section').hide();
      $('#division').hide();
      $('#area').hide();
      $('#subarea').show();
      $('#premises').hide();
    });

    $('#premises-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      //  alert('working4');
      $('#region-tab').removeClass("active").addClass("finished");   
      $('#country-tab').removeClass("active").addClass("finished");  
      $('#state-tab').removeClass("active").addClass("finished");  
      $('#city-tab').removeClass("active").addClass("finished");  
      $('#section-tab').removeClass("active").addClass("finished");  
      $('#area-tab').removeClass("active").addClass("finished");  
      $('#subarea-tab').removeClass("active").addClass("finished");  
      $('#division-tab').removeClass("active").addClass("finished");
      $(this).addClass("active");
      $('#region').hide();
      $('#country').hide();
      $('#state').hide();
      $('#city').hide();
      $('#section').hide();
      $('#division').hide();
      $('#area').hide();
      $('#subarea').hide();
      $('#premises').show();
    });
}

}
