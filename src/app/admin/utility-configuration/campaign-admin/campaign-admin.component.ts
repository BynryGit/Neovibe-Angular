import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-campaign-admin',
  templateUrl: './campaign-admin.component.html',
  styleUrls: ['./campaign-admin.component.scss']
})
export class CampaignAdminComponent implements OnInit {

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

  testing(){
    $('#type-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab    
      $(this).addClass("active").addClass("finished"); 
      $('#campaign_type').show();
      $('#campaign_subtype').hide();
      $('#campaign_frequency').hide();
      $('#campaign_channel').hide();
      $('#adv_type').hide();
      $('#adv_subtype').hide();
    });
    $('#subtype-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working2'); 
      $('#type-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#campaign_type').hide();
      $('#campaign_subtype').show();
      $('#campaign_frequency').hide();
      $('#campaign_channel').hide();
      $('#adv_type').hide();
      $('#adv_subtype').hide();

    });
    $('#frequency-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#type-tab').removeClass("active").addClass("finished"); 
      $('#subtype-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#campaign_type').hide();
      $('#campaign_subtype').hide();
      $('#campaign_frequency').show();
      $('#campaign_channel').hide();
      $('#adv_type').hide();
      $('#adv_subtype').hide();
    });
    $('#channel-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#type-tab').removeClass("active").addClass("finished"); 
      $('#subtype-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#campaign_type').hide();
      $('#campaign_subtype').hide();
      $('#campaign_frequency').hide();
      $('#campaign_channel').show();
      $('#adv_type').hide();
      $('#adv_subtype').hide();
    });
    $('#advtype-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#type-tab').removeClass("active").addClass("finished"); 
      $('#subtype-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#campaign_type').hide();
      $('#campaign_subtype').hide();
      $('#campaign_frequency').hide();
      $('#campaign_channel').hide();
      $('#adv_type').show();
      $('#adv_subtype').hide();
    });
    $('#advsubtype-tab').on('shown.bs.tab', function(e) {
      e.target // newly activated tab
      // alert('working3');
      $('#type-tab').removeClass("active").addClass("finished"); 
      $('#subtype-tab').removeClass("active").addClass("finished"); 
      $(this).addClass("active");       
      $('#campaign_type').hide();
      $('#campaign_subtype').hide();
      $('#campaign_frequency').hide();
      $('#campaign_channel').hide();
      $('#adv_type').hide();
      $('#adv_subtype').show();
    });
  }

  ngOnInit(): void {
  }

}
