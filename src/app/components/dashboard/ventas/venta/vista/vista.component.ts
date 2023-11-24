import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmpleadoService } from '../../../recursos-humanos/empleado/services/empleado.service';
import { SucursalService } from '../../../sucursal/services/sucursal.service';
import { ClienteService } from '../../cliente/services/cliente.service';
import { VentaService } from '../services/venta.service';
import { DialogService } from 'primeng/dynamicdialog';
import { impresionVenta_pdf } from '../interfaces/impresion_venta_pdf';
import { ReportViewComponent } from '../../../reports/report-view/report-view.component';

@Component({
  selector: 'app-vista',
  templateUrl: './vista.component.html',
  styleUrls: ['./vista.component.css'],
  providers: [DialogService]
})
export class VistaComponent implements OnInit {

  constructor(public service:VentaService,
    public dialogRef:MatDialogRef<VistaComponent>,
    private toastr:ToastrService,
    private dialog:MatDialog,
    public router:Router,
    public dialogService:DialogService,) { }

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

  async printPDF(){
    interface impresion{
      data:any,
      total:any
    }
    const dato:impresion = {
      data:this.service.form.value,
      total:this.service.total_factura
    }
    console.log(this.service.total_factura)
    console.log(dato)
    const base64 = await impresionVenta_pdf(dato)
    base64.getBase64(data=>{
      this.show(data)
    })
  }

    show(src:string){
    const ref = this.dialogService.open(ReportViewComponent,{
      data:{src},
      header:'Reporte',
      width:'80%'
    })
  }

  printThermal(id:number){
    this.service.imprimirVenta(id)
  }
}
  
