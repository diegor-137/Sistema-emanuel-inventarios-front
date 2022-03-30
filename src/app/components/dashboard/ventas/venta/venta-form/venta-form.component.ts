import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormArray } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { Cliente } from '../../cliente/interfaces/cliente';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';
import { VentaService } from '../services/venta.service';
import { EmpleadoService } from '../../../recursos-humanos/empleado/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { MatDialog, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { CompraFormComponent } from '../../../compras/compra/compra-form/compra-form.component';
import { Router } from '@angular/router';
import { ClienteFormComponent } from '../../cliente/cliente-form/cliente-form.component';
import { ClienteService } from '../../cliente/services/cliente.service';
import { ProductoComponent } from '../../producto/producto.component';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-venta-form',
  templateUrl: './venta-form.component.html',
  styleUrls: ['./venta-form.component.css']
})
export class VentaFormComponent implements OnInit {

  loading:boolean = false
  Cliente:Cliente[] = []
  Empleado!:Empleado[]
  Sucursal:Sucursal[] = []
  matcher = new MyErrorStateMatcher();

  constructor(public service:VentaService,
    private clienteService:ClienteService,
    private empleadoService:EmpleadoService,
    private sucursalService:SucursalService,
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<VentaFormComponent>,
    private dialog:MatDialog,
    public router:Router) { }

  ngOnInit(): void {
    this.service.form.get('cliente')?.valueChanges.subscribe(
      nombre => this.getClienteBuscar(nombre)
    )
    this.service.form.get('empleado')?.valueChanges.subscribe(
      nombre => this.getEmpleadoBuscar(nombre)
    )
    this.getSucursal()
    
    if (this.service.view == false) {
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    }
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
  getEmpleadoBuscar(nombre:string){
    return this.empleadoService.getBuscar(nombre).subscribe(data=>{
      this.Empleado = data
    })
  }
  
  getSucursal(){
    return this.sucursalService.getSucursales().subscribe(data=>{
      this.Sucursal = data
    })
  }
  
  displayFn(nombre:Cliente): string {
    return nombre? nombre.nombre :nombre;
  }

  displayFnn(nombre:Empleado): string {
    return nombre? nombre.nombre :nombre;
  }


  onClose(){
    this.service.resetFormBuilder()
  }


  agregarCotizacion(){
      //return console.log(this.service.form.value);
        this.service.createCotizacion()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `realizado con exito`,`Orden de Compra #${res.id}`,{
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
     //return console.log(this.service.form.value);
        this.service.createVenta()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `ingresada con exito`,`Compra #${res.id}`,{
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
      dialogConfig.disableClose = false
      //this.getMarca()
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

  CerrarVenta(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }


  continuarOrden(){
    //return console.log('object :>> ', this.service.form.value.id);
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
