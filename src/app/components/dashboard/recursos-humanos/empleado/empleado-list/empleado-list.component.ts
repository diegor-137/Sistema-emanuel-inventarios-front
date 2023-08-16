import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Empleado } from '../interfaces/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EmpleadoFormComponent } from '../empleado-form/empleado-form.component';
import { HistorialEmpComponent } from '../historial-emp/historial-emp.component';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html',
  styleUrls: ['./empleado-list.component.css']
})
export class EmpleadoListComponent implements OnInit {

  Empleado:Empleado[] = []

  displayedColumns: string[] = ['id', 'nombre','apellido','telefono','estado','puesto','sucursal','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public service:EmpleadoService,
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

    elimininarEmpleado(data:Empleado){
      this.service.resetFormHistorial()
      this.service.initializeFormHistorial()
      this.service.desactivacionEmpleado(data)
      const dialogConfig = new MatDialogConfig()
      dialogConfig.disableClose = false
      dialogConfig.autoFocus = true
      //dialogConfig.width = "60%"
      const dialogo = this.dialog.open(HistorialEmpComponent,dialogConfig)
      dialogo.afterClosed().subscribe(res=>{
        this.getEmpleado()
      })
  }

  activarEmpleado(data:Empleado){
    this.service.resetFormHistorial()
    this.service.initializeFormHistorial()
    this.service.activacionEmpleado(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "60%"
    const dialogo = this.dialog.open(HistorialEmpComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getEmpleado()
    })
  }

  openForm(){
    this.service.resetFormBuilder()
    this.service.configNuevo()
    this.service.initializeFormBuilder()
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "60%"
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
    //dialogConfig.width = "60%"
    const dialog = this.dialog.open(EmpleadoFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getEmpleado())
  }

}
