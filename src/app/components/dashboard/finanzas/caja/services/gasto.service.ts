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
      monto: [null, [Validators.required]],
      fotoSend: [null, [Validators.required]],
      token: [''],
  })

  form = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[0, [Validators.required]],
  })

  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  crearGasto(gasto:Gasto){  
    const fd = new FormData();
    fd.append("documento", gasto.documento)
    fd.append("descripcion", gasto.descripcion)
    fd.append("monto", String(gasto.monto))
    fd.append("fotoSend", gasto.fotoSend)
    fd.append("token", gasto.token!)
    return this.http.post<any>(`${this.BASE_URL}/gastos`, fd);
  }

  allGastos(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Gasto[]>(`${this.BASE_URL}/gastos?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }

  delete(id:number){
    return this.http.delete(`${this.BASE_URL}/gastos/delete/${id}`)
  }

  findAllDeletedGastos(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Gasto[]>(`${this.BASE_URL}/gastos/deleted/all?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }

  
}
