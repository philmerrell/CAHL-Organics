import { FormControl } from '@angular/forms';

export function minPortionValidator(control: FormControl): { [s: string]: boolean } {
  // console.log(control);
  let portion = control.value;
  if (portion >= 0.25) {
    return { minPortionAmount: true }
  }
}

export function maxPortionValidator(control: FormControl): { [s: string]: boolean } {
  // console.log(control);
  let portion = control.value;
  if (portion <= 24) {
    return { maxPortionAmount: true }
  } 
}
