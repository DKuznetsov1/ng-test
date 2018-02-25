import { Component, OnInit } from '@angular/core';

import { CartService, OrderService, UserService, HttpService } from './core/services';
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
    public orderService: OrderService,
    public httpService: HttpService) {
  }

  async ngOnInit() {
    // console.log('AppComponent init');
    await this.httpService.init();
    const user = this.userService.createAnonymousUser();
    this.userService.setUser(user);
  }

}
