import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartListComponent, CartItemComponent } from './components';
import { CartService } from '../services/cart.service';
import { CartSortPipe } from './pipes/cart-sort.pipe';
import { CartRoutingModule } from './cart.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CartRoutingModule
  ],
  declarations: [CartListComponent, CartItemComponent, CartSortPipe],
  providers: [CartService],
  exports: [CartListComponent]
})
export class CartModule { }
