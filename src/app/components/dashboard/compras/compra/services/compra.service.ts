import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { RequireMatch } from '../../../almacen/producto/services/requireMatch';
import { Compra } from '../interfaces/compra';
import { Observable } from 'rxjs';
import { Producto } from '../../../almacen/producto/interaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  id:number = 0
  fecha : Date = new Date()
  nuevo = 'Nueva'
  Titulo = 'Compra'
  view:boolean = false
  orden:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  total_factura:number = 0

  //datos:Producto[] = []

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) {

     }

     form = this.formBuilder.group({
      id:[''],
      documento:[''],
      proveedor:['',(Validators.required,RequireMatch)],
      empleado:[],
      sucursal:this.formBuilder.group({
        id:['']
      }),
      observacion:[''],
      estado:[true],
      detalle:this.formBuilder.array([    
      ]),
      fecha:[''],
    })


    resetFormBuilder(){
      this.form.reset({
        estado:true
      }),
      (<FormArray>this.form.get("detalle")).clear()
      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.setErrors(null)
      });
      this.form.updateValueAndValidity()
      this.total()
    }
  
    initializeFormBuilder(){
      this.form.setValue({
        id:'',
        documento:'',
        proveedor:'',
        empleado:'',
        sucursal:{
          id:'',
        },
        observacion:'',
        detalle:[],
        estado:true,
        fecha:''
      })
      this.total()
    }
  
    llenarFormulario(data:any){
      //console.log('object :>> ', data.total);
      this.getCompra(data.id).subscribe(data=>{
         this.form.patchValue({
          id:data.id,
          documento:data.documento,
          proveedor:data.proveedor,
          empleado:data.empleado,
          sucursal:data.sucursal,
          observacion:data.observacion,
          estado:true,
          fecha:data.createdAt
        })
        this.form.setControl('detalle',this.setDetalle(data.detalle))
      })
      this.total()
    }

    llenarFormularioOrden(data:any){
      //console.log('object :>> ', data.total);
      this.getOrdenCompra(data).subscribe(data=>{
         this.form.patchValue({
          id:data.id,
          documento:data.documento,
          proveedor:data.proveedor,
          empleado:data.empleado,
          sucursal:data.sucursal,
          observacion:data.observacion,
          estado:true,
          fecha:data.createdAt
        })
        this.form.setControl('detalle',this.setDetalle(data.detalle))
      })
      this.total()
    }

    /******Funcion para vizualizar registros de compras*******/
    setDetalle(detalle:any[]): FormArray {
      const formArray = new FormArray([])
      detalle.forEach(e =>{
        formArray.push( this.formBuilder.group({
          producto: e.producto.id,
          nombre_p:e.producto.nombre,
          cantidad: e.cantidad,
          precio:e.precio,
          subtotal:+e.cantidad*+e.precio
        }))
      }) 
      return formArray;
    }

    /*********Inicia funcion para agregar producto al listado de compra************/ 
    /********seleccion de productos productos *****/
  //formulario de producto seleccionado
  formCantidadProd = this.formBuilder.group({
    id_compra:[null],
    nombre_c:[''],
    costo_c:[''],
    cantidad_c:['',Validators.required]
  })
  //funcion para poblar formulario de arriba
  llenarProducto(data:Producto){
    this.formCantidadProd.setValue({
      id_compra:data.id,
      nombre_c:data.nombre,
      costo_c:data.costo_prom,
      cantidad_c:1
    })
  }
    //simplificar el llamado del formulario de listado de  producto
    get Detalle(){
      return this.form.controls["detalle"] as FormArray
    }
    //funcion del boton agregar al listado de productos
    AgregarDetalle(){

      const dato = this.formCantidadProd.value
      //console.log('object :>> ',this.datos);
      const detalleForm = this.formBuilder.group({
        producto:[dato.id_compra],
        nombre_p: [dato.nombre_c,Validators.required],
        cantidad:[dato.cantidad_c,Validators.required],
        precio:[dato.costo_c, Validators.required],
        estado:true,
        subtotal:[(+dato.costo_c)*+(dato.cantidad_c)]
      })
  
      this.Detalle.push(detalleForm)

      this.formCantidadProd.reset({
        estado:true
      })
      this.form.updateValueAndValidity()
      this.total()
    }

    total(){
      this.total_factura = 0
      //console.log('object :>> ', this.form.value.detalle);
      for (let i = 0; i < this.form.value.detalle.length; i++) {
        //console.log('object :>> ', this.form.value.detalle[i]);
        this.total_factura = this.total_factura + this.form.value.detalle[i].subtotal 
      }
    }
    /*********Finaliza funcion para agregar producto al listado de compra************/

    configNuevo(){
      this.nuevo = 'Nueva'
      this.Titulo = 'Compra'
      this.view = false
      this.orden = false
    }

    configNuevaOrdenCompra(){
      this.Titulo = 'Orden Compra'
      this.orden = true
      this.view = false
    }

    configViewOrdenCompra(){
      this.nuevo = 'Visualizacion'
      this.Titulo = 'Orden Compra'
      this.view = true
      this.orden = true
    }


    configView(){
      this.nuevo = 'Visualizacion'
      this.Titulo = 'Compra'
      this.view = true
      this.orden = false
    }

  getCompras():Observable<Compra[]>{
      return this.http.get<Compra[]>(`${this.BASE_URL}/compra/encontrar`)
  }

  getCompra(id:any):Observable<Compra>{
      return this.http.get<Compra>(`${this.BASE_URL}/compra/encontrar/${id}`)
  }

  createCompra():Observable<Compra>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
      return this.http.post<Compra>(`${this.BASE_URL}/compra`,this.form.value,{ headers})
  }

  deleteCompra(id:number):Observable<Compra>{
      return this.http.delete<Compra>(`${this.BASE_URL}/compra/${id}`)
  }
  
  
  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/productos`)
  }
  
  getOrdencompras():Observable<Compra[]>{
    return this.http.get<Compra[]>(`${this.BASE_URL}/pedido/encontrar`)
  }

  getOrdenCompra(id:any):Observable<Compra>{
      return this.http.get<Compra>(`${this.BASE_URL}/pedido/encontrar/${id}`)
  }

  createOrdenCompra():Observable<Compra>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
      return this.http.post<Compra>(`${this.BASE_URL}/pedido`,this.form.value,{ headers})
  }

  deleteOrdenCompra(id:number):Observable<Compra>{
      return this.http.delete<Compra>(`${this.BASE_URL}/pedido/${id}`)
  }
}

