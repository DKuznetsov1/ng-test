import { Component, OnInit, Input } from '@angular/core';

import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @Input() order: Order;

  constructor() { }

  ngOnInit() {
    console.log(JSON.stringify(this.order));
  }

  orderPrice(): number {
    return this.order.orderPrice();
  }

  getCompletedValue(): string {
    return this.order.isPaymentCompleted ? 'Yes' : 'No';
  }

}
