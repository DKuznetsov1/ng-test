import { Component, OnInit } from '@angular/core';

import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<string>;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log('CartComponent init');
    this.cartItems = this.cartService.getAll();
  }

  hasItems() {
    return this.cartItems.length > 0;
  }
}
