import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { CuentaPorPagar, CuentaPorPagarDetalle } from '../interfaces/cuenta-por-pagar';
import { CuentaPorPagarService } from '../services/cuenta-por-pagar.service';
import { CuentasPorPagarFormComponent } from '../cuentas-por-pagar-form/cuentas-por-pagar-form.component';

@Component({
  selector: 'app-cuenta-por-pagar',
  templateUrl: './cuenta-por-pagar.component.html',
  styleUrls: ['./cuenta-por-pagar.component.css'],
  providers: [MessageService, DialogService]
})
export class CuentaPorPagarComponent implements OnInit {
  selectProveedor!:any
  proovedores!:any[]
  cuentasPorPagar:CuentaPorPagar[]=[]
  cuentaPorPagarDetalle!:CuentaPorPagarDetalle[]
  cuentaPorPagar:CuentaPorPagar={}  
  pagosDetailOpen!:boolean
  
  total:number = 0;
  headerCheckbox = false;
  cuentasPorPagarSeleccionados:CuentaPorPagar[]=[]
  constructor(public cuentaPorPagarService:CuentaPorPagarService, private messageService: MessageService, public dialogService: DialogService) {}
  
  ngOnInit(): void {
    this.cuentaPorPagarService.resetFormBuilder();
  }

  clean(){
      this.cuentasPorPagarSeleccionados=[]
      this.selectProveedor = null
      this.cuentasPorPagar = []
      this.total = 0
  }

  filterProovedores(event:any){
    this.cuentaPorPagarService.findNameAuto(event.query).subscribe(res=>{
      this.proovedores = res;
    })    
  }

  getTodosCuentasPorPagar(){
    this.selectProveedor = null
    this.filterd()
  }

  filterd(){     
      this.cuentaPorPagarService.getCuentasPorPagarByProveedor(this.selectProveedor?.id).subscribe(res=>{
        this.messageService.clear()
        this.cuentasPorPagar = res;
        console.log(res);
           
        //this.cuentasPorPagar.length <=0 && !this.cuentaPorPagarService.form.get('checked')?.value ? this.messageService.add({severity:'info', summary: 'Info', detail: `El cliente ${this.selectProveedor.nombre} no tiene creditos activos`}): null;
        this.total = this.cuentasPorPagar?.reduce((sum, a)=> sum + Number(a.total!), 0)
        this.cuentaPorPagarService.form.get('checked')?.value? this.headerCheckbox= true : this.headerCheckbox = false;
      });
  }

  pagoDialog(){
    console.log(this.cuentasPorPagarSeleccionados);
  }

  cerrar(){
    this.cuentasPorPagarSeleccionados=[]
  }

  pagosDetail(cuentaPorPagar:CuentaPorPagar){
    this.cuentaPorPagarService.pagosDetail(cuentaPorPagar.id!).subscribe(res=>{
      this.cuentaPorPagarDetalle = res
      console.log(this.cuentaPorPagarDetalle);
      
      this.cuentaPorPagar = cuentaPorPagar;
      this.pagosDetailOpen = true;             
    });
  }


  openPagoForm(cuentaPorPagar:CuentaPorPagar){
    const ref =this.dialogService.open(CuentasPorPagarFormComponent, {
      data:{cuentaPorPagar},
      header: 'Realizar pago de credito parcial',
      width: '80%',
      height:'80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000,
      closable:false
    })
    ref.onClose.subscribe((resp:boolean)=>{
          if(resp){
            this.messageService.add({severity:'success', summary: 'Exito', detail: 'Pago realizado con exito'});
            this.selectProveedor?this.filterd():this.getTodosCuentasPorPagar();  
          }
        })
    
  }

}

/* ################################################################################################################################ */

/* import { Component, OnInit } from '@angular/core';
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

/* ################################################################################################################################ */
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