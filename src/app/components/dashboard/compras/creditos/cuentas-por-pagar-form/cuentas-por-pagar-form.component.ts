import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidatorsFormsCustom } from 'src/app/helpers/validators-form-pay';
import { CuentaPagarService } from '../services/cuenta-pagar.service';
import { MessageService } from 'primeng/api';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { CuentaPorPagar } from '../interfaces/cuenta-por-pagar';
import { Validators } from '@angular/forms';
import { Efectivo } from '../../../finanzas/efectivo/interface/efectivo';

@Component({
  selector: 'app-cuentas-por-pagar-form',
  templateUrl: './cuentas-por-pagar-form.component.html',
  styleUrls: ['./cuentas-por-pagar-form.component.css'],
  providers:[MessageService]
})
export class CuentasPorPagarFormComponent implements OnInit {
  public select:number=0;
  load=false;
  cuenta!:CuentaBancaria[]
  efectivo!:Efectivo[]
  cuentaEfectivo!:Efectivo
  credito!:CuentaPorPagar

  constructor(public cuentaPagarService:CuentaPagarService, 
    public config:DynamicDialogConfig,  private ref: DynamicDialogRef, public validatorsFormsCustom: ValidatorsFormsCustom) {
   }
   
   ngOnInit(): void {
    this.credito = this.config.data.cuentaPorPagar;
    this.getTipoTransaccion();
    this.getCuentasEncabezado();
    this.getCuentas();
   }

  selector(index:number){     
    this.select = index
  }

  getTipoTransaccion(){
    this.cuentaPagarService.getTipoTransaccion().subscribe(data=>{
      this.cuentaPagarService.initForm(data, this.credito);
      this.cuentaPagarService.getArrayDetalle.setValidators([this.validatorsFormsCustom.totalvalidation(this.credito.saldo!)]);
      this.cuentaPagarService.getArrayDetalle.updateValueAndValidity();
      this.start()
      this.load = true
    })
  }

  start(){
    const formControl = this.cuentaPagarService.getArrayDetalle.controls;
    for (let index = 1; index < 4; index++) {
      formControl[index]!.get('monto')?.valueChanges.subscribe(value=>{
      if(value>0 && this.select!=0 && !formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.enableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
      }
      if (value==0 || value==null && this.select!=0 && formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.disableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
      }
        this.validatorsFormsCustom.setValueEfectivo(formControl, 'tipoTransaccion.id', 'monto', this.credito.saldo!);
      })
    }
  }

  save() {
    this.cuentaPagarService.pagarCredito().subscribe(()=>{
        this.close(true);
    }, e=>{
      console.log(e);
      
    })
  }

  close(resp:boolean){
    this.cuentaPagarService.resetFormBuilder();
    this.ref.close(resp);
  }

  getCuentasEncabezado(){
    this.cuentaPagarService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    }) 
  }

  getCuentas(){
    this.cuentaPagarService.getCuentas().subscribe(data=>{
      this.efectivo = data;
    })
  }

}
