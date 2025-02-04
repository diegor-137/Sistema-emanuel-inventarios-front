import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormArray, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { Cliente } from '../../cliente/interfaces/cliente';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';
import { VentaService } from '../services/venta.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ProductoComponent } from '../../producto/producto.component';
import { Socket } from 'ngx-socket-io';
import { CustomSocket } from '../../socekts/custom-sockets'
import { AuthService } from 'src/app/auth/services/auth.service';
import { ConfiguracionGlobalService } from '../../../configuraciones/configuracion/services/configuracion-global.service';
import { ConfiguracionGlobal } from '../../../configuraciones/configuracion/interface/configuracion-global';
import { DialogService } from 'primeng/dynamicdialog';
import { CajaCobroComponent } from '../../../finanzas/caja/caja-list/caja-cobro/caja-cobro.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css'],
  providers: [DialogService]
})
export class VentaFormComponent implements OnInit {

  loading:boolean = false
  Cliente:Cliente[] = []
  Empleado!:Empleado[]
  Sucursal:Sucursal[] = []
  matcher = new MyErrorStateMatcher();
  pago!: any[];
  pagoSeleccionado!: Pago
  configuracionGlobal!: ConfiguracionGlobal;

  constructor(public service:VentaService,
    private clienteService:ClienteService,
    private authService:AuthService,
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<VentaFormComponent>,
    private dialog:MatDialog,
    public router:Router,
    private socket: CustomSocket,
    public dialogService: DialogService,
    private configuracionGlobalService: ConfiguracionGlobalService) { }

  ngOnInit(): void {
    this.service.form.get('cliente')?.valueChanges.subscribe(
      nombre => this.getClienteBuscar(nombre)
    )
    if (this.service.view == false) {
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    }
    this.pago = [
      {name: 'Contado', code: false},                  
      {name: 'Credito', code: true},                  
    ];
    this.getConfiguraciones();
  }

  getConfiguraciones(){
    this.configuracionGlobalService.getConfiguraciones().subscribe(data =>{
      this.configuracionGlobal = data;
    });
  }

  precios(){
    //(this.service.form.controls["detalle"] as FormArray).valueChanges.subscribe(value => {
    //  console.log('Cambio');
    //})
  }

  getClienteBuscar(nombre:string){
    this.clienteService.getBuscar(nombre).subscribe(data=>{
      this.Cliente = data
    })
  }
  get usuario(){
    return this.authService.usuario;
  }
  
  displayFn(nombre:Cliente): string {
    return nombre? nombre.nombre :nombre;
  }

  onClose(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
  }


  agregarCotizacion(){
    if (this.service.form.value.detalle.length===0) {
      this.toastr.error(`Ingrese producto para realizar Cotizacion`,`No hay productos`,{
        positionClass:'toast-bottom-right'      
      })
      return
    }
      //return console.log(this.service.form.value);
        this.service.createCotizacion()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `realizado con exito`,`Cotizacion #${res.id}`,{
              positionClass:'toast-bottom-right'      
            })
            this.onClose()
          },
          err => {
            this.toastr.error(`${err.message}`,`Succedio un error`,{
              positionClass:'toast-bottom-right'      
            })
            console.log(err);
          }
        )    
  }

  agregar(){
        if (this.service.form.value.detalle.length===0) {
          this.toastr.error(`Ingrese producto para realizar venta`,`No hay productos`,{
            positionClass:'toast-bottom-right'      
          })
          return
        }
        if(this.configuracionGlobal.ventaCobro){
          const {nombre}=this.service.form.controls.cliente.value
          const ref =this.dialogService.open(CajaCobroComponent, {
            data:{data:{id:0, cliente: nombre, fecha:new Date(), total:this.service.total_factura}},
            header: 'Realizar pago compra',
            width: '80%',
            height:'80%',
            contentStyle: {"max-height": "800px", "overflow": "auto"},
            baseZIndex: 10000,
            closeOnEscape: false,
            closable: false
          })
          ref.onClose.subscribe((resp)=>{
                if(resp!==false){
                  this.service.form.patchValue({cobroVenta: resp})
                  this.createVenta()
                }
          })
        }else{
          this.createVenta()
        }
  }

  createVenta(){
    this.service.createVenta()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `ingresada con exito`,`Venta #${res.id}`,{
              positionClass:'toast-bottom-right'      
            })
            this.onClose();
            this.socket.emit('getFacturas', {token: this.usuario.accessToken})
          },
          err => {
            this.toastr.error(`${err.error.message}`,`Succedio un error`,{
              positionClass:'toast-bottom-right'      
            })
            console.log(err.error.message);
          }
        )      
  }

  
  onKeyPress(event:any){
    if (this.service.form.get('categoria.id')?.hasError('incorrect')) {
      console.log('object :>> ',"no existe el registro");
    } else {
      
    }
  }

  openCliente(){
    this.clienteService.resetFormBuilder()
    this.clienteService.configNuevo()
    this.clienteService.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.width = "75%"
    const dialogo = this.dialog.open(ClienteFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.service.form.patchValue({
        cliente:res
      })
      dialogConfig.disableClose = false
    })
  }

  openProducto(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialogo = this.dialog.open(ProductoComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
    })
  }

  borrarPrecio(i:number){
    this.service.Detalle.removeAt(i)
    this.service.total()
  }

  onKey(event:KeyboardEvent){
    this.service.cambio()
    this.service.total()
  }
  
  
  onChange(data:any){
    //console.log('object :>>', data);
    //this.service.form
    this.service.cambio()
    this.service.total()
  }
  onChanges(data:any){
    console.log('object :>>', data);
    //this.service.form
    //this.service.total()
  }
  get NombreForm(){
    return this.service.form.get('nombre')
  }

  get DescripcionForm(){
    return this.service.form.get('descripcion')
  }

  get UltimoPrecioForm(){
    return this.service.form.get('ultimo_precio')
  }

  get EmpleadoForm(){
    return this.service.form.get('empleado')
  }

  get ClienteForm(){
    return this.service.form.get('cliente')
  }

  get CantidadForm(){
    return this.service.form.controls["detalle"].get('cantidad')
  }

  CerrarVenta(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }

  continuarCotizacion(){
    this.dialogRef.close()
    this.service.id = this.service.form.value.id
    this.service.configNuevo()
    this.service.llenarFormularioCotizacion(this.service.id)
    this.router.navigate(['/dashboard/compras/compra-form'])
  }

  llenar(){
    console.log('object :>> ', this.service.id);
    this.service.llenarFormularioCotizacion(this.service.id)
  }
}

interface Pago {
  name: string,
  code: boolean
}