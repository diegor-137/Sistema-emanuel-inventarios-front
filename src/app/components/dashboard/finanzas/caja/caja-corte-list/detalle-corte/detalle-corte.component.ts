import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { CuentaPorCobrarDetalle } from 'src/app/components/dashboard/ventas/creditos/interfaces/cuentas-por-cobrar';
import { CobroDetallado, Corte, Egreso, Gasto, Ingreso } from '../../interfaces/caja-interface';
import { CajaCorteService } from '../../services/caja-corte.service';

@Component({
  selector: 'app-detalle-corte',
  templateUrl: './detalle-corte.component.html',
  styleUrls: ['./detalle-corte.component.css']
})
export class DetalleCorteComponent implements OnInit {

  products:any[]=[]
  corte!:Corte
  saldo:number = 0
  load=false
  mov: movimientos [] = []
  det=false

  constructor(public config: DynamicDialogConfig, private readonly cajaCorteService:CajaCorteService) {
    this.cajaCorteService.findOne(this.config.data[0]).subscribe(resp =>{
      this.corte = resp
      this.load = true
      this.balance()
      if(this.config.data[1].length === 1){
        this.corteDetalles()
        this.det = true
      }
    });
  }

  ngOnInit(): void {}

  balance(){    
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


  
  cobro=false
  cobros!:CobroDetallado[]
  totalCobros!:number

  gasto=false
  gastos!:Gasto[]
  totalGastos!:number

  ingreso=false
  ingresos!:Ingreso[]
  totalIngresos!:number

  egreso=false
  egresos!:Egreso[]
  totalEgresos!:number

  cuentaPorCobrar=false
  cuentasPorCobrar!:CuentaPorCobrarDetalle[]
  totalCuentasPorCobrar!:number
  corteDetalles(){
    this.cajaCorteService.ventasCobrosCorte(this.corte.id, this.corte.caja!.id).subscribe(resp=>{
      this.cobros = resp;
      this.totalCobros = this.cobros.reduce((sum, a)=> sum +  Number(a.detalleCobro[0].cantidad), 0.00);
      if(this.totalCobros>0){
        this.cobro = true
      }
    });

    this.cajaCorteService.gastosCorte(this.corte.id, this.corte.caja!.id).subscribe(resp=>{      
      this.gastos = resp
      this.totalGastos = this.gastos.reduce((sum, a)=> sum +  Number(a.monto), 0.00);
      if(this.totalGastos>0){
        this.gasto = true
      }
    })
    
    this.cajaCorteService.ingresosCorte(this.corte.id, this.corte.caja!.id).subscribe(resp=>{      
      this.ingresos = resp
      this.totalIngresos = this.ingresos.reduce((sum, a)=> sum +  Number(a.monto), 0.00);
      if(this.totalIngresos>0){
        this.ingreso = true
      }
    })

    this.cajaCorteService.egresosCorte(this.corte.id, this.corte.caja!.id).subscribe(resp=>{      
      this.egresos = resp
      this.totalEgresos = this.egresos.reduce((sum, a)=> sum +  Number(a.monto), 0.00);
      if(this.totalEgresos>0){
        this.egreso = true
      }
    })

    this.cajaCorteService.cuentasPorCobrarCorte(this.corte.id, this.corte.caja!.id).subscribe(resp=>{
      console.log(resp, 'Cuentas Por Cobrar <----');
            
      this.cuentasPorCobrar = resp
      this.totalCuentasPorCobrar = this.cuentasPorCobrar.reduce((sum, a)=> sum +  Number(a.monto), 0.00);
      if(this.totalCuentasPorCobrar>0){
        this.cuentaPorCobrar = true
      }
    })
  }

}

interface movimientos {
  concepto: string
  ingreso: number,
  egreso:number,
  saldo: number
}

