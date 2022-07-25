import { HttpClient } from '@angular/common/http';
import {  Injectable} from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Caja, Empleado } from '../interfaces/caja-interface';

@Injectable({
  providedIn: 'root'
})
export class CajaConfigService {
  BASE_URL:string = 'http://[::1]:3000'

  form: FormGroup = this.formBuilder.group({
      lugar:['', [Validators.required]],
      monto:[0, [Validators.required]],
      empleado: this.formBuilder.group({
        id:[null,[Validators.required]]
      })
  })
  
  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
  }

  caja(){
    return this.http.post(`${this.BASE_URL}/caja`, this.form.value);
  }

  cajas(){
    return this.http.get<Caja[]>(`${this.BASE_URL}/caja`)
  }

  cajeros(){
    return this.http.get<Empleado[]>(`${this.BASE_URL}/caja/cajeros`)
  }

  disableCaja(id:number){
    return this.http.delete(`${this.BASE_URL}/caja/${id}`)
  }

  cajeroCaja(id:number){
    return this.http.get<any>(`${this.BASE_URL}/caja/${id}`);

  }



}

