import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsumerAddComponent } from './consumer-add/consumer-add.component';
import { ConsumerSearchComponent } from './consumer-search/consumer-search.component';
import { ConsumerDetailViewComponent } from './consumer-detail-view/consumer-detail-view.component';
import { ConsumerListComponent } from './consumer-list/consumer-list.component';
import { ConsumerServicesComponent } from './consumer-services/consumer-services.component';
import { UpdateServicesComponent } from './consumer-services/update-services/update-services.component';
import { UpdateComplaintsComponent } from './consumer-services/update-complaints/update-complaints.component';
import { ConsumerApproveComponent } from './consumer-approve/consumer-approve.component';
import { ConsumerProcessingComponent } from './consumer-processing/consumer-processing.component'
import { DisconnectionsProcessingComponent } from './disconnections-processing/disconnections-processing.component'
import { TransferProcessingComponent } from './transfer-processing/transfer-processing.component';
import { ComplaintsProcessingComponent } from './complaints-processing/complaints-processing.component';
import { PaymentsProcessingComponent } from './payments-processing/payments-processing.component';
import { AdjustmentProcessingComponent } from './adjustment-processing/adjustment-processing.component';
import { OutageProcessingComponent } from './outage-processing/outage-processing.component';
import { ServiceProcessingComponent } from './service-processing/service-processing.component';
import { OfferProcessingComponent } from './offer-processing/offer-processing.component'
import { AuthGuard } from '../auth.guard';
import { ConsumerDashboardComponent } from  './consumer-dashboard/consumer-dashboard.component'

const routes: Routes = [
	{ path: 'add-consumer', component: ConsumerAddComponent },
	{ path: 'search-consumer', component: ConsumerSearchComponent },
	{ path: 'view-consumer/:id', component: ConsumerDetailViewComponent },
	{ path: 'list', component: ConsumerListComponent },
	{ path: 'quick-services/:id', component: ConsumerServicesComponent },
	{ path: 'update-service/:id', component: UpdateServicesComponent },
	{ path: 'update-complaint/:id', component: UpdateComplaintsComponent },
	{ path: 'approve', component: ConsumerApproveComponent },
	{ path: 'consumer-processing', component: ConsumerProcessingComponent },
	{ path: 'disconnections-processing', component:DisconnectionsProcessingComponent},
	{ path: 'transfer-processing', component:TransferProcessingComponent},
	{ path: 'complaints-processing', component:ComplaintsProcessingComponent},
	{ path: 'payments-processing', component:PaymentsProcessingComponent},
	{ path: 'adjustment-processing', component:AdjustmentProcessingComponent},
	{ path: 'outage-processing', component:OutageProcessingComponent},
	{ path: 'service-processing', component:ServiceProcessingComponent},
	{ path: 'offer-processing', component:OfferProcessingComponent},
	{ path: 'dashboard', component: ConsumerDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsumerRoutingModule { }
