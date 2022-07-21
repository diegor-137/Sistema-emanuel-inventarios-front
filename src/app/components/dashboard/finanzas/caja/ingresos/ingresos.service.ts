import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingreso } from '../interfaces/caja-interface';

@Injectable({
  providedIn: 'root'
})
export class IngresosService {

  BASE_URL:string = 'http://[::1]:3000'

  form: FormGroup = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })

  constructor(private http:HttpClient, private formBuilder:FormBuilder) {}

  getIngresos(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Ingreso[]>(`${this.BASE_URL}/ingresos?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }
}
