import { Component, OnInit } from '@angular/core';

import { CartService, OrderService, UserService, AppSettingsService } from './core/services';
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
    public appSettingsService: AppSettingsService) {
  }

  ngOnInit() {
    console.log('INIT AppComponent');
    console.log('GET AND SAVE CONFIG');
    this.appSettingsService.getConfig();
    console.log('INIT AppComponent: DONE httpService init');
    const user = this.userService.createAnonymousUser();
    this.userService.setUser(user);
  }

}
