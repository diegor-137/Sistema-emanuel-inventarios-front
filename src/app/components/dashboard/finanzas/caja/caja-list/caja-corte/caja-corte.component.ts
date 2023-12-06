import { Component, OnInit } from '@angular/core';
import { QueryParamsHandling } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Role } from 'src/app/app.roles';
import { PasswordDialogComponent } from 'src/app/components/dashboard/global-components/password-dialog/password-dialog.component';
import { ValidatorsFormsCustom } from 'src/app/helpers/validators-form-pay';
import { Corte } from '../../interfaces/caja-interface';
import { CajaCorteService } from '../../services/caja-corte.service';

@Component({
  selector: 'app-caja-corte',
  templateUrl: './caja-corte.component.html',
  styleUrls: ['./caja-corte.component.css'],
  providers: [DialogService, MessageService]
})
export class CajaCorteComponent implements OnInit {

  load=false
  array!:any[];
  constructor(public readonly cajaCorteService: CajaCorteService, 
              private messageService: MessageService, 
              public ref: DynamicDialogRef, 
              public dialogService: DialogService, 
              public config: DynamicDialogConfig,
              public validatorsFormsCustom: ValidatorsFormsCustom) { }

  ngOnInit(): void {    
    const corte:Corte=this.config.data
    const saldo = corte.corteCajaDetalle.find(a=>a.concepto ==='SALDO')
    this.cajaCorteService.transaccionesSinCorte().subscribe(resp=>{
      console.log(resp);
      
      this.array = [
        {descripcion: 'Saldo', monto: saldo?.monto},
        {descripcion: 'Ventas', monto: resp.cobro, detalle:[
          {descripcion: 'Ventas por medio bancario', monto: resp.cobroBanco},
          {descripcion: 'Ventas en efectivo', monto: resp.cobroEfectivo}
        ]},
        /* {descripcion: 'Cuentas por cobrar', monto: resp.cuentaPorCobrar, detalle:[
          {descripcion: 'Cuentas por cobrar medio bancario', monto: resp.cuentaPorCobrarBanco},
          {descripcion: 'Cuentas por cobrar en Efectivo', monto: resp.cuentaPorCobrarEfectivo}
        ]}, */ //PARTE DE CREDITOS DE CLIENTES
        {descripcion: 'Egresos', monto: resp.egreso},
        {descripcion: 'Ingresos', monto: resp.ingreso},
        {descripcion: 'Total en caja', monto: resp.balance},
        {descripcion: 'Total en efectivo', monto: Number(saldo?.monto) + Number(resp.cobroEfectivo) + Number(resp.cuentaPorCobrarEfectivo), last:true},
      ]
      this.load = true; 
    });  
  }

  create(){
    const ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Realizar Corte',
      width: '30%',
      data: [Role.CAJERO, Role.ADMIN]
    })
    
    ref.onClose.subscribe((resp:any)=>{
        if(resp){
          this.cajaCorteService.create(resp).subscribe(()=>{
            this.ref.close(true);            
            this.cajaCorteService.formCorte.reset()
          }, e =>{      
            console.log('data');
            this.messageService.add({severity:'error', summary:'Error', detail: e.error.message});                      
          })          
        }
    })
  }

}
