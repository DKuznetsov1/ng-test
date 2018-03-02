import { ProductExistGuard } from './product-exists.guard';
import { ProductsStatePreloadingGuard } from './products-state-preloading.guard';
import { AuthGuard } from './auth.guard';

export const allGuards: any[] = [ AuthGuard, ProductExistGuard, ProductsStatePreloadingGuard];

export * from './auth.guard';
export * from './product-exists.guard';
export * from './products-state-preloading.guard';
