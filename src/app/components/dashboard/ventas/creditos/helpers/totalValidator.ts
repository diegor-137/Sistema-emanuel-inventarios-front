import { AbstractControl, ValidationErrors } from '@angular/forms';

export function ValidateTotal(total: number): ValidatorFn {
 
    return (): ValidationErrors | null => {
      console.log(total);
      if (false) {
        return { invalidUrl: true };
      } 
      return null;
    }
   
  }


interface ValidatorFn {
    (control: AbstractControl): ValidationErrors | null
  }