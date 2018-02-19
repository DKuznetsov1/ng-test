/**
* Product Model Interface
*/
import { ProductCategory } from './product-category.model';

export interface IProduct {
    id: number;
    name: string;
    price: number;
    category: ProductCategory;
    isAvailable: boolean;
    ingredients: Array<string>;
    description?: string;
    longDescription?: string;
    equivalents?: Array<string>;
}
