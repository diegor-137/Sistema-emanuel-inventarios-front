import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { CuentaPorCobrar, CuentaPorCobrarDetalle } from '../interfaces/cuentas-por-cobrar';
import { CuentasPorCobrarService } from '../services/cuentas-por-cobrar.service';

@Component({
  selector: 'app-cuentas-por-cobrar',
  templateUrl: './cuentas-por-cobrar.component.html',
  styleUrls: ['./cuentas-por-cobrar.component.css'],
  providers: [MessageService]
})
export class CuentasPorCobrarComponent implements OnInit {
  pagoDialogo!: boolean;
  pagoType!: boolean
  selectCliente!:any
  clientes!:any[]
  cuentasPorCobrar:CuentaPorCobrar[]=[]
  cuentasPorCobrarSeleccionadas:CuentaPorCobrar[]=[]
  cuentaPorCobrarDetalle!:CuentaPorCobrarDetalle[]
  cuentaPorCobrar:CuentaPorCobrar={}
  pagosDetailOpen!:boolean
  checked: boolean = false;

  total:number = 0;
  fechas:Date[]=[]
  headerCheckbox = false;
  constructor(public cuentasPorCobrarService:CuentasPorCobrarService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.fechas.push(new Date(), new Date());    
  }

  filterClientes(event:any){
    this.cuentasPorCobrarService.findNameAuto(event.query).subscribe(res=>{
      this.clientes = res;
    })    
  }

  getTodostCuentasPorCobrar(){
      this.selectCliente = {}
      this.cuentasPorCobrarService.getTodostCuentasPorCobrar().subscribe(res=>{
        this.cuentasPorCobrar = res;   
        this.cuentasPorCobrar.length <=0 && !this.checked ? this.messageService.add({severity:'info', summary: 'Info', detail: `No hay creditos activos`}): null;
        this.total = this.cuentasPorCobrar?.reduce((sum, a)=> sum + Number(a.total!), 0)
        this.checked? this.headerCheckbox= true : this.headerCheckbox = false;
      });
  }

  filterd(){    
    if(this.selectCliente){      
      this.cuentasPorCobrarService.getCuentasPorCobrarbyCliente(this.selectCliente.id, this.checked, this.fechas).subscribe(res=>{
        this.cuentasPorCobrar = res;   
        this.cuentasPorCobrar.length <=0 && !this.checked ? this.messageService.add({severity:'info', summary: 'Info', detail: `El cliente ${this.selectCliente.nombre} no tiene creditos activos`}): null;
        this.total = this.cuentasPorCobrar?.reduce((sum, a)=> sum + Number(a.total!), 0)
        this.checked? this.headerCheckbox= true : this.headerCheckbox = false;
      });
    }
  }

  monto!:number
  parcial!: number
  pagoDialog(cuentaPorCobrar?:CuentaPorCobrar){
    if(cuentaPorCobrar){
      this.cuentasPorCobrarSeleccionadas = []
      this.cuentasPorCobrarSeleccionadas.push(cuentaPorCobrar!)
      this.monto = cuentaPorCobrar!.saldo!
      this.parcial = 0;
      this.pagoType = false
    }else{
      const monto = this.cuentasPorCobrarSeleccionadas.reduce((sum, a)=> sum + Number(a.saldo), 0.00);
      this.monto = monto;
      this.parcial = monto;
      this.pagoType = true
    }    
    this.pagoDialogo= true
  }

  realizarPagos(){
    this.pagoType ? this.cuentasPorCobrarService.pagarCreditos(this.cuentasPorCobrarSeleccionadas).subscribe(()=>{
      console.log('Creditos muchos pagados'); 
      this.pagoSuccess()     
    }) : this.cuentasPorCobrarService.pagarCredito(this.cuentasPorCobrarSeleccionadas, this.parcial).subscribe(()=>{
      console.log('Credito uno pagado');     
      this.pagoSuccess()
         }, (e)=>{
          this.messageService.add({severity:'success', summary: 'Confirmacion', detail: `Pago realizado con exito.`}) 
         })   
  }

  pagoSuccess(){
    this.pagoDialogo = false 
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Pago realizado con exito'});
      this.filterd() 
  }

  cerrar(){
    this.cuentasPorCobrarSeleccionadas=[]
    this.pagoDialogo = false;
  }

  pagosDetail(cuentaPorCobrar:CuentaPorCobrar){
    this.cuentasPorCobrarService.pagosDetail(cuentaPorCobrar.id!).subscribe(res=>this.cuentaPorCobrarDetalle = res);
    this.cuentaPorCobrar = cuentaPorCobrar;
    this.pagosDetailOpen = true;        
  }

}
