import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductService } from '../services/product.service';
import { ShopCommonModule } from '../shared/shop.common/shop.common.module';

@NgModule({
  imports: [
    CommonModule,
    ShopCommonModule
  ],
  declarations: [
    ProductListComponent,
    ProductComponent],
  providers: [ProductService],
  exports: [ProductListComponent]
})
export class ProductsModule { }
