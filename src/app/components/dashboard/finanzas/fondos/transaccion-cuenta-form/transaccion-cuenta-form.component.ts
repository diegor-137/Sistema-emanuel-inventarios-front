import { Component, OnInit } from '@angular/core';
import { CuentaBancariaService } from '../service/cuenta-bancaria.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CuentaBancaria } from '../interfaces/cuenta-bancaria';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-transaccion-cuenta-form',
  templateUrl: './transaccion-cuenta-form.component.html',
  styleUrls: ['./transaccion-cuenta-form.component.css']
})
export class TransaccionCuentaFormComponent implements OnInit {

  cuenta!:CuentaBancaria
  tipo:any[]=[
    {nombre:'Ingreso', type:true},
    {nombre:'Egreos', type:false}
  ]
  
  constructor(public cuentaBancariaService:CuentaBancariaService, 
    private config:DynamicDialogConfig,
    private messageService: MessageService,
    public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.cuenta = this.config.data.cuenta
    this.cuentaBancariaService.form.patchValue({
      id:this.cuenta.id, 
      numero:0,
      nombre: ' '
    })
    this.cuentaBancariaService.agregarDetalle({})
  }

  transaccion(){
    this.cuentaBancariaService.transaccion().subscribe(()=>{
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Registro Creado!'});
      this.ref.close()
    }, (e)=>{
      this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
     })
  }

}
