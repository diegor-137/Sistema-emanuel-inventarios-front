import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TipoCobro } from '../interfaces/cuentas-por-cobrar';
import { Observable } from 'rxjs';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class ServiceCuentaCobrarService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient, private formBuilder : FormBuilder) { }

  public form : FormGroup =  this.formBuilder.group({
    nombre:[],
    detalleCuentaPorCobrar: this.formBuilder.array([])
  })

  resetFormBuilder(){
    this.form.reset(),
    (<FormArray>this.form.get("detalleCuentaPorCobrar")).clear()
    this.form.updateValueAndValidity()
  }

  initForm(tipoCobro:TipoCobro[]){
    this. resetFormBuilder();
    tipoCobro.forEach(a=>{
      this.getArrayDetalle.push(
        this.formBuilder.group({
          monto:[''],
          cuentaPorCobrar:{},
          descripcion:[null],
          tipoCobro:this.formBuilder.group({
            id:[a.id],
            nombre:[a.nombre]
          }),
          documento:[null],
          cuentaBancaria:[null]
        })
      )
    })
  }


  get getArrayDetalle(){
    return this.form.get('detalleCuentaPorCobrar') as FormArray;
  }


  getTipoCobro():Observable<TipoCobro[]>{
    return this.http.get<TipoCobro[]>(`${this.BASE_URL}/tipo-cobro`)
  }

  getCuentasEncabezado(){   
    return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria/cuentas-encabezado`)
  }
}
