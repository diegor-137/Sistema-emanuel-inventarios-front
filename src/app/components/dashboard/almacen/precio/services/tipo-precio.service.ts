import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Tipo_Precio } from '../interfaces/tipo-precio';


@Injectable({
  providedIn: 'root'
})
export class TipoPrecioService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) { }

  form = this.formBuilder.group({
    id:[null],
    nombre:['',[Validators.required,Validators.maxLength(20)]],
    estado:[true]
  })

  resetFormBuilder(){
    this.form.reset({
      estado:true
    })
  }

  initializeFormBuilder(){
    this.form.setValue({
      id:null,
      nombre:'',
      estado:true
    })
  }

  llenarFormulario(data:Tipo_Precio){
    this.form.patchValue({
      id:data.id,
      nombre:data.nombre,
      estado:data.estado

    })
  }

  configNuevo(){
    this.titulo = 'Nuevo'
    this.edit = false
  }
  
  configEdit(){
    this.titulo = 'Editar'
    this.edit = true
  }

    getBuscar(nombre:string):Observable<Tipo_Precio[]>{
      return this.http.get<Tipo_Precio[]>(`${this.BASE_URL}/tipo-precio/${nombre}`)
    }
    getTipoPrecios():Observable<Tipo_Precio[]>{
      return this.http.get<Tipo_Precio[]>(`${this.BASE_URL}/tipo-precio`)
    }
    geTipoPrecio(id:number):Observable<Tipo_Precio>{
      return this.http.get<Tipo_Precio>(`${this.BASE_URL}/tipo-precio/${id}`)
    }
    createTipoPrecio():Observable<Tipo_Precio>{
      return this.http.post<Tipo_Precio>(`${this.BASE_URL}/tipo-precio`,this.form.value)
    }
    deleteTipoPrecio(id:number):Observable<Tipo_Precio>{
      return this.http.delete<Tipo_Precio>(`${this.BASE_URL}/tipo-precio/${id}`)
    }
    updateTipoPrecio():Observable<Tipo_Precio>{
      return this.http.put<Tipo_Precio>(`${this.BASE_URL}/tipo-precio/${this.form.value.id}`,this.form.value)
    }
}
