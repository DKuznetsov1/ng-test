import { Injectable, InjectionToken } from '@angular/core';

import { GeneratorService } from './generator.service';

export const GeneratorServiceToken = new InjectionToken<any[]>('GeneratorServiceToken');

export function GeneratorServiceFactory(length: number) {
  return function() {
    return new GeneratorService(length);
  };
}
