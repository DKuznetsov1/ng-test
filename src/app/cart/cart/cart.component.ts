import { Component, OnInit } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Array<CartItem>;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log('CartComponent init');
    this.cartItems = this.cartService.getAll();
  }

  hasItems() {
    return this.cartItems.length > 0;
  }

  onRemoveCartItem(cartItem: CartItem) {
    const index = this.cartItems.indexOf(cartItem);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
    }
  }
}
