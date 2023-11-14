import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { RequireMatch } from '../../../almacen/producto/services/requireMatch';
import { Compra } from '../interfaces/compra';
import { Observable } from 'rxjs';
import { Producto } from '../../../almacen/producto/intefaces/producto';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  id:number = 0
  fecha:Date = new Date
  fechas:Array<Date> = []
  nuevo = 'Nueva'
  Titulo = 'Compra'
  view:boolean = false
  orden:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  total_factura:number = 0
  //producto:Array<Producto> = [] 

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) {}

     form = this.formBuilder.group({
      tipo:[''],
      id:[''],
      documento:[''],
      proveedor:['',(Validators.required,RequireMatch)],
      empleado:[],
      sucursal:[],
      observacion:[''],
      estado:[true],
      detalle:this.formBuilder.array([]),
      fecha:[''],
      pago: ['', Validators.required],
    })

    //rango de busqueda de registros
    range = this.formBuilder.group({
      dates:['',(Validators.required)]
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
        tipo:'',
        id:'',
        documento:'',
        proveedor:'',
        empleado:'',
        sucursal:'',
        observacion:'',
        detalle:[],
        estado:true,
        fecha:'',
        pago:{
          name: 'Contado', code: false
        }
      })
      this.total()
    }
  
    llenarFormulario(data:any){
      
      //console.log('object :>> ', data.id);
      this.getCompra(data.id).subscribe(data=>{
        console.log(data)
         this.form.patchValue({
          tipo:"Compra",
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
      this.getOrdenCompra(data).subscribe(data=>{
        this.form.patchValue({
          tipo:"Orden Compra",
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
    
    if (data.costo.length===0) {
      this.formCantidadProd.setValue({
        id_compra:data.id,
        nombre_c:data.nombre,
        costo_c:0,
        cantidad_c:1
      })
    }
    if (data.costo.length>0) {
      console.log(data.costo[0].costo_prom)
      this.formCantidadProd.setValue({
        id_compra:data.id,
        nombre_c:data.nombre,
        costo_c:data.costo[0].costo_prom,
        cantidad_c:1
      })
    }
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
        var detalle = this.form.value.detalle[i]
        //console.log('object :>> ', this.form.value.detalle[i]);
        this.total_factura = this.total_factura + (detalle.cantidad * detalle.precio) 
      }
    }
    /*********Finaliza funcion para agregar producto al listado de compra************/

    configNuevo(){
      this.nuevo = 'Nueva'
      this.Titulo = 'Compra'
      this.view = false
      this.orden = false
      this.fecha = new Date
    }

    configNuevaOrdenCompra(){
      this.Titulo = 'Orden Compra'
      this.orden = true
      this.view = false
      this.fecha = new Date
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
    this.fechas = this.range.value.dates
      return this.http.get<Compra[]>(`${this.BASE_URL}/compra?start=${this.fechas[0]}&end=${this.fechas[1]}`)
  }

  getCompra(id:any):Observable<Compra>{
      return this.http.get<Compra>(`${this.BASE_URL}/compra/${id}`)
  }

  createCompra():Observable<Compra>{
      return this.http.post<Compra>(`${this.BASE_URL}/compra`,this.form.value)
  }

  deleteCompra(id:number):Observable<Compra>{
      return this.http.delete<Compra>(`${this.BASE_URL}/compra/${id}`)
  }
  
   
  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/transaccionesCompras`)
  }
  
  getOrdencompras():Observable<Compra[]>{
    this.fechas = this.range.value.dates
    //console.log("servicio fechas",this.fechas)
    return this.http.get<Compra[]>(`${this.BASE_URL}/pedido?start=${this.fechas[0]}&end=${this.fechas[1]}`)
  }

  getOrdenCompra(id:any):Observable<Compra>{
      return this.http.get<Compra>(`${this.BASE_URL}/pedido/${id}`)
  }

  createOrdenCompra():Observable<Compra>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
      return this.http.post<Compra>(`${this.BASE_URL}/pedido`,this.form.value,{ headers})
  }

  deleteOrdenCompra(id:number){
      return this.http.delete<Compra>(`${this.BASE_URL}/pedido/${id}`,this.form.value)
  }
}

