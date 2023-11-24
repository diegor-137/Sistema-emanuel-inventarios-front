import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Region } from '../interfaces/region-interface';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  titulo = 'Agregar'
  edit:boolean = false
  private BASE_URL : string = environment.BASE_URL

  constructor(private formBuilder:FormBuilder,
              private http:HttpClient) {
                
               }

  form = this.formBuilder.group({
                  id:[],
                  nombre:['',Validators.required],
                  estado:[true],
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

  llenarFormulario(data:Region){
    console.log(data);
    this.form.patchValue({
      id: data.id,
      nombre: data.nombre,
      estado:data.estado
    })
  }
  
  configNuevo(){
    this.titulo = 'Crear'
    this.edit = false
  }
  
  configEdit(){
    this.titulo = 'Editar'
    this.edit = true
  }


  getRegiones():Observable <Region[]>{
    return this.http.get<Region[]>(`${this.BASE_URL}/region` )
  }
  getRegion(id:number):Observable <Region>{
    return this.http.get<Region>(`${this.BASE_URL}/region/${id}`)
  }

  createRegion():Observable <Region>{
    return this.http.post<Region>(`${this.BASE_URL}/region`,this.form.value)
  }

  deleteRegion(id:number):Observable <Region>{
    return this.http.delete<Region>(`${this.BASE_URL}/region/${id}`)
  }

  updateRegion():Observable <Region>{
    return this.http.put<Region>(`${this.BASE_URL}/region/${this.form.value.id}`,this.form.value)
  }

}

