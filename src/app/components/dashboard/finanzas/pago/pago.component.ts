import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { DetallePagoComponent } from './detalle-pago/detalle-pago.component';
import { Pago } from './interfaces/pago';
import { PagoService } from './service/pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
  providers: [DialogService]
})
export class PagoComponent implements OnInit {

  pagos!:Pago[]

  constructor(public readonly pagoService:PagoService, public dialogService: DialogService) { }

  ngOnInit(): void {}

  getPagos(){ 
      this.pagoService.getAllPagos().subscribe(resp=>{
        this.pagos=resp
        console.log(this.pagos);
      })
  }

  pagoDetallado(id:number){
    const ref = this.dialogService.open(DetallePagoComponent, {
      data:id, 
      header: 'Detalle de pago',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
    })
  }

}
