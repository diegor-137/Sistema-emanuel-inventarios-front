import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ResultGeneric } from '../../interfaces/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class VentaReportService {

  private BASE_URL:string = environment.BASE_URL

    formVenta: FormGroup = this.formBuilder.group({
    status:[true],  //true es compra activa, false es compra anulada
    dates:[null,[Validators.required]]
  })

  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }

  ventasClientes(){
      const dates:Array<Date> = this.formVenta.value.dates;
      dates[1]?null:dates[1]=dates[0];
    return this.http.post<ResultGeneric>(`${this.BASE_URL}/ventas-report?start=${dates[0]}&end=${dates[1]}`,this.formVenta.value)
  }
}
