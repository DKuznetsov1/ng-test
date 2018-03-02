import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects, productsReducer } from './../+store';

import { AdminRoutingModule, adminRouterComponents } from './admin.routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    StoreModule.forFeature('products', productsReducer),
    EffectsModule.forFeature([ProductsEffects]),

    AdminRoutingModule
  ],
  declarations: [
    adminRouterComponents
  ]
})
export class AdminModule { }
