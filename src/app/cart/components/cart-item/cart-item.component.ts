import { Component, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { CartItem } from '../../../models';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent implements OnInit {
  @Input() cartItem: CartItem;
  @Output() removeEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() selectEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() enableHightlightEvent: EventEmitter<CartItem> = new EventEmitter<CartItem>();
  @Output() disableHightlightEvent: EventEmitter<void> = new EventEmitter<void>();
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

  remove() {
    this.removeEvent.emit(this.cartItem);
  }

  @HostListener('click') select() {
    this.selectEvent.emit(this.cartItem);
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
