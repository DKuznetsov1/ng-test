import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';

@Injectable()
export class CartService {

  private currentCart: Array<string> = ['Food1', 'Food2', 'Food3'];

  constructor() { }

  getAll() {
    // console.log(JSON.stringify(this.currentCart));
    return this.currentCart;
  }

  add(product: Product) {
    this.currentCart.push(product.name);
  }

}
