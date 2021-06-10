import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginLogoutComponent } from '../auth-layout/login-logout/login-logout.component';
import { ResetPasswordComponent } from '../auth-layout/login-logout/reset-password/reset-password.component';
import { ChangePasswordComponent } from '../auth-layout/login-logout/change-password/change-password.component';
import { AuthLayoutRoutingModule } from './auth-layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {NgxPrintModule} from 'ngx-print';
import { NgxTinymceModule } from 'ngx-tinymce';

@NgModule({
  declarations: [
    LoginLogoutComponent,
    ResetPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    Ng2SearchPipeModule,
    NgxPrintModule,
    NgxTinymceModule,
    NgxDaterangepickerMd.forRoot(),
    NgbModule,
    FormsModule, 
    ReactiveFormsModule,
    AuthLayoutRoutingModule,
  ]
})
export class AuthLayoutModule { }
