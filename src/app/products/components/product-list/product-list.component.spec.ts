
// Импортируем дополнительную Ангуляр утилиту тестирования async
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductShortComponent } from '../product-short/product-short.component';

import { ProductService, CartService } from '../../../core/services';
import { Product, ProductCategory, OrderItem } from '../../../core/models';

const cartServiceStub = {
  add: jasmine.createSpy()
};

const product = new Product(101, 'testName', 102, ProductCategory.Food, true, ['testIngr1'], 'testDesc1');
const productServiceStub = {
  getProducts: () => Promise.resolve([
    product
  ])
};

const routerStub = {
  navigate: jasmine.createSpy()
};

describe('ProductListComponent', () => {
  let component: ProductListComponent,
      fixture: ComponentFixture<ProductListComponent>,
      debugElements: DebugElement[],
      elements: HTMLElement[];

  beforeEach(async(() => {
    TestBed
      .configureTestingModule({
        declarations: [ProductListComponent, ProductShortComponent],
        providers: [
          { provide: ProductService, useValue: productServiceStub },
          { provide: CartService, useValue: cartServiceStub },
          { provide: Router, useValue: routerStub }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

  });


  it('should display products data provided by product service', async () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();

      debugElements = fixture.debugElement.queryAll(By.css('li'));
      elements = debugElements.map(x => x.nativeElement);

      expect(elements.length).toBe(1);

      Object.keys(elements)
        .map(index => {
          expect(elements[index].innerHTML).toContain('app-product-short');
          const paragraphs = debugElements[index].queryAll(By.css('p'));

          expect(paragraphs.length).toBe(4);

          expect(paragraphs[0].nativeElement.textContent).toBe('testName');
          expect(paragraphs[1].nativeElement.textContent).toBe('description: testDesc1');
          expect(paragraphs[2].nativeElement.textContent).toBe('price: UAH102.00');
          expect(paragraphs[3].nativeElement.textContent).toBe('category: FOOD');
        });

    });
  });

  it('should add order item to cart', async () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const oi = new OrderItem(<Product>{ id: 2}, 3);
      fixture.componentInstance.onAddToCart(oi);

      const cartService = fixture.debugElement.injector.get(CartService);

      expect((<jasmine.Spy>cartService.add).calls.count()).toBe(1);
      const addArgs = (<jasmine.Spy>cartService.add).calls.argsFor(0);
      expect(addArgs.length).toBe(1);
      expect(addArgs[0]).toBe(oi);
    });
  });

  it('should navigate to secondary router on product selection', async () => {
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      fixture.detectChanges();
      fixture.componentInstance.onSelect(product);

      const router = fixture.debugElement.injector.get(Router);

      expect((<jasmine.Spy>router.navigate).calls.count()).toBe(1);
      const addArgs = (<jasmine.Spy>router.navigate).calls.argsFor(0);
      expect(addArgs.length).toBe(1);
      expect(addArgs[0]).toEqual(['home', { outlets: { details: [ 'product', 101 ] } }]);
    });
  });
});
