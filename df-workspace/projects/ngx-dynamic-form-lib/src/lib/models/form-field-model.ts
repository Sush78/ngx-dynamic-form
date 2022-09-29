export class FormField<T> {
    value: any;
    key: string;
    id: string;
    label: string;
    placeholder: string;
    infoIcon: boolean;
    tooltip: string;
    required: boolean;
    errorMsg: string;
    customValidationMsg: string;
    disabled: boolean;
    order: number;
    type: string;
    validator: {
      name: string;
      value: any;
      errorMsg: string;
    }[];
    controlType: string;
    options: {value: string, viewValue: string}[];
    radioOptions: { key: string; value: string; checked: string }[];
    minDate: Date;
    selected?: any;
    customValidation: any[];
    dependents: any[];
    orCondition: boolean;
    constructor(
      options: {
        value?: any;
        key?: string;
        id?: string;
        label?: string;
        placeholder?: string;
        infoIcon?: boolean;
        tooltip?: string;
        required?: boolean;
        errorMsg?: string;
        customValidationMsg?: string;
        disabled?: boolean;
        type?: string;
        validator?: {
          name: string;
          value: any;
          errorMsg: string;
        }[];
        order?: number;
        controlType?: string;
        options?: {value: string, viewValue: string}[];
        radioOptions?: { key: string; value: string; checked: string }[];
        minDate?: Date;
        dependents?: any[];
        selected?: any;
        orCondition?: boolean;
        customValidation?: any[];
      } = {}
    ) {
      this.value = options.value || '';
      this.selected = options.selected || null;
      this.key = options.key || '';
      this.id = options.id || 'input-field';
      this.label = options.label || '';
      this.placeholder = options.placeholder || 'Select';
      this.infoIcon = !!options.infoIcon;
      this.tooltip = options.tooltip || '';
      this.required = !!options.required;
      this.orCondition = options.orCondition || false;
      this.errorMsg = options.errorMsg || 'This field is required!';
      this.customValidationMsg = options.customValidationMsg || '';
      this.disabled = !!options.disabled;
      this.type = options.type || "text"
      this.validator = options.validator || [
        { name: '', value: null, errorMsg: 'invalid' },
      ];
      this.order = options.order === undefined ? 1 : options.order;
      this.controlType = options.controlType || '';
      this.options = options.options || [];
      this.radioOptions = options.radioOptions || [];
      this.minDate = options.minDate || new Date();
      this.dependents = options.dependents || [];
      this.customValidation = options.customValidation || [];
    }
  }
  