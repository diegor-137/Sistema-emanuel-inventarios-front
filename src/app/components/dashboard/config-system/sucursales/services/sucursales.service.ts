import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { Sucursal } from '../interfaces/sucursal-interface';
import { Region } from '../../region/interfaces/region-interface';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {

  private BASE_URL: string = environment.BASE_URL;
  form!:FormGroup

  constructor(private formBuilder:FormBuilder, private http:HttpClient) {
    this.form=this.formBuilder.group({
      id: [],   
      nombre: ['', [Validators.required], [this.userNameAsyncValidator]],
      saveNombre: [],
      direccion:[null, Validators.required],
      region: this.formBuilder.group({
        id:[Validators.required]
      }),
      fotoSend:[null, Validators.required],
      foto:[],
    })
   }


  create(sucursal:Sucursal){
    const fd = new FormData();
    fd.append("nombre", sucursal.nombre)
    fd.append("direccion", sucursal.direccion)
    fd.append("region[id]", String(sucursal.region.id));
    fd.append("fotoSend", sucursal.fotoSend)
    return this.http.post<Sucursal>(`${this.BASE_URL}/sucursal`, fd)
  }

  getRegiones(){
    return this.http.get<Region[]>(`${this.BASE_URL}/region`)
  }

  getSucursales(){
    return this.http.get<Sucursal[]>(`${this.BASE_URL}/sucursal`)
  }

  findAll(){
    return this.http.get<Sucursal[]>(`${this.BASE_URL}/sucursal/todos`);
  }

  sucursalName(nombre:string){
    return this.http.get<Sucursal>(`${this.BASE_URL}/sucursal/name/${nombre}`);
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
        this.sucursalName(control.value).subscribe(resp=>{
            if (control.value === resp?.nombre && control.value != this.form.controls['saveNombre'].value) {
              observer.next({ duplicated: true });
            } else {
              observer.next(null);
            }
            observer.complete();
        })        
    });
 
}
