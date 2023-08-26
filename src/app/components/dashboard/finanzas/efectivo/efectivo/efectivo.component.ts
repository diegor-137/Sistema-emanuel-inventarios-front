import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { Efectivo } from '../interface/efectivo';
import { EfectivoService } from '../service/efectivo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EfectivoFormComponent } from '../efectivo-form/efectivo-form.component';

@Component({
  selector: 'app-efectivo',
  templateUrl: './efectivo.component.html',
  styleUrls: ['./efectivo.component.css'],
  providers: [DialogService]
})
export class EfectivoComponent implements OnInit {

  efectivo:Efectivo[]= []
  loading:boolean = false

  constructor(public dialogService: DialogService, public efectivoService:EfectivoService, private router: Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCuentas();
  }


  crearCuentaEfectivo(){
    this.efectivoService.resetFormBuilder()
    this.efectivoService.initializeFormBuilder();
    const ref =this.dialogService.open(EfectivoFormComponent, {
      header: 'Crear nueva cuenta efectivo',
      width: '50%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
      this.getCuentas();
    })
  }

  getCuentas(){
    this.efectivoService.getCuentas().subscribe(data=>{
      data
      this.efectivo = data;
    })
  }

  verDetalleCuenta(id:number){
    this.router.navigate(['../efectivo-list', id], {relativeTo: this.route})
  }

}
