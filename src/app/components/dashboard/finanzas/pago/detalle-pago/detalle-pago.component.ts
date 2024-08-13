import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { DetallePago } from '../interfaces/pago';
import { PagoService } from '../service/pago.service';

@Component({
  selector: 'app-detalle-pago',
  templateUrl: './detalle-pago.component.html',
  styleUrls: ['./detalle-pago.component.css']
})
export class DetallePagoComponent implements OnInit {

  pago!:any
  load=false
  constructor(public readonly pagoService:PagoService, public config: DynamicDialogConfig) { }

  ngOnInit(): void {
    this.getPagoDetalle();
  }


  getPagoDetalle(){
    this.pagoService.findPago(this.config.data).subscribe(resp=> {
     this.pago = resp;
     this.load = true
     console.log(this.pago);
   })   
  }

}
