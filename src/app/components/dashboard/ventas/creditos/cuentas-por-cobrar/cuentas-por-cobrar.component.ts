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
  pagoDialogo!: boolean;
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
  constructor(public cuentasPorCobrarService:CuentasPorCobrarService, private messageService: MessageService, public dialogService: DialogService) { }

  cuentaPorCobrarDetallePay:CuentaPorCobrarDetalle []=[
    {descripcion: '', monto: 0, balance:0,  tipoCobro:{nombre: "Efectivo.", id:1}, cuentaPorCobrar:0 ,icon: 'pi-money-bill', documento:''},  
    {descripcion: '', monto: 0, balance:0,  tipoCobro:{nombre: "Tarjeta.", id:2}, cuentaPorCobrar:0 ,icon: 'pi-credit-card', documento:''},  
    {descripcion: '', monto: 0, balance:0,  tipoCobro:{nombre: "Cheque.", id:3}, cuentaPorCobrar:0 ,icon: 'pi-id-card', documento:''},  
    {descripcion: '', monto: 0, balance:0,  tipoCobro:{nombre: "Transferencia.", id:4}, cuentaPorCobrar:0 ,icon: 'pi-wallet', documento:''},  
  ]

  ngOnInit(): void {
    this.fechas.push(new Date(), new Date()); 
    this.cuentasPorCobrarService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    })   
  }

  objeto:number = 1;
  cuenta!:CuentaBancaria[]
  setDescripcion(data:number){
    this.objeto = data    
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
        console.log(this.cuentasPorCobrar);
         
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
/*     if(cuentaPorCobrar){
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
    this.pagoDialogo= true */

    
      this.cuentasPorCobrarSeleccionadas = []
      this.cuentasPorCobrarSeleccionadas.push(cuentaPorCobrar!)
      this.monto = cuentaPorCobrar!.saldo!
      this.pagoDialogo= true
  }

  realizarPagos(){
    let confirmation:boolean=true
    const detalle = this.cuentaPorCobrarDetallePay.filter((detalle)=> detalle.monto !== 0 && detalle.monto !== null) //eliminar los metodos de pago sin cantidad    
    let sum = 0;
    detalle.forEach(a=> sum += Number(a.monto));
    detalle.forEach(a=>{
      a.cuentaPorCobrar = this.cuentasPorCobrarSeleccionadas[0].id;
      if(a.tipoCobro.id !=1 && a.documento==''){
        confirmation = false
        this.messageService.add({severity:'error', summary:'DOCUMENTO', detail: `El documento ${a.tipoCobro.nombre} debe tener respaldo!`});      
      }
      if(a.tipoCobro.id !=1 && a.cuentaBancaria?.nombre ==null){
        confirmation = false
        this.messageService.add({severity:'error', summary:'DOCUMENTO', detail: `Debe seleccionar una cuenta bancaria en ${a.tipoCobro.nombre}!`});      
      }
    })
    /* if(sum !== Number(this.monto)){
      this.messageService.add({severity:'error', summary:'TOTAL', detail: 'El Cobro no coincide con el total!'});      
    } */
    this.cuentasPorCobrarService.llenarCobro(detalle)
      if(sum >0 && confirmation){
        this.cuentasPorCobrarService.pagarCredito().subscribe(()=>{            
          this.pagoSuccess()
        },e=>{
            console.log(e); 
            this.messageService.add({severity:'error', summary:'Error', detail: `${e.error.message}`});           
        })
        }
      

    /* this.pagoType ? this.cuentasPorCobrarService.pagarCreditos(this.cuentasPorCobrarSeleccionadas).subscribe(()=>{
      console.log('Creditos muchos pagados'); 
      this.pagoSuccess()     
    }) : this.cuentasPorCobrarService.pagarCredito(this.cuentasPorCobrarSeleccionadas, this.parcial).subscribe(()=>{
      console.log('Credito uno pagado');     
      this.pagoSuccess()
         }, (e)=>{
          this.messageService.add({severity:'error', summary: 'Error', detail: `${e.error.message}`}) 
         })  */  
  }

  pagoSuccess(){
    this.pagoDialogo = false 
      this.messageService.add({severity:'success', summary: 'Exito', detail: 'Pago realizado con exito'});
      //this.filterd() 
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


  openPagoForm(){
    const ref =this.dialogService.open(CuentasPorCobrarFormComponent, {
      header: 'Realizar pago de credito parcial',
      width: '80%',
      height:'80%',
      contentStyle: {"max-height": "800px", "overflow": "auto"},
      baseZIndex: 10000
    })
    ref.onClose.subscribe(()=>{
    })
  }

}
