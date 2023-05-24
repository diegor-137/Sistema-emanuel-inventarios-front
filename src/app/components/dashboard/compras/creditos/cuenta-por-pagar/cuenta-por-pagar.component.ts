import { Component, OnInit } from '@angular/core';
import { CuentaPorPagarService } from '../services/cuenta-por-pagar.service';
import { MessageService } from 'primeng/api';
import { CuentaPorPagar, CuentaPorPagarDetalle } from '../interfaces/cuenta-por-pagar';

@Component({
  selector: 'app-cuenta-por-pagar',
  templateUrl: './cuenta-por-pagar.component.html',
  styleUrls: ['./cuenta-por-pagar.component.css'],
  providers: [MessageService]
})
export class CuentaPorPagarComponent implements OnInit {
  pagoDialogo!: boolean;
  pagoType!: boolean
  selectProveedor!: any;
  proovedores!: any[];
  cuentasPorPagar!:CuentaPorPagar[]
  cuentasPorPagarSeleccionados:CuentaPorPagar[]=[]
  cuentaPorPagarDetalle!:CuentaPorPagarDetalle[]
  cuentaPorPagar:CuentaPorPagar={}  
  pagosDetailOpen!:boolean
  checked: boolean = false;

  total:number = 0;
  fechas:Date[]=[]
  headerCheckbox = false;
  constructor(public cuentaPorPagarService:CuentaPorPagarService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fechas.push(new Date(), new Date());
  }

  filterProovedores(event:any){
    this.cuentaPorPagarService.findNameAuto(event.query).subscribe(res=>{
      this.proovedores = res;
    })    
  }

  getTodosCuentasPorPagar(){
    this.selectProveedor = {}
    this.cuentaPorPagarService.getTodosCuentasPorPagar().subscribe(res=>{
      this.cuentasPorPagar = res;   
      this.cuentasPorPagar.length <=0 && !this.checked ? this.messageService.add({severity:'info', summary: 'Info', detail: `No hay pagos pendientes`}): null;
      this.total = this.cuentasPorPagar?.reduce((sum, a)=> sum + Number(a.total!), 0)
      this.checked? this.headerCheckbox= true : this.headerCheckbox = false;
    });
}

  /* filterd(){
    this.cuentasPorPagarSeleccionados=[]
    if(this.selectProveedor){
      this.cuentaPorPagarService.getCuentasPorPagarByProveedor(this.selectProveedor).subscribe(res=>{
        this.cuentasPorPagar = res;   
      });    
    }else{
      this.messageService.add({severity:'info', summary: 'Info', detail: 'No existe el proveedor'});
    }
  } */

  /* pagar(){
    const monto = this.cuentasPorPagarSeleccionados.reduce((sum, a)=> sum + Number(a.saldo), 0.00);
    this.cuentaPorPagarService.form.controls['monto'].setValue(monto);    
    this.cuentaPorPagarService.form.controls['total'].setValue(monto);    
    this.pagoType = true 
    this.pagotDialog = true        
  }

  
  
  pagoParcial(cuentaPorPagar:CuentaPorPagar){
    this.cuentasPorPagarSeleccionados = []
    this.cuentasPorPagarSeleccionados.push(cuentaPorPagar)
    this.cuentaPorPagarService.form.controls['total'].setValue(cuentaPorPagar.saldo);
    this.cuentaPorPagarService.form.controls['monto'].setValue(0.00);
    this.pagoType = false    
    this.pagotDialog = true    
  } */

  filterd(){    
    if(this.selectProveedor){
      this.cuentaPorPagarService.getCuentasPorPagarByProveedor(this.selectProveedor.id, this.checked, this.fechas).subscribe(res=>{
        this.cuentasPorPagar = res;   
        this.cuentasPorPagar.length <=0 && !this.checked ? this.messageService.add({severity:'info', summary: 'Info', detail: `El proveedor ${this.selectProveedor.nombre} no tiene creditos pendientes`}): null;
        this.total = this.cuentasPorPagar?.reduce((sum, a)=> sum + Number(a.total!), 0)
        this.checked? this.headerCheckbox= true : this.headerCheckbox = false;
      });
    }
  }

  monto!:number
  parcial!: number
  pagoDialog(cuentaPorPagar?:CuentaPorPagar){
    if(cuentaPorPagar){
      this.cuentasPorPagarSeleccionados = []
      this.cuentasPorPagarSeleccionados.push(cuentaPorPagar!)
      this.monto = cuentaPorPagar!.saldo!
      this.parcial = 0;
      this.pagoType = false
    }else{
      const monto = this.cuentasPorPagarSeleccionados.reduce((sum, a)=> sum + Number(a.saldo), 0.00);
      this.monto = monto;
      this.parcial = monto;
      this.pagoType = true
    }    
    this.pagoDialogo= true
  }

  pagoSuccess(){
    this.pagoDialogo = false 
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Pago realizado con exito'});
      this.filterd() 
  }

  realizarPagos(){
    this.pagoType ? this.cuentaPorPagarService.pagarCreditos(this.cuentasPorPagarSeleccionados).subscribe(()=>{
      console.log('Creditos muchos pagados'); 
      this.pagoSuccess()     
    }) : this.cuentaPorPagarService.pagarCredito(this.cuentasPorPagarSeleccionados, this.parcial).subscribe(()=>{
      console.log('Credito uno pagado');     
      this.pagoSuccess()
      }, (e)=>{
        this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
       })   
  }

  cerrar(){
    this.cuentasPorPagarSeleccionados=[]
    this.pagoDialogo = false;
  }

  pagosDetail(cuentaPorPagar:CuentaPorPagar){
    this.cuentaPorPagarService.pagosDetail(cuentaPorPagar.id!).subscribe(res=>this.cuentaPorPagarDetalle = res);
    this.cuentaPorPagar = cuentaPorPagar;
    this.pagosDetailOpen = true;        
  }

}
