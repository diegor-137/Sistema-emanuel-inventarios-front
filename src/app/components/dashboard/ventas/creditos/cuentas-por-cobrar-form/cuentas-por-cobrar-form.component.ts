import { Component, OnInit } from '@angular/core';
import { ServiceCuentaCobrarService } from '../services/service-cuenta-cobrar.service';
import { Validators } from '@angular/forms';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CuentaPorCobrar } from '../interfaces/cuentas-por-cobrar';
import { MessageService } from 'primeng/api';
import { ValidatorsFormsCustom } from '../../../../../helpers/validators-form-pay';

@Component({
  selector: 'app-cuentas-por-cobrar-form',
  templateUrl: './cuentas-por-cobrar-form.component.html',
  styleUrls: ['./cuentas-por-cobrar-form.component.css'],
  providers:[MessageService]
})
export class  CuentasPorCobrarFormComponent implements OnInit {
  public select:number=0;
  load=false;
  cuenta!:CuentaBancaria[]
  credito!:CuentaPorCobrar

  constructor(public cuentaCobrarService:ServiceCuentaCobrarService, 
    public config:DynamicDialogConfig,  private ref: DynamicDialogRef, public validatorsFormsCustom: ValidatorsFormsCustom) {
   }
   
   ngOnInit(): void {
    this.credito = this.config.data.cuentaPorCobrar;
    this.getTipoTransaccion();
    this.getCuentasEncabezado();
   }

  selector(index:number){     
    this.select = index
  }

  getTipoTransaccion(){
    this.cuentaCobrarService.getTipoTransaccion().subscribe(data=>{
      this.cuentaCobrarService.initForm(data, this.credito);
      this.cuentaCobrarService.getArrayDetalle.setValidators([this.validatorsFormsCustom.totalvalidation(this.credito.saldo!)]);
      this.cuentaCobrarService.getArrayDetalle.updateValueAndValidity();
      this.start()
      this.load = true
    })
  }

  start(){
    const formControl = this.cuentaCobrarService.getArrayDetalle.controls;
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
    this.cuentaCobrarService.pagarCredito().subscribe(()=>{
        this.close(true);
    }, e=>{
      console.log(e);
    })
  }

  close(resp:boolean){
    this.cuentaCobrarService.resetFormBuilder();
    this.ref.close(resp);
  }

  getCuentasEncabezado(){
    this.cuentaCobrarService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    }) 
  }
}


