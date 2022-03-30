import { Component, OnInit, ViewChild } from '@angular/core';
import { Proveedor } from '../interfaces/proveedor';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProveedorService } from '../services/proveedor.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProveedorFormComponent } from '../proveedor-form/proveedor-form.component';

@Component({
  selector: 'app-proveedor-list',
  templateUrl: './proveedor-list.component.html',
  styleUrls: ['./proveedor-list.component.css']
})
export class ProveedorListComponent implements OnInit {

  Proveedor:Proveedor[] = []

  displayedColumns: string[] = ['id', 'nombre','direccion','telefono','nit','correo','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(private service:ProveedorService,
    private toastr:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getProveedor()
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getProveedor(){
    this.service.getProveedores().subscribe(data=>{
      this.Proveedor = data
      //console.log('object :>> ',this.Puesto);
      this.dataSource = new MatTableDataSource (this.Proveedor) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
    elimininar(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteProveedor(+id)
          .subscribe(
            res=>{
              this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getProveedor()
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
    //dialogConfig.width = "60%"
    //dialogConfig.height = "90%"
    const dialogo = this.dialog.open(ProveedorFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getProveedor()
    })
  }

  verEdit(data:Proveedor){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "60%"
    //dialogConfig.height = "90%"
    const dialog = this.dialog.open(ProveedorFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getProveedor())
  }

}
