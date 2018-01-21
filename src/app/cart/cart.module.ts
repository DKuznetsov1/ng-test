import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartComponent } from './cart/cart.component';
import { CartService } from '../services/cart.service';
import { CartItemComponent } from './cart/cart-item/cart-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [CartComponent, CartItemComponent],
  providers: [CartService],
  exports: [CartComponent]
})
export class CartModule { }
