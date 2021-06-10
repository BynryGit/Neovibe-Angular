import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UserRoutingModule,
    AccordionModule.forRoot(),
  ]
})
export class UserModule { }
