import { Injectable, Output, EventEmitter } from '@angular/core'; 

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  @Output() DashboardEvent = new EventEmitter<any>();

  constructor() { }
}
