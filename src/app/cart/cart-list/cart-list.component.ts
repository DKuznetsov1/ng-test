import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { CartItem } from '../../models/cart-item.model';
import { OrderItem } from '../../models/order-item.model';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  @Output() buyEvent: EventEmitter<Array<OrderItem>> =
    new EventEmitter<Array<OrderItem>>();
  @Output() cancelCartEvent: EventEmitter<Array<OrderItem>> =
    new EventEmitter<Array<OrderItem>>();

  cartItems: Array<CartItem>;

  private selectedItem: CartItem;
  private highlightedItem: CartItem;

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

  onSelect(cartItem: CartItem): void {
    this.selectedItem = cartItem;
  }

  onEnableHighlight(cartItem: CartItem): void {
    this.highlightedItem = cartItem;
  }

  isSelected(cartItem: CartItem): boolean {
    return cartItem === this.selectedItem;
  }

  buy() {
    const orderItems = this.cartItems.map(x => x.orderItem);
    this.buyEvent.emit(orderItems);
  }

  cancelCart() {
    const orderItems = this.cartItems.map(x => x.orderItem);
    this.cancelCartEvent.emit(orderItems);
  }
}
