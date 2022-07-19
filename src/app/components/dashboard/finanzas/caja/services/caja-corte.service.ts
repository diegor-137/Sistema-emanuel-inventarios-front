import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Corte } from '../interfaces/caja-interface';


@Injectable({
  providedIn: 'root'
})
export class CajaCorteService {
  BASE_URL:string = 'http://[::1]:3000'

  constructor(private http:HttpClient, private formBuilder:FormBuilder) {
  }

  formCorte = this.formBuilder.group({
      monto:[], 
      observacion: [],    
      token: []    
  })

  form: FormGroup = this.formBuilder.group({
    dates:[null, [Validators.required]],
    caja:[null, [Validators.required]],
  })

  create(resp:any){
    this.formCorte.controls['token'].setValue(resp.accessToken);
    const monto = this.formCorte.controls['monto'].value
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })   
    return this.http.post<any>(`${this.BASE_URL}/corte-caja/${monto}`, this.formCorte.value, { headers })
  }

  ultimoMovimiento(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
    return this.http.get<number>(`${this.BASE_URL}/movimiento-caja`, { headers })
  }

  cortes(){
    const dates:Array<Date> = this.form.value.dates;
    const id = this.form.value.caja
    return this.http.get<Corte[]>(`${this.BASE_URL}/corte-caja?start=${dates[0]}&end=${dates[1]}&id=${id}`)
  }

  findOne(id:number){
    return this.http.get<Corte>(`${this.BASE_URL}/corte-caja/${id}`);
  }
  
}

