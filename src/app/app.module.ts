import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { TimingInterceptor } from './core/interceptors/timing.interceptor';

import {
  ProductService,
  CartService,
  LocalStorageService,
  UserService,
  OrderService,
  AppSettingsService,
  HttpService  } from './core/services';
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
    HttpClientModule,

    CoreModule,
    ProductsModule,
    CartModule,
    OrderModule,
    AppRoutingModule
  ],
  providers: [
    LocalStorageService,
    AppSettingsService,
    HttpService,
    ProductService,
    CartService,
    UserService,
    OrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TimingInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
