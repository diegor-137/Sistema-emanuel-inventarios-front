import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CobroDetallado, Corte, Gasto, Ingreso, Egreso } from '../interfaces/caja-interface';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CajaCorteService {
  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
  }

  formCorte = this.formBuilder.group({
      monto:[0, [Validators.min(1), Validators.required]], 
      observacion: [],    
      token: []    
  })

  form: FormGroup = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })

  create(resp:any){
    this.formCorte.controls['token'].setValue(resp.accessToken);
    const monto = this.formCorte.controls['monto'].value
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })   
    return this.http.post<any>(`${this.BASE_URL}/corte-caja/${monto}`, this.formCorte.value, { headers })
  }

  ultimoMovimiento(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/ultimoMovimiento/caja`)
  }

  cortes(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Corte[]>(`${this.BASE_URL}/corte-caja?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }

  findOne(id:number){
    return this.http.get<Corte>(`${this.BASE_URL}/corte-caja/${id}`);
  }

  saldo(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/saldo/caja`)
              .pipe(map((resp)=>{
                  if (resp==null) {
                     resp = 0;
                     return resp 
                  }
                  return resp
                })
              )
  }

  totalCobro(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/totalCobro/caja`)
              .pipe(map((resp)=>{                              
                  if (resp==null) {
                     resp = 0;
                     return resp 
                  }
                  return resp
                })
              );
  }

  totalGasto(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/totalGasto/caja`)
              .pipe(map((resp)=>{
                  if (resp==null) {
                     resp = 0;                     
                     return resp 
                  }
                  return resp
                })
              );
  }

  totalIngreso(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/ingreso/caja`)
              .pipe(map((resp)=>{
                  if (resp==null) {
                     resp = 0;                     
                     return resp 
                  }
                  return resp
                })
              );
  }

  totalEgreso(){
    return this.http.get<number>(`${this.BASE_URL}/corte-caja/egreso/caja`)
              .pipe(map((resp)=>{
                  if (resp==null) {
                     resp = 0;                     
                     return resp 
                  }
                  return resp
                })
              );
  }
  

  /* DETALLES DE CORTE */

  ventasCobrosCorte(idCorte:number, idCaja:number){
    return this.http.get<CobroDetallado[]>(`${this.BASE_URL}/corte-caja/detalle/ventas-cobros/${idCorte}/${idCaja}`)
  }

  gastosCorte(idCorte:number, idCaja:number){
    return this.http.get<Gasto[]>(`${this.BASE_URL}/corte-caja/detalle/gastos/${idCorte}/${idCaja}`)
  }

  ingresosCorte(idCorte:number, idCaja:number){
    return this.http.get<Ingreso[]>(`${this.BASE_URL}/corte-caja/detalle/ingresos/${idCorte}/${idCaja}`)
  }

  egresosCorte(idCorte:number, idCaja:number){
    return this.http.get<Egreso[]>(`${this.BASE_URL}/corte-caja/detalle/egresos/${idCorte}/${idCaja}`)
  }



}

