import { Injectable, EventEmitter } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class NoteDetailsService {

  private subject1 = new BehaviorSubject({});
  private subject2 = new Subject();

  constructor() { } 

  sendNoteResponse(data: any) {
    console.log('sending note response')
    this.subject1.next({ data: data });
  }

  sendNoteEditResponse(data_edit: any) {
    console.log("IT IS STARTED")
    this.subject2.next({ data_edit: data_edit });
    console.log("DATA_INSIDE_SERVICE",data_edit)
    console.log("IT IS ENDED")
  }

  getNoteResponse(): Observable<any> {
    console.log('getting note response')
    return this.subject1.asObservable();
  }

  getNoteEditResponse(): Observable<any> {
    console.log("IT IS CALLED")
    return this.subject2.asObservable();
  }
}
