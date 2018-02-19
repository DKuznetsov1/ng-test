import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { CartItem, OrderItem, Order, Product } from '../../../models';
import { CartService, OrderService } from '../../../services';

@Component({
  selector: 'app-cart',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {

  cartItems: Array<CartItem>;

  public sortCriteria: string;
  public isDescending: boolean;
  public sortOptions: Array<{ property: string, displayName: string}>;
  private selectedItem: CartItem;
  private highlightedItem: CartItem;

  constructor(
    public cartService: CartService,
    public orderService: OrderService,
    public router: Router) { }

  ngOnInit() {
    // console.log('CartComponent init');
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
    console.log('buy cart.');
    const orderItems = this.cartItems.map(x => x.orderItem);

    this.orderService.add(new Order(0, orderItems.map(x => Object.assign({}, x)), null, true));
    this.cartService.emptyCart();
    this.router.navigate(['orders']);
  }

  cancelCart() {
    console.log('cancel cart.');
    const orderItems = this.cartItems.map(x => x.orderItem);

    this.orderService.add(new Order(0, orderItems.map(x => Object.assign({}, x)), null, false));
    this.cartService.emptyCart();
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
