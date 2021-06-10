import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/common-services/session-service/session.service';
import { CommonService } from 'src/app/common/common.service';
import { UtilityService } from '../utility.service'
import { FilterService } from '../../common/filter/filter.service';

declare var $: any;
@Component({
  selector: 'app-utility-list',
  templateUrl: './utility-list.component.html',
  styleUrls: ['./utility-list.component.scss']
})
export class UtilityListComponent implements OnInit {

  dataSet;
  scrollOptions = { 
    autoHide: true, 
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  constructor(private utilityservice:UtilityService,private getData:CommonService,private sessionService:SessionService,private filterService : FilterService) { }

  ngOnInit(): void {

    // Display utility details at time of page load      
    this.utilityservice.getUtilityListData().subscribe(utilitydata=>{
      this.dataSet = utilitydata.results
    })

    
  }
}
