import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ResultGeneric } from '../../interfaces/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class CompraReportService {

  form:FormGroup = this.formBuilder.group({
    proveedor:[null],
    dates:[null,[Validators.required]]
  })

  private BASE_URL:string = environment.BASE_URL
  
  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }
              
              
    ComprasPorSucursal(){
      const dates:Array<Date> = this.form.value.dates;
      dates[1]?null:dates[1]=dates[0];
      return this.http.get<ResultGeneric>(`${this.BASE_URL}/compra-report?start=${dates[0]}&end=${dates[1]}`)
    }

    ComprasPorSucursalAnuladas(){
      const dates:Array<Date> = this.form.value.dates;
      dates[1]?null:dates[1]=dates[0];
      return this.http.get<ResultGeneric>(`${this.BASE_URL}/compra-report/anuladas?start=${dates[0]}&end=${dates[1]}`)
    }
}