import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../models';
import { ProductService } from '../../services';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: IProduct[];

  constructor(
    public productService: ProductService
  ) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

}
