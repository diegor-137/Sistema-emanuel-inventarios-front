import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleCobro, Venta } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';
import { PasswordDialogComponent } from '../../../../global-components/password-dialog/password-dialog.component';
import { Role } from '../../../../../../app.roles';
import { Banco, CuentaBancaria } from '../../../fondos/interfaces/cuenta-bancaria';
import { ConfiguracionGlobalService } from 'src/app/components/dashboard/configuraciones/configuracion/services/configuracion-global.service';
import { ConfiguracionGlobal } from 'src/app/components/dashboard/configuraciones/configuracion/interface/configuracion-global';

@Component({
  selector: 'app-caja-cobro',
  templateUrl: './caja-cobro.component.html',
  styleUrls: ['./caja-cobro.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaCobroComponent implements OnInit{

  detalleCobro: DetalleCobro [] = [
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Efectivo.", id:1}, icon: 'pi-money-bill', estado: false},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Tarjeta.", id:2}, icon: 'pi-credit-card', estado: false, documento:''},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Cheque.", id:3}, icon: 'pi-id-card', estado: false, documento:''},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Transferencia.", id:4}, icon: 'pi-wallet', estado: false, documento:''},
  ]

  configuracionGlobal!: ConfiguracionGlobal;
  bancoView!:boolean
  tipoCobro!: any[]
  objeto:number = 1;
  disabled = true;
  venta!:Venta
  banco!:CuentaBancaria[]
  @ViewChild('inputEfectivo') inputEfectivo!: ElementRef;

 /*  ngAfterViewInit() {
    setTimeout(() => {
      this.inputEfectivo.nativeElement.focus();
      });
  } */
  
    
  constructor(public readonly cajaService:CajaService,  
              private messageService: MessageService, 
              private ref: DynamicDialogRef, 
              public config: DynamicDialogConfig,
              public dialogService: DialogService, 
              private configuracionGlobalService: ConfiguracionGlobalService)
   {    
    this.cajaService.tipoCobro().subscribe(data=>{this.tipoCobro = data})      
   }

  ngOnInit(): void {
    this.venta = this.config.data.data
    this.detalleCobro[0].cantidad = this.venta.total;
    this.cajaService.formCobro.patchValue({venta: this.venta.id})
    this.cajaService.getCuentasEncabezado().subscribe(data=>{
      this.banco = data
    })
    this.getConfiguraciones()
  }

  setDescripcion(data:number){
    this.objeto = data    
  }

  getConfiguraciones(){
    this.configuracionGlobalService.getConfiguraciones().subscribe(data =>{
      this.configuracionGlobal = data
      data.cuentaBancaria?this.bancoView = false:this.bancoView = true
    });
  }

  close(){
    this.cleanDetalle()
    this.ref.close()
  }

  cleanDetalle(){
    this.detalleCobro.forEach(data=>{
      data.descripcion = ''
      data.cantidad = 0
    })
  }

  cobrar(){
    console.log(this.detalleCobro);
    
    /* const detalle = this.detalleCobro.filter((detalle)=> detalle.cantidad !== 0 && detalle.cantidad !== null) //eliminar los metodos de pago sin cantidad    
    let sum = 0;
    detalle.forEach(a=> sum += Number(a.cantidad));
    if(sum == Number(this.venta.total)){ //Funcion para verificar si el total coincide con el cobro.
      this.cajaService.llenarCobro(detalle)       
      this.cleanDetalle() //Limpiar array de detalle cobro.
      this.ref.close(true)
    }else{
      this.messageService.add({severity:'error', summary:'TOTAL', detail: 'El Cobro no coincide con el total!'});      
    }  */
    let confirmation:boolean=true
    const detalle = this.detalleCobro.filter((detalle)=> detalle.cantidad !== 0 && detalle.cantidad !== null) //eliminar los metodos de pago sin cantidad    
    let sum = 0;
    detalle.forEach(a=> sum += Number(a.cantidad));
    detalle.forEach(a=>{
      if(a.tipoCobro.id !=1 && a.documento==''){
        confirmation = false
        this.messageService.add({severity:'error', summary:'DOCUMENTO', detail: `El documento ${a.tipoCobro.nombre} debe tener respaldo!`});      
      }
      if(a.tipoCobro.id !=1 && a.cuentaBancaria?.nombre ==null && !this.configuracionGlobal.cuentaBancaria){
        confirmation = false
        this.messageService.add({severity:'error', summary:'DOCUMENTO', detail: `Debe seleccionar una cuenta bancaria en ${a.tipoCobro.nombre}!`});      
      }
      if(this.configuracionGlobal.cuentaBancaria){
        a.cuentaBancaria = this.configuracionGlobal.cuentaBancaria
      }
    })
    this.cajaService.llenarCobro(detalle) 
      let ref;
      if(sum == Number(this.venta.total) && confirmation){
        ref = this.dialogService.open(PasswordDialogComponent, {
        header: 'Realizar Corte',
        width: '30%',
        data: [Role.CAJERO, Role.ADMIN]
      })}
      if(sum !== Number(this.venta.total)){
        this.messageService.add({severity:'error', summary:'TOTAL', detail: 'El Cobro no coincide con el total!'});      
      }
    

    ref?.onClose.subscribe((resp:any)=>{
        if(resp){
          this.cajaService.cobro(resp).subscribe(()=>{            
            this.ref.close(true)
          },e=>{
              console.log(e);            
          }) 
        }
    })

    
    
    
     //Funcion para verificar si el total coincide con el cobro.
      
      
     
  
  }
}
