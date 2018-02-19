import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './services';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(`CoreModule is already loaded. Import it in the AppModule only.`);
    }
  }
}
