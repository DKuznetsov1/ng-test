import { Injectable } from '@angular/core';

import { Product } from '../models/product.model';
import { ProductCategory } from '../models/product-category.model';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts() {
    return [
      new Product(
        'test name1',
        'test desc1',
        111,
        ProductCategory.Food,
        true,
        ['ingr1', 'ingr2'],
        ['eq1', 'eq2']),
      new Product(
          'test name2',
          'test desc2',
          222,
          ProductCategory.Drink,
          false,
          ['ingr3', 'ingr4'],
          ['eq3', 'eq4'])
    ];
  }

}
