import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators, Form } from '@angular/forms';
import { Producto } from '../interaces/producto';
import { Observable } from 'rxjs';
import { RequireMatch } from './requireMatch';
import { Tipo_Precio } from '../interaces/tipo_precio';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
              public formBuilder:FormBuilder) { }
  
  form = this.formBuilder.group({
    id:[null],
    nombre:['',[Validators.required, Validators.maxLength(50)]],
    descripcion:['',Validators.maxLength(255)],
    codigoBarras:[null],
    estado:[true],
    costo_prom:[''],
    costo_prom_old:[0],
    ultimo_precio:[0],
    categoria:['',(Validators.required,RequireMatch)],
    marca:['',(Validators.required,RequireMatch)],
    precio : this.formBuilder.array([
      
    ]),
  })

  

  resetFormBuilder(){
    this.form.reset({
      estado:true
    }),
    
    (<FormArray>this.form.get("precio")).clear(),

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null)
    });
    this.form.updateValueAndValidity()

  }

  initializeFormBuilder(){
    this.form.setValue({
      id:null,
      nombre:'',
      descripcion:'',
      codigoBarras:null,
      estado:true,
      costo_prom:'',
      costo_prom_old:0,
      ultimo_precio:0,
      categoria:'',
      marca:'',
      precio:[]
    })
  }

  llenarFormulario(data:Producto){
    this.form.patchValue({
      id:data.id,
      nombre:data.nombre,
      descripcion:data.descripcion,
      codigoBarras:data.codigoBarras,
      estado:true,
      costo_prom:data.costo_prom,
      costo_prom_old:data.costo_prom_old,
      ultimo_precio:data.ultimo_precio,
      categoria:data.categoria,
      marca:data.marca,
      invetario:{
        inventario:data.categoria.id
      },
    })

    data.precio.forEach(e => {
      console.log(e.tipoPrecio);
    });
    this.form.setControl('precio',this.setPrecios(data.precio))
  }


  setPrecios(precios:any[]): FormArray {
    const formArray = new FormArray([])
    precios.forEach(e =>{
      formArray.push( this.formBuilder.group({
        precio: e.precio,
        tipoPrecio: e.tipoPrecio
      }))
    })

    return formArray;
  }
  
  get Precios(){
    return this.form.controls["precio"] as FormArray
  }
  
  AgregarPrecio(){
    const precioForm = this.formBuilder.group({
      precio: ['',Validators.required],
      tipoPrecio:['',Validators.required],
    })

    this.Precios.push(precioForm)
  }
  configNuevo(){
    this.titulo = 'Nuevo'
    this.edit = false
  }
  
  configEdit(){
    this.titulo = 'Editar'
    this.edit = true

  }
  
  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/productos`)
  }
  getProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.BASE_URL}/producto${id}`)
  }
  createProducto():Observable<Producto>{
    return this.http.post<Producto>(`${this.BASE_URL}/producto`,this.form.value)
  }
  deleteProducto(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.BASE_URL}/producto/${id}`)
  }
  updateProducto():Observable<Producto>{
    return this.http.put<Producto>(`${this.BASE_URL}/producto/${this.form.value.id}`,this.form.value)
  }
}
