/**
* Cart Item Model
*/
import { OrderItem } from './order-item.model';

export class CartItem {
  constructor(
    public orderItem: OrderItem,
    public isEditMode: boolean = false
  ) {
  }
}
