/**
* Order Model
*/
import { OrderItem } from './order-item.model';

export class Order {
  constructor(
    public orderItems: Array<OrderItem>,
    public isPaymentCompleted: boolean
  ) {
  }
}
