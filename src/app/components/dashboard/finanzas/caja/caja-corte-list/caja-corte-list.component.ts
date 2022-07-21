import { Component, OnInit, OnDestroy } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Caja, Corte } from '../interfaces/caja-interface';
import { CajaCorteService } from '../services/caja-corte.service';
import { CajaConfigService } from '../services/cajaConfig.service';
import { DetalleCorteComponent } from './detalle-corte/detalle-corte.component';

@Component({
  selector: 'app-caja-corte-list',
  templateUrl: './caja-corte-list.component.html',
  styleUrls: ['./caja-corte-list.component.css'],
  providers: [DialogService]
})
export class CajaCorteListComponent implements OnInit, OnDestroy {

  cajasList!:Caja[]
  cortes!:Corte[]
  rangeDates!: Date[];
  ref!: DynamicDialogRef;
  detalle:number[]=[]
  constructor(public readonly cajaCorteService:CajaCorteService, private readonly cajaConfigService:CajaConfigService, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.cajas()
  }

  cajas(){
    this.cajaConfigService.cajas().subscribe(resp => this.cajasList = resp)
  }

  cortesAll(){
    this.cajaCorteService.cortes().subscribe(resp => this.cortes = resp)    
  }

  detalleCorte(id:number){
    this.detalle = this.detalle.filter(val=> id === val);
    this.ref =this.dialogService.open(DetalleCorteComponent, {
      data : [id, this.detalle],
      header: 'Detalle corte',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    })
  }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }  

}

