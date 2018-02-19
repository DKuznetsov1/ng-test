import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListComponent } from './components';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderListComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
exports: [RouterModule]
})
export class OrdersRoutingModule { }
