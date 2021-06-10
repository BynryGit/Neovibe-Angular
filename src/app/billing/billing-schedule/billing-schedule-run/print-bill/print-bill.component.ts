import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from 'src/app/billing/billing.service';

@Component({
  selector: 'app-print-bill',
  templateUrl: './print-bill.component.html',
  styleUrls: ['./print-bill.component.scss']
})
export class PrintBillComponent implements OnInit {
  htmlContent;
  constructor(private billingService:BillingService, private router:Router) { }
  ngOnInit(): void {
    this.billingService.invoiceTemplate.subscribe(result=>{
      this.htmlContent = result
      window.open('billing/view-bill', '_blank').document.write(this.htmlContent);
    })
    
    
  }

}
