import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { OrderItem, IProduct } from '../../../models';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() addToCartEvent: EventEmitter<OrderItem> = new EventEmitter<OrderItem>();

  products: Array<IProduct>;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    console.log('ProductListComponent init');
    this.products = this.productService.getProducts();
  }

  onAddToCart(orderItem: OrderItem) {
    this.addToCartEvent.emit(orderItem);
  }
}
