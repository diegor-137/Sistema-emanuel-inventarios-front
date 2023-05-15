import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProveedorService } from '../services/proveedor.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.component.html',
  styleUrls: ['./proveedor-form.component.css']
})
export class ProveedorFormComponent implements OnInit {

  loading:boolean = false
  matcher = new MyErrorStateMatcher();

  constructor(public service:ProveedorService,
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<ProveedorFormComponent>) { }

  ngOnInit(): void {
  }
  
  get NombreForm(){
    return this.service.form.get('nombre')
  }
  
  get DireccionForm(){
    return this.service.form.get('direccion')
  }

  get TelefonoForm(){
    return this.service.form.get('telefono')
  }

  get NitForm(){
    return this.service.form.get('nit')
  }

  get CorreoForm(){
    return this.service.form.get('correo')
  } 
  
  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }

  agregar(){
        this.service.createProveedor()
        .subscribe(
          res => {
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
      this.service.updateProveedor()
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

  trackFn(index:any) {
    return index;
  }  

}
