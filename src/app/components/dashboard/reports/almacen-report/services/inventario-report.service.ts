import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ListGeneralProd } from '../intefaces/reportAlmacen-interfaces';
import { Observable } from 'rxjs';
import { Producto } from '../../../almacen/producto/intefaces/producto';
import { ResultGeneric } from '../../interfaces/report-interfaces';

@Injectable({
  providedIn: 'root'
})
export class InventarioReportService {

  private BASE_URL:string = environment.BASE_URL

    form: FormGroup = this.formBuilder.group({
    producto:[null],
    dates:[null, [Validators.required]]
  })

  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }

    getProductos(nombre:string):Observable<Producto[]>{
    
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/nombre-producto/${nombre}`)
  }

    ListadoInventarioPorSuc(){
      return this.http.get<ListGeneralProd>(`${this.BASE_URL}/inventario-report/inventarioPorSucursal`)
    }

    ListadoInventarioPorRegion(){
      return this.http.get<ListGeneralProd>(`${this.BASE_URL}/inventario-report/inventarioPorRegion`)
    }

    kardexPorRegion(){
          console.log(this.form.value)
          const dates:Array<Date> = this.form.value.dates;
          dates[1]?null:dates[1]=dates[0];
      return this.http.post<ResultGeneric>(`${this.BASE_URL}/inventario-report/kardexPorRegion?start=${dates[0]}&end=${dates[1]}`,this.form.value)
    }

    kardexPorSucursal(){
          console.log(this.form.value)
          const dates:Array<Date> = this.form.value.dates;
          dates[1]?null:dates[1]=dates[0];
      return this.http.post<ResultGeneric>(`${this.BASE_URL}/inventario-report/kardexPorSucursal?start=${dates[0]}&end=${dates[1]}`,this.form.value)
    }
}
