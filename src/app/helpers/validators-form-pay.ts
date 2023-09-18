import { Injectable } from "@angular/core";
import { AbstractControl, FormArray, Validators } from "@angular/forms";

@Injectable({
    providedIn: 'root'
  })
export class ValidatorsFormsCustom {

    constructor(){}

    totalvalidation(total:number){
        return (control:AbstractControl)=>{
          const result=(control.value as any[]).reduce((a:number,b:any)=>a+(+b.monto),0);
          return result==total?null:{error:"Not equal"}
        }
    }
    
    patchPrimeNgInputValue(event: { orignalEvent: InputEvent; value: number }, formInputName: string, item:AbstractControl) {
        item.patchValue({ [formInputName]: event.value });
    }

    isValidFieldInArray( formArray: FormArray, index: number, formInputName: string ) {
        return formArray.controls[index].get(formInputName)?.errors;
    } 
      
    setValueEfectivo(form:AbstractControl[], payType:string, amount:string, due:number){ 
        const monto = form.filter(a=> a.get(payType)?.value !== 1).reduce((a:number,b:AbstractControl)=>a+(+b.get(amount)?.value),0);
        const result = due - monto
        const control = form.find((a)=>a.get(payType)?.value == 1);              
        result<0 || result>due?null:control!.get(amount)?.patchValue(result);
    }
    
    enableValidatorsForm(control:string[], form:AbstractControl[], i:number){
        control.forEach(a=>{
          form[i].get(a)?.setValidators([Validators.required]);
          form[i].get(a)?.enable();
          form[i].get(a)?.updateValueAndValidity();
        })
    }

    disableValidatorsForm(control:string[], form:AbstractControl[], i:number){
      control.forEach(a=>{
        form[i].get(a)?.clearValidators();
        form[i].get(a)?.updateValueAndValidity();
        form[i].get(a)?.setValue(null);
        form[i].get(a)?.disable();
      })
    }
}

