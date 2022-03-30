import { Component, OnInit, ViewChild } from '@angular/core';
import { Marca } from '../interfaces/marca';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MarcaService } from '../services/marca.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MarcaFormComponent } from '../marca-form/marca-form.component';

@Component({
  selector: 'app-marca-list',
  templateUrl: './marca-list.component.html',
  styleUrls: ['./marca-list.component.css']
})
export class MarcaListComponent implements OnInit {

  Marca:Marca[] = []

  displayedColumns: string[] = ['id', 'nombre','acciones'];
  dataSource!:MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service:MarcaService,
    private toastr: ToastrService,
    private dialog:MatDialog) { }

  ngOnInit(): void {
    this.getMarca()
  }

  
  ngAfterViewInit() {
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  
  getMarca(){
    this.service.getMarcas().subscribe(data=>{
      this.Marca = data
      this.dataSource = new MatTableDataSource (this.Marca) 
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  elimininarMarca(id:any){

    Swal.fire({
      title: 'Esta seguro de elminar registro?',
      text: 'Eliminara registro',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        this.service.deleteMarca(+id)
        .subscribe(
          res=>{
            this.toastr.error(`${res.nombre} eliminado`,`Eliminado con Exito`,{
              positionClass:'toast-bottom-right'      
            })
            this.getMarca()
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
    const dialogo = this.dialog.open(MarcaFormComponent,dialogConfig)
    dialogo.afterClosed().subscribe(res=>{
      dialogConfig.disableClose = false
      this.getMarca()
    })
  }

  verEdit(data:Marca){
    this.service.resetFormBuilder()
    this.service.configEdit()
    this.service.llenarFormulario(data)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = false
    dialogConfig.autoFocus = true
    //dialogConfig.width = "75%"
    const dialog = this.dialog.open(MarcaFormComponent,dialogConfig)
    dialog.afterClosed().subscribe(res => this.getMarca())
  }

}
