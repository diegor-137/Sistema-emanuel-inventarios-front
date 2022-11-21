import { Component, OnInit, ViewChild } from '@angular/core';
import { Cliente } from '../interfaces/cliente';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ClienteService } from '../services/cliente.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { ClienteFormComponent } from '../cliente-form/cliente-form.component';

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.css']
})
export class ClienteListComponent implements OnInit {

  Cliente:Cliente[] = []

  displayedColumns: string[] = ['id', 'nombre','direccion','telefono','nit','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:ClienteService,
    private toastr:ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
  this.getClientes()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getClientes(){
    this.service.getClientes().subscribe(data=>{
      this.Cliente = data
      console.log(this.Cliente);
      this.dataSource = new MatTableDataSource (this.Cliente) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      
    })
  }
    eliminarCliente(id:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCliente(+id)
          .subscribe(
            res=>{
              this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.getClientes()
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
    const dialogo = this.dialog.open(ClienteFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      this.getClientes()
    })
  }

  verEdit(data:Cliente){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "60%"
    //+dialogConfig.height = "90%"
    const dialog = this.dialog.open(ClienteFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getClientes())
  }


}
