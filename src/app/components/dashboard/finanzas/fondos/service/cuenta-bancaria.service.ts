import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Banco, CuentaBancaria, DetalleCuentaBancaria } from '../interfaces/cuenta-bancaria';

@Injectable({
  providedIn: 'root'
})
export class CuentaBancariaService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { }

    form = this.formBuilder.group({
      id:[null],
      numero:[null, [Validators.required]],
      nombre:['', [Validators.required]],
      banco:this.formBuilder.group({id:['', [Validators.required]], nombre:['']}),
      detalleCuentaBancaria:this.formBuilder.array([]),
    })

    resetFormBuilder(){
      (<FormArray>this.form.get("detalleCuentaBancaria")).clear()
    }
    initializeFormBuilder(){
      this.form.reset()
      this.form.patchValue({
        id:null,
        numero:null,
        nombre:'',
        banco: {
          id:null,
          nombre:''
        },
        detalle:[],
      })
    }

    agregarDetalle(dato:DetalleCuentaBancaria){
      const detalleForm = this.formBuilder.group({
      monto:[dato.monto, Validators.required],
      type:[dato.type, Validators.required],
      documento:[dato.documento, Validators.required],
      descripcion:[dato.descripcion],
      })
      this.Detalle.push(detalleForm)
    }
    
    get Detalle(){
      return this.form.controls["detalleCuentaBancaria"] as FormArray
    }
    
    findAllBancos(){
      return this.http.get<Banco[]>(`${this.BASE_URL}/bancos`)
    }

    create(){
      return this.http.post<CuentaBancaria>(`${this.BASE_URL}/cuenta-bancaria`,this.form.value)
    }  
    
    getCuentas(){
      return this.http.get<CuentaBancaria[]>(`${this.BASE_URL}/cuenta-bancaria`)
    }
    
    getCuentasDetail(id:number){
      return this.http.get<CuentaBancaria>(`${this.BASE_URL}/cuenta-bancaria/detail/${id}`)
    }

    transaccion(){      
      return this.http.post<CuentaBancaria>(`${this.BASE_URL}/cuenta-bancaria/transaccion`, this.form.value)
    }
}

/* setDetalle(detalle:DetalleCuentaBancaria[]): FormArray {
  const formArray = new FormArray([])
  detalle.forEach(e =>{
    formArray.push( this.formBuilder.group({
      documento:e.documento,
      descripcion:e.descripcion,
      monto:e.monto,
    }))
  }) 
  return formArray;
} */