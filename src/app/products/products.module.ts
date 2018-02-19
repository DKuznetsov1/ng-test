import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule, productsRouterComponents } from './products.routing.module';
import { ProductShortComponent, ProductLongComponent, ProductListComponent } from './components';
import { ProductService } from '../services/product.service';
import { ShopCommonModule } from '../shared/shop.common/shop.common.module';

@NgModule({
  imports: [
    CommonModule,

    ShopCommonModule,
    ProductRoutingModule
  ],
  declarations: [
    ProductListComponent,
    ProductShortComponent,
    productsRouterComponents],
  providers: [ProductService],
  exports: [ProductListComponent]
})
export class ProductsModule { }
