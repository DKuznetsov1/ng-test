import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    AdminRoutingModule
  ],
  declarations: [
    adminRouterComponents
  ]
})
export class AdminModule { }
