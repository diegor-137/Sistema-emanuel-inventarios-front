import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { CuentaPorPagar, Form, TipoTransaccion } from '../interfaces/cuenta-por-pagar';
import { Efectivo } from '../../../finanzas/efectivo/interface/efectivo';

@Injectable({
  providedIn: 'root'
})
export class CuentaPagarService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient, private formBuilder : FormBuilder) { }

  public form : FormGroup =  this.formBuilder.group({
    id:[],
    comentario:[],
    efectivo:[null, Validators.required],
    detalleCuentaPorPagar: this.formBuilder.array([])
  })

  resetFormBuilder(){
    (<FormArray>this.form.get("detalleCuentaPorPagar")).clear()
    this.form.reset()
  }

  initForm(tipoTransaccion:TipoTransaccion[], credito:CuentaPorPagar){
    this.form.patchValue({id:credito.id});
    tipoTransaccion.forEach(a=>{
      const group = this.formBuilder.group({
          monto:a.id==1?[credito.saldo, [Validators.required]]:[null],
          descripcion:[null],
          tipoTransaccion:this.formBuilder.group({
            id:[a.id],
            nombre:[a.nombre]
          }),
          documento:[{value:null, disabled:true}],
          cuentaBancaria:[{value:null, disabled:true}]
        })
      this.getArrayDetalle.push(group);
    })
  }

  get getArrayDetalle(){
    return this.form.get('detalleCuentaPorPagar') as FormArray;
  }


  getTipoTransaccion():Observable<TipoTransaccion[]>{
    return this.http.get<TipoTransaccion[]>(`${this.BASE_URL}/tipo-transaccion`)
  }

  getCuentasEncabezado(){   
    return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria/cuentas-encabezado`)
  }

  getCuentas(){
    return this.http.get<Efectivo[]>(`${this.BASE_URL}/efectivo`)
  }

  pagarCredito(){
    const data = this.form.value as Form;
    data.detalleCuentaPorPagar = data.detalleCuentaPorPagar.filter(a=>a.monto !==0 && a.monto !==null);
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-pagar/pagarCredito`, data);
  }
}