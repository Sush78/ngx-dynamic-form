import { NgModule } from '@angular/core';
import { NgxDynamicFormLibComponent } from './ngx-dynamic-form-lib.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';



@NgModule({
  declarations: [
    NgxDynamicFormLibComponent,
    DynamicFormComponent,
    DynamicFormInputComponent
  ],
  imports: [
  ],
  exports: [
    NgxDynamicFormLibComponent
  ]
})
export class NgxDynamicFormLibModule { }
