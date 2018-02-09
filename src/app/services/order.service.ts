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
    const isPaymentCompleted = order.isPaymentCompleted;
    order.isPaymentCompleted = null;
    const processDatePromise = new Promise<Date>((resolve, reject) => {
      setTimeout(() => resolve(new Date()), 2000);
    }).then((val) => {
      order.isPaymentCompleted = isPaymentCompleted;
      return val;
    });

    order.orderDate = processDatePromise;
    this.previousOrders.push(order);
  }
}
