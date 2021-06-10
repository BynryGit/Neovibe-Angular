import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SummaryService {

  @Output() SummaryEvent = new EventEmitter<any>();

  constructor() { }
}
