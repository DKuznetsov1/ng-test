import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects, productsReducer } from './../+store';

import { ProductRoutingModule, productsRouterComponents } from './products.routing.module';
import { ProductShortComponent, ProductLongComponent, ProductListComponent } from './components';
import { ShopCommonModule } from '../shared/shop.common/shop.common.module';

@NgModule({
  imports: [
    CommonModule,

    ShopCommonModule,
    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),

    ProductRoutingModule,
  ],
  declarations: [
    ProductListComponent,
    ProductShortComponent,
    productsRouterComponents],
  providers: [],
  exports: [ProductListComponent]
})
export class ProductsModule { }
