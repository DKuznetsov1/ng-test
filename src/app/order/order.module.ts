import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule, ordersRouterComponents } from './order.routing.module';
import { OrderExistGuard } from './guards';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    OrdersRoutingModule
  ],
  providers: [
    OrderExistGuard,
  ],
  declarations: [ordersRouterComponents],
  exports: []
})
export class OrderModule { }
