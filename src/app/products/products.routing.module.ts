import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLongComponent, ProductListComponent } from './components';
import { ProductsComponent } from './products.component';

import * as Guards from '../core/guards';

const routes: Routes = [
  {
    path: 'home',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent,
        canActivate: [Guards.ProductsStatePreloadingGuard],
      },
      {
        path: 'product/:id',
        component: ProductLongComponent,
        outlet: 'details'
      }
    ]
  }
];

export const productsRouterComponents = [ProductsComponent, ProductLongComponent, ProductListComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    ...Guards.allGuards
  ],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
