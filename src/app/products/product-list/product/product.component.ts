import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IProduct } from '../../../models/iproduct.interface';
import { OrderItem } from '../../../models/order-item.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: IProduct;
  @Output() addToCartEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  constructor() { }

  ngOnInit() {
    console.log('ProductComponent init');
  }

  addToCart(product: IProduct, amount: string) {
    this.addToCartEvent.emit(new OrderItem(product, parseFloat(amount)));
  }
}
