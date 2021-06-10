import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  public invoiceTemplate = new Subject<any>();
  constructor() { }

  getInvoiceTempalteDetails(msg?){
    this.invoiceTemplate.next(msg); // it only hold the data
  } 
}
