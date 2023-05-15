import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tipo_Precio } from '../../precio/interfaces/tipo-precio';

@Injectable({
  providedIn: 'root'
})
export class TipoPrecio {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  constructor(private http:HttpClient) { }


  getTipoPrecios():Observable<Tipo_Precio[]>{
    return this.http.get<Tipo_Precio[]>(`${this.BASE_URL}/tipo-precio/findAllTrue`)
  }
}
