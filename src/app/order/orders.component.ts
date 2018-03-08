import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { OrderService } from '../core/services';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(
    private router: Router,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    console.log('!!!');
    if (this.orderService.currentOrder) {
      this.router.navigate(['orders', 'form']);
    } else {
      this.router.navigate(['orders', 'history']);
    }
  }

}
