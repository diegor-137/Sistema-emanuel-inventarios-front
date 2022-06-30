import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { CajaService } from '../services/caja.service';
import { Socket } from 'ngx-socket-io';
import { Corte, Venta } from '../interfaces/caja-interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CajaCobroComponent } from './caja-cobro/caja-cobro.component';
import { CajaCobroListComponent } from './caja-cobro-list/caja-cobro-list.component';
import { CajaCorteComponent } from './caja-corte/caja-corte.component';

@Component({
  selector: 'app-caja',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaListComponent implements OnInit, OnDestroy{

  disabled: boolean = true;
  ventas!:Venta[];
  ventaSelect!: [];
  corte!:Corte
  load=false
  ref!: DynamicDialogRef;

  constructor(private readonly cajaService:CajaService, private messageService: MessageService, private socket: Socket, public dialogService: DialogService) {
    this.upDate();
    this.ventasHoy();
    this.lastCorte();
  }

  ngOnInit(): void {          

  }

  /* TRAER TODAS LAS VENTAS DEL DIA.*/
  ventasHoy(){
    this.cajaService.findVentaToday().subscribe(data => this.ventas = data);
  }

  lastCorte(){
    this.cajaService.lastCorte().subscribe(data=> {
      this.corte = data
      this.load = true      
    });
  }

  /* SOCKET PARA ESCUCHAR LOS CAMBIOS DE NUEVAS VENTAS HECHAS */
  upDate(){
    this.socket.fromEvent('ventas').subscribe((ventas: any)=>{
        this.ventas = ventas;
    })
  }

  /* FUNCION PARA DESELECCIONAR UNA FILA CUANDO SE CIERRA EL COBRO O SE REALIZA EL COBRO */ 
  openCobro(data:any){
    this.ref = this.dialogService.open(CajaCobroComponent, {
      data, 
      header: 'Realizar Cobro',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      closeOnEscape: false,
      closable: false
    }); 
    
    this.ref.onClose.subscribe(() =>{
      this.ventaSelect = [];
      this.ventasHoy()
    });
  }

  /* Listado de facturas cobradas */
  openCobrosRealizados(){
    this.ref =this.dialogService.open(CajaCobroListComponent, {
      header: 'Cobros realizados',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
    this.ref.onClose.subscribe(()=>{
      this.ventasHoy()
    })

  }

  openCorte(){
    this.ref =this.dialogService.open(CajaCorteComponent, {
      header: 'Realizar Corte',
      width: '50%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
    this.ref.onClose.subscribe(()=>{
      this.lastCorte();
    })
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}

}
