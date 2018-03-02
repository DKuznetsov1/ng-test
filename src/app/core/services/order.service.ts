import { Injectable } from '@angular/core';

import { Order } from '../models/order.model';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable()
export class OrderService {

  private readonly ordersKey = 'orders';
  private previousOrders: Array<Order> = [];

  constructor(
    public localStorageService: LocalStorageService,
    public userService: UserService
  ) { }

  getAll() {
    return this.previousOrders;
  }

  getAllForUser(userId: string) {
    const ordersExists = this.localStorageService.getItem(this.ordersKey);

    if (!ordersExists) {
      this.localStorageService.setItem(this.ordersKey, {});
    }

    const orders = JSON.parse(this.localStorageService.getItem(this.ordersKey));

    const userOrders = orders[userId];

    return userOrders || [];
  }

  add(order: Order) {
    order.id = this.previousOrders.length + 1;
    const isPaymentCompleted = order.isPaymentCompleted;
    order.isPaymentCompleted = null;
    const processDatePromise = new Promise<Date>((resolve, reject) => {
      setTimeout(() => resolve(new Date()), 2000);
    }).then((val) => {
      order.isPaymentCompleted = isPaymentCompleted;
      const jsonOrder: any = {...order};
      jsonOrder.orderDate = val;
      this.saveOrderToStorage(jsonOrder);
      return val;
    });

    order.orderDate = processDatePromise;
    this.previousOrders.push(order);
  }

  removeOrdersForUser(userId: string) {
    const orders = JSON.parse(this.localStorageService.getItem(this.ordersKey));

    if (orders) {
      delete orders[userId];
    }

    this.localStorageService.setItem(this.ordersKey, orders);
  }

  removeAll() {
    this.localStorageService.setItem(this.ordersKey, {});
  }

  private saveOrderToStorage(order: Order): Order {
    if (this.userService.currentUser) {
      const userId = this.userService.currentUser.id;
      const ordersExists = this.localStorageService.getItem(this.ordersKey);

      if (!ordersExists) {
        this.localStorageService.setItem(this.ordersKey, {});
      }

      const orders = JSON.parse(this.localStorageService.getItem(this.ordersKey));

      const userHasOrders = typeof orders[userId] !== 'undefined';

      if (!userHasOrders) {
        orders[userId] = [];
      }

      orders[userId].push(order);
      this.localStorageService.setItem(this.ordersKey, orders);

      return order;
    }

    return null;
  }

}
