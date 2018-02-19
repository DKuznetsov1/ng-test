import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductLongComponent, ProductListComponent } from './components';
import { ProductsComponent } from './products.component';

const routes: Routes = [
  {
    path: 'home',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListComponent
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
exports: [RouterModule]
})
export class ProductRoutingModule { }
