/**
* Order Item Model
*/
import { IProduct } from './iproduct.interface';

export class OrderItem {
  constructor(
    public product: IProduct,
    public amount: number
  ) {
  }

  price(): number {
    return this.amount * this.product.price;
  }
}
