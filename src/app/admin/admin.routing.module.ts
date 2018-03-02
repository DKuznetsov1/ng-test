import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as Guards from '../core/guards';
import { AdminComponent } from '.';
import {
  AdminDashboardComponent,
  ManageProductsComponent,
  ManageOrderHistoryComponent,
  ProductFormComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [Guards.AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [Guards.AuthGuard],
        children: [
          { path: 'products', component: ManageProductsComponent, canActivate: [Guards.ProductsStatePreloadingGuard] },
          { path: 'order-history', component: ManageOrderHistoryComponent },
          { path: 'products/edit/:id', component: ProductFormComponent, canActivate: [Guards.ProductExistGuard], },
          { path: 'products/add', component: ProductFormComponent
          },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

export let adminRouterComponents = [
  AdminComponent,
  AdminDashboardComponent,
  ManageProductsComponent,
  ManageOrderHistoryComponent,
  ProductFormComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  providers: [
    ...Guards.allGuards
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
