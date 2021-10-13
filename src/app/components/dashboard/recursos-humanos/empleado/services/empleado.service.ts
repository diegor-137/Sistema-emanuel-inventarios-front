import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from "../interfaces/empleado";
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })

  export class EmpleadoService{
      
    titulo = 'Agregar'
    edit:boolean = false
    BASE_URL:string = 'http://[::1]:3000'
    constructor(private http:HttpClient,
                private formBuilder:FormBuilder){

    }

    form = this.formBuilder.group({
        id:[''],
        nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        apellido:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(125)]],
        telefono:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15)]],
        estado:[true],
        puesto:this.formBuilder.group({
          id:['',Validators.required],
        }),
        sucursal:this.formBuilder.group({
          id:['',Validators.required]
        })
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
          apellido:'',
          direccion:'',
          telefono:'',
          estado:true,
          puesto:{
            id:'',
          },
          sucursal:{
            id:'',
          }
        })
      }
    
      llenarFormulario(data:Empleado){
        
        this.form.patchValue({
            id:data.id,
            nombre:data.nombre,
            apellido:data.apellido,
            direccion:data.direccion,
            telefono:data.telefono,
            estado:true,
            puesto:{
              id:data.puesto.id,
            },
            sucursal:{
              id:data.sucursal.id,
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

    getEmpleados():Observable<Empleado[]>{
        return this.http.get<Empleado[]>(`${this.BASE_URL}/empleado/encontrar`)
    }

    getEmpleado(id:number):Observable<Empleado>{
        return this.http.get<Empleado>(`${this.BASE_URL}/empleado/encontrar/${id}`)
    }

    createEmpleado():Observable<Empleado>{
        return this.http.post<Empleado>(`${this.BASE_URL}/empleado`,this.form.value)
    }

    deleteEmpleado(id:number):Observable<Empleado>{
        return this.http.delete<Empleado>(`${this.BASE_URL}/empleado/${id}`)
    }

    updateEmpleado():Observable<Empleado>{
        return this.http.put<Empleado>(`${this.BASE_URL}/empleado/${this.form.value.id}`,this.form.value)
    }
  }