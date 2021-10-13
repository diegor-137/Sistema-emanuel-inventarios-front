import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { DepartamentoService } from '../services/departamento.service';
import { MatDialogRef } from '@angular/material/dialog';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent implements OnInit {
  

  loading:boolean = false

  matcher = new MyErrorStateMatcher();

  constructor(public service:DepartamentoService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<DepartamentoFormComponent>) {            
   }

  ngOnInit(): void {
  }

  get NombreForm(){
    return this.service.form.get('nombre')
  }

  onClose(){
    this.service.resetFormBuilder()
    this.service.initializeFormBuilder()
    this.dialogRef.close()
  }

  agregar(){
      this.service.createDepartamento()
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
      this.service.updateDepartamento()
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
