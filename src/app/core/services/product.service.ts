import { Injectable } from '@angular/core';

import { Product, ProductCategory, IProduct } from '../models';
import { HttpService } from './http.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProductService {

  private readonly productsUrl = 'products';

  constructor(private httpService: HttpService) {
  }

  getProducts(): Promise<Array<IProduct>> {
    return this.httpService.get<Array<IProduct>>(this.productsUrl);
  }

  getById(id: number): Promise<IProduct> {
    return this.httpService.get<IProduct>(this.productsUrl + '/' + id);
  }

  create(newProduct: IProduct): Observable<IProduct> {
    const addedProduct = {...newProduct};
    return this.httpService.post<IProduct>(this.productsUrl, addedProduct);
  }

  update(product: IProduct): Observable<IProduct> {
    const updatedProduct = {...product};
    return this.httpService.put<IProduct>(this.productsUrl + '/' + updatedProduct.id, updatedProduct);
  }

  delete(product: IProduct): Observable<IProduct> {
    const updatedProduct = {...product};
    return this.httpService.delete<IProduct>(this.productsUrl + '/' + updatedProduct.id, updatedProduct);
  }
}
