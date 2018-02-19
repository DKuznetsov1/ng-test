import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderService } from '../services/order.service';
import { OrderListComponent, OrderComponent } from './components';
import { OrdersRoutingModule } from './order.routing.module';

@NgModule({
  imports: [
    CommonModule,

    OrdersRoutingModule
  ],
  providers: [OrderService],
  declarations: [OrderListComponent, OrderComponent],
  exports: [OrderListComponent]
})
export class OrderModule { }
