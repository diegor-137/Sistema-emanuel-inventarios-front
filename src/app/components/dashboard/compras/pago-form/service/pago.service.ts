import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Efectivo } from '../../../finanzas/efectivo/interface/efectivo';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { TipoTransaccion } from '../../creditos/interfaces/cuenta-por-pagar';
import { Pago } from '../../creditos/interfaces/pago.interface';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient, private formBuilder : FormBuilder) { }

  public form : FormGroup =  this.formBuilder.group({
    comentario:[],
    efectivo:[null, Validators.required],
    detallePago: this.formBuilder.array([])
  })

  resetFormBuilder(){
    (<FormArray>this.form.get("detallePago")).clear()
    this.form.reset()
  }

  initForm(tipoTransaccion:TipoTransaccion[], total:number){
    this.resetFormBuilder();
    tipoTransaccion.forEach(a=>{
      const group = this.formBuilder.group({
          monto:a.id==1?[total, [Validators.required]]:[null],
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
    return this.form.get('detallePago') as FormArray;
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

  cleanData(){
    const data = this.form.value as Pago;
    data.detallePago = data.detallePago.filter(a=>a.monto !==0 && a.monto !==null);
    return data;
  }
}
