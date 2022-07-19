import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Corte } from '../../interfaces/caja-interface';
import { CajaCorteService } from '../../services/caja-corte.service';

@Component({
  selector: 'app-detalle-corte',
  templateUrl: './detalle-corte.component.html',
  styleUrls: ['./detalle-corte.component.css']
})
export class DetalleCorteComponent implements OnInit {

  products!:any[]
  corte!:Corte
  saldo:number = 0
  load=false
  mov: movimientos [] = []
  constructor(public config: DynamicDialogConfig, private readonly cajaCorteService:CajaCorteService) { 
    this.cajaCorteService.findOne(this.config.data).subscribe(resp =>{
      this.corte = resp
      this.load = true
      this.balance()
    });

  }

  ngOnInit(): void {}

  balance(){
    if(this.corte.corteCajaDetalle[1].type){
      this.corte.corteCajaDetalle[0].monto -= this.corte.corteCajaDetalle[1].monto 
    }   
   this.corte.corteCajaDetalle.forEach(resp=>{     
   this.saldo += resp.type? Number(resp.monto): - Number(resp.monto)    
     let movimiento:movimientos ={
          concepto:resp.concepto,
          ingreso:resp.type? Number(resp.monto): 0,
          egreso:resp.type? 0: Number(resp.monto),
          saldo: this.saldo         
     }
     this.mov.push(movimiento) 
   })          
  }

}

interface movimientos {
  concepto: string
  ingreso: number,
  egreso:number,
  saldo: number
}
