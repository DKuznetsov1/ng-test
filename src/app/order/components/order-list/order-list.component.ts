import { Component, OnInit } from '@angular/core';

import { Order } from '../../../core/models';
import { OrderService } from '../../../core/services';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  previousOrders: Array<Order> = [];

  constructor(public orderService: OrderService) { }

  ngOnInit() {
    // console.log('CartComponent init');
    this.previousOrders = this.orderService.getAll();
  }

  hasItems() {
    return this.previousOrders.length > 0;
  }

}
