import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MarcaService } from '../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-marca-form',
  templateUrl: './marca-form.component.html',
  styleUrls: ['./marca-form.component.css']
})
export class MarcaFormComponent implements OnInit {

  loading:boolean = false
  matcher = new MyErrorStateMatcher();

  constructor(public service:MarcaService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<MarcaFormComponent>) { }

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
      this.service.createMarca()
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
      this.service.updateMarca()
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