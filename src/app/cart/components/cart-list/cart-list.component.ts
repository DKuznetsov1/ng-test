import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CartItem, OrderItem, Product } from '../../../models';
import { CartService } from '../../../services/cart.service';

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

  public sortCriteria: string;
  public isDescending: boolean;
  public sortOptions: Array<{ property: string, displayName: string}>;
  private selectedItem: CartItem;
  private highlightedItem: CartItem;

  constructor(public cartService: CartService) { }

  ngOnInit() {
    console.log('CartComponent init');
    this.cartItems = this.cartService.getAll();
    this.sortOptions = [{
      property: 'orderItem.product.name',
      displayName: 'name'
    },
    {
      property: 'orderItem.amount',
      displayName: 'amount'
    },
    {
      property: 'orderItem.price',
      displayName: 'price'
    }];

    this.isDescending = true;
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

  clearCart() {
    this.cartService.emptyCart();
  }

  sortBy (criteria: string) {
    this.sortCriteria = criteria;
  }

  toggleSortDirection () {
    console.log(this.sortCriteria);
    this.isDescending = !this.isDescending;
  }

  getSortDirectionString() {
    return this.isDescending ? 'DESC' : 'ASC';
  }
}
