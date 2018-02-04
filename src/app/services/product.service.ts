import { Injectable } from '@angular/core';

import { Product, ProductCategory } from '../models';

@Injectable()
export class ProductService {

  constructor() { }

  getProducts() {
    return [
      new Product(
        'test name1',
        111,
        ProductCategory.Food,
        true,
        ['ingr1', 'ingr2'],
        'test desc1',
        ['eq1', 'eq2']),
      new Product(
          'test name2',
          222,
          ProductCategory.Drink,
          true,
          ['ingr3', 'ingr4'],
          'test desc2',
          ['eq3', 'eq4']),
      new Product(
        'test name3',
        333,
        ProductCategory.Drink,
        true,
        ['ingr5', 'ingr6']),
      new Product(
        'test name4',
        444,
        ProductCategory.Drink,
        true,
        ['ingr7', 'ingr8']),
      new Product(
        'test name5',
        555,
        ProductCategory.Drink,
        false,
        ['ingr9', 'ingr10'])
    ];
  }

}
