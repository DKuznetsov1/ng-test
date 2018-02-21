import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { CartItem } from '../../../core/models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() remove: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() select: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() enableHightlight: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() disableHightlight: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('class.highlighted') isHighlighted: boolean;

  constructor() { }

  ngOnInit() {
  }

  getEditButtonText() {
    return this.cartItem.isEditMode ? 'End edit' : 'Edit';
  }

  toggleEditMode() {
    this.cartItem.isEditMode = !this.cartItem.isEditMode;
  }

  removeCartItem() {
    this.remove.emit(this.cartItem);
  }

  @HostListener('click') selectItem() {
    this.select.emit(this.cartItem);
  }

  @HostListener('mouseenter') enableHighlight() {
    console.log('enter');
    this.isHighlighted = true;
  }

  @HostListener('mouseleave') disableHighlight() {
    console.log('leave');
    this.isHighlighted = false;
  }

}
