import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { Product } from '../../models/product.model';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() buy: EventEmitter<Product> = new EventEmitter<Product>();

  products: Array<Product>;

  constructor(public productService: ProductService) { }

  ngOnInit() {
    console.log('ProductListComponent init');
    this.products = this.productService.getProducts();
  }

  onBuy(product: Product) {
    this.buy.emit(product);
  }
}
