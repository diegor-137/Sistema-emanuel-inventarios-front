import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cobro, Cobros, Corte, Venta, CobroDetallado } from '../interfaces/caja-interface';

@Injectable({
  providedIn: 'root'
})
export class CajaService {
  BASE_URL:string = 'http://[::1]:3000'  
/*   @Output()showModal = new EventEmitter<any>();
  @Output()unSelect = new EventEmitter<boolean>(); */
  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
  }

  formCobro = this.formBuilder.group({
    //FIXME: Mandarlo como tipo objeto.
      venta:[],
      token: [],
      detalleCobro: this.formBuilder.array([
      ])
  })
  

  setDetalleCobro(detalleCobro:any[]): FormArray {
    const formArray = new FormArray([])
    detalleCobro.forEach(e =>{      
      formArray.push(this.formBuilder.group({
        descripcion: e.descripcion,
        cantidad: e.cantidad,
        tipoCobro:e.tipoCobro,
      }))
    }) 
    return formArray;
  }

  form: FormGroup = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })
    

  llenarCobro(detalles:any){
    this.formCobro.setControl('detalleCobro',this.setDetalleCobro(detalles))
  }


  findVentaToday(){
    return this.http.get<Venta[]>(`${this.BASE_URL}/cobro/ventas`)
  }


  tipoCobro(){
      return this.http.get<any>(`${this.BASE_URL}/tipo-cobro`)
  }

  cobro(resp:any){  
    this.formCobro.controls['token'].setValue(resp.accessToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.post<any>(`${this.BASE_URL}/cobro`, this.formCobro.value, { headers })
  }

  getCobrosDay(){
    return this.http.get<Cobros[]>(`${this.BASE_URL}/cobro/cobros-dia`)
  }
  
  getDetalleCobro(id:number){    
    return this.http.get<Cobro>(`${this.BASE_URL}/cobro/${id}`)    
  }

  deleteCobro(id:number){
    return this.http.delete<Cobro>(`${this.BASE_URL}/cobro/${id}`)    
  }

  findCobro(id:number){
    return this.http.get<CobroDetallado>(`${this.BASE_URL}/cobro/detalle/${id}`)
  }

  //TODO:USANDO
  lastCorte(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<Corte>(`${this.BASE_URL}/corte-caja/lastCorte`, { headers });
  }

  getAllCobros(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja    
    return this.http.get<Cobros[]>(`${this.BASE_URL}/cobro?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }



  /* PRUEBA UNICAMENTE */

  anularVenta(){
    return this.http.delete(`${this.BASE_URL}/cobro/anular/${115}`)
  }
}

