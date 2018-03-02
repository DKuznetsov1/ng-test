import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  AuthService,
  ProductService,
  CartService,
  LocalStorageService,
  UserService,
  OrderService,
  AppSettingsService,
  HttpService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TimingInterceptor } from './interceptors/timing.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuard,
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
    },
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
