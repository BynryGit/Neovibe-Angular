import { Component, OnInit, Input } from '@angular/core'; 
import { ApiService } from '../../common-services/api-service/api.service';

@Component({
  selector: 'app-timeline-details',
  templateUrl: './timeline-details.component.html',
  styleUrls: ['./timeline-details.component.scss']
})
export class TimelineDetailsComponent implements OnInit {

  @Input() data
  timeLine = []
  

  constructor(private apiService : ApiService) { }
  
  ngOnInit(): void {
    this.timeLine = this.data;
    console.log("TIMELINE",this.timeLine)
  }

}
