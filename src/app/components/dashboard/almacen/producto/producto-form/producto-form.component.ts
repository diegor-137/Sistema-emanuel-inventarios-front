import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroupDirective, NgForm, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { EmpleadoService } from '../../../recursos-humanos/empleado/services/empleado.service';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { MarcaService } from '../../marca/services/marca.service';
import { MatDialogRef, MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { Categoria } from '../../categoria/interfaces/categoria';
import { Marca } from '../../marca/interfaces/marca';
import { ProductoService } from '../services/producto.service';
import { CategoriaFormComponent } from '../../categoria/categoria-form/categoria-form.component';
import { MarcaFormComponent } from '../../marca/marca-form/marca-form.component';
import { TipoPrecio } from '../services/tipo-precio.service';
import { Tipo_Precio } from '../interaces/tipo_precio';



export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  loading:boolean = false
  Categoria:Categoria[] = []
  Marca!:Marca[]
  tipoPrecio:Tipo_Precio [] = []
  matcher = new MyErrorStateMatcher();

  constructor(public service:ProductoService,
    private toastr:ToastrService,
    private categoriaService:CategoriaService,
    private marcaService:MarcaService,
    private tipoPrecioService:TipoPrecio,
    public dialogRef:MatDialogRef<ProductoFormComponent>,
    private dialog:MatDialog) { } 

  ngOnInit(): void {
    this.service.form.get('marca')?.valueChanges.subscribe(
      nombre => this.getMarcaBuscar(nombre)
    )
    this.service.form.get('categoria')?.valueChanges.subscribe(
      nombre => this.getCategoriaBuscar(nombre)
    )
    this.getTipoPrecio()
  }



  getMarcaBuscar(nombre:string){
    this.marcaService.getBuscar(nombre).subscribe(data=>{
      this.Marca = data
      //console.log('object :>> ',this.Marca);
    })
  }
  getCategoriaBuscar(nombre:string){
    return this.categoriaService.getBuscar(nombre).subscribe(data=>{
      this.Categoria = data
      //console.log('object :>> ',this.Categoria);
    })
  }

  getTipoPrecio(){
    this.tipoPrecioService.getTipoPrecios().subscribe(data=>{
      this.tipoPrecio = data
      console.log('object :>> ', this.tipoPrecio);
    })
  }

  displayFn(nombre:Marca): string {
    return nombre? nombre.nombre :nombre;
  }

  displayFnn(nombre:Categoria): string {
    return nombre? nombre.nombre :nombre;
  }

  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }


  agregar(){
    //return console.log(this.service.form.value);
        this.service.createProducto()
        .subscribe(
          res => {
            //console.log('object :>> ',res);
            this.toastr.success( `Agregado con Exito`,`${res.nombre} agregado`,{
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

  actualizar(){
    //return console.log('object :>> ',this.service.form.value);
      this.service.updateProducto()
      .subscribe(
        res=>{
          this.toastr.success( `Modificado con Exito`,`${res.nombre} modificado`,{
            positionClass:'toast-bottom-right'      
          })
          this.onClose()
        },
        err => {
          this.toastr.error(`${err.message}`, `Succedio un error`,{
            positionClass:'toast-bottom-right'      
          })
          console.log(err);
        }
      )   
  } 

  openCategoria(){   
    this.categoriaService.resetFormBuilder()
    this.categoriaService.configNuevo()
    this.categoriaService.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialogo = this.dialog.open(CategoriaFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
      //this.getMarca()
    })
  }

  openMarca(){
    this.marcaService.resetFormBuilder()
    this.marcaService.configNuevo()
    this.marcaService.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    //dialogConfig.width = "50%"
    const dialogo = this.dialog.open(MarcaFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
      //this.getMarca()
    })
  }

  onKeyPress(event:any){
    if (this.service.form.get('categoria.id')?.hasError('incorrect')) {
      console.log('object :>> ',"no existe el registro");
    } else {
      
    }
  }


  borrarPrecio(i:number){
    this.service.Precios.removeAt(i)
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

  get MarcaForm(){
    return this.service.form.get('marca')
  }

  get CategoriaForm(){
    return this.service.form.get('categoria')
  }


}


