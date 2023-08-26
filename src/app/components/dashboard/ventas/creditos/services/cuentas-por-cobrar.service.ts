import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CuentaPorCobrar, CuentaPorCobrarDetalle } from '../interfaces/cuentas-por-cobrar';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';

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
    //this.form.setControl('cuentaPorCobrarDetalle', this.setPagoCreditos(cuentasPorCobrar))
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-cobrar/pagarCreditos`, this.form.controls.cuentaPorCobrarDetalle.value);
  }

/*   pagarCredito(cuentasPorCobrar:CuentaPorCobrar[], monto:number){
    const cuentaPorCobrar = {cuentaPorCobrar: {id: cuentasPorCobrar[0].id}, monto, descripcion: 'PAGO PARCIAL'}    
    return this.http.post<any>(`${this.BASE_URL}/cuentas-por-cobrar/pagarCredito`, cuentaPorCobrar);
  } */

  pagarCredito(){ 
    console.log(this.form.controls.cuentaPorCobrarDetalle.value);
    
    return this.http.post<CuentaPorCobrarDetalle>(`${this.BASE_URL}/cuentas-por-cobrar/pagarCredito`, this.form.controls.cuentaPorCobrarDetalle.value);
  }

  llenarCobro(detalles:any){
    this.form.setControl('cuentaPorCobrarDetalle',this.setDetalleCobro(detalles))
  }

  setDetalleCobro(cuentaPorCobrarDetalle:CuentaPorCobrarDetalle[]): FormArray {
    const formArray = new FormArray([])
    cuentaPorCobrarDetalle.forEach(e =>{      
      formArray.push(this.formBuilder.group({
        descripcion: e.descripcion,
        monto: e.monto,
        balance:e.balance,
        cuentaPorCobrar:e.cuentaPorCobrar,
        tipoCobro:e.tipoCobro,
        documento:e.documento,
        cuentaBancaria:e.cuentaBancaria
      }))
    }) 
    return formArray;
  }

  getCuentasEncabezado(){   
    return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria/cuentas-encabezado`)
  }

/*   setPagoCreditos(cuentasPorCobrar:CuentaPorCobrar[]): FormArray {
    const formArray = new FormArray([])
    cuentasPorCobrar.forEach(e =>{      
      formArray.push(this.formBuilder.group({
        cuentaPorCobrar: {id:e.id},
        monto:Number(e.saldo),
        descripcion:'PAGO FACTURA',
        balance:Number(0),
        estado:true,
        //tipoCobro:e.tipoCobro
      }))
    }) 
    return formArray;
  } */

  
}
