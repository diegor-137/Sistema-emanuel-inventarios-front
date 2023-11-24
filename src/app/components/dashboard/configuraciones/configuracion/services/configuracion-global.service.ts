import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Efectivo } from '../../../finanzas/efectivo/interface/efectivo';
import { ConfiguracionGlobal } from '../interface/configuracion-global';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionGlobalService {
  BASE_URL:string = 'http://[::1]:3000'
  _config!:ConfiguracionGlobal
  get config() {
    return { ... this._config };
  }
  constructor(private http:HttpClient, private formBuilder:FormBuilder) { }

  form=this.formBuilder.group({
    id:[], 
    efectivo: this.formBuilder.group({
      id:[null,[Validators.required] ], 
      nombre:[null]
    }),
    cuentaBancaria: this.formBuilder.group({
      id:[null,[Validators.required]], 
      nombre:[null]
    }),
    ventaCobro:[false]    
  })


  getConfiguraciones():Observable<ConfiguracionGlobal>{
    return this.http.get<ConfiguracionGlobal>(`${this.BASE_URL}/configuraciones-global`)
    .pipe(
      map(resp => {          
          this._config = {
            id:resp.id, efectivo:resp.efectivo, cuentaBancaria:resp.cuentaBancaria, ventaCobro:resp.ventaCobro
          }
          return resp;                    
        })
    )
  }

  guardar():Observable<ConfiguracionGlobal>{
    return this.http.post<ConfiguracionGlobal>(`${this.BASE_URL}/configuraciones-global`, this.form.value)
  }

  getEfectivoEncabezado(){
    return this.http.get<Efectivo[]>(`${this.BASE_URL}/efectivo/efectivo-encabezado`);
  }
  
  getCuentasEncabezado(){   
    return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria/cuentas-encabezado`)
  }
}
