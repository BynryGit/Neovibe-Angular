import { Component, OnInit } from '@angular/core';
import { faChevronLeft, faChevronRight, faPen, faMapMarkerAlt, faPrint, faTimesCircle, faTrash, faCalendarAlt, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../../../../common-services/api-service/api.service';
import { SessionService } from '../../../../common-services/session-service/session.service';


@Component({
  selector: 'app-consumer-offers',
  templateUrl: './consumer-offers.component.html',
  styleUrls: ['./consumer-offers.component.scss']
})
export class ConsumerOffersComponent implements OnInit {

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
  searchText;
  today_date = new Date();
  year_start;
  month_start;
  day_start;
  year_end;
  month_end;
  day_end;
  year_start_edit;
  month_start_edit;
  day_start_edit;
  year_end_edit;
  month_end_edit;
  day_end_edit;

  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };


  ngOnInit(): void {
  }

}
