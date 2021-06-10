import { Component, OnInit } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { DatePipe } from '@angular/common';
import { FilterService } from '../../../common/filter/filter.service';
import { ApiService } from '../../../common-services/api-service/api.service';
import { SessionService } from '../../../common-services/session-service/session.service';

declare var $: any;

@Component({
  selector: 'app-billing-schedule-view',
  templateUrl: './billing-schedule-view.component.html',
  styleUrls: ['./billing-schedule-view.component.scss']
})
export class BillingScheduleViewComponent implements OnInit {

  dataSet;
  processing;
  schedule_details;
  start_date;
  end_date;
  description;
  frequency;
  repeat_every;
  occurs_on: String;
  subscription: Subscription
  datePipe = new DatePipe('en-US');
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {};
  utilityIdString = this.sessionService.getter("utility_id_string");
 
  // Used For Scroll Modal Start
  scrollOptions = {
    autoHide: true,
    scrollbarMinSize: 67,
    scrollbarMaxSize: 180,
  };
  // Used For Modal Table End

  // Table Heading Parameter Start
  blocks = [
    {
      name :  "Name",
    },
    {
      name :  "Consumer",
    },
    {
      name :  "Date",
    },
    {
      name :  "Status",
    }
  ]
  // Table Heading Parameter End

  constructor(private filterService : FilterService, private apiService : ApiService, private sessionService : SessionService) {}

  ngOnInit(): void {    
    this.subscription = this.filterService.getButtonEventByIdString().subscribe(data=>{
      if (data.privilege == 'VIEW'){
        // Get Schedule API Start
        this.apiService.get('billing/schedule-bill/'+ data.id_string).subscribe(
          data=>{
            if (data.state == "success") {

              console.log('=====',data.result)
              
              if (data.result.start_date == null){
                this.start_date = '-'
              }else{
                this.start_date = data.result.start_date
              }

              if (data.result.frequency_id == null){
                this.frequency = '-'
              }else{
                this.frequency = data.result.frequency_id?.value
              }
              if (data.result.repeat_every_id == null){
                this.repeat_every = '-'
              }else{
                this.repeat_every = data.result.repeat_every_id?.value
              }
              
              if (data.result.end_date == null){
                this.end_date = 'No-Limit'
              }else{
                this.end_date = this.datePipe.transform(data.result.end_date, 'dd MMM yyyy')
              }
              
              if (data.result.description == null){
                this.description = '-'
              }else{
                this.description = data.result.description
              }
              
              if(Object.keys(data.result.occurs_on).length != 0){
                this.occurs_on = ''
                for (let x of data.result.occurs_on){
                  if (this.occurs_on == ''){
                    this.occurs_on = x.value
                  }else{
                    this.occurs_on = this.occurs_on + ', ' + x.value
                  }
                }
              }else{
                this.occurs_on = '-'
              }
              this.schedule_details = data.result
            }
          },
          error => {
            console.log(error)
            if (error.error.state == "error") {
              alert(error.error.results)
            }else{
              console.log(error)
            }
          }
        )
        // Get Schedule API End
        
        this.apiService.get(`billing/bill-schedule-log/list?bill_schedule_id=`+ data.id_string + '&utility__id_string=' + this.utilityIdString).subscribe(data => {
          this.dataSet = data.results;
          console.log('=======this.dataSet=====',this.dataSet)
        });

        

        // Open Schedule View Modal Start
        $('#ScheduleDetailsModal').modal('show');
        // Open Schedule View Modal End
      }
    });
  }

  // Used For Unsubscribe Observables And Detach Event Handlers Start
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  // Used For Unsubscribe Observables And Detach Event Handlers End

}
