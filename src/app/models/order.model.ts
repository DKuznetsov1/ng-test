/**
* Order Model
*/
import { OrderItem } from './order-item.model';

export class Order {
  constructor(
    public id: number,
    public orderItems: Array<OrderItem>,
    public isPaymentCompleted: boolean = false
  ) {
  }

  orderPrice(): number {
    let sum  = 0;
    for (const item of this.orderItems) {
      sum += item.product.price * item.amount;
    }

    return sum;
  }
}
