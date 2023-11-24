import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EfectivoService } from '../../../finanzas/efectivo/service/efectivo.service';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { CuentaBancariaService } from '../../../finanzas/fondos/service/cuenta-bancaria.service';
import { CompraService } from '../services/compra.service';

@Component({
  selector: 'app-compra-contado-form',
  templateUrl: './compra-contado-form.component.html',
  styleUrls: ['./compra-contado-form.component.css']
})
export class CompraContadoFormComponent implements OnInit {

  data:any[]=[]

  constructor(
    public service:CompraService,
    public cuentaBancariaService:CuentaBancariaService,
    public efectivoService:EfectivoService,
    public dialogRef:MatDialogRef<CompraContadoFormComponent>) { }

  ngOnInit(): void {
    const {name}:{ name:string }= this.service.form.get('pago')?.value
    name==='Banco'?this.getCuentas():this.getEfectivo();
  }

  getCuentas(){
    this.cuentaBancariaService.getCuentas().subscribe(data=>{
      data.forEach(a=>{
        const data = {id: a.id, nombre:a.nombre, numero:a.numero, monto:a.detalleCuentaBancaria![0].balance}
        this.data.push(data);
      })
      this.setValidators();
      
    })
  }

  getEfectivo(){
    this.efectivoService.getCuentas().subscribe(data=>{
      console.log(data);
      
      data.forEach(a=>{
        const data = {id: a.id, nombre:a.nombre, monto:a.detalleEfectivo![0].balance}
        this.data.push(data);
      })
      this.setValidators();
    })
  }

  setValidators(){
    
    this.service.form.get('cuenta')?.reset()
    this.service.form.get('cuenta')?.setValidators([Validators.required]);
    this.service.form.get('cuenta')?.updateValueAndValidity();
    this.service.form.get('doc')?.reset()
    this.service.form.get('doc')?.setValidators([Validators.required]);
    this.service.form.get('doc')?.updateValueAndValidity();
  }

  disableValidators(){
    //this.service.form.get('cuenta')?.reset()
    this.service.form.get('cuenta')?.clearValidators();
    this.service.form.get('cuenta')?.updateValueAndValidity();
    //this.service.form.get('doc')?.reset()
    this.service.form.get('doc')?.clearValidators();
    this.service.form.get('doc')?.updateValueAndValidity();
  }


  close(){
    this.disableValidators();
    this.dialogRef.close(false)
  }

  save(){
    this.disableValidators();
    this.dialogRef.close(true)
  }

}
