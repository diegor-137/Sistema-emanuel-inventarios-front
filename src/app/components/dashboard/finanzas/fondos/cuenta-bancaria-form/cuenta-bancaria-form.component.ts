import { Component, OnInit } from '@angular/core';
import { CuentaBancariaService } from '../service/cuenta-bancaria.service';
import { Banco } from '../interfaces/cuenta-bancaria';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-cuenta-bancaria-form',
  templateUrl: './cuenta-bancaria-form.component.html',
  styleUrls: ['./cuenta-bancaria-form.component.css']
})
export class CuentaBancariaFormComponent implements OnInit {

  bancos:Banco[]= []
  /* monto!:number */

  constructor(public cuentaBancariaService:CuentaBancariaService, private messageService: MessageService, public ref: DynamicDialogRef) {}

  ngOnInit(): void {
    this.cuentaBancariaService.findAllBancos().subscribe(resp=>{
      this.bancos = resp
    })
    this.cuentaBancariaService.agregarDetalle({
      type: true,
      documento: '0',
      descripcion: 'APERTURA INICIAL DE FONDOS'
    })
  }

  crearCuenta(){
    this.cuentaBancariaService.create().subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Cuenta Creado!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

}
