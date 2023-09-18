import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CuentaPorCobrar, CuentaPorCobrarDetalle } from '../interfaces/cuentas-por-cobrar';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateRange } from 'src/app/helpers/customs-validators';

@Injectable({
  providedIn: 'root'
})
export class CuentasPorCobrarService {

  private BASE_URL: string = environment.BASE_URL;
  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  form: FormGroup = this.formBuilder.group({
    id:[],
    checked:[],
    dates:[null, [dateRange()]],
  })

  resetFormBuilder(){
    this.form.reset()
    const date = new Date();
    date.setHours(0,0,0,0)
    this.form.patchValue({dates:[date, date], checked:false})
  }


  findNameAuto(nombre:string):Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/cliente/${nombre}`)
  }

  getCuentasPorCobrarbyCliente(id?:number){
    this.form.patchValue({id});
    return this.http.post<CuentaPorCobrar[]>(`${this.BASE_URL}/cuentas-por-cobrar/getCuentasPorCobrarParams`, this.form.value);  
  }

  getTodostCuentasPorCobrar(){
    return this.http.get<CuentaPorCobrar[]>(`${this.BASE_URL}/cuentas-por-cobrar/getTodostCuentasPorCobrar`);
  }

  pagosDetail(id:number){
    return this.http.get<CuentaPorCobrarDetalle[]>(`${this.BASE_URL}/cuentas-por-cobrar/pagosDetail/${id}`)
  }
}