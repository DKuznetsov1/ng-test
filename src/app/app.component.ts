import { Component, OnInit } from '@angular/core';

import { CartService, OrderService } from './services';
import { OrderItem, Order } from './models';

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
    // console.log('AppComponent init');
  }

}
