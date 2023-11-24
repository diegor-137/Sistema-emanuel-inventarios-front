import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { TipoTransaccion } from 'src/app/components/dashboard/compras/creditos/interfaces/cuenta-por-pagar';
import { Cobro, Form, Venta } from '../../interfaces/caja-interface';
import { CuentaBancaria } from '../../../fondos/interfaces/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class CajaCobroService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient, private formBuilder : FormBuilder) { }

  public form : FormGroup =  this.formBuilder.group({
    id:[],
    comentario:[],
    venta:[],
    token: [],
    detalleCobro: this.formBuilder.array([])
  })

  resetFormBuilder(){
    (<FormArray>this.form.get("detalleCobro")).clear()
    this.form.reset()
  }

  initForm(tipoTransaccion:TipoTransaccion[], venta:Venta){
    this.resetFormBuilder()
    this.form.patchValue({venta:{id:venta.id}});
    tipoTransaccion.forEach(a=>{
      const group = this.formBuilder.group({
          monto:a.id==1?[venta.total, [Validators.required]]:[null],
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
    return this.form.get('detalleCobro') as FormArray;
  }


  getTipoTransaccion():Observable<TipoTransaccion[]>{
    return this.http.get<TipoTransaccion[]>(`${this.BASE_URL}/tipo-transaccion`)
  }

  getCuentasEncabezado(){   
    return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria/cuentas-encabezado`)
  }

  cobrarVenta(resp:any){
    this.form.controls['token'].setValue(resp.accessToken);
    const data = this.form.value as Form;
    data.detalleCobro = data.detalleCobro.filter((a)=>a.monto !==0 && a.monto !==null);
    return this.http.post<Cobro>(`${this.BASE_URL}/cobro`, data);
  }
}