import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from '../../../almacen/producto/intefaces/producto';
import { RequireMatch } from '../../../almacen/producto/services/requireMatch';
import { Observable } from 'rxjs';
import { Venta } from '../interfaces/venta';
import { ValidadoresService } from './validadores.service';
import { Inventario } from '../Validators/existencia-validator';
@Injectable({
  providedIn: 'root'
})
export class VentaService {

  id:number = 0
  fecha : Date = new Date()
  fechas:Array<Date> = []
  nuevo = 'Nueva'
  Titulo = 'Venta'
  view:boolean = false
  orden:boolean = false
  BASE_URL:string = 'http://[::1]:3000'
  total_factura:number = 0

  datos:Producto[] = []

  constructor(private http:HttpClient,
              private formBuilder:FormBuilder,
              private validadores:ValidadoresService) {}

     form = this.formBuilder.group({
      tipo:[''],
      id:[''],
      cliente:['',(Validators.required,RequireMatch)],
      empleado:['',],
      sucursal:this.formBuilder.group({
        id:[''],
        nombre:['']
      }),
      observacion:[''],
      estado:[true],
      detalle:this.formBuilder.array([    
      ]),
      fecha:[''],
      pago: ['', Validators.required]
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
        cliente:'',
        empleado:'',
        sucursal:{
          id:'',
          nombre:'',
        },
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
      this.getVenta(data.id).subscribe(data=>{
        //console.log('object :>> ', data.detalle);
         this.form.patchValue({
          tipo:"Venta",
          id:data.id,
          cliente:data.cliente,
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

    llenarFormularioCotizacion(data:any){
      this.getCotizacion(data.id).subscribe(data=>{
         //console.log('datos cargados', data);
         this.form.patchValue({
          tipo:"Cotizacion",
          id:data.id,
          cliente:data.cliente,
          empleado:data.empleado,
          sucursal:data.sucursal,
          observacion:data.observacion,
          estado:true,
          fecha:data.createdAt
        })
        this.form.setControl('detalle',this.setDetalle(data.detalle))
        this.total()
      })
    }
    /*********Funcion para llenar detalle factura o cotizacion realizada, vizualizar registro************/
    setDetalle(detalle:any[]): FormArray {
      const formArray = new FormArray([])
      detalle.forEach(e =>{
          //var precioss:[] = e.precios        
        formArray.push(this.formBuilder.group({
          producto: e.producto.id,
          nombre_p:e.producto.nombre,
          cantidad: e.cantidad,
          precio_compra:e.producto.costo_prom,
          precio_venta:e.precio_venta,
          precio_seleccionado:e.precio_seleccionado,
          precios:e.precios,
          subtotal:+e.cantidad*+e.precio_venta
        }))
      }) 
      return formArray;
    }

    continuarCotizacion(){
      if (this.form.invalid) {
        this.llenarFormularioCotizacion(this.id)
        //console.log('object :asdasdsadsadsa>> ');
      }
    }

    /*********Inicia funcion para agregar producto al listado de compra************/ 
    /********seleccion de productos productos *****/
  //formulario donde indicamos la cantidad y precio de producto a vender
  formCantidadProd = this.formBuilder.group({
    id_producto:[null],
    nombre:[''],
    costo:[''],
    precio:[''],
    precios:[''],
    cantidad:['',Validators.required],
    inventario:['']
  })
  //funcion para llenar el forumalrio de arriba
  llenarProducto(data:Producto){
    this.formCantidadProd.setValue({
      id_producto:data.id,
      nombre:data.nombre,
      costo:data.costo[0].costo_prom,
      precio:data.precio[0],
      cantidad:1,
      precios:data.precio,
      inventario:data.inventario[0]
    })
  }

    get Detalle(){
      return this.form.controls["detalle"] as FormArray
    }

    removeValidation(){
      const refParent = this.form.get('detalle') as FormArray
            console.log(refParent)
    }

    //funcion del boton agregar al listado de productos
    AgregarDetalle(){
      const dato = this.formCantidadProd.value
      const detalleForm = this.formBuilder.group({
        producto:[dato.id_producto],
        nombre_p: [dato.nombre,Validators.required],
        cantidad:[dato.cantidad,{asyncValidators:[Inventario(this.validadores)]},Validators.required],
        precio_compra:[dato.costo, Validators.required],
        precio_venta:[dato.precio.precio,Validators.required],
        precio_seleccionado:[dato.precio, Validators.required],
        precios:[dato.precios,Validators.required],
        estado:true,
      })
      
      this.Detalle.push(detalleForm)
      this.formCantidadProd.reset({
        estado:true
      })
      this.form.updateValueAndValidity()
      this.total()   
    }


    cambio(){
      this.total_factura = 0
      for (let i = 0; i < this.form.value.detalle.length; i++) {
        var detalle = this.form.value.detalle[i]
        detalle.precio_venta = detalle.precio_seleccionado.precio
        //la siguiente linea es para guardar en un campo el precio de venta en numeros para la BD 
        }
    }
    total(){
      this.total_factura = 0
      for (let i = 0; i < this.form.value.detalle.length; i++) {
        var detalle = this.form.value.detalle[i]
        //la siguiente linea es para guardar en un campo el precio de venta en numeros para la BD 
        //detalle.precio_venta = detalle.precio_seleccionado.precio
        this.total_factura = this.total_factura + (detalle.cantidad * detalle.precio_venta)
        //console.log('object :>> ', this.total_factura);
      }
    }
    /*********Finaliza funcion para agregar producto al listado de compra************/

    configNuevo(){
      this.nuevo = 'Nueva'
      this.Titulo = 'Venta'
      this.view = false
      this.orden = false

    }

    configNuevaCotizacion(){
      this.Titulo = 'Cotizacion'
      this.orden = true
      this.view = false
      this.removeValidation()
    }

    configViewCotizacion(){
      this.nuevo = 'Visualizacion'
      this.Titulo = 'Cotizacion'
      this.view = true
      this.orden = true
    }

    configView(){
      this.nuevo = 'Visualizacion'
      this.Titulo = 'Venta'
      this.view = true
      this.orden = false
    }

    verificarInventario(id:number){
      return this.getInventario(id)
    }

  getVentas():Observable<Venta[]>{
    this.fechas = this.range.value.dates
      return this.http.get<Venta[]>(`${this.BASE_URL}/venta?start=${this.fechas[0]}&end=${this.fechas[1]}`)
  }

  getVenta(id:any):Observable<Venta>{
      return this.http.get<Venta>(`${this.BASE_URL}/venta/${id}`)
  }

  createVenta():Observable<Venta>{
      return this.http.post<Venta>(`${this.BASE_URL}/venta`,this.form.value/* ,{ headers} */)
  }

  deleteVenta(id:number):Observable<Venta>{
      return this.http.delete<Venta>(`${this.BASE_URL}/venta/${id}`)
  }
  
  /**********************IMPRIMIR VENTA*************************/
    imprimirVenta(id:number){
      return this.http.get<Venta>(`${this.BASE_URL}/ventaventa/reportefactura/${id}`)
  }


  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/transacciones`)
  }

  getInventario(id:any):Observable<Producto>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Producto>(`${this.BASE_URL}/producto/inventario/${id}`,{ headers})
  }

  
  getCotizaciones():Observable<Venta[]>{
    this.fechas = this.range.value.dates
    return this.http.get<Venta[]>(`${this.BASE_URL}/cotizacion?start=${this.fechas[0]}&end=${this.fechas[1]}`)
  }

  getCotizacion(id:any):Observable<Venta>{
      return this.http.get<Venta>(`${this.BASE_URL}/cotizacion/${id}`)
  }

  createCotizacion():Observable<Venta>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
      return this.http.post<Venta>(`${this.BASE_URL}/cotizacion`,this.form.value,{ headers})
  }

  deleteCotizacion(id:number):Observable<Venta>{
      return this.http.delete<Venta>(`${this.BASE_URL}/cotizacion/${id}`)
  }
}
