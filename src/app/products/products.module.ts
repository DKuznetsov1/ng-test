import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule, productsRouterComponents } from './products.routing.module';
import { ProductShortComponent, ProductLongComponent, ProductListComponent } from './components';
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
  providers: [],
  exports: [ProductListComponent]
})
export class ProductsModule { }
