import { Component, OnInit } from '@angular/core';
import { ServiceCuentaCobrarService } from '../services/service-cuenta-cobrar.service';
import { FormArray, Validators, FormControl, FormGroup, AbstractControl } from '@angular/forms';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';

@Component({
  selector: 'app-cuentas-por-cobrar-form',
  templateUrl: './cuentas-por-cobrar-form.component.html',
  styleUrls: ['./cuentas-por-cobrar-form.component.css']
})
export class CuentasPorCobrarFormComponent implements OnInit {

  public select:number=0;
  load=false;
  cuenta!:CuentaBancaria[]

  constructor(public cuentaCobrarService:ServiceCuentaCobrarService) {
    this.getTipoCobro();
    this.getCuentasEncabezado()
   }

  ngOnInit(): void {
    this.cuentaCobrarService.form.get('nombre')?.valueChanges.subscribe(a=>{
      console.log(typeof a);
    })
  }

  selector(index:number){
    const array = this.cuentaCobrarService.getArrayDetalle;      
    this.select = index
    array.controls[index].get('monto')?.valueChanges.subscribe(value=>{
      console.log(typeof value);
    })
  }

  getTipoCobro(){
    this.cuentaCobrarService.getTipoCobro().subscribe(data=>{
      this.cuentaCobrarService.initForm(data);
      this.load = true
      this.setMontoValidator()
    })
  }

  setMontoValidator(){
    


    /* formControl!.get('monto')?.valueChanges.subscribe(value=>{
      console.log(value);
    }) */
  }

/*   tipoPago( formArray: FormArray, index: number) {
    return formArray.controls[index].touched;
  }
 */
  getCuentasEncabezado(){
    this.cuentaCobrarService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    }) 
  }

/*     onChangeTipoCobro(){
      const formArray = this.cuentaCobrarService.getArrayDetalle;
      formArray.controls[this.select].get('monto')?.valueChanges
      .subscribe(data=>{     
        console.log(data);
        
        if (data>0) {
          console.log('si es mayor a cero!!');
          
        }else{

        }
        
        formArray.controls[this.select].get('cuentaBancaria')?.addValidators([Validators.required]);
        formArray.controls[this.select].get('documento')?.setValidators([Validators.required]);
        formArray.controls[this.select].get('cuentaBancaria')?.updateValueAndValidity();
        formArray.controls[this.select].get('documento')?.updateValueAndValidity();
        if(data>0 && data!=null && data!=0){
        }else{
          formArray.controls[this.select].get('cuentaBancaria')?.clearValidators();
          formArray.controls[this.select].get('documento')?.clearValidators();
        }
      })
    } */

}


