import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

import { ProductService, CartService, LocalStorageService, UserService } from './services';
import { OrderModule } from './order/order.module';

import { CoreModule } from './core/core.module';
import { AppRoutingModule, appRouterComponents } from './app.routing.module';

@NgModule({
  declarations: [
    appRouterComponents
  ],
  imports: [
    BrowserModule,
    FormsModule,

    CoreModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [ProductService, CartService, LocalStorageService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
