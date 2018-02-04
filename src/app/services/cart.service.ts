import { Injectable } from '@angular/core';

import { CartItem, OrderItem } from '../models';

@Injectable()
export class CartService {

  private currentCart: Array<CartItem> = [];

  constructor() { }

  getAll() {
    // console.log(JSON.stringify(this.currentCart));
    return this.currentCart;
  }

  add(orderItem: OrderItem) {
    const existingItem = this.currentCart.find((x) => {
      return x.orderItem.product.name === orderItem.product.name;
    });

    if (typeof existingItem !== 'undefined') {
      existingItem.orderItem.amount += orderItem.amount;
    } else {
      this.currentCart.push(new CartItem(orderItem));
    }
  }

  emptyCart() {
    this.currentCart.splice(0, this.currentCart.length);
  }

  totalPrice() {
    return this.currentCart.map(x => x.orderItem.product.price * x.orderItem.amount).reduce((x, y) => x + y);
  }

  totalItems() {
    return this.currentCart.length;
  }
}
