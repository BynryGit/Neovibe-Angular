import { Component, OnInit } from '@angular/core';
import { ApiService } from './../../../../common-services/api-service/api.service';
import { SessionService } from './../../../../common-services/session-service/session.service';

@Component({
  selector: 'app-activity-log-tab',
  templateUrl: './activity-log-tab.component.html',
  styleUrls: ['./activity-log-tab.component.scss']
})
export class ActivityLogTabComponent implements OnInit {
  activity_log = []

  constructor(private apiService : ApiService,private sessionService : SessionService) {
    // Get Meter Log API Start
    this.apiService.get('admin/'+this.id_string+'/life-cycle/list').subscribe(
      data=>{
        for (let value of data.results) {
          this.activity_log.push(
            {
              created_date  : value.created_date,
              title : value.title + ' ' + value.state.toLowerCase(),
              time  : value.created_date,
              text  : value.lifecycle_text
            }
          );
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
    // Get Meter Log API End
    console.log("ACTIVITY LOG",this.activity_log)

   }

    utilityIdString = this.sessionService.getter("utility_id_string_admin");
    id_string = this.sessionService.getter("id_string")

  

  ngOnInit(): void {
  }

}
