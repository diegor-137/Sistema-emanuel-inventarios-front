import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { CuentaPorPagar, CuentaPorPagarDetalle } from '../interfaces/cuenta-por-pagar';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CuentaPorPagarService {

  private BASE_URL: string = environment.BASE_URL;  

  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  form = this.formBuilder.group({
    cuentaPorPagarDetalle: this.formBuilder.array([])    
  })

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

  getCuentasPorPagarByProveedor(id:number, checked:boolean, fechas:Date[]){  
    return this.http.get<CuentaPorPagar[]>(`${this.BASE_URL}/cuentas-por-pagar/getCuentasPorPagarByProveedor/${id}/${checked}?start=${fechas[0]}&end=${fechas[1]}`);    
  }
  
  getTodosCuentasPorPagar(){
    return this.http.get<CuentaPorPagar[]>(`${this.BASE_URL}/cuentas-por-pagar/getTodosCuentasPorPagar`);
  }

  pagosDetail(id:number){
    return this.http.get<CuentaPorPagarDetalle[]>(`${this.BASE_URL}/cuentas-por-pagar/pagosDetail/${id}`)
  }

  pagarCreditos(cuentasPorPagar:CuentaPorPagar[]){
    this.form.setControl('cuentaPorPagarDetalle', this.setPagoCreditos(cuentasPorPagar));
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-pagar/pagarCreditos`, this.form.controls.cuentaPorPagarDetalle.value);           
  }

  pagarCredito(cuentasPorPagar:CuentaPorPagar[], monto:number){
    const cuentaPorPagar = {cuentaPorPagar: {id: cuentasPorPagar[0].id}, monto, descripcion: 'PAGO PARCIAL'}
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-pagar/pagarCredito`, cuentaPorPagar);    
  }

  setPagoCreditos(cuentasPorPagar:CuentaPorPagar[]): FormArray {
    const formArray = new FormArray([])
    cuentasPorPagar.forEach(e =>{      
      formArray.push(this.formBuilder.group({
        cuentaPorPagar: {id:e.id},
        monto:Number(e.saldo),
        descripcion:'PAGO FACTURA',
        balance:Number(0),
        estado:true
      }))
    }) 
    return formArray;
  }

  
}
