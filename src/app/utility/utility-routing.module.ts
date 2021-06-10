import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UtilityComponent } from './utility.component';
import { UtilityAddComponent } from './utility-add/utility-add.component';

const routes: Routes = [
  { path: '', component: UtilityComponent },
	{ path: 'add-utility', component: UtilityAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilityRoutingModule { }
