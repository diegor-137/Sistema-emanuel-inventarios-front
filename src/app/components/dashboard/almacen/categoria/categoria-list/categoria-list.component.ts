import { Component, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../interfaces/categoria';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CategoriaService } from '../services/categoria.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {

  Categoria:Categoria[] = []

  displayedColumns: string[] = ['id', 'nombre','estado','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:CategoriaService,
              private toastr: ToastrService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCategoria()
  }


  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getCategoria(){
    this.service.getCategorias().subscribe(data=>{
      this.Categoria = data
      this.dataSource = new MatTableDataSource (this.Categoria) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  elimininarCategoria(id:any){

    Swal.fire({
      title: 'Esta seguro de elminar registro?',
      text: 'Eliminara registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteCategoria(+id)
        .subscribe(
          res=>{
            console.log('object :>> ',res);
            this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getCategoria()
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

  activar(data:Categoria){
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
        this.service.updateCategoria()
        .subscribe(
          res=>{
            this.toastr.success(`${res.nombre} Activado`,`Activado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getCategoria()
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
    const dialogo = this.dialog.open(CategoriaFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
      this.getCategoria()
    })
  }

  verEdit(data:Categoria){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialog = this.dialog.open(CategoriaFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getCategoria())
  }

}
