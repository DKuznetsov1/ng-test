import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { UserService, OrderService } from './../../services';
import { Order } from './../../models';

@Component({
  selector: 'app-manage-order-history',
  templateUrl: './manage-order-history.component.html',
  styleUrls: ['./manage-order-history.component.css']
})
export class ManageOrderHistoryComponent implements OnInit, OnDestroy {

  users: Array<string>;
  userOrders: Order[];
  sub: Subscription;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) { }

  ngOnInit() {
    console.log('ManageOrderHistoryComponent init');
    const usersObject = this.userService.getAllSubscription();
    this.users = this.userService.getAll().map(x => x.id);

    this.sub = usersObject.subscribe(
      usersUpdated => {
        this.users = usersUpdated.map(x => x.id);
      },
      err => console.log(err)
    );

    this.getOrderForUser(this.userService.currentUser.id);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  removeOrdersForUser() {
    // this.userService.removeAllExceptCurrent();
  }

  getOrderForUser(userId: string) {
    this.userOrders = this.orderService.getAllForUser(userId);
    this.userOrders.forEach(x => x.orderPrice = () => {
        let sum  = 0;
        for (const item of x.orderItems) {
          sum += item.product.price * item.amount;
        }

        return sum;
      });
  }

}
