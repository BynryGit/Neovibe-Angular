import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRegistrationComponent } from './add-registration/add-registration.component';
import { RegistrationDetailViewComponent } from './registration-detail-view/registration-detail-view.component';

const routes: Routes = [
  { path: 'add-registration', component: AddRegistrationComponent},
	{ path: 'view', component: RegistrationDetailViewComponent },
	{ path: ':id', component: RegistrationDetailViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegistrationRoutingModule { }
