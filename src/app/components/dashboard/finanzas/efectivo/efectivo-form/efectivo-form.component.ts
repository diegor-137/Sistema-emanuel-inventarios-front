import { Component, OnInit } from '@angular/core';
import { EfectivoService } from '../service/efectivo.service';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-efectivo-form',
  templateUrl: './efectivo-form.component.html',
  styleUrls: ['./efectivo-form.component.css']
})
export class EfectivoFormComponent implements OnInit {

  constructor(public efectivoService:EfectivoService, private messageService: MessageService, public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.efectivoService.agregarDetalle({
      type: true,
      documento: '0',
      descripcion: 'APERTURA INICIAL DE FONDOS'
    })
  }

  crearCuenta(){
    this.efectivoService.create().subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Cuenta Creada!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

}
