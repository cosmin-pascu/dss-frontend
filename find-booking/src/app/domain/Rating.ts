export class Rating {
  value: number;
  max: number;
  disabled?: boolean;
  dense?: boolean;
  readonly?: boolean;

  constructor(value: number, max: number, disabled: boolean, dense: boolean, readonly: boolean) {
    this.value = value;
    this.max = max;
    this.disabled = disabled;
    this.dense = dense;
    this.readonly = readonly;
  }
}
