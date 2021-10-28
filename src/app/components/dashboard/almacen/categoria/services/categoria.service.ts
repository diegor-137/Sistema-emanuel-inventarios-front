import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Categoria } from '../interfaces/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) { 
                
  }

  form = this.formBuilder.group({
    id:[null],
    nombre:['',[Validators.required,Validators.maxLength(25)]],
    estado:[true]  
  })

  resetFormBuilder(){
    this.form.reset({
      estado:true
    })
  }

  initializeFormBuilder(){
    this.form.setValue({
      id:'',
      nombre:'',
      estado:true,
    })
  }

  llenarFormulario(data:Categoria){
    this.form.patchValue({
      id:data.id,
      nombre:data.nombre,
      estado:true,
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

  getBuscar(nombre:string):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.BASE_URL}/categoria/${nombre}`)
  }
  
  getCategorias():Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.BASE_URL}/categoria`)
  }
  getCateria(id:number):Observable<Categoria[]>{
    return this.http.get<Categoria[]>(`${this.BASE_URL}/categoria${id}`)
  }
  createCategoria():Observable<Categoria>{
    return this.http.post<Categoria>(`${this.BASE_URL}/categoria`,this.form.value)
  }
  deleteCategoria(id:number):Observable<Categoria>{
    return this.http.delete<Categoria>(`${this.BASE_URL}/categoria/${id}`)
  }
  updateCategoria():Observable<Categoria>{
    return this.http.put<Categoria>(`${this.BASE_URL}/categoria/${this.form.value.id}`,this.form.value)
  }
}
