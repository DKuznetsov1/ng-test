import { Component, OnInit } from '@angular/core';

import { OrderService } from './../../services';
@Component({
  selector: 'app-manage-order-history',
  templateUrl: './manage-order-history.component.html',
  styleUrls: ['./manage-order-history.component.css']
})
export class ManageOrderHistoryComponent implements OnInit {

users: Array<string>;

  constructor(
    private orderService: OrderService) { }

  ngOnInit() {
  }

}
