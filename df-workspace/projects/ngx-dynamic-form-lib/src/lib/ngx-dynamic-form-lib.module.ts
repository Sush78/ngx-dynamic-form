import { NgModule } from '@angular/core';
import { NgxDynamicFormLibComponent } from './ngx-dynamic-form-lib.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    NgxDynamicFormLibComponent,
    DynamicFormComponent,
    DynamicFormInputComponent
  ],
  imports: [
    MatInputModule
  ],
  exports: [
    NgxDynamicFormLibComponent,
    DynamicFormComponent,
  ]
})
export class NgxDynamicFormLibModule { }
