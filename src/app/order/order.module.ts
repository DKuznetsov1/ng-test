import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderListComponent } from './order-list/order-list.component';
import { OrderService } from '../services/order.service';
import { OrderComponent } from './order-list/order/order.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [OrderService],
  declarations: [OrderListComponent, OrderComponent],
  exports: [OrderListComponent]
})
export class OrderModule { }
