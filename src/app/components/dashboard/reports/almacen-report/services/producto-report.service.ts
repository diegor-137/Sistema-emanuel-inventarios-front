import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListGeneralProd } from '../intefaces/reportAlmacen-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductoReportService {

  private BASE_URL:string = environment.BASE_URL

  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }

  ListadoProductos(){
      return this.http.get<ListGeneralProd>(`${this.BASE_URL}/producto-report/listGeneral`)
  }

  ListadoProductosEliminados(){
      return this.http.get<ListGeneralProd>(`${this.BASE_URL}/producto-report/listGeneralEliminados`)
  }

  ListadoPrecios(){
      return this.http.get<ListGeneralProd>(`${this.BASE_URL}/producto-report/listPrecios`)
  }
}
