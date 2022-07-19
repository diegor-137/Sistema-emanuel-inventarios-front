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

  Venta:Venta[] = []

  displayedColumns: string[] = ['# DOC','Cliente','Fecha','Sucursal','Total','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:VentaService,
    private toastr:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCotizaciones()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCotizaciones(){
    this.service.getCotizaciones().subscribe(data=>{
      this.Venta = data
      //console.log('object :>> ',this.Venta);
      this.dataSource = new MatTableDataSource (this.Venta) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    })
  }
    eliminarCotizacion(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCotizacion(+id)
          .subscribe(
            res=>{
              this.toastr.error(`Venta #${res.id} eliminada`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getCotizaciones()
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
