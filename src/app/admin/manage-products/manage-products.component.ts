import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../core/models';
import { ProductService } from '../../core/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.css']
})
export class ManageProductsComponent implements OnInit {

  products: IProduct[];

  constructor(
    public productService: ProductService,
    private router: Router
  ) { }

  async ngOnInit() {
    this.products = await this.productService.getProducts();
  }

  addProduct() {
    this.router.navigate(['admin', 'products', 'add']);
  }

}
