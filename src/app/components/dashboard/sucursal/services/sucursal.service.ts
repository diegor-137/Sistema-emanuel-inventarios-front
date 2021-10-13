import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Sucursal } from '../interfaces/sucursal';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
              private formBuilder:FormBuilder,) {

               }

  getSucursales(){
    return this.http.get<Sucursal[]>(`${this.BASE_URL}/sucursal`)
  }
}
