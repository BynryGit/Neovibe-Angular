import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssetsComponent } from './assets.component';
import { AssetsDetailViewComponent } from './assets-detail-view/assets-detail-view.component';
import { AssetsAddComponent } from './assets-add/assets-add.component';
import { AssetsQuickServicesComponent } from './assets-quick-services/assets-quick-services.component';



const routes: Routes = [
    { path: '' , component:AssetsComponent },
	{ path: 'detail-view', component:AssetsDetailViewComponent},
	{ path: 'add', component:AssetsAddComponent},
	{ path: 'quick-service', component:AssetsQuickServicesComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
