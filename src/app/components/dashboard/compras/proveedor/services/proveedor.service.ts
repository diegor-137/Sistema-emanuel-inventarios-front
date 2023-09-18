import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Proveedor } from '../interfaces/proveedor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { 

    }

    
    form = this.formBuilder.group({
      id:[''],
      nombre:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
      direccion:['',[Validators.required,Validators.minLength(5),Validators.maxLength(75)]],
      telefono:['',[Validators.required,Validators.minLength(8),Validators.maxLength(15),Validators.pattern("^[0-9]*$")]],
      nit:['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      correo:['',Validators.maxLength(25)],
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
        correo:'',
        estado:true,
        credit:false,
      })
      this.form.setControl('credito',this.setCredito([{limite:0, diasCredito:0}]))
    }
  
    llenarFormulario(data:Proveedor){
      
      this.form.patchValue({
          id:data.id,
          nombre:data.nombre,
          direccion:data.direccion,
          telefono:data.telefono,
          nit:data.nit,
          correo:data.correo,
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

    getBuscar(nombre:string):Observable<Proveedor[]>{
      return this.http.get<Proveedor[]>(`${this.BASE_URL}/proveedor/${nombre}`)
    }

  getProveedores():Observable<Proveedor[]>{
      return this.http.get<Proveedor[]>(`${this.BASE_URL}/proveedor`)
  }

  getProveedor(id:number):Observable<Proveedor>{
      return this.http.get<Proveedor>(`${this.BASE_URL}/proveedor/uno/${id}`)
  }

  createProveedor():Observable<Proveedor>{
      //if(!this.form.value.credit)delete this.form.value.credito
      return this.http.post<Proveedor>(`${this.BASE_URL}/proveedor`,this.form.value)
  }

  deleteProveedor(id:number):Observable<Proveedor>{
      return this.http.delete<Proveedor>(`${this.BASE_URL}/proveedor/${id}`)
  }

  updateProveedor():Observable<Proveedor>{
    if(!this.form.value.credit && this.form.value.credito[0].id === null){
      delete this.form.value.credito
    }
    if(this.form.value.credit)this.form.value.credito[0].estado = true;
      return this.http.put<Proveedor>(`${this.BASE_URL}/proveedor/${this.form.value.id}`,this.form.value)
  }
}
