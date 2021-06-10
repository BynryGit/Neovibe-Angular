import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegistrationComponent } from './registration/registration.component';
import { TenantComponent } from './tenant/tenant.component';
import { CommonComponent } from './common/common.component';
import { CampaignComponent } from './campaign/campaign.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ServicesComponent } from './services/services.component';
import { UtilityConfigurationComponent } from './admin/utility-configuration/utility-configuration.component';
import { AuthGuard } from './auth.guard';
import { ScheduleComponent } from './meter-data/schedule/schedule.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MeterDetailComponent } from './meter-data/meter-detail/meter-detail.component'
import { MeterDetailViewComponent } from './meter-data/meter-detail/meter-detail-view/meter-detail-view.component'
import { DispatchComponent } from './meter-data/dispatch/dispatch.component';
import { ValidationComponent } from './meter-data/validation/validation.component';
import { ValidationDetailViewComponent } from './meter-data/validation/validation-detail-view/validation-detail-view.component';
import { SearchConsumerComponent } from './meter-data/search-consumer/search-consumer.component'
import { UploadComponent } from './meter-data/upload/upload.component'
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { BillingDashboardComponent } from './billing/billing-dashboard/billing-dashboard.component';
import { NewConsumerComponent } from './meter-data/new-consumer/new-consumer.component'
import { NewConsumerValidationComponent } from './meter-data/new-consumer-validation/new-consumer-validation.component'


const routes: Routes = [
	{
		path: 'auth',
		loadChildren: () => import('./auth-layout/auth-layout.module').then(m => m.AuthLayoutModule)
	},
	{ 
		path: '', component: CommonComponent,
		canActivate:[AuthGuard],
		children: [
			{ path: 'consumerops/registration', component: RegistrationComponent},
			{ path: 'campaign', component: CampaignComponent},
			{ path: 'tenant', component: TenantComponent},
			{ path: 'complaint', component: ComplaintComponent},
			{ path: 'complaint/:id', component: ComplaintComponent},
			{ path: 'services', component: ServicesComponent},
			{ path: 'utility/configuration', component: UtilityConfigurationComponent},
			{ path: 'meter-data/schedule', component: ScheduleComponent},
			{ path: 'page-not-found', component: PageNotFoundComponent},
			{ path: 'meter-data/meter-detail', component: MeterDetailComponent},
			{ path: 'meter-data/meter-detail-view/:id_string', component: MeterDetailViewComponent},
			{ path: 'meter-data/dispatch', component: DispatchComponent},
			{ path: 'meter-data/search-consumer', component: SearchConsumerComponent},
			{ path: 'meter-data/validation', component: ValidationComponent},
			{ path: 'meter-data/validation-detail-view/:schedule_log_id/:read_cycle_id/:page/:search', component: ValidationDetailViewComponent},
			{ path: 'meter-data/upload', component: UploadComponent},
			{ path: 'dashboard', component:BillingDashboardComponent},
			{ path: 'meter-data/new-consumer-list/:id_string', component: NewConsumerComponent},
			{ path: 'meter-data/new-consumer-detail-view/:id_string', component: NewConsumerValidationComponent},
			
			{
				path: 'utility',
				loadChildren: () => import('./utility/utility.module').then(m => m.UtilityModule)
			},
			{
				path: 'asset',
				loadChildren: () => import('./assets/assets.module').then(m => m.AssetsModule)
			},

			{
				path: 'user',
				loadChildren: () => import('./user/user.module').then(m => m.UserModule)
			},
			{
				path: 'registration',
				loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationModule)
			},
			{
				path: 'consumer',
				loadChildren: () => import('./consumer/consumer.module').then(m => m.ConsumerModule)
			},
			{
				path: 'work-order',
				loadChildren: () => import('./work-order/work-order.module').then(m => m.WorkOrderModule)
			},
			{
				path: 'billing',
				loadChildren: () => import('./billing/billing.module').then(m => m.BillingModule)
			},
		]
	},
	
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
