import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DetalleCobro, Form, Venta } from '../../interfaces/caja-interface';
import { CajaService } from '../../services/caja.service';
import { PasswordDialogComponent } from '../../../../global-components/password-dialog/password-dialog.component';
import { Role } from '../../../../../../app.roles';
import { Banco, CuentaBancaria } from '../../../fondos/interfaces/cuenta-bancaria';
import { ConfiguracionGlobalService } from 'src/app/components/dashboard/configuraciones/configuracion/services/configuracion-global.service';
import { ConfiguracionGlobal } from 'src/app/components/dashboard/configuraciones/configuracion/interface/configuracion-global';
import { CajaCobroService } from '../service/caja-cobro.service';
import { ValidatorsFormsCustom } from 'src/app/helpers/validators-form-pay';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-caja-cobro',
  templateUrl: './caja-cobro.component.html',
  styleUrls: ['./caja-cobro.component.css'],
  providers: [MessageService, DialogService]
})
export class CajaCobroComponent implements OnInit{
  
  public select:number=0;
  load=false;
  cuenta!:CuentaBancaria[]
  bancoView!:boolean
  venta!:Venta
  configuracionGlobal!: ConfiguracionGlobal;
  /* @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event:any) {
    event.preventDefault();
    event.returnValue = 'Your data will be lost!';
    this.close(false);
    return false;
  } */
  
  constructor(public readonly cajaCobroService:CajaCobroService,  
              private ref: DynamicDialogRef, 
              public config: DynamicDialogConfig,
              public dialogService: DialogService, 
              private configuracionGlobalService: ConfiguracionGlobalService,
              public validatorsFormsCustom: ValidatorsFormsCustom)
   {      
   }

  ngOnInit(): void {
    this.venta = this.config.data.data
    this.getTipoTransaccion();
    this.getCuentasEncabezado();
    this.getConfiguraciones()
  }

  selector(index:number){     
    this.select = index
  }

  getTipoTransaccion(){
    this.cajaCobroService.getTipoTransaccion().subscribe(data=>{
      this.cajaCobroService.initForm(data, this.venta);
      this.cajaCobroService.getArrayDetalle.setValidators([this.validatorsFormsCustom.totalvalidation(this.venta.total!)]);
      this.cajaCobroService.getArrayDetalle.updateValueAndValidity();
      this.start()
      this.load = true
    })
  }

  start(){
    const formControl = this.cajaCobroService.getArrayDetalle.controls;
    for (let index = 1; index < 4; index++) {
      formControl[index]!.get('monto')?.valueChanges.subscribe(value=>{
      if(value>0 && this.select!=0 && !formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.enableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
        this.configuracionGlobal.cuentaBancaria?this.setCuentaBancaria():null
      }
      if (value==0 || value==null && this.select!=0 && formControl[index]!.get('cuentaBancaria')?.hasValidator(Validators.required)){
        this.validatorsFormsCustom.disableValidatorsForm(['cuentaBancaria', 'documento'], formControl,this.select);
      }
        this.validatorsFormsCustom.setValueEfectivo(formControl, 'tipoTransaccion.id', 'monto', this.venta.total!);
      })
    }
  }

  save() {
   let ref = this.dialogService.open(PasswordDialogComponent, {
      header: 'Credenciales',
      width: '30%',
      data: [Role.CAJERO, Role.ADMIN]
    })
    ref?.onClose.subscribe((resp:any)=>{
      if(resp && this.venta.id !==0){
        this.cajaCobroService.cobrarVenta(resp).subscribe({next:()=>{
            this.close(true);
          },error:(e)=>{
            console.error(e)
          }
        }); 
      }
      if(resp && this.venta.id ==0){
        this.cajaCobroService.form.controls['token'].setValue(resp.accessToken);
        const data = this.cajaCobroService.form.value as Form;
        data.detalleCobro = data.detalleCobro.filter((a)=>a.monto !==0 && a.monto !==null);
        this.cajaCobroService.resetFormBuilder();
        this.ref.close(data)
      }
    })
  }

  close(resp:boolean){
    this.cajaCobroService.resetFormBuilder();
    this.ref.close(resp)
  }

  getCuentasEncabezado(){
    this.cajaCobroService.getCuentasEncabezado().subscribe(data=>{
      this.cuenta = data
    }) 
  }

  getConfiguraciones(){
    this.configuracionGlobalService.getConfiguraciones().subscribe(data =>{
      this.configuracionGlobal = data;
      data.cuentaBancaria?this.bancoView = false:this.bancoView = true
    });
  }

  setCuentaBancaria(){
    const formControl = this.cajaCobroService.getArrayDetalle.controls;
    for(const a of formControl){
      a.patchValue({cuentaBancaria:this.configuracionGlobal.cuentaBancaria});
    }
  }

}



/* import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
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
  }
}
 */