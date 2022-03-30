import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Compra } from '../interfaces/compra';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompraService } from '../services/compra.service';
import Swal from 'sweetalert2';
import { CompraFormComponent } from '../compra-form/compra-form.component';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.css']
})
export class CompraListComponent implements OnInit {

  Compra:Compra[] = []

  displayedColumns: string[] = ['id', '# DOC','Proveedor','Fecha','Sucursal','Total','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:CompraService,
    private toastr:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getCompras()
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCompras(){
    this.service.getCompras().subscribe(data=>{
      this.Compra = data
      //console.log('object :>> ',this.Compra);
      this.dataSource = new MatTableDataSource (this.Compra) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;   
    })
  }
    eliminarCompra(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCompra(+id)
          .subscribe(
            res=>{
              this.toastr.error(`Compra #${res.documento} eliminada`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getCompras()
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
  verCompra(data:Compra){
    this.service.resetFormBuilder()
    this.service.configView()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialog = this.dialog.open(CompraFormComponent,dialogConfig)
    dialog.afterOpened().subscribe(res=>{
      this.service.total()
    })
    dialog.afterClosed().subscribe(res =>{
      this.getCompras()
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    })
  }

}
