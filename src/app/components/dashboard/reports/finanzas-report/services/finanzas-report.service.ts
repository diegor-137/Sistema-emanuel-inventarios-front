import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { Cliente } from '../../../ventas/cliente/interfaces/cliente';
import { ResultUtility } from '../../interfaces/report-interfaces';


@Injectable({
  providedIn: 'root'
})
export class FinanzasReportService {

  private BASE_URL: string = environment.BASE_URL;

  form: FormGroup = this.formBuilder.group({
    empleado:this.formBuilder.group({id:null, nombre:[''], apellido:['']}),
    cliente:[null],
    dates:[null, [Validators.required]]
  })

  initializeFormBuilder(){
    this.form.setValue({
      empleado:{
        id:null,
        nombre:'',
        apellido:'',
      },
      cliente:{
        id:null,
        apellido:'',
      },
      dates:[]
    })
  }  

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { }


  getEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>(`${this.BASE_URL}/empleado/por/sucursal`)
  }  

  getClientes(nombre:string):Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.BASE_URL}/cliente/${nombre}`)
  }  

  utilidadDetallada(){
    const dates:Array<Date> = this.form.value.dates;
    dates[1]?null:dates[1]=dates[0];
    return this.http.post<ResultUtility>(`${this.BASE_URL}/finanzas-report/utilidad-detallada?start=${dates[0]}&end=${dates[1]}`, this.form.value)
  }
}
