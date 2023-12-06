import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';

import { CuentaBancariaService } from '../service/cuenta-bancaria.service';
import { CuentaBancaria } from '../interfaces/cuenta-bancaria';
import { TransaccionCuentaFormComponent } from '../transaccion-cuenta-form/transaccion-cuenta-form.component';


@Component({
  selector: 'app-cuenta-bancaria-list',
  templateUrl: './cuenta-bancaria-list.component.html',
  styleUrls: ['./cuenta-bancaria-list.component.css'],
  providers: [DialogService]
})
export class CuentaBancariaListComponent implements OnInit {
  myParam!: string;

  cuentaBancaria!:CuentaBancaria
  loading:boolean = false
  load:boolean = false

  constructor(private route: ActivatedRoute, private router: Router, 
    public cuentaBancariaService:CuentaBancariaService, public dialogService: DialogService) { 
    
  }

  ngOnInit(): void {
    this.getDetail()
  }

  getDetail(){
    this.loading = true
    this.route.params.subscribe((params: Params) => this.myParam = params['id']);
    this.cuentaBancariaService.getCuentasDetail(Number(this.myParam)).subscribe(data=>{
      this.cuentaBancaria = data;
      this.loading = false
      this.load = true
    })

  }

  transaccion(){
    this.cuentaBancariaService.resetFormBuilder()
    this.cuentaBancariaService.initializeFormBuilder();
    const ref =this.dialogService.open(TransaccionCuentaFormComponent, {
      data: {
        cuenta:this.cuentaBancaria
      },
      header: 'Registrar transaccion',
      width: '50%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
      this.getDetail();
    })

  }

  regresar(){
    this.router.navigate(['../../fondos-banco'], {relativeTo: this.route})
  }

}
