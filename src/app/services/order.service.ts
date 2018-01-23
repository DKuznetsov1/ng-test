import { Injectable } from '@angular/core';

import { Order } from '../models/order.model';

@Injectable()
export class OrderService {

  private previousOrders: Array<Order> = [];

  constructor() { }

  getAll() {
    return this.previousOrders;
  }

  add(order: Order) {
    order.id = this.previousOrders.length + 1;
    this.previousOrders.push(order);
  }
}
