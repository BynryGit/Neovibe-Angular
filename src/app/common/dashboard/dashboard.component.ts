import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../common/dashboard/dashboard.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService:DashboardService) {
    this.dashboardService.DashboardEvent.subscribe(data =>{
      this.blocks = data
    })
  }
  // selectedNewStatus = 'Damage';
  // newStatus = [
  //   {id: 1, status: 'Damage'},
  //   {id: 2, status: 'Improper PNG'},
  //   {id: 3, status: 'Flame issue'},
  // ];

  // selectedNewStatus1 = 'After RFC';
  // newStatus1 = [
  //   {id: 1, status: 'After 15 days of conversion'},
  //   {id: 2, status: 'Damage to installation'},
  //   {id: 1, status: 'After RFC'},
  // ];

  // selectedNewStatus2 = 'Resolved';
  // newStatus2 = [
  //   {id: 1, status: 'Resolved'},
  //   {id: 2, status: 'Unresolved'},
  //   {id: 3, status: 'Pending'},
  // ];

  ngOnInit(): void {
  }

  blocks = []

}
