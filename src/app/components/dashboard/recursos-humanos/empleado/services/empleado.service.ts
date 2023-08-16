import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from "../interfaces/empleado";
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
  })

  export class EmpleadoService{
    activacion = 'activacion'  
    titulo = 'Agregar'
    edit:boolean = false
    desactivacion:boolean = false
    BASE_URL:string = 'http://[::1]:3000'
    constructor(private http:HttpClient,
                private formBuilder:FormBuilder){
    }

    form = this.formBuilder.group({
        id:[''],
        nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        apellido:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
        direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(125)]],
        telefono:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern("^[0-9]*$")]],
        estado:[true],
        puesto:this.formBuilder.group({
          id:['',Validators.required],
        }),
        sucursal:
        this.formBuilder.group({
          id:['',Validators.required]
        })
      })

      formHistorial = this.formBuilder.group({
        id:[''],
        accion:[''],
        motivo:['',[Validators.required,Validators.minLength(5),Validators.maxLength(150)]],
        fecha:[''],
        usuario:[''],
        empleado:this.formBuilder.group({
          id:['',Validators.required],
        })
      })

      resetFormHistorial(){
        this.formHistorial.reset({
        })
      }

      initializeFormHistorial(){
        this.formHistorial.setValue({
          id:'',
          accion:'',
          motivo:'',
          fecha:'',
          usuario:'',
          empleado:{
            id:''
          }
        })
      }

      llenarFormHistorial(data:any){
        this.form.patchValue({
          id:data.id,
          accion:data.accion,
          motivo:data.motivo,
          fecha:data.createdAt,
          usuario:data.usuario,
          empleado:{id:''}
      })
      }

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

      activacionEmpleado(data:Empleado){
        this.activacion = 'activacion'
        this.formHistorial.value.accion = 'activacion'
        this.desactivacion = true
        this.formHistorial.patchValue({       
          accion:"activacion",
          empleado:{
            id:data.id
          }
      })
      }

      desactivacionEmpleado(data:Empleado){
        this.activacion = 'desactivacion'
        this.desactivacion = false
          this.formHistorial.patchValue({       
            accion:"desactivacion",
            empleado:{
              id:data.id
            }
        })
      }

    getEmpleados():Observable<Empleado[]>{
        return this.http.get<Empleado[]>(`${this.BASE_URL}/empleado`)
    }

    getEmpleado(id:number):Observable<Empleado>{
        return this.http.get<Empleado>(`${this.BASE_URL}/empleado/${id}`)
    }

    createEmpleado():Observable<Empleado>{
        return this.http.post<Empleado>(`${this.BASE_URL}/empleado`,this.form.value)
    }

    deleteEmpleado(id:number):Observable<Empleado>{
        return this.http.put<Empleado>(`${this.BASE_URL}/empleado/${id}`,this.formHistorial.value)
    }

    desactivarEmpleado():Observable<Empleado>{
      return this.http.put<Empleado>(`${this.BASE_URL}/empleado/desactivar/${this.formHistorial.value.empleado.id}`,this.formHistorial.value)
    }

    activarEmpleado():Observable<Empleado>{
      return this.http.put<Empleado>(`${this.BASE_URL}/empleado/activar/${this.formHistorial.value.empleado.id}`,this.formHistorial.value)
    }
    updateEmpleado():Observable<Empleado>{
        return this.http.put<Empleado>(`${this.BASE_URL}/empleado/${this.form.value.id}`,this.form.value)
    }
  }