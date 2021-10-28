import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Marca } from '../interfaces/marca';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) { }
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

  llenarFormulario(data:Marca){
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
  
  getBuscar(nombre:string):Observable<Marca[]>{
    return this.http.get<Marca[]>(`${this.BASE_URL}/marca/${nombre}`)
  }
  getMarcas():Observable<Marca[]>{
    return this.http.get<Marca[]>(`${this.BASE_URL}/marca`)
  }
  getMarca(id:number):Observable<Marca>{
    return this.http.get<Marca>(`${this.BASE_URL}/marca/${id}`)
  }
  createMarca():Observable<Marca>{
    return this.http.post<Marca>(`${this.BASE_URL}/marca`,this.form.value)
  }
  deleteMarca(id:number):Observable<Marca>{
    return this.http.delete<Marca>(`${this.BASE_URL}/marca/${id}`)
  }
  updateMarca():Observable<Marca>{
    return this.http.put<Marca>(`${this.BASE_URL}/marca/${this.form.value.id}`,this.form.value)
  }
}
