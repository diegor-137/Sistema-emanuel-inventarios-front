import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../services/empleado.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-historial-emp',
  templateUrl: './historial-emp.component.html',
  styleUrls: ['./historial-emp.component.css']
})
export class HistorialEmpComponent implements OnInit {


  constructor(public empleadoService:EmpleadoService,
              private toastr:ToastrService,
              public dialogRef:MatDialogRef<HistorialEmpComponent>) { }

  ngOnInit(): void {
    //this.empleadoService.desactivacionEmpleado()
  }

  get motivoForm(){
    return this.empleadoService.formHistorial.get('motivo')
  }

  onClose(){
    this.empleadoService.resetFormBuilder()
    this.empleadoService.initializeFormBuilder()
    this.dialogRef.close()
  }

  desactivar(){
    //return console.log("desactivado")
    this.empleadoService.desactivarEmpleado()
    .subscribe(
      res => {
        this.toastr.info(`${res.nombre} eliminado`,`Eliminado con Exito`,{
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

  activar(){
    //console.log("activado")
    this.empleadoService.activarEmpleado()
    .subscribe(
      res => {
        this.toastr.success(`${res.nombre} activado`,`activado con Exito`,{
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

}
