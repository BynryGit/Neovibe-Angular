import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/common/common.service';
import { FilterService } from '../../common/filter/filter.service';
import { ApiService } from '../../common-services/api-service/api.service';
import { SessionService } from '../../common-services/session-service/session.service';
import { Subject } from 'rxjs';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-consumer-service-list',
  templateUrl: './consumer-service-list.component.html',
  styleUrls: ['./consumer-service-list.component.scss']
})
export class ConsumerServiceList implements OnInit {
  @Input() data;
  faStar = faStar;
  consumerList:any =[];
  utilityIdString = this.sessionService.getter("utility_id_string");
  consumerdata;
  processing;
  dtOptions: DataTables.Settings = {};
  searchText;
  selected_service;
  dtTrigger: Subject<any> = new Subject<any>();
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };

    constructor(private filterService : FilterService, private router : Router,private commonServices:CommonService,private apiService : ApiService, private sessionService : SessionService) {
    this.filterService.getPagination().subscribe(data=>{
      $('#table1').DataTable().page.len(data.number).draw()
    })

    this.filterService.getSearchText().subscribe(data=>{
      this.searchText = data.text;
    })
  }

  serviceClicked(item){
    this.selected_service = item;
  }

  ngOnInit(): void {

    // API For Getting Consumer complaint details List Start
    const that = this;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      serverSide: true,
      processing:true,
      ajax: (dataTablesParameters: any, callback) => {
        that.processing = true
        const page = parseInt(dataTablesParameters.start) / parseInt(dataTablesParameters.length) + 1;
        
        that.apiService.get(`work-order/service-appointment/${this.utilityIdString}/list?Service_list_of_consumer=${this.data}&utility_id_string=`+this.utilityIdString).subscribe(data => {
            this.consumerList = data;
            console.log('that.dataSet: ', that.consumerList);
            this.dtTrigger.next();
            that.processing = false
            callback({
              recordsTotal: data.count,
              recordsFiltered: data.count,
              data: []
            });
        });
      },
    };
    
  }
  // API For Getting Consumer complaint details List end

}

