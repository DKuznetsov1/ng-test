/**
* Product Model
*/
import { IProduct } from './iproduct.interface';
import { ProductCategory } from './product-category.model';

export class Product implements IProduct {
  constructor(
    public id: number,
    public name: string,
    public price: number,
    public category: ProductCategory,
    public isAvailable: boolean,
    public ingredients: Array<string>,
    public description?: string,
    public longDescription?: string,
    public equivalents?: Array<string>
  ) {
  }
}
