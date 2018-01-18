import { Component, OnInit } from '@angular/core';

import { CartService } from './services';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'DK shop';

  constructor(public cartService: CartService) {

  }

  ngOnInit() {
    console.log('AppComponent init');
  }

  buy(product: Product) {
    console.log('adding to cart.');
    this.cartService.add(product);
  }
}
