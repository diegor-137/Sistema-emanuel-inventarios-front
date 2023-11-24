import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValidatorsFormsCustom } from 'src/app/helpers/validators-form-pay';
import { Efectivo } from '../../finanzas/efectivo/interface/efectivo';
import { CuentaBancaria } from '../../finanzas/fondos/interfaces/cuenta-bancaria';
import { PagoService } from './service/pago.service';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  load=false;
  cuenta!:CuentaBancaria[]
  efectivo!:Efectivo[]
  public select:number=0;
  compra!:any
  total!:number;
  constructor( public config:DynamicDialogConfig, public pagoService:PagoService, private ref: DynamicDialogRef, public validatorsFormsCustom: ValidatorsFormsCustom) { }

  ngOnInit(): void {
    this.compra = this.config.data.compra;
    this.total = this.config.data.total;
    this.getTipoTransaccion();
    this.getCuentasEncabezado();
    this.getCuentas();
    
  }

  selector(index:number){     
    this.select = index
  }

  getTipoTransaccion(){
    this.pagoService.getTipoTransaccion().subscribe(data=>{
      this.pagoService.initForm(data, this.total);
      this.pagoService.getArrayDetalle.setValidators([this.validatorsFormsCustom.totalvalidation(this.total)]);
      this.pagoService.getArrayDetalle.updateValueAndValidity();
      this.start()
      this.load = true
    })
  }

  start(){
    const formControl = this.pagoService.getArrayDetalle.controls;
    for (let index = 1; index < 4; index++) {
      formControl[index]!.get('monto')?.valueChanges.subscribe(value=>{
      if(value>0 && this.select!=0 && !formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.enableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
      }
      if (value==0 || value==null && this.select!=0 && formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.disableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
      }
        this.validatorsFormsCustom.setValueEfectivo(formControl, 'tipoTransaccion.id', 'monto', this.total);
      })
    }
  }

  save() {
    this.ref.close(this.pagoService.cleanData());
  }

  close(){
    this.ref.close();
  }

  getCuentasEncabezado(){
    this.pagoService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    }) 
  }

  getCuentas(){
    this.pagoService.getCuentas().subscribe(data=>{
      this.efectivo = data;
    })
  }

}
