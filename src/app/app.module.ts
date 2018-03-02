import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

// @Ngrx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { RouterStateSerializerProvider, routerReducers, RouterEffects } from './+store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';


import { AppComponent } from './app.component';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';

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

    StoreModule.forRoot(routerReducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RouterEffects]),

    !environment.production ? StoreDevtoolsModule.instrument() : [],

    AppRoutingModule
  ],
  providers: [
    RouterStateSerializerProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    // console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  }
 }
