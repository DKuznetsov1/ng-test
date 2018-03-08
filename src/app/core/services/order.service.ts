import { Injectable } from '@angular/core';

import { Order } from '../models/order.model';
import { LocalStorageService } from './local-storage.service';
import { UserService } from './user.service';

@Injectable()
export class OrderService {

  currentOrder: Order = null;

  private readonly ordersKey = 'orders';
  private previousOrders: Array<Order> = [];

  constructor(
    public localStorageService: LocalStorageService,
    public userService: UserService
  ) { }

  getAll() {
    return this.previousOrders;
  }

  clearCurrent() {
    this.currentOrder = null;
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

  add(order: Order): number {
    order.id = this.previousOrders.length + 1;

    order.orderDate = new Date();
    this.previousOrders.push(order);
    this.currentOrder = order;
    return order.id;
  }

  cancelCurrent() {
    this.currentOrder.isPaymentCompleted = false;
    this.currentOrder.orderDate = new Date();

    const jsonOrder: any = {...this.currentOrder};
    this.saveOrderToStorage(jsonOrder);

    this.clearCurrent();
  }

  confirmCurrent() {
    this.currentOrder.isPaymentCompleted = true;
    this.currentOrder.orderDate = new Date();

    const jsonOrder: any = {...this.currentOrder};
    this.saveOrderToStorage(jsonOrder);

    this.clearCurrent();
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
