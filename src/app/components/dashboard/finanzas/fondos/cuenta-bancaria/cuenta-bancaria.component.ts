import { Component, OnInit } from '@angular/core';
import { CuentaBancaria } from '../interfaces/cuenta-bancaria';
import { DialogService } from 'primeng/dynamicdialog';
import { CuentaBancariaFormComponent } from '../cuenta-bancaria-form/cuenta-bancaria-form.component';
import { CuentaBancariaService } from '../service/cuenta-bancaria.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cuenta-bancaria',
  templateUrl: './cuenta-bancaria.component.html',
  styleUrls: ['./cuenta-bancaria.component.css'],
  providers: [DialogService]
})
export class CuentaBancariaComponent implements OnInit {

  cuentasBancarias:CuentaBancaria[]= []
  loading:boolean = false
  constructor(public dialogService: DialogService, public cuentaBancariaService:CuentaBancariaService, private router: Router,
      private route:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCuentas();
  }


  crearCuenta(){
    this.cuentaBancariaService.resetFormBuilder()
    this.cuentaBancariaService.initializeFormBuilder();
    const ref =this.dialogService.open(CuentaBancariaFormComponent, {
      header: 'Crear nueva cuenta bancaria',
      width: '50%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
      this.getCuentas();
    })
  }

  getCuentas(){
    this.cuentaBancariaService.getCuentas().subscribe(data=>{
      data
      
      this.cuentasBancarias = data;
    })
  }

  verDetalleCuenta(id:number){
    this.router.navigate(['../fondos-banco-list', id], {relativeTo: this.route})
  }

}
