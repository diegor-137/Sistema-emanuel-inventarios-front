import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MarcaFormComponent } from '../../marca/marca-form/marca-form.component';
import { TipoPrecioService } from '../services/tipo-precio.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-tipo-precio-form',
  templateUrl: './tipo-precio-form.component.html',
  styleUrls: ['./tipo-precio-form.component.css']
})
export class TipoPrecioFormComponent implements OnInit {

  loading:boolean = false
  matcher = new MyErrorStateMatcher();

  constructor(
              public service:TipoPrecioService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<TipoPrecioFormComponent>) { }


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
    this.service.createTipoPrecio()
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
    this.service.updateTipoPrecio()
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
