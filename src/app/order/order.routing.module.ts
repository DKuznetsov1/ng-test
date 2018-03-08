import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrderListComponent, ProcessOrderComponent, OrderComponent } from './components';
import { OrdersComponent } from './orders.component';
import { OrderExistGuard } from './guards';

const routes: Routes = [{
  path: 'orders',
  component: OrdersComponent,
  children: [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/orders',
  },
  {
    path: 'form',
    component: ProcessOrderComponent,
    canActivate: [OrderExistGuard]
  },
  {
    path: 'history',
    component: OrderListComponent
  }]
}];


export let ordersRouterComponents = [
  OrdersComponent,
  ProcessOrderComponent,
  OrderListComponent,
  OrderComponent];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
exports: [RouterModule]
})
export class OrdersRoutingModule { }
