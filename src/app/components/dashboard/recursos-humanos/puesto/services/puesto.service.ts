import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Puesto } from '../interfaces/puesto';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PuestoService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) {
     
  }

  form = this.formBuilder.group({
    id:[''],
    nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
    departamento:this.formBuilder.group({
      id:['',Validators.required],
    }),
    estado:[true]  
  })  

  resetFormBuilder(){
    this.form.reset({
      estado:true
    })

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null)
    });
  }

  initializeFormBuilder(){
    this.form.setValue({
      id:'',
      nombre:'',
      estado:true,
      departamento:{
        id:'',
      }
    })
  }

  llenarFormulario(data:Puesto){
    
    this.form.patchValue({
      id:data.id,
      nombre:data.nombre,
      estado:true,
      departamento:{
        id:data.departamento.id,
      }
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
  
  getPuestos():Observable<Puesto[]>{
    return this.http.get<Puesto[]>(`${this.BASE_URL}/puesto/encontrar`)
  }
  getPuesto(id:number):Observable<Puesto[]>{
    return this.http.get<Puesto[]>(`${this.BASE_URL}/puesto/encontrar/${id}`)
  }
  createPuesto():Observable<Puesto>{
    return this.http.post<Puesto>(`${this.BASE_URL}/puesto`,this.form.value)
  }
  deletePuesto(id:number):Observable<Puesto>{
    return this.http.delete<Puesto>(`${this.BASE_URL}/puesto/${id}`)
  }
  updatePuesto():Observable<Puesto>{
    return this.http.put<Puesto>(`${this.BASE_URL}/puesto/${this.form.value.id}`,this.form.value)
  }
}
