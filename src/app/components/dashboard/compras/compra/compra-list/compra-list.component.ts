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
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-compra-list',
  templateUrl: './compra-list.component.html',
  styleUrls: ['./compra-list.component.css']
})
export class CompraListComponent implements OnInit {

  private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();
  Compras:Compra[] = []
  

  loading: boolean;

  constructor(public service:CompraService,
    private toastr:ToastrService,
    private dialog:MatDialog) { 
      this.loading = true
    }

  ngOnInit(): void {
        this.service.range.reset({
      dates:''
    })
    this.service.range.setValue({
      dates:''
    })    
    this.service.range.setValue({
      dates:this.service.fechas
    })
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1))
    this.service.fechas.push(this.dateYesterday,this.dateToday)
  }


  getCompras(event: LazyLoadEvent){
    this.loading = true;


    setTimeout(() => {
    this.service.range.reset({
      dates:''
    })
    this.service.range.setValue({
      dates:''
    })    
    this.service.range.setValue({
      dates:this.service.fechas
    })
    this.service.getCompras().subscribe(data=>{
      this.Compras = data
      this.loading = false;
      
    })
    }, 100);
  }

  getPorFechas(event: LazyLoadEvent){
    //console.log(this.service.range.value.dates.length)

    if (this.service.range.value.dates[1]===null) {
      this.toastr.error(`ingrese fechas validas`,`Error en fechas`,{positionClass:'toast-bottom-right'})  
    }else{
      this.loading = true;
      setTimeout(() => {
        this.service.getCompras().subscribe(data=>{
          this.Compras = data
          this.loading = false;
        })
        }, 100);
    }
  }
    eliminarCompra(producto:any){

        
      
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteCompra(+producto.id)
          .subscribe(
            res=>{
              this.toastr.error(`Compra #${res.documento} eliminada`,`Eliminado con Exito`,{
                positionClass:'toast-bottom-right'      
              })
              this.Compras = this.Compras.filter(val => val.id !== producto.id)
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
    //console.log(data)
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
      this.service.resetFormBuilder()
      this.service.configNuevo()
      this.service.initializeFormBuilder()
    })
  }

}
