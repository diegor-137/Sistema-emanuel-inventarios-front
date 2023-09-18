import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ResultGeneric } from '../../interfaces/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProveedorReportService {

  private BASE_URL:string = environment.BASE_URL

    formCreditosAct: FormGroup = this.formBuilder.group({
    proveedor:[null],
    sucursal:[false, [Validators.required]],
    region:[false, [Validators.required]]
  })
  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }

  listadoProveedores(){
    return this.http.get<ResultGeneric>(`${this.BASE_URL}/proveedores-report/listGeneral`)
  }

  
  creditosActivos(){
    console.log()
    return this.http.post<ResultGeneric>(`${this.BASE_URL}/proveedores-report/creditosActivos`,this.formCreditosAct.value)
  }
}
