import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { Envio, Traslado } from '../interfaces/traslado';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EnvioService {

  private BASE_URL: string = environment.BASE_URL;

  constructor(private http:HttpClient,
    private formBuilder:FormBuilder) { }

    formGet: FormGroup = this.formBuilder.group({
      dates:[null, [Validators.required]],
    })

    form = this.formBuilder.group({
      id:[''],
      observacionEnvio:[''],
      observacionRecepcion:[''],
      recepcionador:this.formBuilder.group({nombre:[''], apellido:['']}),
      fechaFin:'',
      traslado:[],
      status:[''],
      readonly:[true]
    })

    initializeFormGetBuilder(){
      this.formGet.patchValue({
        date:[]
      })
    }

    initializeFormBuilder(){
      this.form.setValue({
        id:'',
        observacionEnvio:'',
        observacionRecepcion:'',
        recepcionador:{
          nombre:'',
          apellido:'',
        },
        fechaFin:'',
        traslado:[],
        status:'',
        readonly:false
      })
    }  

    llenarFormulario(data:Envio){
      this.form.patchValue({
       id:data.id,
       observacionEnvio:data.observacionEnvio,
       observacionRecepcion:data.observacionRecepcion,
       recepcionador:data.recepcionador,
       fechaFin:data.fechaFin,
       traslado:data.traslado,
       status:data.status,
       readonly:true
     })
 }

  findAllTrasladosNoEnvio():Observable<Traslado[]>{
    return this.http.get<Traslado[]>(`${this.BASE_URL}/traslado/noEnvio`)
  }

  create():Observable<Envio>{
    return this.http.post<Envio>(`${this.BASE_URL}/envio`, this.form.value)
  }

  createRecepcion():Observable<Envio>{
    const id = this.form.get('id')?.value;
    return this.http.post<Envio>(`${this.BASE_URL}/envio/recepcion/${id}`, this.form.value)
  }

  envios():Observable<Envio[]>{
    const dates:Array<Date> = this.formGet.value.dates;
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/porfecha?start=${dates[0]}&end=${dates[1]}`)
  }

  enviosNoRecepcion():Observable<Envio[]>{
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/no-recepcion`)
  }

  findAllEnviosRecepcion():Observable<Envio[]>{
    const dates:Array<Date> = this.formGet.value.dates;
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/all-recepcion?start=${dates[0]}&end=${dates[1]}`)
  }

  ultimos5Sucursal():Observable<Envio[]>{
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/ultimos/cincoSucursal`)
  }

  hoySucursal():Observable<Envio[]>{
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/porfecha?start=${start}&end=${end}`)
  }

  ultimos5Local():Observable<Envio[]>{
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/ultimos/cincoLocal`)
  }

  hoyLocal():Observable<Envio[]>{
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/all-recepcion?start=${start}&end=${end}`)
  }

  /* hoySucursal():Observable<Envio[]>{
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(start.getDate() + 1);
    return this.http.get<Envio[]>(`${this.BASE_URL}/envio/porfecha?start=${start}&end=${end}`)
  } */

  buscarEnvio(id:number):Observable<Envio>{
    return this.http.get<Envio>(`${this.BASE_URL}/envio/${id}`) 
  }

  buscarEnvioRecepcion(id:number):Observable<Envio>{
    return this.http.get<Envio>(`${this.BASE_URL}/envio/recepcion-get/${id}`) 
  }
}
