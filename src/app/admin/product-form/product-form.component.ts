import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { switchMap } from 'rxjs/operators';

import { IProduct, Product, ProductCategory } from './../../core/models';
import { ProductService } from './../../core/services';

@Component({
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  product: IProduct;

  constructor(
    private productService: ProductService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.product = new Product(0, '', 0, ProductCategory.Drink, false, null, null, null, null);

    this.route.paramMap
    .pipe(
      switchMap((params: Params) => {
        return params.get('id')
          ? this.productService.getById(+params.get('id'))
          : Promise.resolve(null);
      }))
    .subscribe(
      product => this.product = {...product},
      err => console.log(err)
    );
  }

  saveProduct() {
    const product = {...this.product};

    const method = product.id ? 'update' : 'create';
    this.productService[method](product)
      .then( () => this.goBack() );

  }

  goBack(): void {
    this.location.back();
  }
}
