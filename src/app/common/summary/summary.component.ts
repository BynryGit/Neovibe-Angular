import { Component, OnInit } from '@angular/core';
import { SummaryService } from '../../common/summary/summary.service'

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  blocks = []

  constructor(private summaryService:SummaryService) {
    this.summaryService.SummaryEvent.subscribe(data =>{
      this.blocks = data
    })
  }

  ngOnInit(): void {
  }
}
