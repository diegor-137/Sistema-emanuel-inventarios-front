import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Departamento } from '../interfaces/departamento';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  
  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL: string = 'http://[::1]:3000'
  constructor(private http:HttpClient,
              private formBuilder:FormBuilder) {         

  }

  form = this.formBuilder.group({
    id:[''],
    nombre:['',[Validators.required,Validators.maxLength(25),Validators.minLength(5)]],
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
      estado:true
    })
  }

  llenarFormulario(data:Departamento){
    console.log(data);
    this.form.patchValue({
      id: data.id,
      nombre: data.nombre,
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


  getDepartamentos():Observable <Departamento[]>{
    return this.http.get<Departamento[]>(`${this.BASE_URL}/departamento` )
  }

  getDepartamentosActivos():Observable <Departamento[]>{
    return this.http.get<Departamento[]>(`${this.BASE_URL}/departamento/active` )
  }
  getDepartamento(id:number):Observable <Departamento>{
    return this.http.get<Departamento>(`${this.BASE_URL}/departamento/${id}`)
  }

  createDepartamento():Observable <Departamento>{
    return this.http.post<Departamento>(`${this.BASE_URL}/departamento`,this.form.value)
  }

  deleteDepartamento(id:number):Observable <Departamento>{
    return this.http.delete<Departamento>(`${this.BASE_URL}/departamento/${id}`)
  }

  updateDepartamento():Observable <Departamento>{
    return this.http.put<Departamento>(`${this.BASE_URL}/departamento/${this.form.value.id}`,this.form.value)
  }
}
