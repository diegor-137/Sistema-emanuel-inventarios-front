import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { environment } from "src/environments/environment";
import { DetallePago, Pago } from "../interfaces/pago";


@Injectable({
    providedIn: 'root'
  })
export class PagoService {

    private BASE_URL: string = environment.BASE_URL;

    constructor(private http:HttpClient, private formBuilder:FormBuilder){ }

    form: FormGroup = this.formBuilder.group({
        dates:[null, [Validators.required]]
      })

    getAllPagos(){
        const dates:Array<Date> = this.form.value.dates;
        return this.http.get<Pago[]>(`${this.BASE_URL}/pago?start=${dates[0]}&end=${dates[1]}`)
    }

    findPago(id:number){
      return this.http.get<DetallePago>(`${this.BASE_URL}/pago/detalle/${id}`)
    }
}
