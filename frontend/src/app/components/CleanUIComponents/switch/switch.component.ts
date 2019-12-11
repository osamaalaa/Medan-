import { Component, Input, forwardRef, TemplateRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
const DEFAULT_MIN = 0;
const DEFAULT_MAX = 1;
const NG_VALUE_ACCESSOR_PROVIDER = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SwitchComponent),
  multi: true
}
@Component({
  selector: 'cui-switch',
  template: `
    <nz-switch
      [ngModel]="switchSatus" 
      [nzDisabled]="nzDisabled"
      (ngModelChange)="onChange($event)">
    </nz-switch>
  `,
  providers:[NG_VALUE_ACCESSOR_PROVIDER]
})
export class SwitchComponent implements ControlValueAccessor {

  @Input()
  _switchSatus = null; 

  @Input() min = DEFAULT_MIN;

  @Input() max = DEFAULT_MAX;

  @Input() nzCheckedChildren:TemplateRef<any>
  @Input() nzUnCheckedChildren:TemplateRef<any>



  get switchSatus() {
    return this._switchSatus;
  }

  set switchSatus(val) {
    this._switchSatus = val;
    this.propagateChange(this._switchSatus == (true || this.max) ? this.max : this.min);
  }


  @Input() nzPlaceHolder: string;
  @Input() nzDisabled: boolean;




  writeValue(value: any) {
    setTimeout(() => {
      if (value) {
        this.switchSatus = value == (true || this.max ) ? true : false;
      }
    })
  }


  propagateChange = (_: any) => { };

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  onChange(e) {
    this.switchSatus = e;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled)
    this.nzDisabled = isDisabled;
  }

  constructor() { }



}
