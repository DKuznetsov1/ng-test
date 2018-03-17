import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class FormHelperService {

  constructor() { }

  formErrorMessages(formGroup: FormGroup): string[] {
    const result = [];
    Object.keys(formGroup.controls).forEach((key) => {
      result.push(...(this.formErrorMessageForField(formGroup, key)));
    });

    return result;
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

  private formErrorMessageForField(formGroup: FormGroup, fieldName: string): string[] {
    const formControl = formGroup.get(fieldName);

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

}
