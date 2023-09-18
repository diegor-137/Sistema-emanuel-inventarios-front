import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { DetalleEfectivo, Efectivo } from '../interface/efectivo';

@Injectable({
  providedIn: 'root'
})
export class EfectivoService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { }

    form = this.formBuilder.group({
      id:[null],
      nombre:['', [Validators.required]],
      detalleEfectivo:this.formBuilder.array([]),
    })

    resetFormBuilder(){
      (<FormArray>this.form.get("detalleEfectivo")).clear()
    }
    initializeFormBuilder(){
      this.form.reset()
      this.form.patchValue({
        id:null,
        nombre:'',
        detalleEfectivo:[],
      })
    }

    agregarDetalle(dato:DetalleEfectivo){
      const detalleForm = this.formBuilder.group({
      monto:[dato.monto, Validators.required],
      type:[dato.type, Validators.required],
      documento:[dato.documento, Validators.required],
      descripcion:[dato.descripcion],
      })
      this.Detalle.push(detalleForm)
    }
    
    get Detalle(){
      return this.form.controls["detalleEfectivo"] as FormArray
    }

    create(){
      return this.http.post<Efectivo>(`${this.BASE_URL}/efectivo`,this.form.value)
    }  
    
    getCuentas(){
      return this.http.get<Efectivo[]>(`${this.BASE_URL}/efectivo`)
    }
    
    getCuentasDetail(id:number){
      return this.http.get<Efectivo>(`${this.BASE_URL}/efectivo/detail/${id}`)
    }

    transaccion(){      
      return this.http.post<Efectivo>(`${this.BASE_URL}/efectivo/transaccion`, this.form.value)
    }
}
