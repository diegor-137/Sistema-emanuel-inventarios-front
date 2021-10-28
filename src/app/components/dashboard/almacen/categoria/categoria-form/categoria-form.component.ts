import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from '../services/categoria.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  loading:boolean = false

  matcher = new MyErrorStateMatcher();

  constructor(public service:CategoriaService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<CategoriaFormComponent>) { }

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
      this.service.createCategoria()
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
      this.service.updateCategoria()
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
