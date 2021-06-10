import { Component, OnInit, Pipe, PipeTransform, ɵSafeHtml } from '@angular/core';
import { ApiService } from 'src/app/common-services/api-service/api.service';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  constructor(private apiService:ApiService) {
 
  }

  
  ngOnInit(): void {  }

}
