import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, Validators, FormControl, FormBuilder, FormArray, AbstractControl } from '@angular/forms';
import { Order, OrderItem, Product, ProductCategory } from '../../../core/models';
import { OrderService, CartService } from '../../../core/services';
import { Subscription } from 'rxjs/Subscription';
import { AutoUnsubscribe } from '../../../core';

@Component({
  selector: 'app-process-order',
  templateUrl: './process-order.component.html',
  styleUrls: ['./process-order.component.css']
})
@AutoUnsubscribe()
export class ProcessOrderComponent implements OnInit {

  countries: Array<string> = ['Ukraine', 'Armenia', 'Belarus', 'Hungary', 'Kazakhstan', 'Poland', 'Russia'];
  order: Order;
  orderForm: FormGroup;
  errorMessages: string[];

  firstNameMinLength: number;
  cityMinLength: number;
  street1MinLength: number;
  street2MinLength: number;
  countryMinLength: number;

  private sub: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private cartService: CartService,
    private router: Router
  ) {
    this.errorMessages = [];
    this.firstNameMinLength = 3;
    this.cityMinLength = 2;
    this.countryMinLength = 1;
    this.street1MinLength = 4;
    this.street2MinLength = 4;
  }

  get phones(): FormArray {
    return <FormArray>this.orderForm.get('phones');
  }

  ngOnInit() {
    this.order = this.orderService.currentOrder;
    if (!this.order) {
      console.log('WRONG!!!');
        this.order = new Order(
        1,
        [
          new OrderItem(
            new Product(1, '', 123, ProductCategory.Drink, true, []),
            2
          )
        ],
        new Date(),
        true
      );
    }

    this.buildForm();
    this.listenChanges();
  }

  private buildForm() {
    this.orderForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(this.firstNameMinLength)] ],

      email: ['',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]
      ],
      phones: this.formBuilder.array([this.buildPhone()]),
      sendProducts: true,
      country: ['', [ Validators.required, Validators.minLength(this.countryMinLength) ] ],
      city: ['', [ Validators.required, Validators.minLength(this.cityMinLength) ] ],
      zip: ['', [ Validators.required, Validators.pattern(new RegExp(/^\d{5}(?:[-\s]\d{4})?$/))] ],
      street1: ['', [ Validators.required, Validators.minLength(this.street1MinLength) ] ],
      street2: ['', [ Validators.minLength(this.street2MinLength) ] ]
    });
  }

  private buildPhone(): FormGroup {
    return this.formBuilder.group({
      phone: ['', [ Validators.required, Validators.pattern('[0-9]{12}')]]
    });
  }

  private formRequiredFailed(fieldName: string): string {
    return `Field ${fieldName} is required`;
  }

  private formMinLengthFailed(fieldName: string, min: number): string {
    return `Field ${fieldName} is too short (${min} characters minimum)`;
  }

  private formPatternFailed(fieldName: string): string {
    return `Field ${fieldName} has incorrect format`;
  }

  private formErrorMessages(): string[] {
    const result = [];
    Object.keys(this.orderForm.controls).forEach((key) => {
      result.push(...(this.formErrorMessageForField(key)));
    });

    return result;
  }

  private formErrorMessageForField(fieldName: string): string[] {
    const formControl = this.orderForm.get(fieldName);

    const isFormGroup = (<FormGroup>formControl).controls;

    if (isFormGroup && !formControl.valid) {
      return [`${fieldName} has some invalid fields`];
    }

    if (formControl && formControl.errors) {
      return Object.keys(formControl.errors)
        .map((key) => {
          switch (key) {
            case 'required':
            return this.formRequiredFailed(fieldName);
            case 'minlength':
            return this.formMinLengthFailed(fieldName, this[fieldName + 'MinLength']);
            case 'pattern':
            return this.formPatternFailed(fieldName);
            default:
            return null;
          }
        })
        .filter((x) => x);
    }
    return [];
  }

  private listenChanges(): void {
    this.sub = this.orderForm.valueChanges.subscribe(val => {
      this.errorMessages = this.formErrorMessages();
    });
  }

  isLastOrSingle(arr: any[], item: any) {
    return arr.indexOf(item) === arr.length - 1 || arr.length === 1;
  }

  confirm() {
    this.orderService.confirmCurrent();
    this.cartService.emptyCart();
    this.router.navigate(['orders', 'history']);
  }

  cancel() {
    this.orderService.clearCurrent();
    this.router.navigate(['cart']);
  }

  addPhone(): void {
    this.phones.push(this.buildPhone());
  }

  removePhone(phone: AbstractControl): void {
    const index = this.phones.controls.indexOf(phone);

    if (index !== -1) {
      this.phones.removeAt(index);
    }
  }

}
