import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CartListComponent, CartItemComponent } from './components';
import { CartSortPipe } from './pipes/cart-sort.pipe';
import { CartRoutingModule } from './cart.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CartRoutingModule
  ],
  declarations: [CartListComponent, CartItemComponent, CartSortPipe],
  providers: [],
  exports: [CartListComponent]
})
export class CartModule { }
