import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { WorkOrderAddComponent } from '../work-order/work-order-add/work-order-add.component'
import { WorkOrderListComponent } from './work-order-list/work-order-list.component';
import { WorkOrderDetailViewComponent } from './work-order-detail-view/work-order-detail-view.component';
import { WorkOrderCompleteComponent } from './work-order-complete/work-order-complete.component';


const routes: Routes = [
  {path: '', component:WorkOrderListComponent},
  // { path: 'add-work-order', component: WorkOrderAddComponent },
  {path:'view/:id_string', component:WorkOrderDetailViewComponent},
  {path:'complete',component:WorkOrderCompleteComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrderRoutingModule { }
