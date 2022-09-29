import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnChanges,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../models/form-field-model';
import { NgxDynamicFormLibService } from '../../ngx-dynamic-form-lib.service';
import { detecCycle } from '../../utils/dynamic-form-utils';
import { Location } from '@angular/common';
import * as _ from 'lodash';

interface StyleConfig {
  width: string;
  padding: string;
  wrap: boolean;
}
@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
})
export class DynamicFormComponent implements OnInit, OnChanges {
  @Input() formFields: FormField<string>[] = [];
  @Input() styleConfig: StyleConfig = {
    width: '100%',
    padding: '1rem',
    wrap: false,
  };

  @Input() externalClass!: string;

  @Input() btnName: string = 'Submit';
  @Input() btnIcon: string = '';
  @Input() noCancel: boolean = false;
  @Output() submitEvent = new EventEmitter();
  @Output() superTableInputE = new EventEmitter();
  @Output() superTableDropDownE = new EventEmitter();
  @Output() superTableCheckE = new EventEmitter();
  @Output() superTableIconE = new EventEmitter();

  @Output() closeSidebar = new EventEmitter();
  handleClose(_event: any) {
    this.closeSidebar.emit(false);
  }

  form!: FormGroup;
  payLoad = ' ';
  dependencyGraph: any = {};
  dependencyGraphCopy: any = {};
  formFieldMap: any = [];
  dependentInputs: any = {};
  cycleDetected: boolean = false;
  @Input() showSpinner!: boolean;
  @Input() secBtnText: string = 'Cancel';

  public width = Number as any;
  public height = Number as any;
  constructor(
    private formfieldService: NgxDynamicFormLibService,
    private location: Location,
  ) {}

  ngOnInit(): void {
    this.form = this.formfieldService.toFormGroup(this.formFields);
    this.formFields = this._filterFormFields();
    this.dependencyGraphCopy = JSON.parse(JSON.stringify(this.dependencyGraph));

    if (detecCycle(this.dependencyGraph)) {
      console.error(
        'There is a cyclic-dependency betwen form inputs. Please check your form JSON'
      );
      this.cycleDetected = true;
    }
  }

  ngOnChanges(_formFields: any) {
    this.form = this.formfieldService.toFormGroup(this.formFields);
    this.formFields = this._filterFormFields();
    this.dependencyGraphCopy = JSON.parse(JSON.stringify(this.dependencyGraph));
  }

  _filterFormFields() {
    return this.formFields.filter((item: any) => {
      this.dependencyGraph[item.key] = item.dependents;
      this.formFieldMap[item.key] = item;
      if (item.dependents.length > 0) {
        this.dependentInputs[item.key] = item;
      }
      return item.dependents.length === 0;
    });
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.getRawValue());
    this.submitEvent.emit(this.form.getRawValue());
  }

  _modifyGraph(element: any, item: any) {
    if (this.dependencyGraph[element].length !== 0) {
      let i = this.dependencyGraph[element].length;
      while (i--) {
        if (
          this.dependencyGraph[element][i].key == item.key &&
          !this.dependencyGraph[element][i].value
        ) {
          // field dependency
          this.dependencyGraph[element].splice(i, 1);
        } else if (
          this.dependencyGraph[element][i].key == item.key &&
          this.dependencyGraph[element][i].value
        ) {
          // value dependency
          if (_.isEqual(this.dependencyGraph[element][i].value, item.value)) {
            if (
              this.formFieldMap[element].orCondition &&
              !this.formFields.filter((ele: any) => {
                return ele.key === element;
              }).length
            )
              this._addFormField(this.dependentInputs[element]);
            else this.dependencyGraph[element].splice(i, 1);
          }
        }
      }
      if (
        !this.formFieldMap[element].orCondition &&
        this.dependencyGraph[element].length === 0
      ) {
        this._addFormField(this.dependentInputs[element]);
      }
    }
    this.handleFormFieldDependency(element, item);
  }

  handleFormFieldDependency(element: any, item: any) {
    if (!this.formFieldMap[element].orCondition) {
      for (let dependencyGraphCopyElement of this.dependencyGraphCopy[
        element
      ]) {
        if (
          dependencyGraphCopyElement.key == item.key &&
          dependencyGraphCopyElement.value
        ) {
          // removal of field in value dependency
          if (
            !_.isEqual(dependencyGraphCopyElement.value, item.value) &&
            this.formFields.filter((ele: any) => {
              return ele.key === element;
            }).length
          ) {
            // key already exists in formFields
            this._removeFormField(element, item);
          }
        }
      }
    } else {
      let present = false;
      let keyPresent = false;
      for (let dependencyGraphCopyElement of this.dependencyGraphCopy[
        element
      ]) {
        if (dependencyGraphCopyElement.key == item.key) {
          keyPresent = true;
          if (dependencyGraphCopyElement.value) {
            if (_.isEqual(dependencyGraphCopyElement.value, item.value)) {
              // removal of field in value dependency
              present = true;
            }
          }
        }
      }
      if (
        keyPresent &&
        !present &&
        this.formFields.filter((ele: any) => {
          return ele.key === element;
        }).length
      ) {
        this._removeFormField(element, item);
      }
    }
  }

  _addFormField(elementToAdd: any) {
    this.formFields.push(elementToAdd);
    this.formFields = this.formfieldService.sortFormFields(this.formFields);
    this.form = this.formfieldService.toFormGroup(this.formFields);
  }

  _removeFormField(elementToRemove: any, currentField: any) {
    this.formFields = this.formFields.filter((ele: any) => {
      return ele.key != elementToRemove;
    });
    this.form = this.formfieldService.toFormGroup(this.formFields);
    this.dependencyGraph[elementToRemove].push(
      this.dependencyGraphCopy[elementToRemove].filter((dep: any) => {
        return dep.key === currentField.key;
      })[0]
    );
  }

  formFieldChange(event: any) {
    let field = this.formFields.find((item: any) => item.key === event.key);
    if (field?.controlType === 'textbox') {
      this.formFields.find((item: any) => item.key === event.key)!.value =
        Object.values(event.value)[0];
    } else {
      this.formFields.find((item: any) => item.key === event.key)!.value =
        event.value;
    }
    // modifying the formfields graph - show hide new fields
    for (let element of Object.keys(this.dependencyGraph)) {
      this._modifyGraph(element, event);
    }
  }
}
