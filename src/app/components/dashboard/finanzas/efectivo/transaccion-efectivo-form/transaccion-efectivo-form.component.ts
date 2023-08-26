import { Component, OnInit } from '@angular/core';
import { Efectivo } from '../interface/efectivo';
import { EfectivoService } from '../service/efectivo.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaccion-efectivo-form',
  templateUrl: './transaccion-efectivo-form.component.html',
  styleUrls: ['./transaccion-efectivo-form.component.css']
})
export class TransaccionEfectivoFormComponent implements OnInit {
  efectivo!:Efectivo
  tipo:any[]=[
    {nombre:'Ingreso', type:true},
    {nombre:'Egreos', type:false}
  ]

  constructor(public efectivoService:EfectivoService, 
    private config:DynamicDialogConfig,
    private messageService: MessageService,
    public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.efectivo = this.config.data.cuenta
    this.efectivoService.form.patchValue({
      id:this.efectivo.id, 
      nombre: ' '
    })
    this.efectivoService.agregarDetalle({})
  }

  transaccion(){
    this.efectivoService.transaccion().subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro Creado!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

}
