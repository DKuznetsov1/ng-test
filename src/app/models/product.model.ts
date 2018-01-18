/**
* Product Model
*/
import { ProductCategory } from './product-category.model';

export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: ProductCategory,
    public isAvailable: boolean,
    public ingredients: Array<string>,
    public equivalents: Array<string>,
  ) {
  }
}
