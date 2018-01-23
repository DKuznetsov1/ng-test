import { Component, OnInit } from '@angular/core';

import { CartService, OrderService } from './services';
import { OrderItem } from './models/order-item.model';
import { Order } from './models/order.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DK shop';

  constructor(
    public cartService: CartService,
    public orderService: OrderService) {
  }

  ngOnInit() {
    console.log('AppComponent init');
  }

  onAddToCart(orderItem: OrderItem) {
    console.log('adding to cart.');
    this.cartService.add(orderItem);
  }

  onBuy(orderItems: Array<OrderItem>) {
    console.log('buy cart.');
    this.orderService.add(new Order(0, orderItems.map(x => Object.assign({}, x)), true));
    this.cartService.emptyCart();
  }

  onCancelCart(orderItems: Array<OrderItem>) {
    console.log('cancel cart.');
    this.orderService.add(new Order(0, orderItems.map(x => Object.assign({}, x)), false));
    this.cartService.emptyCart();
  }
}
