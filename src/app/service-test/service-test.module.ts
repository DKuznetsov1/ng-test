import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceTestComponent } from './components/service-test.component';

import {
  ConfigOptionsService,
  ConstantsService,
  GeneratorServiceFactory,
  GeneratorServiceToken,
  StorageService,
  LocalStorageService
} from '../services';

const providers = [];
// tslint:disable-next-line:no-unused-expression
Math.random() > 0.5 && providers.push(ConfigOptionsService);
// tslint:disable-next-line:no-unused-expression
Math.random() > 0.5 && providers.push({ provide: StorageService, useClass: LocalStorageService });
// tslint:disable-next-line:no-unused-expression
Math.random() > 0.5 && providers.push({ provide: ConstantsService, useValue: new ConstantsService() });
// tslint:disable-next-line:no-unused-expression
Math.random() > 0.5 && providers.push({ provide: GeneratorServiceToken, useFactory: GeneratorServiceFactory(10) });

@NgModule({
  imports: [
    CommonModule
  ],
  providers,
  declarations: [ServiceTestComponent],
  exports: [ServiceTestComponent]
})
export class ServiceTestModule { }
