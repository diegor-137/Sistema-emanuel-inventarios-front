import { Component, OnInit, ViewChild } from '@angular/core';
import { Producto } from '../interaces/producto';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProductoService } from '../services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ProductoFormComponent } from '../producto-form/producto-form.component';

@Component({
  selector: 'app-producto-list',
  templateUrl: './producto-list.component.html',
  styleUrls: ['./producto-list.component.css']
})
export class ProductoListComponent implements OnInit {

  Producto:Producto[] = []

  displayedColumns: string[] = ['id', 'nombre','descripcion','costo','categoria','marca','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:ProductoService,
              private toastr:ToastrService,
              private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getProductos()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getProductos(){
    this.service.getProductos().subscribe(data=>{
      this.Producto = data
      console.log('object :>> ',this.Producto[0].precio[0].tipoPrecio.id);
      this.dataSource = new MatTableDataSource (this.Producto) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
    elimininarProducto(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteProducto(+id)
          .subscribe(
            res=>{
              this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getProductos()
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
    dialogConfig.height = "90%"
    const dialogo = this.dialog.open(ProductoFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getProductos()
    })
  }

  verEdit(data:Producto){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialog = this.dialog.open(ProductoFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getProductos())
  }
}
