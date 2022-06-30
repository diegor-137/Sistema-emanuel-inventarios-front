import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Gasto } from '../interfaces/caja-interface';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  BASE_URL:string = 'http://[::1]:3000'
  formGasto = this.formBuilder.group({
      documento: ['', [Validators.required]],
      descripcion:['', [Validators.required]],
      monto: ['', [Validators.required]],
      token: [],
  })

  form = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })

  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  crearGasto(resp:any){  
    this.formGasto.controls['token'].setValue(resp.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(`${this.BASE_URL}/gastos`, this.formGasto.value, { headers })
  }

  allGastos(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Gasto[]>(`${this.BASE_URL}/gastos?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }

  
}
