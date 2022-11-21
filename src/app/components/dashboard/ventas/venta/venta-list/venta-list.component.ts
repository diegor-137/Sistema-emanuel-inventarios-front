import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Venta } from '../interfaces/venta';
import { VentaService } from '../services/venta.service';
import Swal from 'sweetalert2';
import { VentaFormComponent } from '../venta-form/venta-form.component';
import { VistaComponent } from '../vista/vista.component';

@Component({
  selector: 'app-venta-list',
  templateUrl: './venta-list.component.html',
  styleUrls: ['./venta-list.component.css']
})
export class VentaListComponent implements OnInit {

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
    this.getVentas()
  }


  getVentas(){
    this.service.range.setValue({
      dates:this.service.fechas
    })
    this.service.getVentas().subscribe(data=>{
      this.Venta = data
      this.loading = false
    })
  }

  getPorFechas(){
    if (this.service.range.value.dates[1]===null) {
      this.toastr.error(`ingrese fechas validas`,`Error en fechas`,{positionClass:'toast-bottom-right'})  
    }else{
      this.loading = true;
      setTimeout(() => {
        this.service.getVentas().subscribe(data=>{
          this.Venta = data
          this.loading = false;
        })
        }, 100);
    }
  }
    eliminarVenta(data:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteVenta(+data.id)
          .subscribe(
            res=>{
              this.toastr.error(`Venta #${res.id} eliminada`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'})
                this.Venta = this.Venta.filter(val => val.id !== data.id)
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
  verVenta(data:Venta){
    this.service.resetFormBuilder()
    this.service.configView()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialog = this.dialog.open(VistaComponent,dialogConfig)
    dialog.afterOpened().subscribe(res=>{
      this.service.total()
    })
    dialog.afterClosed().subscribe(res =>{
      this.getVentas()
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    })
  }

}
