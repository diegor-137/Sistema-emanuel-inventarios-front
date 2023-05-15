import { Component, OnInit, ViewChild } from '@angular/core';
import { Tipo_Precio } from '../interfaces/tipo-precio';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { TipoPrecioService } from '../services/tipo-precio.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { TipoPrecioFormComponent } from '../tipo-precio-form/tipo-precio-form.component';

@Component({
  selector: 'app-tipo-precio-list',
  templateUrl: './tipo-precio-list.component.html',
  styleUrls: ['./tipo-precio-list.component.css']
})
export class TipoPrecioListComponent implements OnInit {

  tipoPrecio:Tipo_Precio[] = []

  displayedColumns: string[] = ['id', 'nombre','estado','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:TipoPrecioService,
    private toastr: ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getTipoPrecio()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getTipoPrecio(){
    this.service.getTipoPrecios().subscribe(data=>{
      this.tipoPrecio = data
      console.log(">>>>",this.tipoPrecio)
      this.dataSource = new MatTableDataSource (this.tipoPrecio) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  eliminarTipoPrecio(id:any){
    Swal.fire({
      title: 'Esta seguro de elminar registro?',
      text: 'Eliminara registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteTipoPrecio(+id)
        .subscribe(
          res=>{
            this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getTipoPrecio()
                },
          error => {
            this.toastr.error(`Succedio un error`,`${error.message}`,{
              positionClass:'toast-bottom-right'      
            })
          }
        ) 
      }
    })
  }

  openForm(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialogo = this.dialog.open(TipoPrecioFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
      this.getTipoPrecio()
    })
  }

  activar(data:Tipo_Precio){
    Swal.fire({
      title: 'Esta seguro de activar registro?',
      text: 'Activar registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.resetFormBuilder()
        this.service.configEdit()
        this.service.llenarFormulario(data)
        this.service.form.value.estado=true
        console.log(this.service.form.value)
        this.service.updateTipoPrecio()
        .subscribe(
          res=>{
            this.toastr.success(`${res.nombre} Activado`,`Activado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getTipoPrecio()
                },
          error => {
            this.toastr.error(`Succedio un error`,`${error.message}`,{
              positionClass:'toast-bottom-right'      
            })
          }
        ) 
      }
    })
  }

  verEdit(data:Tipo_Precio){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialog = this.dialog.open(TipoPrecioFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getTipoPrecio())
  }

}
