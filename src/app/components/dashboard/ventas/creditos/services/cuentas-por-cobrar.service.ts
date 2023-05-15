import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CuentaPorCobrar, CuentaPorCobrarDetalle } from '../interfaces/cuentas-por-cobrar';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CuentasPorCobrarService {

  private BASE_URL: string = environment.BASE_URL;
  constructor(private http:HttpClient, private formBuilder : FormBuilder) { }

  form = this.formBuilder.group({
    cuentaPorCobrarDetalle: this.formBuilder.array([])    
  })


  findNameAuto(nombre:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/cliente/${nombre}`)
  }

  getCuentasPorCobrarbyCliente(id:number, checked:boolean, fechas:Date[]){    
    return this.http.get<CuentaPorCobrar[]>(`${this.BASE_URL}/cuentas-por-cobrar/getCuentasPorCobrarbyCliente/${id}/${checked}?start=${fechas[0]}&end=${fechas[1]}`);  
  }

  getTodostCuentasPorCobrar(){
    return this.http.get<CuentaPorCobrar[]>(`${this.BASE_URL}/cuentas-por-cobrar/getTodostCuentasPorCobrar`);
  }

  pagosDetail(id:number){
    return this.http.get<CuentaPorCobrarDetalle[]>(`${this.BASE_URL}/cuentas-por-cobrar/pagosDetail/${id}`)
  }

  pagarCreditos(cuentasPorCobrar:CuentaPorCobrar[]){
    this.form.setControl('cuentaPorCobrarDetalle', this.setPagoCreditos(cuentasPorCobrar))
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-cobrar/pagarCreditos`, this.form.controls.cuentaPorCobrarDetalle.value);
  }

  pagarCredito(cuentasPorCobrar:CuentaPorCobrar[], monto:number){
    const cuentaPorCobrar = {cuentaPorCobrar: {id: cuentasPorCobrar[0].id}, monto, descripcion: 'PAGO PARCIAL'}    
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-cobrar/pagarCredito`, cuentaPorCobrar);
  }

  setPagoCreditos(cuentasPorCobrar:CuentaPorCobrar[]): FormArray {
    const formArray = new FormArray([])
    cuentasPorCobrar.forEach(e =>{      
      formArray.push(this.formBuilder.group({
        cuentaPorCobrar: {id:e.id},
        monto:Number(e.saldo),
        descripcion:'PAGO FACTURA',
        balance:Number(0),
        estado:true
      }))
    }) 
    return formArray;
  }

  
}
