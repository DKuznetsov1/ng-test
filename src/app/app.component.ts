import { Component, OnInit } from '@angular/core';

import { CartService, OrderService, UserService } from './core/services';
import { OrderItem, Order } from './core/models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DK shop';

  constructor(
    public userService: UserService,
    public cartService: CartService,
    public orderService: OrderService) {
  }

  ngOnInit() {
    // console.log('AppComponent init');
    const user = this.userService.createAnonymousUser();
    this.userService.setUser(user);
  }

}
