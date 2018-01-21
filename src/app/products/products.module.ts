import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { ProductService } from '../services/product.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductListComponent, ProductComponent],
  providers: [ProductService],
  exports: [ProductListComponent]
})
export class ProductsModule { }
