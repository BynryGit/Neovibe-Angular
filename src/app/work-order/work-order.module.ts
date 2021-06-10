import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrderRoutingModule } from './work-order-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { DataTablesModule } from 'angular-datatables';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    WorkOrderRoutingModule,
    NgSelectModule,
    DataTablesModule,
    NgxDropzoneModule,
    NgxDaterangepickerMd.forRoot(),
    NgbModule,
    FontAwesomeModule,
    FormsModule, 
    ReactiveFormsModule,
    FlexLayoutModule,
    SimplebarAngularModule, 
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
})
export class WorkOrderModule { }
