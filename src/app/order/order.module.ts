import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListComponent, OrderComponent } from './components';
import { OrdersRoutingModule } from './order.routing.module';

@NgModule({
  imports: [
    CommonModule,

    OrdersRoutingModule
  ],
  providers: [],
  declarations: [OrderListComponent, OrderComponent],
  exports: [OrderListComponent]
})
export class OrderModule { }
