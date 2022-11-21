import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Venta } from '../interfaces/venta';
import { VentaService } from '../services/venta.service';
import { VistaComponent } from '../vista/vista.component';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit {

  private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();

  Venta:Venta[] = []
  loading: boolean;

  constructor(public service:VentaService,
    private toastr:ToastrService,
    private dialog:MatDialog) {
      this.loading = true;
     }

  ngOnInit(): void {
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1))
    this.service.fechas.push(this.dateYesterday,this.dateToday)
    this.getCotizaciones()
  }

  getCotizaciones(){
    this.service.range.setValue({
      dates:this.service.fechas
    })
    this.service.getCotizaciones().subscribe(data=>{
      this.Venta = data 
      this.loading = false;
    })
  }

  getPorFechas(){
    //console.log(this.service.range.value.dates.length)

    if (this.service.range.value.dates[1]===null) {
      this.toastr.error(`ingrese fechas validas`,`Error en fechas`,{positionClass:'toast-bottom-right'})  
    }else{
      this.loading = true;
      setTimeout(() => {
        this.service.getCotizaciones().subscribe(data=>{
          this.Venta = data
          this.loading = false;
        })
        }, 100);
    }
  }
    eliminarCotizacion(producto:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCotizacion(+producto.id)
          .subscribe(
            res=>{
              this.toastr.error(`Venta #${res.id} eliminada`,`Eliminado con Exito`,{positionClass:'toast-bottom-right'})
              this.Venta = this.Venta.filter(val => val.id !== producto.id)
                  },
            error => {
              this.toastr.error(`${error.message}`,`Succedio un error`,{
                positionClass:'toast-bottom-right'      
              })
            }
          ) 
        }
      })
  }
  verCotizacion(data:Venta){
    this.service.resetFormBuilder()
    this.service.configViewCotizacion()
    this.service.llenarFormularioCotizacion(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialog = this.dialog.open(VistaComponent,dialogConfig)
    dialog.afterOpened().subscribe(res=>{
      this.service.total()
    })
    dialog.afterClosed().subscribe(res =>{
      this.getCotizaciones()
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    })
  }

}
