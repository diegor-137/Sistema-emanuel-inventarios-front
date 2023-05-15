import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators, Form } from '@angular/forms';
import { Producto } from '../intefaces/producto';
import { Observable } from 'rxjs';
import { RequireMatch } from './requireMatch';
import { Inventario } from '../intefaces/inventario';
    
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  titulo = 'Agregar'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  productoId:number = 0
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
    costoss:this.formBuilder.group({
      id:[''],
      costo_prom:[''],
      costo_prom_old:[''],
      ultimo_precio:[''],
    }),
    costo:this.formBuilder.array([

    ]),
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

    (<FormArray>this.form.get("costo")).clear(),

    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.setErrors(null)
    });
    this.form.updateValueAndValidity()

  }

  initializeFormBuilder(){
    this.form.patchValue({
      id:null,
      nombre:'',
      descripcion:'',
      codigoBarras:null,
      estado:true,
      costo_prom:'',
      costo_prom_old:0,
      ultimo_precio:0,
      costoss:{
        id:'',
        costo_prom:'',
        costo_prom_old:'',
        ultimo_precio:'',
      },
      costo:[],
      categoria:'',
      marca:'',
      precio:[]
    })
  }

  llenarFormulario(data:Producto){
    console.log('object :>',data);
    this.form.patchValue({
      id:data.id,
      nombre:data.nombre,
      descripcion:data.descripcion,
      codigoBarras:data.codigoBarras,
      estado:true,
      costo_prom:data.costo_prom,
      costo_prom_old:data.costo_prom_old,
      ultimo_precio:data.ultimo_precio,
      costoss:{
        id:data.costo[0].id,
        costo_prom:data.costo[0].costo_prom,
        costo_prom_old:data.costo[0].costo_prom_old,
        ultimo_precio:data.costo[0].ultimo_precio,
      },
      categoria:data.categoria,
      marca:data.marca,
      invetario:{
        inventario:data.categoria.id
      },
    })
    //console.log(data.costo)
    this.form.setControl('costo',this.setCostos(data.costo,data.precio))
    this.form.setControl('precio',this.setPrecios(data.precio))
  }

  setCostos(costo:any[],precio:any[]): FormArray {
    
    const formArray = new FormArray([])
    costo.forEach(e =>{
      formArray.push( this.formBuilder.group({
        id:e.id,
        costo_prom:e.costo_prom,
        costo_prom_old:e.costo_prom_old,
        ultimo_precio:e.ultimo_precio,
      }))
    })
    return formArray;
  }
  get costo(){
    return this.form.controls["costo"] as FormArray
  }

  AgregarCosto(){
    const costoForm = this.formBuilder.group({
      costo_prom: [null,Validators.required],
      costo_prom_old: [0],
      ultimo_precio:[0],
      region:this.formBuilder.group({
        id:[1]
      })
    })
    this.costo.push(costoForm)
  }


  setPrecios(precios:any[]): FormArray {
    const formArray = new FormArray([])
    precios.forEach(e =>{
      formArray.push( this.formBuilder.group({
        precio: e.precio,
        tipoPrecio:this.formBuilder.group({
          id:e.tipoPrecio.id,
          nombre:e.tipoPrecio.nombre
        }),
        region:this.formBuilder.group({
          id:e.region.id,
          nombre:e.region.nombre
        })
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
      tipoPrecio:this.formBuilder.group({
        id:['',Validators.required]
      }),
      region:this.formBuilder.group({
        id:[1]
      })
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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/productos`)
  }
  getProducto(id:number):Observable<Producto>{
    return this.http.get<Producto>(`${this.BASE_URL}/producto${id}`)
  }
  createProducto():Observable<Producto>{
    console.log('antes',this.form.value)
    return this.http.post<Producto>(`${this.BASE_URL}/producto`,this.form.value)
  }
  deleteProducto(id:number):Observable<Producto>{
    return this.http.delete<Producto>(`${this.BASE_URL}/producto/${id}`)
  }
  updateProducto():Observable<Producto>{
    return this.http.put<Producto>(`${this.BASE_URL}/producto/${this.form.value.id}`,this.form.value)
  }

  getInventario():Observable<Producto[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/inventario`)
  }
  updateInventario(id:number,prod:Producto):Observable<Producto>{
    return this.http.put<Producto>(`${this.BASE_URL}/producto/inventario/${id}`,prod)
  }

  getInventarioTotalporProducto(id:number):Observable<Inventario[]>{
    return this.http.get<Inventario[]>(`${this.BASE_URL}/producto/inventarioTotalProd/${id}`)
  }
}
