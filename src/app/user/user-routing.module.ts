import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { UserAddComponent } from './user-add/user-add.component';
import { UserDetailViewComponent } from './user-detail-view/user-detail-view.component';

const routes: Routes = [
  { path: '', component: UserComponent },
	{ path: 'add-user', component: UserAddComponent },
	{ path: 'user-view/:id_string', component: UserDetailViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
