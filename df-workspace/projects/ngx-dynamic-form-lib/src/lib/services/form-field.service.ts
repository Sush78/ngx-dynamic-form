import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormField } from '../models/form-field-model';
@Injectable({
  providedIn: 'root',
})
export class FormfieldControlService {
  toFormGroup(inputs: FormField<string>[]): FormGroup {
    const group: any = {};
    inputs.forEach((input) => {
      let validator: ValidatorFn[] = input.required
        ? [Validators.required]
        : [];
      input.validator.forEach((validate: any) => {
        switch (validate.name) {
          case 'email':
            validator.push(Validators.email);
            break;
          case 'min':
            validator.push(Validators.min(validate.value));
            break;
          case 'max':
            validator.push(Validators.max(validate.value));
            break;
          case 'minLength':
            validator.push(Validators.minLength(validate.value));
            break;
          case 'maxLength':
            validator.push(Validators.maxLength(validate.value));
            break;
          case 'pattern': // regex
            validator.push(Validators.pattern(validate.value));
            break;
          case 'requiredFileType':
            validator.push(this.requiredFileType(validate.value));
            break;
          case 'requiredFileSize':
            validator.push(this.requiredFileSize(validate.value));
            break;
          default:
            break;
        }
      });
      group[input.key] =
        validator.length > 0
          ? new FormControl(input.value || '', validator)
          : new FormControl(input.value || '');
    });

    return new FormGroup(group);
  }

  makeFormFields(dataList: any[]) {
    let formFieldList: FormField<string>[] = [];
    for (let data of dataList) {
      formFieldList.push(new FormField<string>(data));
    }
    return this.sortFormFields(formFieldList);
  }

  sortFormFields(formFieldList: any[]) {
    return formFieldList.sort((a, b) => a.order - b.order);
  }

  requiredFileType(type: any): ValidatorFn {
    return function (control: AbstractControl) {
      const file = control.value;
      if (typeof(file)==='object' && !file.hasOwnProperty('github') ) {
        const extension = file.file[0].name.split('.').pop();
        if (!type.includes(extension)) {
          return {
            requiredfiletype: false,
          };
        }
        return null;
      }

      return null;
    };
  }

  requiredFileSize(size: any): ValidatorFn {
    return function (control: AbstractControl) {
      const file = control.value;
      if (typeof(file)==='object' && !file.hasOwnProperty('github') ) {
        const extension = file.file[0].size;
        if (size <= extension) {
          return {
            requiredfilesize: false,
          };
        }

        return null;
      }

      return null;
    };
  }
}
