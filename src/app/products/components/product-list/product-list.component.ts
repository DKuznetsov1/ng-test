import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

import { OrderItem, IProduct } from '../../../core/models';
import { ProductService, CartService } from '../../../core/services';

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

<<<<<<< HEAD
  async ngOnInit() {
    // console.log('ProductListComponent init');
    this.products = await this.productService.getProducts();
=======
  ngOnInit() {
    console.log('INIT Product List');
    this.products$ = this.store.select(getProducts);
    console.log('SELECT getProducts');
    this.productsError$ = this.store.select(getProductsError);
>>>>>>> b5bf8aa... fixed getConfig
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
