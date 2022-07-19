import { HttpClient } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Movimiento } from '../interfaces/caja-interface';

@Injectable({
  providedIn: 'root'
})
export class MovimientoService {
  BASE_URL:string = 'http://[::1]:3000'

  form: FormGroup = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })

  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
  }

  getMovimientos(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Movimiento[]>(`${this.BASE_URL}/movimiento-caja/all?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }


}