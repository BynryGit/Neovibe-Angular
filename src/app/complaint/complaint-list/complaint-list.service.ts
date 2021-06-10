import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComplaintListService {
  private subject = new Subject<any>();

  sendButtonEvent(event: any,id:any) {
    this.subject.next({ event: event,id:id });
  }

  getButtonEvent(): Observable<any> {
      return this.subject.asObservable();
  }

  constructor() { }
}
