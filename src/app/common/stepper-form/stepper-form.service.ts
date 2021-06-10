import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StepperFormService {

  @Output() stepperFormEvent = new EventEmitter<any>();
  private subject1 = new BehaviorSubject<any>({});
  private subject2 = new BehaviorSubject<any>({});

  constructor() { }

  sendTrigger(data: any) {
    this.subject1.next({ trigger : data });
  }

  getTrigger(): Observable<any> {
    return this.subject1.asObservable();
  }

  sendFunction(data: any) {
    this.subject2.next(data);
  }

  getFunction(): Observable<any> {
    return this.subject2.asObservable();
  }
}
