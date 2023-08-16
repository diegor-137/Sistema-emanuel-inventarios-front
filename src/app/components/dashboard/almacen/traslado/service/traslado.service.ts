import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { DetalleTraslado, Sucursal, Traslado } from '../interfaces/traslado';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TrasladoService {

  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) {}

    formGet: FormGroup = this.formBuilder.group({
      dates:[null, [Validators.required]],
    })

    form = this.formBuilder.group({
      id:[''],
      observacion:[''],
      createdAt:[''],
      autorizarDate:[''],
      status:[],
      solicitador:this.formBuilder.group({nombre:[''], apellido:['']}),
      responsable:this.formBuilder.group({nombre:[''], apellido:['']}),
      sucursalSol:this.formBuilder.group({id:[null], nombre:['']}),
      sucursalResp:this.formBuilder.group({id:[null, [Validators.required]], nombre:['']}),
      detalle:this.formBuilder.array([], [Validators.required]),
      readonly:[true]
    })

    /* Poblar un traslado */
    resetFormBuilder(){
      (<FormArray>this.form.get("detalle")).clear()
    }

    initializeFormGetBuilder(){
      this.formGet.patchValue({
        date:[]
      })
    }

    initializeFormBuilder(){
      this.form.reset()
      this.form.patchValue({
        id:'',
        observacion:'',
        createdAt:'',
        autorizarDate:'',
        status:'',
        solicitador:{
          nombre:'',
          apellido:'',
        },
        responsable:{
          nombre:'',
          apellido:'',
        },
        sucursalSol:{
          id:null,
          nombre:'',
        },
        sucursalResp:{
          id:null,
          nombre:'',
        },
        detalle:[],
        readonly:false
      })
    }  

    llenarFormulario(data:Traslado){
         this.form.patchValue({
          id:data.id,
          observacion:data.observacion,
          createdAt:data.createdAt,
          autorizarDate:data.autorizarDate,
          status:data.status,
          solicitador:data.solicitador,
          responsable:data.responsable,
          sucursalSol:data.sucursalSol,
          sucursalResp:data.sucursalResp,
          readonly:true
        })
        this.form.setControl('detalle',this.setDetalle(data.detalle))
    }

    setDetalle(detalle:DetalleTraslado[]): FormArray {
      const formArray = new FormArray([])
      detalle.forEach(e =>{
        formArray.push( this.formBuilder.group({
          cantidad: e.cantidad,
          //producto_nombre:e.producto.nombre,
          producto: this.formBuilder.group({id:e.producto.id, nombre:e.producto.nombre})
        }))
      }) 
      return formArray;
    }
    /* Poblar un traslado */

    /* Realizar un traslado */
    agregarDetalle(dato:DetalleTraslado){
      const detalleForm = this.formBuilder.group({
        cantidad: dato.cantidad,
        //producto_nombre: dato.producto.nombre,
        producto: this.formBuilder.group({id:dato.producto.id, nombre:dato.producto.nombre})
      })
      this.Detalle.push(detalleForm)
    }

    get Detalle(){
      return this.form.controls["detalle"] as FormArray
    }
    /* Realizar un traslado */


  getTraslados():Observable<Traslado[]>{
      return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado`)
  }

  getTrasladosLocal():Observable<Traslado[]>{
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/local`)
}

  sucursalesPorRegion():Observable<Sucursal[]>{
    return this.http.get<Sucursal[]>(`${this.BASE_URL}/sucursal/por-region`)
  }

  findNameAutoProducto(nombre:string):Observable<any[]>{
    return this.http.get<Sucursal[]>(`${this.BASE_URL}/producto/nombre-producto/${nombre}`)
  }

  createOne():Observable<Traslado>{
    console.log(this.form.value);
    
    return this.http.post<Traslado>(`${this.BASE_URL}/traslado`,this.form.value)
  }

  autorizarTraslado():Observable<Traslado>{
    return this.http.post<Traslado>(`${this.BASE_URL}/traslado/autorizarTraslado/${this.form.controls['id'].value}`,this.form.value)
  }

  /* CONSULTAS */

  getTrasladosPorfechaSucusal(){
    const dates:Array<Date> = this.formGet.value.dates;
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/porfecha/sucursal?start=${dates[0]}&end=${dates[1]}`)
  }

  ultimos5Sucursal():Observable<Traslado[]>{
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/ultimos/cincoSucursal`)
  }

  hoySucursal(){
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/porfecha/sucursal?start=${start}&end=${end}`)
  }

  getTrasladosPorfechaLocal(){
    const dates:Array<Date> = this.formGet.value.dates;
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/porfecha/local?start=${dates[0]}&end=${dates[1]}`)
  }

  ultimosCincoLocal():Observable<Traslado[]>{
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/ultimos/cinco-local`)
  }

  hoyLocal(){
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/porfecha/local?start=${start}&end=${end}`)
  }

  buscarTraslado(id:number):Observable<Traslado>{
    return this.http.get<Traslado>(`${this.BASE_URL}/traslado/${id}`) 
  }

  buscarTrasladoLocal(id:number):Observable<Traslado>{
    return this.http.get<Traslado>(`${this.BASE_URL}/traslado/local/${id}`) 
  }



}

