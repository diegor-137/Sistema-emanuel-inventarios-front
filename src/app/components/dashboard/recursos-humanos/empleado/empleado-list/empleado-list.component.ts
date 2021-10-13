import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Empleado } from '../interfaces/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {

  Empleado:Empleado[] = []

  displayedColumns: string[] = ['id', 'nombre','apellido','telefono','direccion','puesto','sucursal','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:EmpleadoService,
              private toastr:ToastrService,
              private dialog:MatDialog) { }


  ngOnInit(): void {
    this.getEmpleado()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getEmpleado(){
    this.service.getEmpleados().subscribe(data=>{
      this.Empleado = data
      //console.log('object :>> ',this.Puesto);
      this.dataSource = new MatTableDataSource (this.Empleado) 
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
          this.service.deleteEmpleado(+id)
          .subscribe(
            res=>{
              this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getEmpleado()
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
  openForm(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    const dialogo = this.dialog.open(EmpleadoFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getEmpleado()
    })
  }

  verEdit(data:Empleado){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.width = "60%"
    const dialog = this.dialog.open(EmpleadoFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getEmpleado())
  }

}
