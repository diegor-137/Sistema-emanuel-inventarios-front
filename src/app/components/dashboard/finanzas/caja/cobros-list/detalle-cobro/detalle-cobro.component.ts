import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CobroDetallado } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-detalle-corte',
  templateUrl: './detalle-cobro.component.html',
  styleUrls: ['./detalle-cobro.component.css']
})
export class DetalleCobroComponent implements OnInit {

  cobro!:CobroDetallado
  load=false
  constructor( public config: DynamicDialogConfig,
               private readonly cajaService:CajaService         
      ) {}

  ngOnInit(): void {
      this.getCobroDetalle()
  }

  getCobroDetalle(){
     this.cajaService.findCobro(this.config.data).subscribe(resp=> {
      this.cobro = resp;
      this.load = true      
    })   
  }

}


