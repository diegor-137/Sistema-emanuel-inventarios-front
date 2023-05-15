import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { Departamento } from '../../departamento/interfaces/departamento';
import { PuestoService } from '../services/puesto.service';
import { DepartamentoService } from '../../departamento/services/departamento.service';
import { MatDialogRef } from '@angular/material/dialog';



/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-puesto-form',
  templateUrl: './puesto-form.component.html',
  styleUrls: ['./puesto-form.component.css']
})
export class PuestoFormComponent implements OnInit {

  loading:boolean = false
  Departamento:Departamento[] = []
  matcher = new MyErrorStateMatcher();

  constructor(public service:PuestoService,
    private toastr:ToastrService,
    private departamentoService:DepartamentoService,
    public dialogRef:MatDialogRef<PuestoFormComponent>) { 
    }

  ngOnInit(): void {
    this.getDepartamento()
  }


  get NombreForm(){
    return this.service.form.get('nombre')
  }

  getDepartamento(){
    return this.departamentoService.getDepartamentosActivos().subscribe(data=>{
      this.Departamento = data
    })
  }

  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }

  agregar(){
        this.service.createPuesto()
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
      this.service.updatePuesto()
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
