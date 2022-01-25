import { HttpClient } from '@angular/common/http';
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

  fecha : Date = new Date()
  titulo = 'Ingreso'
  edit:boolean = false
  BASE_URL:string = 'http://[::1]:3000'

  datos:Producto[] = []

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) {

     }

     form = this.formBuilder.group({
      id:[''],
      documento:[''],
      proveedor:['',(Validators.required,RequireMatch)],
      empleado:['',(Validators.required,RequireMatch)],
      sucursal:this.formBuilder.group({
        id:['',Validators.required]
      }),
      observacion:[''],
      estado:[true],
      detalle_compra:this.formBuilder.array([    
      ]),
      fecha:[''],
    })


    resetFormBuilder(){
      this.form.reset({
        estado:true
      }),

      (<FormArray>this.form.get("detalle_compra")).clear()

      Object.keys(this.form.controls).forEach(key => {
        this.form.get(key)?.setErrors(null)
      });

      this.form.updateValueAndValidity()
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
        detalle_compra:'',
        estado:true,
        fecha:''
      })
    }
  
    llenarFormulario(data:Compra){
      this.form.patchValue({
        id:'',
        documento:data.documento,
        proveedor:{
          proveedor:data.proveedor.id
        },
        empleado:{
          empleado:data.empleado.id
        },
        sucursal:{
          sucursal:data.id
        },
        observacion:data.observacion,
        estado:true,
        fecha:data.createdAt

      })
      this.form.setControl('detalle_compra',this.setDetalle(data.detalle_compra))
    }
    
    setDetalle(detalle:any[]): FormArray {
      const formArray = new FormArray([])
      detalle.forEach(e =>{
        formArray.push( this.formBuilder.group({
          producto: e.producto,
          cantidad: e.cantidad,
          precio:e.precio
        }))
      })
  
      return formArray;
    }

    get Detalle(){
      return this.form.controls["detalle_compra"] as FormArray
    }

    AgregarDetalle(){
      var cant:number=+this.formCantidadProd.value.costo_c
      var precio:number=+this.formCantidadProd.value.cantidad_c
      this.datos = this.formCantidadProd.value
      console.log('object :>> ',this.datos);
      const detalleForm = this.formBuilder.group({
        producto:[this.formCantidadProd.value.id_compra],
        nombre_p: [this.formCantidadProd.value.nombre_c,Validators.required],
        cantidad:[this.formCantidadProd.value.cantidad_c,Validators.required],
        precio:[this.formCantidadProd.value.costo_c, Validators.required],
        estado:true,
        subtotal:[+this.formCantidadProd.value.costo_c*+this.formCantidadProd.value.cantidad_c]
      })
  
      this.Detalle.push(detalleForm)

      this.formCantidadProd.reset({
        estado:true
      })
      this.form.updateValueAndValidity()
    }

    configNuevo(){
      this.titulo = 'Nuevo'
      this.edit = false
    }
    
    configEdit(){
      this.titulo = 'Editar'
      this.edit = true
    }

  getCompras():Observable<Compra[]>{
      return this.http.get<Compra[]>(`${this.BASE_URL}/compra`)
  }

  getCompra(id:number):Observable<Compra>{
      return this.http.get<Compra>(`${this.BASE_URL}/compra/${id}`)
  }

  createCompra():Observable<Compra>{
      return this.http.post<Compra>(`${this.BASE_URL}/compra`,this.form.value)
  }

  deleteCompra(id:number):Observable<Compra>{
      return this.http.delete<Compra>(`${this.BASE_URL}/compra/${id}`)
  }

  updateCompra():Observable<Compra>{
      return this.http.put<Compra>(`${this.BASE_URL}/compra/${this.form.value.id}`,this.form.value)
  }

  //**********enlistar productos ****** */


  

  getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>(`${this.BASE_URL}/producto/productos`)
  }

  formCantidadProd = this.formBuilder.group({
    id_compra:[null],
    nombre_c:[''],
    costo_c:[''],
    cantidad_c:['',Validators.required]
  })

  llenarProducto(data:Producto){
    this.formCantidadProd.setValue({
      id_compra:data.id,
      nombre_c:data.nombre,
      costo_c:data.costo_prom,
      cantidad_c:1
    })
  }  

}

