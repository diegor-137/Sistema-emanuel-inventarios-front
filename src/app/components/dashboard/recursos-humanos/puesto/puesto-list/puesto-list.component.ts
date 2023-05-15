import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Puesto } from '../interfaces/puesto';
import { PuestoService } from '../services/puesto.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PuestoFormComponent } from '../puesto-form/puesto-form.component';

@Component({
  selector: 'app-puesto-list',
  templateUrl: './puesto-list.component.html',
  styleUrls: ['./puesto-list.component.css']
})
export class PuestoListComponent implements OnInit {

  Puesto:Puesto[] = []

  displayedColumns: string[] = ['id', 'nombre','departamento','estado','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:PuestoService,
              private toastr:ToastrService,
              private dialog:MatDialog) { }


  ngOnInit(): void {
    this.getPuesto()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getPuesto(){
    this.service.getPuestos().subscribe(data=>{
      this.Puesto = data
      //console.log('object :>> ',this.Puesto);
      this.dataSource = new MatTableDataSource (this.Puesto) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
    elimininarPuesto(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deletePuesto(+id)
          .subscribe(
            res=>{
              this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getPuesto()
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

  activar(data:Puesto){
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
        this.service.updatePuesto()
        .subscribe(
          res=>{
            this.toastr.success(`${res.nombre} Activado`,`Activado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getPuesto()
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
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true

    const dialogo = this.dialog.open(PuestoFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getPuesto()
    })
  }

  verEdit(data:Puesto){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "50%"
    const dialog = this.dialog.open(PuestoFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getPuesto())
  }

}
