import { Component, OnInit } from '@angular/core';
import { Caja, Cobros } from '../interfaces/caja-interface';
import { CajaConfigService } from '../services/cajaConfig.service';
import { CajaService } from '../services/caja.service';
import { DialogService } from 'primeng/dynamicdialog';
import { DetalleCobroComponent } from './detalle-cobro/detalle-cobro.component';

@Component({
  selector: 'app-movimientos',
  templateUrl: './cobro-list.component.html',
  styleUrls: ['./cobro-list.component.css'],
  providers: [DialogService]
})
export class CobroListComponent implements OnInit {

  cajasList!:Caja[]
  cobros!:Cobros[]
  constructor(public readonly cajaService:CajaService,
              private readonly cajaConfigService:CajaConfigService, public dialogService: DialogService){}

  ngOnInit(): void {
    this.cajas()
  }

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  getCobros(){  
    this.cajaService.getAllCobros().subscribe(resp=>this.cobros=resp)
  }

  cobroDetallado(id:number){
    const ref = this.dialogService.open(DetalleCobroComponent, {
      data:id, 
      header: 'Realizar Cobro',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
    })
  }

}
