import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CuentaPorPagar, CuentaPorPagarDetalle } from '../interfaces/cuenta-por-pagar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRange } from 'src/app/helpers/customs-validators';

@Injectable({
  providedIn: 'root'
})
export class CuentaPorPagarService {

  private BASE_URL: string = environment.BASE_URL;  

  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  form: FormGroup = this.formBuilder.group({
    id:[],
    checked:[],
    dates:[null, [dateRange()]],
  })

  formPago : FormGroup = this.formBuilder.group({
    id:[],
    comentario:[],
    pago:[]
  })

  resetFormBuilder(){
    this.form.reset()
    const date = new Date();
    date.setHours(0,0,0,0)
    this.form.patchValue({dates:[date, date], checked:false})
  }

  /* form = this.formBuilder.group({
    total: [0.00], 
    monto:[0.00, [Validators.required]],
    cuentaPorPagar: this.formBuilder.array([])    
  }) */

  /* getCreditoCompras():Observable<CreditoCompras[]>{
    return this.http.get<CreditoCompras[]>(`${this.BASE_URL}/proveedores-credito/creditos-compras`)
  } */

  findNameAuto(nombre:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/proveedor/${nombre}`)
  }

  getCuentasPorPagarByProveedor(id?:number){
    this.form.patchValue({id});
    return this.http.post<CuentaPorPagar[]>(`${this.BASE_URL}/cuentas-por-pagar/getCuentasPorPagarParams`, this.form.value);  
  }

  pagosDetail(id:number){
    return this.http.get<CuentaPorPagarDetalle[]>(`${this.BASE_URL}/cuentas-por-pagar/pagosDetail/${id}`)
  }

  /* pagarCredito(cuentasPorPagar:CuentaPorPagar[], monto:number){
    const cuentaPorPagar = {cuentaPorPagar: {id: cuentasPorPagar[0].id}, monto, descripcion: 'PAGO PARCIAL'}
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-pagar/pagarCredito`, cuentaPorPagar);    
  } */
  pagarCredito(){
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-pagar/pagarCredito`, this.formPago.value);
  }
  
}
