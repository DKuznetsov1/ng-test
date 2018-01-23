/**
* Product Model Interface
*/
import { ProductCategory } from './product-category.model';

export interface IProduct {
    name: string;
    price: number;
    category: ProductCategory;
    isAvailable: boolean;
    ingredients: Array<string>;
    description?: string;
    equivalents?: Array<string>;
}
