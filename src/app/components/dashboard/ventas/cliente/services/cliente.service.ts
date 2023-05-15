import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Producto } from '../../../almacen/producto/interaces/producto';
import { Cliente } from '../interfaces/cliente';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  datos:Producto[] = []

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { }

        
    form = this.formBuilder.group({
      id:[''],
      nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]],
      direccion:['',[Validators.maxLength(125)]],
      telefono:['',[Validators.maxLength(15),Validators.pattern("^[0-9]*$")]],
      nit:['',[Validators.maxLength(10)]],
      estado:[true],
      credit: [false], 
      credito: this.formBuilder.array([])
    })


    resetFormBuilder(){
      this.form.reset({
        estado:true
      })
    }
  
    initializeFormBuilder(){
      this.form.patchValue({
        id:'',
        nombre:'',
        direccion:'',
        telefono:'',
        nit:'',
        estado:true,
        credit:false,
      })
      this.form.setControl('credito',this.setCredito([{limite:0, diasCredito:0}]))  
    }

    llenarFormulario(data:Cliente){    
      this.form.patchValue({
          id:data.id,
          nombre:data.nombre,
          direccion:data.direccion,
          telefono:data.telefono,
          nit:data.nit,
          estado:true,
          credit: data.credito[0]?.estado,                     
      })
      this.form.setControl('credito',this.setCredito(data.credito))           
      }

    setCredito(credito:any[]){      
      if(!credito.length)credito = [{limite: 0, diasCredito :0}];
      const formArray = new FormArray([])
      credito.forEach(e =>{   
        formArray.push(this.formBuilder.group({id:e?.id,limite:e.limite, diasCredito:e.diasCredito}))
      })             
      return formArray;
    }
    
    configNuevo(){
      this.titulo = 'Nuevo'
      this.edit = false
    }
    
    configEdit(){
      this.titulo = 'Editar'
      this.edit = true
    }

    getBuscar(nombre:string):Observable<Cliente[]>{
      return this.http.get<Cliente[]>(`${this.BASE_URL}/cliente/${nombre}`)
    }

  getClientes():Observable<Cliente[]>{
      return this.http.get<Cliente[]>(`${this.BASE_URL}/cliente`)
  }

  getCliente(id:number):Observable<Cliente>{
      return this.http.get<Cliente>(`${this.BASE_URL}/cliente/uno/${id}`)
  }

  createCliente():Observable<Cliente>{
    if(!this.form.value.credit)delete this.form.value.credito     
    return this.http.post<Cliente>(`${this.BASE_URL}/cliente`,this.form.value)
  }

  deleteCliente(id:number):Observable<Cliente>{
      return this.http.delete<Cliente>(`${this.BASE_URL}/cliente/${id}`)
  }

  updateCliente():Observable<Cliente>{  
    if(!this.form.value.credit && this.form.value.credito[0].id === null){
      delete this.form.value.credito
    }
    if(this.form.value.credit)this.form.value.credito[0].estado = true;
      return this.http.put<Cliente>(`${this.BASE_URL}/cliente/${this.form.value.id}`,this.form.value)
  }

  }
