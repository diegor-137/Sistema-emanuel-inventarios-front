import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { CajaService } from '../services/caja.service';
import { Socket } from 'ngx-socket-io';
import { Corte, Venta } from '../interfaces/caja-interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CajaCobroComponent } from './caja-cobro/caja-cobro.component';
import { CajaCobroListComponent } from './caja-cobro-list/caja-cobro-list.component';
import { CajaCorteComponent } from './caja-corte/caja-corte.component';
import { AuthService } from '../../../../../auth/services/auth.service';
import { CustomSocket } from '../../../ventas/socekts/custom-sockets';
import { ConfiguracionGlobalService } from '../../../configuraciones/configuracion/services/configuracion-global.service';

@Component({
  selector: 'app-caja',
  templateUrl: './caja-list.component.html',
  styleUrls: ['./caja-list.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaListComponent implements OnInit{

  disabled: boolean = true;
  ventas!:Venta[];
  ventaSelect!: [];
  corte!:Corte
  load=false
  //ref!: DynamicDialogRef;
  get usuario(){
    return this.authService.usuario;
  }
  get config(){
    return this.configuracionGlobalService.config;
  }

  constructor(private readonly cajaService:CajaService, private messageService: MessageService, private socket: CustomSocket, public dialogService: DialogService, 
              private readonly authService:AuthService, private configuracionGlobalService:ConfiguracionGlobalService) {
    this.upDate();
    this.ventasHoy();
    this.lastCorte();
  }

  ngOnInit(): void {          
    this.configuracionGlobalService.getConfiguraciones().subscribe();
    
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
    this.socket.fromEvent(this.usuario.empleado.sucursal.nombre).subscribe((ventas: any)=>{
        console.log(this.usuario.empleado.sucursal.nombre);
        
        this.ventas = ventas;
    })
  }

  /* FUNCION PARA DESELECCIONAR UNA FILA CUANDO SE CIERRA EL COBRO O SE REALIZA EL COBRO */ 
  openCobro(data:any){
    const ref = this.dialogService.open(CajaCobroComponent, {
      data, 
      header: 'Realizar Cobro',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000,
      closeOnEscape: false,
      closable: false
    }); 
    console.log(data.data);
    
    this.socket.emit('getFacturas', {token: this.usuario.accessToken, idVenta:data.data.id, status:'COBRANDO'})
    
    ref.onClose.subscribe((resp) =>{
      if(resp){
        this.messageService.add({severity:'info', summary:'Cobro Realizado', detail: 'Cobro Realizado'});
      }else{
        this.socket.emit('getFacturas', {token: this.usuario.accessToken, idVenta:data.data.id, status:'PENDIENTE'})
      }
      this.ventaSelect = [];
      this.ventasHoy()
    });
  }

  /* Listado de facturas cobradas */
  openCobrosRealizados(){
    const ref =this.dialogService.open(CajaCobroListComponent, {
      header: 'Cobros realizados',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
      this.ventasHoy()
    })

  }

  openCorte(){
    const ref =this.dialogService.open(CajaCorteComponent, {
      data: this.corte,
      header: 'Realizar Corte',
      width: '80%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe((resp)=>{
      if(resp)this.messageService.add({severity:'success', summary:'Corte Realizado', detail: 'El corte ya se ha realizado.'});
      this.lastCorte();
    })
  }
}
