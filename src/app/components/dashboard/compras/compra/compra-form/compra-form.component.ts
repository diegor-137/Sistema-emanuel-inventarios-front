import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Proveedor } from '../../proveedor/interfaces/proveedor';
import { Empleado } from '../../../recursos-humanos/empleado/interfaces/empleado';
import { CompraService } from '../services/compra.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { ProveedorService } from '../../proveedor/services/proveedor.service';
import { EmpleadoService } from '../../../recursos-humanos/empleado/services/empleado.service';
import { ProductoComponent } from '../producto/producto.component';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';
import { Router } from '@angular/router';
import { ProveedorFormComponent } from '../../proveedor/proveedor-form/proveedor-form.component';
import { CompraContadoFormComponent } from '../compra-contado-form/compra-contado-form.component';
//import { DialogService } from 'primeng/dynamicdialog';
import { PagoFormComponent } from '../../pago-form/pago-form.component';
import { DialogService } from 'primeng/dynamicdialog';
import { ReportViewComponent } from '../../../reports/report-view/report-view.component';
import { impresionCompra_pdf } from '../interfaces/impresion_compra_pdf';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-compra-form',
  templateUrl: './compra-form.component.html',
  styleUrls: ['./compra-form.component.css'],
  providers: [DialogService]
})
export class CompraFormComponent implements OnInit {

  loading:boolean = false
  Proveedor:Proveedor[] = []
  Empleado!:Empleado[]
  Sucursal:Sucursal[] = []
  impresion:[]=[];
  matcher = new MyErrorStateMatcher();
  pagoType!: any[];
  pagoSeleccionado!: PagoType 
  constructor(public service:CompraService,
              private proveedorService:ProveedorService,
              private empleadoService:EmpleadoService,
              private sucursalService:SucursalService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<CompraFormComponent>,
              private dialog:MatDialog,
              public router:Router,
              public dialogService: DialogService
              //public dialogService:DialogService,
              ) {
                this.pagoType = [
                  {name: 'Contado', code: false},                  
                  {name: 'Credito', code: true},                  
              ];              
              }

  ngOnInit(): void {
    this.service.form.get('proveedor')?.valueChanges.subscribe(
      nombre => this.getProveedorBuscar(nombre)
    )

    this.getSucursal()
    
    if (this.service.view == false) {
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    }
  }

  getProveedorBuscar(nombre:string){
    this.proveedorService.getBuscar(nombre).subscribe(data=>{
      this.Proveedor = data
    })
  }

  
  getSucursal(){
    return this.sucursalService.getSucursales().subscribe(data=>{
      this.Sucursal = data
    })
  }
  
  displayFn3(nombre:Sucursal): string {
    return nombre? nombre.nombre :nombre;
  }

  displayFn(nombre:Proveedor): string {
    return nombre? nombre.nombre :nombre;
  }

  displayFnn(nombre:Empleado): string {
    return nombre? nombre.nombre :nombre;
  }

  onClose(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
  }


  agregarOrden(){
    //console.log(this.service.form.value);
        this.service.createOrdenCompra()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `realizado con exito`,`Orden de Compra #${res.documento}`,{
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

  /* agregar(){
    //return console.log(this.service.form.value);
    const {code}:{ code:boolean }= this.service.form.get('pagoType')?.value
    if(!code){
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = false
      dialogConfig.autoFocus = true
      dialogConfig.height = "50%"
      dialogConfig.width = "60%"
      dialogConfig.disableClose = true  
      const dialogo = this.dialog.open(CompraContadoFormComponent,dialogConfig)
      dialogo.afterClosed().subscribe(res=>{
      if(res){
        this.save();
      }
    })
    }else{
      this.save()
    }
     
  } */

  agregar(){
    //return console.log(this.service.form.value);
    const {code}:{ code:boolean }= this.service.form.get('pagoType')?.value
    if(!code){
      const ref =this.dialogService.open(PagoFormComponent, {
        data:{
          compra:this.service.form.value,
          total:this.service.total_factura
        },
        header: 'Realizar pago compra',
        width: '80%',
        height:'80%',
        contentStyle: {"max-height": "800px", "overflow": "auto"},
        baseZIndex: 10000,
        closable:true
      })
      ref.onClose.subscribe((resp)=>{
            if(resp){
              this.service.form.patchValue({pago:resp})
              this.save()
            }
      })
    
    }else{
      this.save()
    }
     
  }

  save(){
    this.service.createCompra()
    .subscribe(
      res => {
        //console.log('object :>> ',res);
        this.toastr.success( `ingresada con exito`,`Compra #${res.documento}`,{
          positionClass:'toast-bottom-right'      
        })
        this.onClose()
      },
      err => {
        this.toastr.error(`${err.error.message}`,`Succedio un error`,{
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


  onChange(data:any){
    //console.log('object :>>', data);
    //this.service.form
    this.service.total()
  }

  openProveedor(){   
    this.proveedorService.resetFormBuilder()
    this.proveedorService.configNuevo()
    this.proveedorService.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    dialogConfig.width = "75%"
    const dialogo = this.dialog.open(ProveedorFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.service.form.patchValue({
        proveedor:res
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
      //this.getMarca()
    })
  }

  borrarPrecio(i:number){
    this.service.Detalle.removeAt(i)
    this.service.total()
  }
  onSearchChange(searchValue: string): void {  
    console.log(searchValue);
  }
  onKey(event:KeyboardEvent){
    const x = (<HTMLInputElement>event.target).id
    const element = this.service.form.value.detalle[x]
    const antiguo = element.subtotal
    element.subtotal = element.cantidad * element.precio
    this.service.total()
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

  get ProveedorForm(){
    return this.service.form.get('proveedor')
  }

  CerrarCompra(){
    this.dialogRef.close()
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
  }

  continuarOrden(){
    this.dialogRef.close()
    this.router.navigate(['/dashboard/compras/compra-form'])
    this.service.id = this.service.form.value.id
    this.service.configNuevo()
    //console.log('object :>> ', this.service.form.value.id);
    this.service.llenarFormularioOrden(this.service.id)
    this.service.total()
  }

    async printPDF(){
      interface impresion{
        data:any,
        total:any
      }
      const dato:impresion = {
        data:this.service.form.value,
        total:this.service.total_factura
      }
      console.log(this.service.total_factura)
      console.log(dato)
      const base64 = await impresionCompra_pdf(dato)
      base64.getBase64(data=>{
        this.show(data)
      })
    }

    show(src:string){
    const ref = this.dialogService.open(ReportViewComponent,{
      data:{src},
      header:'Reporte',
      width:'80%'
    })
  }
}

interface PagoType {
  name: string,
  code: boolean
}