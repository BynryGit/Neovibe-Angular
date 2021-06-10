import { Component, OnInit, Input } from '@angular/core';
import { Router,Routes, RouterModule } from '@angular/router';
import { faTrash, faCalendarAlt, faPrint, faFileCsv, faFilePdf, faFileExcel, faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterService } from '../filter/filter.service';
import { SessionService } from 'src/app/common-services/session-service/session.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filterData;
  @Input() buttonData;

  constructor(private filterService: FilterService,private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.filters = this.filterData;
    this.button = this.buttonData
    if (this.button['name'] == ''){
      this.showbutton = false
    }else{
      this.showbutton = true
    }
  }

  filters = []
  button : any;

  selected:any;
  searchText:any;
  selectedPagination:any;
  date: {year: number, month: number};
  faCalendarAlt = faCalendarAlt;
  showbutton
  showRecord = false;
  showFilter = true;
  showTool = true;
  utility_id_string = this.sessionService.getter("utility_id_string");
  loginUser;

  disableAdd(){
    this.loginUser = this.sessionService.getter("loginUser")
    if((this.loginUser) == 'Utility' && this.buttonData.id == '#addAdvertisementModal'){
      console.log("TRUE")
      return true;
      
    }
    else{
      return false;
    }
  }

  keypress(){
      this.filterService.sendSearchText(this.searchText)
      console.log(this.searchText)
  }

  eventHandler(event) {
    console.log("KKKKK",event, event.keyCode, event.keyIdentifier);
 } 

  recordsChange(){
    this.filterService.sendPagination(this.selectedPagination)
  }

  buttonClicked(event){
    console.log("BUTTON",this.buttonData)
    this.filterService.sendButtonEvent(event)
  }

} 
