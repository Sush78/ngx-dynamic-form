import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormField } from '../../models/form-field-model';
import { FormFieldEnum } from '../../utils/form-field-enum';

@Component({
  selector: 'app-dynamic-form-input',
  templateUrl: './dynamic-form-input.component.html',
  styleUrls: ['./dynamic-form-input.component.css'],
})
export class DynamicFormInputComponent implements OnInit {
  formFieldEnun = FormFieldEnum;

  @Input() input!: FormField<string>;
  @Input() form!: FormGroup;

  @Output() formFieldChange = new EventEmitter();

  dropDownValue: any = null;
  textAreaValue: any = null;
  datePickerValue: any = null;
  textBoxValue: any = null;
  checkBoxValue: boolean = false;
  radioValue: any = false;
  fieldInvalid: boolean = false;
  validation: any;
  isRequired: any = true;
  visible: boolean = false;
  ngOnInit(): void {
    this.form.controls[this.input.key].setValue(this.input.value);
  }
  ngOnChanges() {
    this.form.controls[this.input.key].setValue(this.input.value);
  }
  // on change event capture - for all control types for updating the form value.
  // if you need to add new controls write similar function for respective controls
  getTextAreaValue(event: any) {
    this.textAreaValue = event.inputName;
    this._setFormValue(this.textAreaValue);
  }

  getDropDownValue(event: any) {
    this.dropDownValue = event; 
    this._setFormValue(this.dropDownValue);
  }

  getDatePickerValue(event: any) {
    this.datePickerValue = event;
    this._setFormValue(this.datePickerValue);
  }

  getRadioValue(event:any){
    this.radioValue = event; 
    this._setFormValue(this.radioValue);
  }

  getTextBoxValue(event: any) {
    this.textBoxValue = event;
    this._setFormValue(this.textBoxValue, this.input.type == 'file');
    this.isRequired = Object.values(this.textBoxValue);
    this.isRequired = this.isRequired[0] === '' ? false : true;
  }

  getCheckBoxValue(event: any) {
    this.checkBoxValue = event;
    this._setFormValue(this.checkBoxValue);
  }

  _setFormValue(value: any, setVal: boolean = true) {
    if (setVal) this.form.controls[this.input.key].setValue(value);
    const emitObj = { key: this.input.key, value: value };
    this.formFieldChange.emit(emitObj);
    this.fieldInvalid = !this.form.controls[this.input.key].valid;
    this.validation = this.form.controls[this.input.key].errors;
  }

  get isValid() {
    return this.form.controls[this.input.key].valid;
  }
}
