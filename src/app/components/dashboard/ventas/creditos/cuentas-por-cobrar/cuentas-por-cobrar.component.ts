import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CuentaPorCobrar, CuentaPorCobrarDetalle } from '../interfaces/cuentas-por-cobrar';
import { CuentasPorCobrarService } from '../services/cuentas-por-cobrar.service';
import { CuentaBancaria } from '../../../finanzas/fondos/interfaces/cuenta-bancaria';
import { DialogService } from 'primeng/dynamicdialog';
import { CuentasPorCobrarFormComponent } from '../cuentas-por-cobrar-form/cuentas-por-cobrar-form.component';

@Component({
  selector: 'app-cuentas-por-cobrar',
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrls: ['./cuentas-por-cobrar.component.css'],
  providers: [MessageService, DialogService]
})
export class CuentasPorCobrarComponent implements OnInit {
  selectCliente!:any
  clientes!:any[]
  cuentasPorCobrar:CuentaPorCobrar[]=[]
  cuentaPorCobrarDetalle!:CuentaPorCobrarDetalle[]
  cuentaPorCobrar:CuentaPorCobrar={}
  pagosDetailOpen:boolean=false
  
  total:number = 0;
  headerCheckbox = false;
  cuentasPorCobrarSeleccionadas:CuentaPorCobrar[]=[]
  constructor(public cuentasPorCobrarService:CuentasPorCobrarService, private messageService: MessageService, public dialogService: DialogService) {}
  
  ngOnInit(): void {
    this.cuentasPorCobrarService.resetFormBuilder();
  }

  clean(){
      this.cuentasPorCobrarSeleccionadas=[]
      this.selectCliente = null
      this.cuentasPorCobrar = []
      this.total = 0
  }

  filterClientes(event:any){
    this.cuentasPorCobrarService.findNameAuto(event.query).subscribe(res=>{
      this.clientes = res;
    })    
  }

  getTodostCuentasPorCobrar(){
    this.selectCliente = null
    this.filterd()
  }

  filterd(){     
      this.cuentasPorCobrarService.getCuentasPorCobrarbyCliente(this.selectCliente?.id).subscribe(res=>{
        this.messageService.clear()
        this.cuentasPorCobrar = res;   
        this.cuentasPorCobrar.length <=0 && !this.cuentasPorCobrarService.form.get('checked')?.value ? this.messageService.add({severity:'info', summary: 'Info', detail: `El cliente ${this.selectCliente.nombre} no tiene creditos activos`}): null;
        this.total = this.cuentasPorCobrar?.reduce((sum, a)=> sum + Number(a.total!), 0)
        this.cuentasPorCobrarService.form.get('checked')?.value? this.headerCheckbox= true : this.headerCheckbox = false;
      });
  }

  pagoDialog(){
    console.log(this.cuentasPorCobrarSeleccionadas);
  }

  pagosDetail(cuentaPorCobrar:CuentaPorCobrar){
    this.cuentasPorCobrarService.pagosDetail(cuentaPorCobrar.id!).subscribe(res=>{
      this.cuentaPorCobrarDetalle = res
      this.cuentaPorCobrar = cuentaPorCobrar;
      this.pagosDetailOpen = true;             
    });
  }


  openPagoForm(cuentaPorCobrar:CuentaPorCobrar){
    const ref =this.dialogService.open(CuentasPorCobrarFormComponent, {
      data:{cuentaPorCobrar},
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
            this.selectCliente?this.filterd():this.getTodostCuentasPorCobrar();  
          }
        })
    
  }

}
