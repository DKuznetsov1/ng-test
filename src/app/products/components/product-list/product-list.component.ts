import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { OrderItem, IProduct } from '../../../models';
import { ProductService, CartService } from '../../../services';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Array<IProduct>;

  constructor(
    public cartService: CartService,
    public productService: ProductService,
    public router: Router) { }

  async ngOnInit() {
    // console.log('ProductListComponent init');
    this.products = await this.productService.getProducts();
  }

  onAddToCart(orderItem: OrderItem) {
    console.log('adding to cart.');
    this.cartService.add(orderItem);
  }

  onSelect(product: IProduct) {
    console.log('product select');
    this.router.navigate(['home', { outlets: { details: ['product', product.id ] } }]);
  }

}
