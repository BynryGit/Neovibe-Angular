import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from '../billing/billing.component';
import {BillingScheduleRunComponent } from '../billing/billing-schedule/billing-schedule-run/billing-schedule-run.component'
import { PrintBillComponent } from '../billing/billing-schedule/billing-schedule-run/print-bill/print-bill.component';


const routes: Routes = [
  { path: '', component:BillingComponent},
  { path: 'run-schedule/:id_string', component: BillingScheduleRunComponent},
  { path: 'view-bill', component: PrintBillComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillingRoutingModule { }
