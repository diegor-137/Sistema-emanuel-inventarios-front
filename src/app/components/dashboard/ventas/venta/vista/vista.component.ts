import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../../recursos-humanos/empleado/services/empleado.service';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { ClienteService } from '../../cliente/services/cliente.service';
import { VentaService } from '../services/venta.service';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css']
})
export class VistaComponent implements OnInit {

  constructor(public service:VentaService,
    public dialogRef:MatDialogRef<VistaComponent>,
    private toastr:ToastrService,
    private dialog:MatDialog,
    public router:Router) { }

  ngOnInit(): void {
  }

  continuarCotizacion(){
    this.dialogRef.close()
    this.router.navigate(['/dashboard/ventas/venta-form'])
    this.service.id = this.service.form.value.id
    this.service.configNuevo()
    this.service.llenarFormularioCotizacion(this.service.id)
    //this.service.llenarFormularioCotizacion(this.service.id)
    
  }

  agregar(){
    //return console.log(this.service.form.value);
       this.service.createVenta()
       .subscribe(
         res => {
           //console.log('object :>> ',res);
           this.toastr.success( `ingresada con exito`,`Compra #${res.id}`,{
             positionClass:'toast-bottom-right'      
           })
           this.dialogRef.close()
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
