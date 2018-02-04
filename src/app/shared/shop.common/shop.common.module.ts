import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorderDirective } from './directives/border.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BorderDirective],
  exports: [BorderDirective]
})
export class ShopCommonModule { }
