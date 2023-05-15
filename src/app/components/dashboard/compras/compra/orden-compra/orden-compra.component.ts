import { Component, OnInit} from '@angular/core';
import { Compra } from '../interfaces/compra';
import { CompraService } from '../services/compra.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CompraFormComponent } from '../compra-form/compra-form.component';
import { DatePipe } from '@angular/common';
import { LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-orden-compra',
  templateUrl: './orden-compra.component.html',
  styleUrls: ['./orden-compra.component.css'],
  providers: [DatePipe]
})
export class OrdenCompraComponent implements OnInit {

  private dateToday: Date = new Date();
  private dateYesterday: Date = new Date();
  
  Compras:Compra[] = []

  loading: boolean;

  constructor(public service:CompraService,
    private toastr:ToastrService,
    private dialog:MatDialog) {
      this.loading = true;
     }

  ngOnInit(): void {
    this.dateYesterday = new Date(this.dateYesterday.setDate(this.dateYesterday.getDate() - 1))
    this.service.fechas.push(this.dateYesterday,this.dateToday)
    this.getOrdenCompras()
  }

  getOrdenCompras(){
    this.service.range.reset({
      dates:''
    })
    this.service.range.setValue({
      dates:''
    })    
    this.service.range.setValue({
      dates:this.service.fechas
    })
    this.service.getOrdencompras().subscribe(data=>{
      this.Compras = data
      this.loading = false;
    })
  }

  getPorFechas(event: LazyLoadEvent){
    if (this.service.range.value.dates[1]===null) {
      this.toastr.error(`ingrese fechas validas`,`Error en fechas`,{positionClass:'toast-bottom-right'})  
    }else{
      this.loading = true;
      setTimeout(() => {
        this.service.getOrdencompras().subscribe(data=>{
          this.Compras = data
          this.loading = false;
        })
        }, 100);
    }
  }
    eliminarOrdenCompra(producto:any){
      Swal.fire({
        title: 'Esta seguro de elminar registro?',
        text: 'Eliminara registro',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.deleteOrdenCompra(+producto.id)
          .subscribe(
            res=>{
              this.toastr.error(`Orden Compra eliminada`,`Eliminado con Exito`,{positionClass:'toast-bottom-right'})
              this.Compras = this.Compras.filter(val => val.id !== producto.id)      
            },
            error => {
              this.toastr.error(`${error.message}`,`Succedio un error`,{positionClass:'toast-bottom-right'})
            }
          )

        }
      })
  }
  verOrdenCompra(data:any){
    console.log(data)
    this.service.resetFormBuilder()
    this.service.configViewOrdenCompra()
    this.service.llenarFormularioOrden(data.id)
    const dialogConfig = new MatDialogConfig()
    dialogConfig.disableClose = true
    dialogConfig.autoFocus = true
    dialogConfig.height = "90%"
    const dialog = this.dialog.open(CompraFormComponent,dialogConfig)
    this.service.total()
    dialog.afterOpened().subscribe(res=>{
      this.service.total()
    })
    dialog.afterClosed().subscribe(res =>{
        })
  }
  
  CerrarCompra(){
    this.dialog.closeAll()
  }

}
