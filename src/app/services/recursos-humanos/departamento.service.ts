import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../../interfaces/recursos-humanos/departamento';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  BASE_URL: string = 'http://[::1]:3000'
  constructor(private http:HttpClient) {

  }
  getDepartamentos():Observable <Departamento[]>{
    return this.http.get<Departamento[]>(`${this.BASE_URL}/departamento` )
  }

  getDepartamento(id:number):Observable <Departamento>{
    return this.http.get<Departamento>(`${this.BASE_URL}/departamento/${id}`)
  }

  createDepartamento(dep:any):Observable <Departamento>{
    return this.http.post<Departamento>(`${this.BASE_URL}/departamento`,dep)
  }

  deleteDepartamento(id:number):Observable <Departamento>{
    return this.http.delete<Departamento>(`${this.BASE_URL}/departamento/${id}`)
  }

  updateDepartamento(id:any, dep:Departamento):Observable <Departamento>{
    return this.http.put<Departamento>(`${this.BASE_URL}/departamento/${id}`,dep)
  }
}
