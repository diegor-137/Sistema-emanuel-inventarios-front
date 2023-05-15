import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog'; 

import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Departamento } from '../interfaces/departamento';
import { DepartamentoService } from '../services/departamento.service';
import { DepartamentoFormComponent } from '../departamento-form/departamento-form.component';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements OnInit {

  Departamento:Departamento[] = []

  displayedColumns: string[] = ['id', 'nombre','estado','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:DepartamentoService,
              private toastr: ToastrService,
              private dialog:MatDialog) { }


  ngOnInit(): void {
    this.getDepartamento()
  }


  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getDepartamento(){
    this.service.getDepartamentos().subscribe(data=>{
      this.Departamento = data
      this.dataSource = new MatTableDataSource (this.Departamento) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  elimininarDepartamento(id:any){

    Swal.fire({
      title: 'Esta seguro de desactivar  registro?',
      text: 'Desactivar registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteDepartamento(+id)
        .subscribe(
          res=>{
            console.log('object :>> ',res);
            this.toastr.error(`${res.nombre} Desactivado`,`Desactivado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getDepartamento()
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

  activar(data:Departamento){
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
        this.service.updateDepartamento()
        .subscribe(
          res=>{
            this.toastr.success(`${res.nombre} Activado`,`Activado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getDepartamento()
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
    //dialogConfig.width = "75%"
    const dialogo = this.dialog.open(DepartamentoFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getDepartamento()
    })
  }

  verEdit(data:Departamento){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialog = this.dialog.open(DepartamentoFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getDepartamento())
  }
}
