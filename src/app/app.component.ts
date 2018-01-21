import { Component, OnInit } from '@angular/core';

import { CartService } from './services';
import { OrderItem } from './models/order-item.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DK shop';

  constructor(public cartService: CartService) {

  }

  ngOnInit() {
    console.log('AppComponent init');
  }

  onAddToCart(orderItem: OrderItem) {
    console.log('adding to cart.');
    this.cartService.add(orderItem);
  }
}
