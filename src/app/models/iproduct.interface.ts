/**
* Product Model Interface
*/
import { ProductCategory } from './product-category.model';

export interface IProduct {
    name: string;
    description?: string;
    price: number;
    category: ProductCategory;
    isAvailable: boolean;
    ingredients: Array<string>;
    equivalents?: Array<string>;
}
