import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Order } from '../../core/models';
import { OrderService } from '../../core/services';

@Injectable()
export class OrderExistGuard implements CanActivate {

    constructor(
      private orderService: OrderService
    ) {}

    canActivate() {
        return this.orderService.currentOrder != null;
    }

}
