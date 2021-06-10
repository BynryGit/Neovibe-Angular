
/* Angular's */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from '@angular/material/checkbox';

/* Other's */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ChartsModule } from 'ng2-charts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgxContentLoadingModule } from 'ngx-content-loading';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPrintModule} from 'ngx-print';
import { NgxTinymceModule } from 'ngx-tinymce';


/* Comopents */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonComponent } from './common/common.component';
import { FooterComponent } from './common/footer/footer.component';
import { HeaderComponent } from './common/header/header.component';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { BentoMenuComponent } from './common/header/bento-menu/bento-menu.component';
import { ListViewComponent } from './common/list-view/list-view.component';
import { RegistrationComponent } from './registration/registration.component';
import { RegistrationDashboardComponent } from './registration/registration-dashboard/registration-dashboard.component';
import { RegistrationFiltersComponent } from './registration/registration-filters/registration-filters.component';
import { DashboardComponent } from './common/dashboard/dashboard.component';
import { FilterComponent } from './common/filter/filter.component';
import { SearchComponent } from './common/header/search/search.component';
import { AddComponent } from './common/header/add/add.component';
import { NotificationComponent } from './common/header/notification/notification.component';
import { LocationComponent } from './common/header/location/location.component';
import { ProfileComponent } from './common/header/profile/profile.component';
import { AddRegistrationComponent } from './registration/add-registration/add-registration.component';
import { StepperFormComponent } from './common/stepper-form/stepper-form.component';
import { RegistrationListComponent } from './registration/registration-list/registration-list.component';
import { BreadcrumbComponent } from './common/header/breadcrumb/breadcrumb.component';
import {HttpClientModule} from '@angular/common/http';
import { RegistrationDetailViewComponent } from './registration/registration-detail-view/registration-detail-view.component';
import { ToolsComponent } from './common/tools/tools.component';
import { TenantComponent } from './tenant/tenant.component';
import { TenantSummaryComponent } from './tenant/tenant-summary/tenant-summary.component';
import { TenantFilterComponent } from './tenant/tenant-filter/tenant-filter.component';
import { TenantDatatableComponent } from './tenant/tenant-datatable/tenant-datatable.component';
import { AddressDetailsComponent } from './common/address-details/address-details.component';
import { ConsumerOfferDetailsComponent } from './common/consumer-offer-details/consumer-offer-details.component';
import { ServiceContractDetailsComponent } from './common/service-contract-details/service-contract-details.component';
import { KycDetailsComponent } from './common/kyc-details/kyc-details.component';
import { PaymentDetailsComponent } from './common/payment-details/payment-details.component';
import { NoteDetailsComponent } from './common/note-details/note-details.component';
import { TimelineDetailsComponent } from './common/timeline-details/timeline-details.component';
import { CampaignComponent } from './campaign/campaign.component';
import { CampaignDatatableComponent } from './campaign/campaign-datatable/campaign-datatable.component';
import { CampaignFilterComponent } from './campaign/campaign-filter/campaign-filter.component';
import { CampaignSummaryComponent } from './campaign/campaign-summary/campaign-summary.component';
import { UserComponent } from './user/user.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailViewComponent } from './user/user-detail-view/user-detail-view.component';
import { UserFiltersComponent } from './user/user-filters/user-filters.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserSummaryComponent } from './user/user-summary/user-summary.component';
import { ComplaintComponent } from './complaint/complaint.component';
import { ComplaintAddComponent } from './complaint/complaint-add/complaint-add.component';
import { ComplaintListComponent } from './complaint/complaint-list/complaint-list.component';
import { ComplaintDashboardComponent } from './complaint/complaint-dashboard/complaint-dashboard.component';
import { ComplaintFiltersComponent } from './complaint/complaint-filters/complaint-filters.component';
import { ServicesComponent } from './services/services.component';
import { ServicesAddComponent } from './services/services-add/services-add.component';
import { ServicesDashboardComponent } from './services/services-dashboard/services-dashboard.component';
import { ServicesFiltersComponent } from './services/services-filters/services-filters.component';
import { ServicesListComponent } from './services/services-list/services-list.component';
import { ComplaintViewComponent } from './complaint/complaint-view/complaint-view.component';
import { UtilityComponent } from './utility/utility.component';
import { UtilityAddComponent } from './utility/utility-add/utility-add.component';
import { UtilityFiltersComponent } from './utility/utility-filters/utility-filters.component';
import { UtilitySummaryComponent } from './utility/utility-summary/utility-summary.component';
import { UtilityListComponent } from './utility/utility-list/utility-list.component';
import { AdminComponent } from './admin/admin.component';
import { UtilityConfigurationComponent } from './admin/utility-configuration/utility-configuration.component';
import { RoleComponent } from './admin/utility-configuration/role/role.component';
import { PaymentTypePipe } from './registration/add-registration/payment-type.pipe';
import { ConsumerComponent } from './consumer/consumer.component';
import { ConsumerAddComponent } from './consumer/consumer-add/consumer-add.component';
import { ConsumerDetailViewComponent } from './consumer/consumer-detail-view/consumer-detail-view.component';
import { ConsumerFiltersComponent } from './consumer/consumer-filters/consumer-filters.component';
import { ConsumerListComponent } from './consumer/consumer-list/consumer-list.component';
import { ConsumerDashboardComponent } from './consumer/consumer-dashboard/consumer-dashboard.component';
import { AuthGuard } from './auth.guard';
import { AssetComponent } from './admin/utility-configuration/asset/asset.component';
import { AssetCategoryComponent } from './admin/utility-configuration/asset/asset-category/asset-category.component';
import { AssetContractComponent } from './admin/utility-configuration/asset/asset-contract/asset-contract.component';
import { AssetInsuranceComponent } from './admin/utility-configuration/asset/asset-insurance/asset-insurance.component';
import { AssetSubcategoryComponent } from './admin/utility-configuration/asset/asset-subcategory/asset-subcategory.component';
import { BillingAdvertisementComponent } from './admin/utility-configuration/billing/billing-advertisement/billing-advertisement.component';
import { BillingInstructionsComponent } from './admin/utility-configuration/billing/billing-instructions/billing-instructions.component';
import { BillingTemplateComponent } from './admin/utility-configuration/billing/billing-template/billing-template.component';
import { BillingTypeComponent } from './admin/utility-configuration/billing/billing-type/billing-type.component';
import { CampaignAdminComponent } from './admin/utility-configuration/campaign-admin/campaign-admin.component';
import { CampaignAdvSubtypeComponent } from './admin/utility-configuration/campaign-admin/campaign-adv-subtype/campaign-adv-subtype.component';
import { CampaignAdvTypeComponent } from './admin/utility-configuration/campaign-admin/campaign-adv-type/campaign-adv-type.component';
import { CampaignTypeComponent } from './admin/utility-configuration/campaign-admin/campaign-type/campaign-type.component';
import { CampaignSubtypeComponent } from './admin/utility-configuration/campaign-admin/campaign-subtype/campaign-subtype.component';
import { CampaignFrequencyComponent } from './admin/utility-configuration/campaign-admin/campaign-frequency/campaign-frequency.component';
import { CampaignChannelComponent } from './admin/utility-configuration/campaign-admin/campaign-channel/campaign-channel.component';
import { ComplaintsComponent } from './admin/utility-configuration/complaints/complaints.component';
import { ComplaintsComplaintsComponent } from './admin/utility-configuration/complaints/complaints-complaints/complaints-complaints.component';
import { ComplaintsSubtypeComponent } from './admin/utility-configuration/complaints/complaints-subtype/complaints-subtype.component';
import { ComplaintsTypeComponent } from './admin/utility-configuration/complaints/complaints-type/complaints-type.component';
import { ConsumersComponent } from './admin/utility-configuration/consumers/consumers.component';
import { ConsumersCategoryComponent } from './admin/utility-configuration/consumers/consumers-category/consumers-category.component';
import { ConsumersFaqComponent } from './admin/utility-configuration/consumers/consumers-faq/consumers-faq.component';
import { ConsumersKycComponent } from './admin/utility-configuration/consumers/consumers-kyc/consumers-kyc.component';
import { ConsumersSubcategoryComponent } from './admin/utility-configuration/consumers/consumers-subcategory/consumers-subcategory.component';
import { ConsumersSupportComponent } from './admin/utility-configuration/consumers/consumers-support/consumers-support.component';
import { ContractsComponent } from './admin/utility-configuration/contracts/contracts.component';
import { ContractsDocumentsComponent } from './admin/utility-configuration/contracts/contracts-documents/contracts-documents.component';
import { ContractsPeriodComponent } from './admin/utility-configuration/contracts/contracts-period/contracts-period.component';
import { ContractsSubtypeComponent } from './admin/utility-configuration/contracts/contracts-subtype/contracts-subtype.component';
import { ContractsTermsComponent } from './admin/utility-configuration/contracts/contracts-terms/contracts-terms.component';
import { ContractsTypeComponent } from './admin/utility-configuration/contracts/contracts-type/contracts-type.component';
import { FinanceComponent } from './admin/utility-configuration/finance/finance.component';
import { FinanceSubtypeComponent } from './admin/utility-configuration/finance/finance-subtype/finance-subtype.component';
import { FinanceTypeComponent } from './admin/utility-configuration/finance/finance-type/finance-type.component';
import { HcmComponent } from './admin/utility-configuration/hcm/hcm.component';
import { HcmSubtypeComponent } from './admin/utility-configuration/hcm/hcm-subtype/hcm-subtype.component';
import { HcmTypeComponent } from './admin/utility-configuration/hcm/hcm-type/hcm-type.component';
import { MeterDataAdminComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin.component';
import { MeterDataAdminActivityComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-activity/meter-data-admin-activity.component';
import { MeterDataAdminBillCycleComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-bill-cycle/meter-data-admin-bill-cycle.component';
import { MeterDataAdminReadingAssignmentsComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-reading-assignments/meter-data-admin-reading-assignments.component';
import { MeterDataAdminRouteComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-route/meter-data-admin-route.component';
import { MeterDataAdminTypeComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-type/meter-data-admin-type.component';
import { MeterDataAdminValidationAssignmentsComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-validation-assignments/meter-data-admin-validation-assignments.component';
import { NumFormatComponent } from './admin/utility-configuration/num-format/num-format.component';
import { NumFormatTabComponent } from './admin/utility-configuration/num-format/num-format-tab/num-format-tab.component';
import { OrdersComponent } from './admin/utility-configuration/orders/orders.component';
import { OrdersStatusComponent } from './admin/utility-configuration/orders/orders-status/orders-status.component';
import { OrdersSubtypeComponent } from './admin/utility-configuration/orders/orders-subtype/orders-subtype.component';
import { OrdersTypeComponent } from './admin/utility-configuration/orders/orders-type/orders-type.component';
import { PaymentsComponent } from './admin/utility-configuration/payments/payments.component';
import { PaymentsChannelComponent } from './admin/utility-configuration/payments/payments-channel/payments-channel.component';
import { PaymentsModeComponent } from './admin/utility-configuration/payments/payments-mode/payments-mode.component';
import { PaymentsTypeComponent } from './admin/utility-configuration/payments/payments-type/payments-type.component';
import { ProductsComponent } from './admin/utility-configuration/products/products.component';
import { ProductsProductComponent } from './admin/utility-configuration/products/products-product/products-product.component';
import { ProductsSubtypeComponent } from './admin/utility-configuration/products/products-subtype/products-subtype.component';
import { ProductsTypeComponent } from './admin/utility-configuration/products/products-type/products-type.component';
import { RegistrationAdminComponent } from './admin/utility-configuration/registration-admin/registration-admin.component';
import { RegistrationAdminConsumerconsentComponent } from './admin/utility-configuration/registration-admin/registration-admin-consumerconsent/registration-admin-consumerconsent.component';
import { RegistrationAdminDocumentsComponent } from './admin/utility-configuration/registration-admin/registration-admin-documents/registration-admin-documents.component';
import { RegistrationAdminOwnershipComponent } from './admin/utility-configuration/registration-admin/registration-admin-ownership/registration-admin-ownership.component';
import { RegistrationAdminSubtypeComponent } from './admin/utility-configuration/registration-admin/registration-admin-subtype/registration-admin-subtype.component';
import { RegistrationAdminTemplatesComponent } from './admin/utility-configuration/registration-admin/registration-admin-templates/registration-admin-templates.component';
import { RegistrationAdminTypeComponent } from './admin/utility-configuration/registration-admin/registration-admin-type/registration-admin-type.component';
import { SeviceRequestsComponent } from './admin/utility-configuration/sevice-requests/sevice-requests.component';
import { SeviceRequestsTypeComponent } from './admin/utility-configuration/sevice-requests/sevice-requests-type/sevice-requests-type.component';
import { SeviceRequestsSubtypeComponent } from './admin/utility-configuration/sevice-requests/sevice-requests-subtype/sevice-requests-subtype.component';
import { SeviceRequestsServicesComponent } from './admin/utility-configuration/sevice-requests/sevice-requests-services/sevice-requests-services.component';
import { ServicesAdminComponent } from './admin/utility-configuration/services-admin/services-admin.component';
import { ServicesTypeComponent } from './admin/utility-configuration/services-admin/services-type/services-type.component';
import { ServicesSubtypeComponent } from './admin/utility-configuration/services-admin/services-subtype/services-subtype.component';
import { ServicesStatusComponent } from './admin/utility-configuration/services-admin/services-status/services-status.component';
import { StoreComponent } from './admin/utility-configuration/store/store.component';
import { StoreTypeComponent } from './admin/utility-configuration/store/store-type/store-type.component';
import { StoreLocationComponent } from './admin/utility-configuration/store/store-location/store-location.component';
import { StoreReceiptComponent } from './admin/utility-configuration/store/store-receipt/store-receipt.component';
import { SuppliersComponent } from './admin/utility-configuration/suppliers/suppliers.component';
import { SuppliersProductCateoryComponent } from './admin/utility-configuration/suppliers/suppliers-product-cateory/suppliers-product-cateory.component';
import { SuppliersProductSubcateoryComponent } from './admin/utility-configuration/suppliers/suppliers-product-subcateory/suppliers-product-subcateory.component';
import { SuppliersSubtypeComponent } from './admin/utility-configuration/suppliers/suppliers-subtype/suppliers-subtype.component';
import { SuppliersTemplateComponent } from './admin/utility-configuration/suppliers/suppliers-template/suppliers-template.component';
import { SuppliersTypeComponent } from './admin/utility-configuration/suppliers/suppliers-type/suppliers-type.component';
import { SurveyComponent } from './admin/utility-configuration/survey/survey.component';
import { SurveyObjectiveComponent } from './admin/utility-configuration/survey/survey-objective/survey-objective.component';
import { SurveyTypeComponent } from './admin/utility-configuration/survey/survey-type/survey-type.component';
import { SurveySubtypeComponent } from './admin/utility-configuration/survey/survey-subtype/survey-subtype.component';
import { TendersComponent } from './admin/utility-configuration/tenders/tenders.component';
import { TendersQuotationComponent } from './admin/utility-configuration/tenders/tenders-quotation/tenders-quotation.component';
import { TendersSubtypeComponent } from './admin/utility-configuration/tenders/tenders-subtype/tenders-subtype.component';
import { TendersTermsComponent } from './admin/utility-configuration/tenders/tenders-terms/tenders-terms.component';
import { TendersTypeComponent } from './admin/utility-configuration/tenders/tenders-type/tenders-type.component';
import { TerritoryComponent } from './admin/utility-configuration/territory/territory.component';
import { TerritoryAreaComponent } from './admin/utility-configuration/territory/territory-area/territory-area.component';
import { TerritoryCityComponent } from './admin/utility-configuration/territory/territory-city/territory-city.component';
import { TerritoryCountryComponent } from './admin/utility-configuration/territory/territory-country/territory-country.component';
import { TerritoryPremisesComponent } from './admin/utility-configuration/territory/territory-premises/territory-premises.component';
import { TerritoryRegionComponent } from './admin/utility-configuration/territory/territory-region/territory-region.component';
import { TerritorySectionComponent } from './admin/utility-configuration/territory/territory-section/territory-section.component';
import { TerritoryStateComponent } from './admin/utility-configuration/territory/territory-state/territory-state.component';
import { TerritorySubareaComponent } from './admin/utility-configuration/territory/territory-subarea/territory-subarea.component';
import { UserAdminComponent } from './admin/utility-configuration/user-admin/user-admin.component';
import { UserSkillsComponent } from './admin/utility-configuration/user-admin/user-skills/user-skills.component';
import { UserSubtypeComponent } from './admin/utility-configuration/user-admin/user-subtype/user-subtype.component';
import { UserTypeComponent } from './admin/utility-configuration/user-admin/user-type/user-type.component';
import { WorkOrdersComponent } from './admin/utility-configuration/work-orders/work-orders.component';
import { WorOrdersTypeComponent } from './admin/utility-configuration/work-orders/wor-orders-type/wor-orders-type.component';
import { WorkOrdersSubtypeComponent } from './admin/utility-configuration/work-orders/work-orders-subtype/work-orders-subtype.component';
import { WorkOrdersStatusComponent } from './admin/utility-configuration/work-orders/work-orders-status/work-orders-status.component';
import { WorkOrderAssignmentComponent } from './work-order/work-order-assignment/work-order-assignment.component';
import { WorkOrdersHolidaysComponent } from './admin/utility-configuration/work-orders/work-orders-holidays/work-orders-holidays.component';
import { PaymentSubtypeComponent } from './admin/utility-configuration/payments/payment-subtype/payment-subtype.component';
import { RoleRoleComponent } from './admin/utility-configuration/role/role-role/role-role.component';
import { RoleTypeComponent } from './admin/utility-configuration/role/role-type/role-type.component';
import { RoleSubtypeComponent } from './admin/utility-configuration/role/role-subtype/role-subtype.component';
import { WorkOrderComponent } from './work-order/work-order.component';
import { WorkOrderAddComponent } from './work-order/work-order-add/work-order-add.component';
import { WorkOrderDetailViewComponent } from './work-order/work-order-detail-view/work-order-detail-view.component';
import { WorkOrderListComponent } from './work-order/work-order-list/work-order-list.component';
import { ConsumerSearchComponent } from './consumer/consumer-search/consumer-search.component';
import { ConsumerServicesComponent } from './consumer/consumer-services/consumer-services.component';
import { UpdateProfileComponent } from './consumer/consumer-services/update-profile/update-profile.component';
import { UtilitySetupComponent } from './admin/utility-configuration/utility-setup/utility-setup.component';
import { UtilityModulesComponent } from './admin/utility-configuration/utility-setup/utility-modules/utility-modules.component';
import { UtilityProductsComponent } from './admin/utility-configuration/utility-setup/utility-products/utility-products.component';
import { UtilityDepartmentsComponent } from './admin/utility-configuration/utility-setup/utility-departments/utility-departments.component';
import { TerritoryDivisionComponent } from './admin/utility-configuration/territory/territory-division/territory-division.component';
import { UtilityHolidayComponent } from './admin/utility-configuration/utility-holiday/utility-holiday.component';
import { UtilityLeavesComponent } from './admin/utility-configuration/utility-holiday/utility-leaves/utility-leaves.component';
import { UtilityHolidayTabComponent } from './admin/utility-configuration/utility-holiday/utility-holiday-tab/utility-holiday-tab.component';
import { MeterDataReadCycleComponent } from './admin/utility-configuration/meter-data-admin/meter-data-read-cycle/meter-data-read-cycle.component';
import { MeterDataComponent } from './meter-data/meter-data.component';
import { ScheduleComponent } from './meter-data/schedule/schedule.component';
import { ReadingComponent } from './meter-data/schedule/reading/reading.component';
import { BillDistributionComponent } from './meter-data/schedule/bill-distribution/bill-distribution.component';
import { NoticeComponent } from './meter-data/schedule/notice/notice.component';
import { ReadingDashboardComponent } from './meter-data/schedule/reading/reading-dashboard/reading-dashboard.component';
import { ReadingListComponent } from './meter-data/schedule/reading/reading-list/reading-list.component';
import { ReadingFilterComponent } from './meter-data/schedule/reading/reading-filter/reading-filter.component';
import { ReadingAddComponent } from './meter-data/schedule/reading/reading-add/reading-add.component';
import { UpdateServicesComponent } from './consumer/consumer-services/update-services/update-services.component';
import { UpdateComplaintsComponent } from './consumer/consumer-services/update-complaints/update-complaints.component';
import { ReadingViewComponent } from './meter-data/schedule/reading/reading-view/reading-view.component';
import { ReadingEditComponent } from './meter-data/schedule/reading/reading-edit/reading-edit.component';
import { UpdateOffersComponent } from './consumer/consumer-services/update-offers/update-offers.component';
import { ConsumerApproveComponent } from './consumer/consumer-approve/consumer-approve.component';
import { UtilityDocumentsComponent } from './admin/utility-configuration/utility-documents/utility-documents.component';
import { DocumentDetailsComponent } from './admin/utility-configuration/utility-documents/document-details/document-details.component';
import { DocumentTypeComponent } from './admin/utility-configuration/utility-documents/document-type/document-type.component';
import { DocumentSubtypeComponent } from './admin/utility-configuration/utility-documents/document-subtype/document-subtype.component';
import { DocumentSizeComponent } from './admin/utility-configuration/utility-documents/document-size/document-size.component';
import { UpdateConnectComponent } from './consumer/consumer-services/update-connect/update-connect.component';
import { UpdateDisconnectComponent } from './consumer/consumer-services/update-disconnect/update-disconnect.component';
import { ConsumerServiceAgreementsComponent } from './admin/utility-configuration/consumers/consumer-service-agreements/consumer-service-agreements.component';
import { UtilityNotificationsComponent } from './admin/utility-configuration/utility-notifications/utility-notifications.component';
import { NotificationTypeComponent } from './admin/utility-configuration/utility-notifications/notification-type/notification-type.component';
import { NotificationSubtypeComponent } from './admin/utility-configuration/utility-notifications/notification-subtype/notification-subtype.component';
import { NotificationTemplateComponent } from './admin/utility-configuration/utility-notifications/notification-template/notification-template.component';
import { CookieService } from 'ngx-cookie-service';
import { ConsumerOffersComponent } from './admin/utility-configuration/consumers/consumer-offers/consumer-offers.component';
import { OffersComponent } from './admin/utility-configuration/offers/offers.component';
import { OfferTypeComponent } from './admin/utility-configuration/offers/offer-type/offer-type.component';
import { OfferSubtypeComponent } from './admin/utility-configuration/offers/offer-subtype/offer-subtype.component';
import { OfferDetailsComponent } from './admin/utility-configuration/offers/offer-details/offer-details.component';
import { UtilityIntegrationComponent } from './admin/utility-configuration/utility-integration/utility-integration.component';
import { UtilityIntegrationTabComponent } from './admin/utility-configuration/utility-integration/utility-integration-tab/utility-integration-tab.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MeterDetailComponent } from './meter-data/meter-detail/meter-detail.component';
import { MeterFilterComponent } from './meter-data/meter-detail/meter-filter/meter-filter.component';
import { MeterListComponent } from './meter-data/meter-detail/meter-list/meter-list.component';
import { MeterDashboardComponent } from './meter-data/meter-detail/meter-dashboard/meter-dashboard.component';
import { MeterAddComponent } from './meter-data/meter-detail/meter-add/meter-add.component';
import { MeterEditComponent } from './meter-data/meter-detail/meter-edit/meter-edit.component';
import { MeterDetailViewComponent } from './meter-data/meter-detail/meter-detail-view/meter-detail-view.component';
import { DispatchComponent } from './meter-data/dispatch/dispatch.component';
import { DispatchReadingComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading.component';
import { DispatchReadingDashboardComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading-dashboard/dispatch-reading-dashboard.component';
import { DispatchReadingFilterComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading-filter/dispatch-reading-filter.component';
import { DispatchReadingListComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading-list/dispatch-reading-list.component';
import { SummaryComponent } from './common/summary/summary.component';
import { MeterDataSmartMeterComponent } from './admin/utility-configuration/meter-data-admin/meter-data-smart-meter/meter-data-smart-meter.component';
import { MeterDataTaskTemplateComponent } from './admin/utility-configuration/meter-data-admin/meter-data-task-template/meter-data-task-template.component';
import { WorkOrderDetailsComponent } from './admin/utility-configuration/work-orders/work-order-details/work-order-details.component';
import { UpdateOutageComponent } from './consumer/consumer-services/update-outage/update-outage.component';
import { UpdateTransferComponent } from './consumer/consumer-services/update-transfer/update-transfer.component';
import { BillingComponent } from './billing/billing.component';
import { ConsumerProcessingComponent } from './consumer/consumer-processing/consumer-processing.component';
import { DisconnectionsProcessingComponent } from './consumer/disconnections-processing/disconnections-processing.component';
import { TransferProcessingComponent } from './consumer/transfer-processing/transfer-processing.component';
import { ComplaintsProcessingComponent } from './consumer/complaints-processing/complaints-processing.component';
import { PaymentsProcessingComponent } from './consumer/payments-processing/payments-processing.component';
import { AdjustmentProcessingComponent } from './consumer/adjustment-processing/adjustment-processing.component';
import { OutageProcessingComponent } from './consumer/outage-processing/outage-processing.component';
import { ServiceProcessingComponent } from './consumer/service-processing/service-processing.component';
import { BillingScheduleAddComponent } from './billing/billing-schedule/billing-schedule-add/billing-schedule-add.component';
import { DispatchReadingViewComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading-view/dispatch-reading-view.component';
import { MeterDataAdminReaderStatusComponent } from './admin/utility-configuration/meter-data-admin/meter-data-admin-reader-status/meter-data-admin-reader-status.component';
import { ActivityLogComponent } from './admin/utility-configuration/activity-log/activity-log.component';
import { ActivityLogTabComponent } from './admin/utility-configuration/activity-log/activity-log-tab/activity-log-tab.component';
import { NotificationTemplatesComponent } from './admin/utility-configuration/notification-templates/notification-templates.component';
import { EmailTemplateComponent } from './admin/utility-configuration/notification-templates/email-template/email-template.component';
import { SmsTemplateComponent } from './admin/utility-configuration/notification-templates/sms-template/sms-template.component';
import { NotificationsTemplateComponent } from './admin/utility-configuration/notification-templates/notifications-template/notifications-template.component';
import { BillingScheduleEditComponent } from './billing/billing-schedule/billing-schedule-edit/billing-schedule-edit.component';
import { BillingScheduleViewComponent } from './billing/billing-schedule/billing-schedule-view/billing-schedule-view.component';
import { BillingScheduleListComponent } from './billing/billing-schedule/billing-schedule-list/billing-schedule-list.component';
import { BillingScheduleComponent } from './billing/billing-schedule/billing-schedule.component';
import { BillingScheduleFilterComponent } from './billing/billing-schedule/billing-schedule-filter/billing-schedule-filter.component';
import { BillingScheduleDashboardComponent } from './billing/billing-schedule/billing-schedule-dashboard/billing-schedule-dashboard.component';
import { BillingScheduleRunComponent } from './billing/billing-schedule/billing-schedule-run/billing-schedule-run.component';
import { ConsumerContactusComponent } from './admin/utility-configuration/consumers/consumer-contactus/consumer-contactus.component';
import { ConsumerTipsComponent } from './admin/utility-configuration/consumers/consumer-tips/consumer-tips.component';
import { ConsumerFeedbackComponent } from './admin/utility-configuration/consumers/consumer-feedback/consumer-feedback.component';
import { DispatchReadingRevisitComponent } from './meter-data/dispatch/dispatch-reading/dispatch-reading-revisit/dispatch-reading-revisit.component';
import { ValidationComponent } from './meter-data/validation/validation.component';
import { ValidationDashboardComponent } from './meter-data/validation/validation-dashboard/validation-dashboard.component';
import { ValidationFilterComponent } from './meter-data/validation/validation-filter/validation-filter.component';
import { ValidationListComponent } from './meter-data/validation/validation-list/validation-list.component';
import { ConsumerComplaintList } from './common/consumer-complaint-list/consumer-complaint-list.component';
import { ConsumerServiceList } from './common/consumer-service-list/consumer-service-list.component'
import { BillingDashboardComponent } from './billing/billing-dashboard/billing-dashboard.component';
import { ComplaintsApproveComponent } from './consumer/complaints-processing/complaints-approve/complaints-approve.component';
import { TransferApproveComponent } from './consumer/transfer-processing/transfer-approve/transfer-approve.component';
import { ValidationDetailViewComponent } from './meter-data/validation/validation-detail-view/validation-detail-view.component';
import { SearchConsumerComponent } from './meter-data/search-consumer/search-consumer.component';
import { UploadComponent } from './meter-data/upload/upload.component';
import { UploadDashboardComponent } from './meter-data/upload/upload-dashboard/upload-dashboard.component';
import { UploadFilterComponent } from './meter-data/upload/upload-filter/upload-filter.component';
import { UploadListComponent } from './meter-data/upload/upload-list/upload-list.component';
import { DisconnectionsApproveComponent } from './consumer/disconnections-processing/disconnections-approve/disconnections-approve.component';
import { OutageApproveComponent } from './consumer/outage-processing/outage-approve/outage-approve.component';
import { ConnectionApproveComponent } from './consumer/consumer-processing/connection-approve/connection-approve.component';
import { ServiceApproveComponent } from './consumer/service-processing/service-approve/service-approve.component';

import { UpdatePaymentComponent } from './consumer/consumer-services/update-payment/update-payment.component'
import { UpdateBillPayComponent } from './consumer/consumer-services/update-billpay/update-billpay.component';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { CommonPipe } from './common/common.pipe';
import { OfferProcessingComponent } from './consumer/offer-processing/offer-processing.component';

import { PrintBillComponent } from './billing/billing-schedule/billing-schedule-run/print-bill/print-bill.component';

import { WorkOrderCompleteComponent } from './work-order/work-order-complete/work-order-complete.component';
import { WorkOrderCompleteSummaryComponent } from './work-order/work-order-complete/work-order-complete-summary/work-order-complete-summary.component';
import { WorkOrderCompleteFiltersComponent } from './work-order/work-order-complete/work-order-complete-filters/work-order-complete-filters.component';
import { WorkOrderCompleteListComponent } from './work-order/work-order-complete/work-order-complete-list/work-order-complete-list.component';
import { AssetsComponent } from './assets/assets.component';
import { AssetsSummaryComponent } from './assets/assets-summary/assets-summary.component';
import { AssetsFiltersComponent } from './assets/assets-filters/assets-filters.component';
import { AssetsDetailViewComponent } from './assets/assets-detail-view/assets-detail-view.component';
import { AssetsListComponent } from './assets/assets-list/assets-list.component';
import { WorkOrderCompleteViewComponent } from './work-order/work-order-complete/work-order-complete-view/work-order-complete-view.component';
import { AssetsAddComponent } from './assets/assets-add/assets-add.component';
import { AssetsQuickServicesComponent } from './assets/assets-quick-services/assets-quick-services.component';
import { ValidationAddComponent } from './meter-data/validation/validation-add/validation-add.component';
import { NewConsumerComponent } from './meter-data/new-consumer/new-consumer.component';
import { NewConsumerValidationComponent } from './meter-data/new-consumer-validation/new-consumer-validation.component';


@NgModule({
  declarations: [
    AppComponent,
    CommonComponent,
    FooterComponent,
    HeaderComponent,
    SideNavComponent,
    BentoMenuComponent,
    ListViewComponent,
    RegistrationComponent,
    RegistrationDashboardComponent,
    RegistrationFiltersComponent,
    DashboardComponent,
    FilterComponent,
    SearchComponent,
    AddComponent,
    NotificationComponent,
    LocationComponent,
    ProfileComponent,
    AddRegistrationComponent,
    StepperFormComponent,
    RegistrationListComponent,
    BreadcrumbComponent,
    RegistrationDetailViewComponent,
    ToolsComponent,
    TenantComponent,
    TenantSummaryComponent,
    TenantFilterComponent,
    TenantDatatableComponent,
    AddressDetailsComponent,
    KycDetailsComponent,
    PaymentDetailsComponent,
    NoteDetailsComponent,
    TimelineDetailsComponent,
    CampaignComponent,
    CampaignDatatableComponent,
    CampaignFilterComponent,
    CampaignSummaryComponent,
    UserComponent,
    UserAddComponent,
    UserDetailViewComponent,
    UserFiltersComponent,
    UserListComponent,
    UserSummaryComponent,
    ComplaintComponent,
    ComplaintAddComponent,
    ComplaintListComponent,
    ComplaintDashboardComponent,
    ComplaintFiltersComponent,
    ServicesComponent,
    ServicesAddComponent,
    ServicesDashboardComponent,
    ServicesFiltersComponent,
    ServicesListComponent,
    ComplaintViewComponent,
    UtilityComponent,
    UtilityAddComponent,
    UtilityFiltersComponent,
    UtilitySummaryComponent,
    UtilityListComponent,
    AdminComponent,
    UtilityConfigurationComponent,
    RoleComponent,
    PaymentTypePipe,
    ConsumerComponent,
    ConsumerAddComponent,
    ConsumerDetailViewComponent,
    ConsumerFiltersComponent,
    ConsumerListComponent,
    ConsumerDashboardComponent,
    AssetComponent,
    AssetCategoryComponent,
    AssetContractComponent,
    AssetInsuranceComponent,
    AssetSubcategoryComponent,
    BillingAdvertisementComponent,
    BillingInstructionsComponent,
    BillingTemplateComponent,
    BillingTypeComponent,
    CampaignAdminComponent,
    CampaignAdvSubtypeComponent,
    CampaignAdvTypeComponent,
    CampaignTypeComponent,
    CampaignSubtypeComponent,
    CampaignFrequencyComponent,
    CampaignChannelComponent,
    ComplaintsComponent,
    ComplaintsComplaintsComponent,
    ComplaintsSubtypeComponent,
    ComplaintsTypeComponent,
    ConsumersComponent,
    ConsumersCategoryComponent,
    ConsumersFaqComponent,
    ConsumersKycComponent,
    ConsumersSubcategoryComponent,
    ConsumersSupportComponent,
    ContractsComponent,
    ContractsDocumentsComponent,
    ContractsPeriodComponent,
    ContractsSubtypeComponent,
    ContractsTermsComponent,
    ContractsTypeComponent,
    FinanceComponent,
    FinanceSubtypeComponent,
    FinanceTypeComponent,
    HcmComponent,
    HcmSubtypeComponent,
    HcmTypeComponent,
    MeterDataAdminComponent,
    MeterDataAdminActivityComponent,
    MeterDataAdminBillCycleComponent,
    MeterDataAdminReadingAssignmentsComponent,
    MeterDataAdminRouteComponent,
    MeterDataAdminTypeComponent,
    MeterDataAdminValidationAssignmentsComponent,
    NumFormatComponent,
    NumFormatTabComponent,
    OrdersComponent,
    OrdersStatusComponent,
    OrdersSubtypeComponent,
    OrdersTypeComponent,
    PaymentsComponent,
    PaymentsChannelComponent,
    PaymentsModeComponent,
    PaymentsTypeComponent,
    ProductsComponent,
    ProductsProductComponent,
    ProductsSubtypeComponent,
    ProductsTypeComponent,
    RegistrationAdminComponent,
    RegistrationAdminConsumerconsentComponent,
    RegistrationAdminDocumentsComponent,
    RegistrationAdminOwnershipComponent,
    RegistrationAdminSubtypeComponent,
    RegistrationAdminTemplatesComponent,
    RegistrationAdminTypeComponent,
    SeviceRequestsComponent,
    SeviceRequestsTypeComponent,
    SeviceRequestsSubtypeComponent,
    SeviceRequestsServicesComponent,
    ServicesAdminComponent,
    ServicesTypeComponent,
    ServicesSubtypeComponent,
    ServicesStatusComponent,
    StoreComponent,
    StoreTypeComponent,
    StoreLocationComponent,
    StoreReceiptComponent,
    SuppliersComponent,
    SuppliersProductCateoryComponent,
    SuppliersProductSubcateoryComponent,
    SuppliersSubtypeComponent,
    SuppliersTemplateComponent,
    SuppliersTypeComponent,
    SurveyComponent,
    SurveyObjectiveComponent,
    SurveyTypeComponent,
    SurveySubtypeComponent,
    TendersComponent,
    TendersQuotationComponent,
    TendersSubtypeComponent,
    TendersTermsComponent,
    TendersTypeComponent,
    TerritoryComponent,
    TerritoryAreaComponent,
    TerritoryCityComponent,
    TerritoryCountryComponent,
    TerritoryPremisesComponent,
    TerritoryRegionComponent,
    TerritorySectionComponent,
    TerritoryStateComponent,
    TerritorySubareaComponent,
    UserAdminComponent,
    UserSkillsComponent,
    UserSubtypeComponent,
    UserTypeComponent,
    WorkOrdersComponent,
    WorOrdersTypeComponent,
    WorkOrdersSubtypeComponent,
    WorkOrdersStatusComponent,
    WorkOrdersHolidaysComponent,
    PaymentSubtypeComponent,
    RoleRoleComponent,
    RoleTypeComponent,
    RoleSubtypeComponent,
    WorkOrderComponent,
    WorkOrderAddComponent,
    WorkOrderDetailViewComponent,
    WorkOrderListComponent,
    WorkOrderAssignmentComponent,
    ConsumerSearchComponent,
    ConsumerServicesComponent,
    UpdateProfileComponent,
    UtilitySetupComponent,
    UtilityModulesComponent,
    UtilityProductsComponent,
    UtilityDepartmentsComponent,
    TerritoryDivisionComponent,
    UtilityHolidayComponent,
    UtilityLeavesComponent,
    UtilityHolidayTabComponent,
    MeterDataReadCycleComponent,
    MeterDataComponent,
    ScheduleComponent,
    ReadingComponent,
    BillDistributionComponent,
    NoticeComponent,
    ReadingDashboardComponent,
    ReadingListComponent,
    ReadingFilterComponent,
    ReadingAddComponent,
    UpdateServicesComponent,
    UpdateComplaintsComponent,
    ReadingViewComponent,
    ReadingEditComponent,
    UpdateOffersComponent,
    ConsumerApproveComponent,
    UtilityDocumentsComponent,
    DocumentDetailsComponent,
    DocumentTypeComponent,
    DocumentSubtypeComponent,
    DocumentSizeComponent,
    UpdateConnectComponent,
    UpdateTransferComponent,
    UpdateDisconnectComponent,
    ConsumerServiceAgreementsComponent,
    UtilityNotificationsComponent,
    NotificationTypeComponent,
    NotificationSubtypeComponent,
    NotificationTemplateComponent,
    ConsumerOffersComponent,
    OffersComponent,
    OfferTypeComponent,
    OfferSubtypeComponent,
    OfferDetailsComponent,
    UtilityIntegrationComponent,
    UtilityIntegrationTabComponent,
    PageNotFoundComponent,
    MeterDetailComponent,
    MeterFilterComponent,
    MeterListComponent,
    MeterDashboardComponent,
    MeterAddComponent,
    MeterEditComponent,
    MeterDetailViewComponent,
    DispatchComponent,
    DispatchReadingComponent,
    DispatchReadingDashboardComponent,
    DispatchReadingFilterComponent,
    DispatchReadingListComponent,
    SummaryComponent,
    MeterDataSmartMeterComponent,
    MeterDataTaskTemplateComponent,
    WorkOrderDetailsComponent,
    BillingComponent,
    ConsumerProcessingComponent,
    DisconnectionsProcessingComponent,
    TransferProcessingComponent,
    ComplaintsProcessingComponent,
    PaymentsProcessingComponent,
    AdjustmentProcessingComponent,
    OutageProcessingComponent,
    ServiceProcessingComponent,
    BillingScheduleAddComponent,
    DispatchReadingViewComponent,
    UpdateOutageComponent,
    MeterDataAdminReaderStatusComponent,
    ActivityLogComponent,
    ActivityLogTabComponent,
    NotificationTemplatesComponent,
    EmailTemplateComponent,
    SmsTemplateComponent,
    NotificationsTemplateComponent,
    BillingScheduleEditComponent,
    BillingScheduleViewComponent,
    BillingScheduleListComponent,
    BillingScheduleComponent,
    BillingScheduleFilterComponent,
    BillingScheduleDashboardComponent,
    BillingScheduleRunComponent,
    ConsumerContactusComponent,
    ConsumerTipsComponent,
    ConsumerFeedbackComponent,
    ConsumerOfferDetailsComponent,
    ServiceContractDetailsComponent,
    DispatchReadingRevisitComponent,
    ValidationComponent,
    ValidationDashboardComponent,
    ValidationFilterComponent,
    ValidationListComponent,
    ConsumerComplaintList,
    ConsumerServiceList, 
    ComplaintsApproveComponent,
    TransferApproveComponent,
    BillingDashboardComponent, 
    ValidationDetailViewComponent, 
    SearchConsumerComponent, 
    UploadComponent, 
    UploadDashboardComponent, 
    UploadFilterComponent, 
    UploadListComponent,
    DisconnectionsApproveComponent,
    OutageApproveComponent,
    ConnectionApproveComponent,
    ServiceApproveComponent,
    UpdatePaymentComponent,
    UpdateBillPayComponent,
    AuthLayoutComponent,
    CommonPipe,
    OfferProcessingComponent,
    PrintBillComponent,
    WorkOrderCompleteComponent, 
    WorkOrderCompleteSummaryComponent, 
    WorkOrderCompleteFiltersComponent, 
    WorkOrderCompleteViewComponent,
    WorkOrderCompleteListComponent, AssetsComponent, AssetsSummaryComponent,
    AssetsFiltersComponent, AssetsDetailViewComponent, AssetsListComponent, 
    AssetsAddComponent,AssetsQuickServicesComponent, ValidationAddComponent, NewConsumerComponent, NewConsumerValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgSelectModule,
    DataTablesModule,
    NgxDropzoneModule,
    NgxDaterangepickerMd.forRoot(),
    NgbModule,
    ChartsModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    SimplebarAngularModule,
    NgxPrintModule,
    BrowserModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.0/tinymce.min.js',
    })
  ],
  providers: [AuthGuard,CookieService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
