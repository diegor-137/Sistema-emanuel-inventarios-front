import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ClienteService } from '../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  loading:boolean = false
  matcher = new MyErrorStateMatcher();

  nuevoCliente:any

  constructor(public service:ClienteService,
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<ClienteFormComponent>) { }

  ngOnInit(): void {
  }
  @Output() mensajeParaVenta = new EventEmitter<any>();
  
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
  
  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close(this.nuevoCliente)
  }

  agregar(){
        this.service.createCliente()
        .subscribe(
          res => {
            this.nuevoCliente = res
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
      this.service.updateCliente()
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
