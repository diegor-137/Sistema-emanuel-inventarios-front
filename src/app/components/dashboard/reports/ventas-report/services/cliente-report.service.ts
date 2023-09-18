import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResultGeneric } from '../../interfaces/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ClienteReportService {

  private BASE_URL:string = environment.BASE_URL

  constructor(private http:HttpClient) { }

  listadoClientes(){
    return this.http.get<ResultGeneric>(`${this.BASE_URL}/clientes-report/listadoGeneral`)
  }

  listadoCreditos(){
    return this.http.get<ResultGeneric>(`${this.BASE_URL}/clientes-report/creditosClientes`)
  }
}
