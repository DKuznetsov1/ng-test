import { Injectable } from '@angular/core';

import { Product, ProductCategory, IProduct } from '../models';

@Injectable()
export class ProductService {

  private readonly _longDescriptionSample: string;
  private _nextId: number;
  private _products: Array<IProduct>;

  constructor() {
    this._longDescriptionSample = `Lorem ipsum dolor sit amet,
    consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
     Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
      dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
      sunt in culpa qui officia deserunt mollit anim id est laborum. `;

    this._nextId = 1;

    this._products = [
      new Product(
        this._nextId++,
        'test name1',
        111,
        ProductCategory.Food,
        true,
        ['ingr1', 'ingr2'],
        'test desc1',
        this._longDescriptionSample,
        ['eq1', 'eq2']),
      new Product(
        this._nextId++,
        'test name2',
        222,
        ProductCategory.Drink,
        true,
        ['ingr3', 'ingr4'],
        'test desc2',
        this._longDescriptionSample,
        ['eq3', 'eq4']),
      new Product(
        this._nextId++,
        'test name3',
        333,
        ProductCategory.Drink,
        true,
        ['ingr5', 'ingr6']),
      new Product(
        this._nextId++,
        'test name4',
        444,
        ProductCategory.Drink,
        true,
        ['ingr7', 'ingr8']),
      new Product(
        this._nextId++,
        'test name5',
        555,
        ProductCategory.Drink,
        false,
        ['ingr9', 'ingr10'],
        'test desc 3',
        this._longDescriptionSample)
    ];
   }

  getProducts(): Promise<Array<IProduct>> {
    return Promise.resolve(this._products);
  }

  getById(id: number): Promise<IProduct> {
    const existingItem = this._products.find((x) => {
      return x.id === id;
    });

    return Promise.resolve(existingItem);
  }

  create(newProduct: IProduct): Promise<IProduct> {
    const addedProduct = {...newProduct};
    addedProduct.id = this._nextId++;
    this._products.push(addedProduct);
    return Promise.resolve(addedProduct);
  }

  update(product: IProduct): Promise<IProduct> {
    const i = this._products.findIndex(t => t.id === product.id);

    if (i > -1) {
      this._products.splice(i, 1, product);
    }
    return Promise.resolve(product);
  }
}
