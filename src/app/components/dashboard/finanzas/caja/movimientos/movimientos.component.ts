import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleCorteComponent } from '../caja-corte-list/detalle-corte/detalle-corte.component';
import { Caja, Movimiento } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { MovimientoService } from '../services/movimiento.service';

@Component({
  selector: 'app-movimientos',
  templateUrl: './movimientos.component.html',
  styleUrls: ['./movimientos.component.css'],
  providers: [DialogService]
})
export class MovimientosComponent implements OnInit {

  cajasList!:Caja[]
  movimientos!:Movimiento[]
  id!:number
  ref!: DynamicDialogRef;
  constructor(public readonly movimientoService:MovimientoService,
              public dialogService: DialogService, 
              private readonly cajaConfigService:CajaConfigService){}

  ngOnInit(): void {
    this.cajas()
  }

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => {this.cajasList = resp
    console.log(this.cajasList);
    })
  }

  getMovimientos(){  
    this.movimientoService.getMovimientos().subscribe(resp=>this.movimientos=resp)
  }

  find(){
    this.ref = this.dialogService.open(DetalleCorteComponent, {
      data : this.id,
      header: 'Detalle corte',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
    
  }
}
