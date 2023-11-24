import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { TipoGasto } from '../interface/tipo-gasto';

@Injectable({
  providedIn: 'root'
})
export class TipoGastoService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient) { }


  crearTipoGasto(form:FormGroup){
    return this.http.post<TipoGasto>(`${this.BASE_URL}/tipo-gasto`,form.value)
  }

  getAllTipoGastos(){
    return this.http.get<TipoGasto[]>(`${this.BASE_URL}/tipo-gasto`)
  }
}
