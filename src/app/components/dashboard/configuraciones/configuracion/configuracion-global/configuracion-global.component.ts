import { Component, OnInit} from '@angular/core';
import { MessageService } from 'primeng/api';
import { ConfiguracionGlobalService } from '../services/configuracion-global.service';
import { Efectivo } from '../../../finanzas/efectivo/interface/efectivo';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-configuracion-global',
  templateUrl: './configuracion-global.component.html',
  styleUrls: ['./configuracion-global.component.css'],
  providers: [MessageService]
})
export class ConfiguracionGlobalComponent implements OnInit {

  efectivo!:Efectivo[]
  cuentaBancaria!:CuentaBancaria[]
  checked!:boolean

  constructor(public readonly service: ConfiguracionGlobalService, private messageService: MessageService) {
  }
  ngOnInit(): void {
    this.getEfectivoEncabezado()
    this.getConfiguraciones()
    this.getCuentasEncabezado()
  }

  guardar(){
    this.service.guardar().subscribe({
      next: ()=>this.messageService.add({severity:'success', summary:'Guardado', detail: 'Se han guardado los cambios'}),
      error: (e)=>this.messageService.add({severity:'error', summary:'Error', detail: e.error.message})
    })
  }

  disableCuentas(){
    if(this.checked){ 
        this.enableValidatorsCuenta()
    }else{
        this.disableValidatorsCuenta()
    }
  }

  getEfectivoEncabezado(){
    this.service.getEfectivoEncabezado().subscribe(data=>{
      this.efectivo = data
    })
  }

  getCuentasEncabezado(){
    this.service.getCuentasEncabezado().subscribe(data=>{
      this.cuentaBancaria = data
    })
  }

  getConfiguraciones(){
    this.service.getConfiguraciones().subscribe(data=>{
      if(!data.cuentaBancaria){
        this.checked = false
        this.disableValidatorsCuenta()
      }else{
        this.checked = true
        this.enableValidatorsCuenta()
      }
      this.service.form.patchValue(data)
    })
  }


  enableValidatorsCuenta(){
    this.service.form.controls.cuentaBancaria.enable();
    this.service.form.controls.cuentaBancaria.setValidators(Validators.required);
    this.service.form.updateValueAndValidity();
  }

  disableValidatorsCuenta(){
    this.service.form.controls.cuentaBancaria.disable();
    this.service.form.controls.cuentaBancaria.reset();
    this.service.form.controls.cuentaBancaria.clearValidators()
  }
}
