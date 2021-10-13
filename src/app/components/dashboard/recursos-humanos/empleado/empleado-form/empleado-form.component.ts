import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../services/empleado.service';
import { PuestoService } from '../../puesto/services/puesto.service';
import { Puesto } from '../../puesto/interfaces/puesto';
import { MatDialogRef } from '@angular/material/dialog';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { Sucursal } from '../../../sucursal/interfaces/sucursal';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  loading:boolean = false
  Puesto:Puesto[] = []
  Sucursal:Sucursal[] = []
  matcher = new MyErrorStateMatcher();

  constructor(public service:EmpleadoService,
    private toastr:ToastrService,
    private puestoService:PuestoService,
    private sucursalService:SucursalService,
    public dialogRef:MatDialogRef<EmpleadoFormComponent>) { 

    }

  ngOnInit(): void {
    this.getPuesto()
    this.getSucursal()
  }

  get NombreForm(){
    return this.service.form.get('nombre')
  }

  get ApellidoForm(){
    return this.service.form.get('apellido')
  }

  get DireccionForm(){
    return this.service.form.get('direccion')
  }

  get TelefonoForm(){
    return this.service.form.get('telefono')
  }

  getPuesto(){
    return this.puestoService.getPuestos().subscribe(data=> this.Puesto = data)
  }
  
  getSucursal(){
    return this.sucursalService.getSucursales().subscribe(data => this.Sucursal = data)
    
  }

  
  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }

  agregar(){
        this.service.createEmpleado()
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
      this.service.updateEmpleado()
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
}

