import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Cobro, Venta, Cobros } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';

@Component({
  selector: 'app-caja-cobro-list',
  templateUrl: './caja-cobro-list.component.html',
  styleUrls: ['./caja-cobro-list.component.css'],
  providers: [MessageService]
})
export class CajaCobroListComponent implements OnInit {

  cobros!:Cobros[]
  cobro!:Cobro
  loadDetalleCobro:boolean=false
  
  constructor(private readonly cajaService:CajaService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.getCobros()
  }

  getCobros(){
    this.cajaService.getCobrosDay().subscribe(resp=> this.cobros = resp);
  }

  getDetalleCobro(id:number){
    this.cajaService.getDetalleCobro(id).subscribe(resp=>
      {
        this.cobro = resp
        this.loadDetalleCobro=true
      }
    );    
  }

  deleteCobro(cobro:Cobros){

    this.confirmationService.confirm({
      message: `¿Estas seguro de eliminar el cobro de la venta ${cobro.id} del cliente ${cobro.cliente} con total de ${cobro.total}?`,
      header: 'Confirmar eliminacion.',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.cajaService.deleteCobro(cobro.id).subscribe((res) =>{
          this.messageService.add({severity:'success', summary: 'Cobro eliminado', detail: `El cobro ${cobro.id} del cliente ${cobro.cliente} ha sido eliminado`, life: 2000});
          this.getCobros()         
        }, e=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: e.error.message, life: 2000});
        })
      }
  });

    
  }

}
