import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGlobalService {
  BASE_URL:string = 'http://[::1]:3000'
  constructor(private http:HttpClient) { }


  getConfig():Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/configuraciones-global`)
  }

  getPermisos():Observable<any[]>{
    return this.http.get<any[]>(`${this.BASE_URL}/configuraciones-global/permisions`)
  }

  savePermisos(object: any):Observable<any[]>{
    return this.http.post<any[]>(`${this.BASE_URL}/configuraciones-global`, object);
  }
}
