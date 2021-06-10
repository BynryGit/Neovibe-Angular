import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  private subject1 = new Subject<any>();
  private subject2 = new Subject<any>();
  private subject3 = new Subject<any>();
  private subject4 = new Subject<any>();
  private subject5 = new Subject<any>();
  private subject6 = new Subject<any>();

  sendSearchText(message: string) {
        this.subject1.next({ text: message });
    }
  
  

  getSearchText(): Observable<any> {
        return this.subject1.asObservable();
    }

  
  sendIDString(message:any) {
      this.subject6.next({ message: message });
  }



  getIDString(): Observable<any> {
      return this.subject6.asObservable();
  }

  
  

  sendPagination(message: string) {
        this.subject2.next({ number: message });
    }

  getPagination(): Observable<any> {
        return this.subject2.asObservable();
    }

  sendButtonEvent(event: any) {
      this.subject3.next({ event: event });
  }

  getButtonEvent(): Observable<any> {
      return this.subject3.asObservable();
  }

  sendButtonEventByIdString(event: any, id_string: any, privilege: any) {
    this.subject4.next({ event: event, id_string: id_string, privilege: privilege  });
  }

  getButtonEventByIdString(): Observable<any> {
      return this.subject4.asObservable();
  }

  sendBulkAssignObj(event: any, obj: any, privilege: any) {
    this.subject4.next({ event: event, obj: obj, privilege: privilege  });
  }

  getBulkAssignObj(): Observable<any> {
      return this.subject4.asObservable();
  }

  // this is not fix- need to disscus
  displayWorkOrderDetailModule(id_string: any) {
    this.subject5.next({ id_string: id_string});
  }

  getdisplayWorkOrderDetailModule(): Observable<any> {
      return this.subject5.asObservable();
  }

  constructor() { }
}
