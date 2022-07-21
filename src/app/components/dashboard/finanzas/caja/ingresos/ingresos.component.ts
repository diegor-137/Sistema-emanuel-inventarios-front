import { Component, OnInit } from '@angular/core';
import { Caja, Ingreso } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { IngresosService } from './ingresos.service';

@Component({
  selector: 'app-ingresos',
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.css']
})
export class IngresosComponent implements OnInit {

  cajasList!:Caja[]
  ingresos!:Ingreso[]

  constructor(public ingresosService:IngresosService, private readonly cajaConfigService:CajaConfigService) { }

  ngOnInit(): void {
    this.cajas()
  }

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  getIngresos(){
    this.ingresosService.getIngresos().subscribe(resp=> this.ingresos = resp)
  }

}
