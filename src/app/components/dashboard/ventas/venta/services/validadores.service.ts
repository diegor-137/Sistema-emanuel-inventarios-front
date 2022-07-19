import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Producto } from '../../../almacen/producto/interaces/producto';

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient) {
   }

   getInventario(id:number):Observable<Producto[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/inventario/${id}`,{ headers})
  }

  verificarInventario(id:number){
    return this.getInventario(id)
  }

}
