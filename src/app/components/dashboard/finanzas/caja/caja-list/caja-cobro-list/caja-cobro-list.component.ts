import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Cobro, Venta } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-caja-cobro-list',
  templateUrl: './caja-cobro-list.component.html',
  styleUrls: ['./caja-cobro-list.component.css']
})
export class CajaCobroListComponent implements OnInit {

  ventas!:Venta[]
  cobro!:Cobro
  loadDetalleCobro:boolean=false
  
  constructor(private readonly cajaService:CajaService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCobros()
  }

  getCobros(){
    this.cajaService.getCobrosDay().subscribe(resp=> this.ventas = resp);
  }

  getDetalleCobro(id:number){
    this.cajaService.getDetalleCobro(id).subscribe(resp=>
      {
        this.cobro = resp
        this.loadDetalleCobro=true
      }
    );    
  }

  deleteCobro(venta:Venta){

    this.confirmationService.confirm({
      message: `¿Estas seguro de eliminar el cobro de la venta ${venta.id} del cliente ${venta.cliente} con total de ${venta.total}?`,
      header: 'Confirmar eliminacion.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cajaService.deleteCobro(venta.idcobro!).subscribe(() =>{
          this.messageService.add({severity:'success', summary: 'Cobro eliminado', detail: `El cobro de la venta ${venta.id} del cliente ${venta.cliente} ha sido eliminado`, life: 3000});
          this.getCobros()
        })
      }
  });

    
  }

}
