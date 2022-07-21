import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleCobro, Venta } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';
import { PasswordDialogComponent } from '../../../../global-components/password-dialog/password-dialog.component';
import { Role } from '../../../../../../app.roles';

@Component({
  selector: 'app-caja-cobro',
  templateUrl: './caja-cobro.component.html',
  styleUrls: ['./caja-cobro.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaCobroComponent implements OnInit{

  detalleCobro: DetalleCobro [] = [
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Efectivo.", id:1}, icon: 'pi-money-bill', estado: false},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Tarjeta.", id:2}, icon: 'pi-credit-card', estado: true},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Cheque.", id:3}, icon: 'pi-id-card', estado: true},
    {descripcion: '', cantidad: 0, tipoCobro:{nombre: "Transferencia.", id:4}, icon: 'pi-wallet', estado: true},
  ]

  tipoCobro!: any[]
  objeto:number = 1;
  disabled = true;
  venta!:Venta
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
              public dialogService: DialogService)
   {    
    this.cajaService.tipoCobro().subscribe(data=>{this.tipoCobro = data})      
   }

  ngOnInit(): void {
    this.venta = this.config.data.data
    this.detalleCobro[0].cantidad = this.venta.total;
    this.cajaService.formCobro.patchValue({venta: this.venta.id})
    
  }

  setDescripcion(data:number){
    this.objeto = data    
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

    const detalle = this.detalleCobro.filter((detalle)=> detalle.cantidad !== 0 && detalle.cantidad !== null) //eliminar los metodos de pago sin cantidad    
    let sum = 0;
    detalle.forEach(a=> sum += Number(a.cantidad));
    this.cajaService.llenarCobro(detalle) 

    let ref;
    if(sum == Number(this.venta.total)){
      ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Realizar Corte',
      width: '30%',
      data: [Role.CAJERO, Role.ADMIN]
    })
    }else{
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
