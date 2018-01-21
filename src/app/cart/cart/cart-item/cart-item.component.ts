import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { CartItem } from '../../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() removeEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();

  constructor() { }

  ngOnInit() {
  }

  getEditButtonText() {
    return this.cartItem.isEditMode ? 'End edit' : 'Edit';
  }

  toggleEditMode() {
    this.cartItem.isEditMode = !this.cartItem.isEditMode;
  }

  remove() {
    this.removeEvent.emit(this.cartItem);
  }

}
